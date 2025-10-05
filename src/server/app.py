from os import path, getenv
from urllib import urlparse
import asyncio

from zyte_api import AsyncZyteAPI
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from dotenv import load_dotenv
from scrapy.crawler import CrawlerProcess
from ..webscraper.spiders import FetchUrlSpider

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

@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify({"message": "Hello from Python!"})

@app.route("/api/screenshot", methods=["POST"])
def screenshot():
    data = request.get_json()
    start_url=data.get("url")

    if not start_url:
        return jsonify({ "error": "No URL Provided" }), 400

    if not is_valid_url(start_url):
        return jsonify({ "error": "Invalid URL" }), 400
    
    scraped_items = []

    def collect_urls(item, response, spider):
        scraped_items.append(item)
    
    process.signals.connect(collect_urls, process.signals.item_scraped)

    process.crawl(FetchUrlSpider, start_url=start_url)
    process.start()

    extracted_urls = []
    for item in scraped_items:
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