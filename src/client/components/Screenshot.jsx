/**
 * © 2025 Puneet Gopinath. All rights reserved.
 * Filename: src/client/components/Screenshot.jsx
 * License: MIT (see LICENSE)
 */

import { useState, useEffect } from "react";
import { BsCoin } from "react-icons/bs";
import axios from "axios";

export default function Screenshot() {
    const [ coins, setCoins ] = useState(0);
    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);

    const coinsPerS = 200;

    useEffect(() => {
        const currentCoins = parseInt(localStorage.getItem("coins"));

        if (currentCoins) setCoins(currentCoins);
        else localStorage.setItem("coins", 0);
    }, []);

    const screenshot = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const n = document.getElementById("num").value;
        const url = document.getElementById("url").value;
        const reqCoins = n * coinsPerS;
        if (coins < reqCoins) {
            return alert(`Not enough coins! You need more ${reqCoins - coins} coins.`);
        }

        if (n > 5) {
            return alert("You can request a maximum of 5 screenshots at a time. This is to manage server load.")
        }

        try {
            const res = await axios.post("/api/screenshot", { n, url });

            setLoading(false);
            if (res.status === 200) {
                console.log(res.data);
                setData(res.data);
                console.log("[INFO] Screenshots Fetched");
                localStorage.setItem("coins", coins - reqCoins);
                setCoins(c => c - reqCoins);
            } else {
                if (res.status === 429)
                    return setError("Status 429. Too Many Requests. Please wait for a while.")
                setError(res.data.error);
                console.error("[ERROR] An error occurred while fetching data:", res.data.error);
                console.error(res);
            }
        } catch(err) {
            setError(err?.message || err);
            setLoading(false);
            console.error(`[ERROR] Unable to send request to server: ${err}, STATUS: ${err.status}`);
        }
    };
    return (
        <div className="main-container">
            <h2>Get Screenshots of multiple pages!</h2>
            {error && <span className="error">Error: {error}</span>}
            <p>Do you know, when you provide a URL, this Web Scraper provides you with not only the screenshot of that particular URL, but also with the screenshots of the links present in the provided URL</p>
            <p>Coins: {coins} <BsCoin /></p>
            {!data &&
                <form onSubmit={screenshot}>
                    <h5>NOTE: Rate limits are 2 requests per minute</h5>
                    <input type="url" id="url" required placeholder="Enter URL" />
                    <br />
                    <label for="num"><small>Note: The more number of screenshots, the greater time it consumes. 1 screenshot consumes about 30 seconds</small></label>
                    <input type="number" id="num" required placeholder="Number of screenshots" />
                    <br />
                    <button type="submit" className="btn" disabled={loading}>Get Screenshots!</button>
                </form>
            }
            <div className="screenshot-container">
                {data && data.map((item, index) => {
                    const src = `data:image/jpeg;base64,${item.screenshot}`;
                    return (<div key={index} className="screenshot-item">
                        <img src={src} alt={`Screenshot of ${item.url}`} />
                        <a className="btn" href={src} download={`screenshot_${item.url}.jpeg`}>Download Image</a>
                    </div>);
                })}
            </div>
        </div>
    );
};
