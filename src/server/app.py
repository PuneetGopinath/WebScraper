# © 2025 Puneet Gopinath. All rights reserved.
# Filename: src/server/app.py
# License: MIT (see LICENSE)

from os import path, getenv, remove
from urllib.parse import urlparse
from uuid import uuid4
import asyncio
import subprocess

from zyte_api import AsyncZyteAPI
from flask import Flask, json, jsonify, send_from_directory, request
from flask_cors import CORS
from dotenv import load_dotenv
from scrapy.crawler import CrawlerProcess

load_dotenv()

app = Flask(__name__)
CORS(app)

dist_path = path.join(path.dirname(__file__), "..", "client-dist")
mode = getenv("PROD", "0")

process = CrawlerProcess(settings={
    "LOG_LEVEL": mode == "1" and "ERROR" or "DEBUG"
})

def is_valid_url(url):
    try:
        result = urlparse(url)
        return result.scheme in ["http", "https"] and bool(result.netloc)
    except Exception:
        return False

def run_text_extract(url):
    output_file = f"text_{uuid4()}.json"

    result = subprocess.run(
        ["scrapy", "crawl", "text_extract", "-a", f"start_url={url}", "-o", output_file],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        return { "error": "Text Extract Spider failed" }
    
    with open(output_file) as f:
        data = json.load(f)
    
    remove(output_file)
    return data

def run_fetch_url(url):
    output_file = f"output_{uuid4()}.json"
    result = subprocess.run(
        ["scrapy", "crawl", "fetch_url", "-a", f"start_url={url}", "-o", output_file],
        capture_output=True,
        text=True
    )
    
    if result.returncode != 0:
        return { "error": "Fetch URL Spider failed" }
    
    with open(output_file) as f:
        data = json.load(f)
    
    remove(output_file)
    return data

async def get_ss(URLs):
    client = AsyncZyteAPI()
    async with client.session() as session:
        queries = [{
            "url": url,
            "screenshot": True,
            "screenshotOptions": { "fullPage": True }
        } for url in URLs]
        results = []
        for future in session.iter(queries):
            try:
                response = await future
                results.append(response)
            except RequestError as e:
                print(f"Request Error: {e}")
                return { "error": str(e) }
            except Exception as e:
                print(f"Error: {e}")
                return { "error": str(e) }
        return results

@app.route("/")
def serve_index():
    if mode == "0":
        return "Web Scraper Suite Backend is running on development mode."
    return send_from_directory(dist_path, "index.html")

@app.route("/livez", methods=["GET"])
def health():
    return jsonify({ "status": "OK" })

@app.route("/api/text", methods=["POST"])
def extract_text():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({ "error": "No URL Provided" }), 400
    
    if not is_valid_url(url):
        return jsonify({ "error": "Invalid URL" }), 400
    
    data = run_text_extract(url)
    if "error" in data:
        return jsonify(data), 500
    return jsonify(data)

@app.route("/api/screenshot", methods=["POST"])
def screenshot():
    data = request.get_json()
    start_url = data.get("url")

    if not start_url:
        return jsonify({ "error": "No URL Provided" }), 400

    if not is_valid_url(start_url):
        return jsonify({ "error": "Invalid URL" }), 400

    data = run_fetch_url(start_url)
    if "error" in data:
        return jsonify(data), 500
    
    extracted_urls = []

    for item in data:
        extracted_urls.extend(item.get("links", []))
    extracted_urls = list(set(extracted_urls))

    urls = [start_url] + extracted_urls
    n = data.get("n", len(urls))

    urls = urls[:n]
    
    results = asyncio.run(get_ss(urls))
    if "error" in results:
        return jsonify(results), 500
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)