import scrapy
from urllib.parse import urlparse

class TextExtractSpider(scrapy.Spider):
    name = "text_extract"

    start_urls = []

    def __init__(self, start_url=None, *args, **kwargs):
        super(TextExtractSpider, self).__init__(*args, **kwargs)

        if start_url:
            self.start_urls = [start_url]
        else:
            raise ValueError("A start_url must be provided.")

    def parse(self, response):
        texts = response.xpath("//body//*[not(self::script or self::style)]//text()").getall()
        content = " ".join(t.strip() for t in texts if t.strip())

        yield {
            "url": response.url,
            "content": content
        }
