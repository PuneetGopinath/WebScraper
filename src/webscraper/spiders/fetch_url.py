import scrapy
from urllib.parse import urljoin, urlparse

class FetchUrlSpider(scrapy.Spider):
    name = "fetch_url"

    start_urls = []

    def __init__(self, start_url=None, *args, **kwargs):
        super(FetchUrlSpider, self).__init__(*args, **kwargs)
        if start_url:
            self.start_urls = [start_url]
        else:
            raise ValueError("A start_url must be provided.")

    def parse(self, response):
        links = response.css("a::attr(href)").getall()
        absolute_links = []

        for link in links:
            if not link:
                continue

            abs_link = urljoin(response.url, link) # If link is already absolute, urljoin returns the same link
            parsed_link = urlparse(abs_link)
            if parsed_link.scheme in ["http", "https"]:
                absolute_links.append(abs_link)
        
        absolute_links = list(set(absolute_links))

        yield {"source_url": response.url, "links": absolute_links}
