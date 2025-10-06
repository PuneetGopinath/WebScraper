/**
 * © 2025 Puneet Gopinath. All rights reserved.
 * Filename: src/client/components/Home.jsx
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

export default function Home() {
    return (
        <>
            <h5>What is the use of Web Scraper?</h5>
            <p>
                Web scraping extracts large amounts of unstructured website data (HTML) from websites and converts it into a structured format (Excel, CSV, JSON, etc.) for easier analysis and processing. It is widely used for various purposes such as market research, price comparison, sentiment analysis, lead generation, and more.
            </p>
            <br />
            <h5>Why use Web Scraper Suite?</h5>
            <p>
                Web Scraper Suite simplifies scraping with intuitive interface and essential features, designed for all kinds of users.
            </p>
            <br />
            <h5>Current MVP Features</h5>
            <p>
                This MVP enables screenshot capture and text extraction from web pages. To avoid rate limiting, a game lets users earn coins which they spend on scraping features.
            </p>
            <br />
            <h2>PLEASE DON'T PLAY TOO MUCH WITH THE TOOLS, I HAVE JUST 5$ FREE CREDITS IN ZYTE API</h2>

            <p>But to use this, I've developed a clicker game that allows users to get coins and then spend them on using the features of the web scraper.<br />This step is taken to avoid rate limiting issues if users try to mass scrape pages.</p>
            <br />
            <Link to="/game" className="btn">Start earning coins!</Link>
            <Link to="/ss" className="btn">Get screenshots!</Link>
            <Link to="/text" className="btn">Extract text!</Link>
        </>
    );
};