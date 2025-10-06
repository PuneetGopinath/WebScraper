# Web Scraper Suite

A tool designed to automatically extract data from multiple websites and manage that data. This is the first time I'm designing a web scraper.

It was a frightful experience at the end, I started feeling as if I would lose the chance to get the 650$ grant from Siege as the deadline was coming closer.

## Features

- Extract Text Content from Websites
- Capture full-page screenshots using Zyte's screenshot API.
- Take screenshots of a web page and other pages linked in that particular page.
- CORS is enabled for better security

## Tech Stack
- Backend: Python, Flask, Scrapy, Zyte API
- Frontend: React.JS

## API Endpoints

### Screenshot Endpoint
URL: `/api/screenshot`
Method: POST
Body: `{ "url": "<website-to-screenshot>", "n": "no of other urls to screenshot, optional" }`
Response: JSON Array of objects which have the base64 encoded image

### Text Extraction
URL: `/api/text`
Method: POST
Body: `{ "url": "<website-to-extract-text-from>" }`
Response: JSON Array of objects. Objects have fields `url` and `content` where `content` contains the text extract of `url`.

## License

MIT License

## Contributing
Feel free to open issues or submit pull request to improve features or fix bugs.