import { Link } from "react-router";

export default function Home() {
    return (
        <>
            <h1>Web Scraper Suite</h1>
            <h5>What is the use of Web Scraper?</h5>
            <p>
                Web scraping is a technique used to extract large amounts of data from websites where the data is unstructured (HTML format) and convert it into a structured format (Excel, CSV, JSON, etc.) for easier analysis and processing. It is commonly used for various purposes such as market research, price comparison, sentiment analysis, lead generation, and more.
            </p>
            <h5>Why use Web Scraper Suite?</h5>
            <p>
                Web Scraper Suite is a comprehensive tool designed to simplify the web scraping process. It offers an intuitive interface that allows users to easily create and manage scraping tasks without requiring extensive programming knowledge. The suite includes features such as scheduling, data export options, and support for various data formats, making it a versatile solution for both beginners and experienced users.
            </p>
            <h5>Using the MVP that I've built, we can only take screenshot of pages and extract text content.</h5>
            <p>But to use this, I've developed a clicker game that allows users to get coins and then spend them on using the features of the web scraper.<br />This step is taken to avoid rate limiting issues if users try to mass scrape pages.</p>
            <Link to="/game" className="btn">Get coins!</Link>
        </>
    );
};