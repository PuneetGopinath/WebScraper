/**
 * © 2025 Puneet Gopinath. All rights reserved.
 * Filename: src/client/components/Screenshot.jsx
 * License: MIT (see LICENSE)
 */

import { useState } from "react";
import { BsCoin } from "react-icons/bs";
import axios from "axios";

export default function Screenshot() {
    const [ coins, setCoins ] = useState(0);
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const currentCoins = parseInt(localStorage.getItem("coins"));

        if (currentCoins) setCoins(currentCoins);
        else localStorage.setItem("coins", 0);
    }, []);

    const screenshot = async (n, url) => {
        const reqCoins = n * 50;
        if (coins < reqCoins) {
            return alert("Not enough coins!");
        }

        try {
            const res = await axios.post("/api/screenshot", { n, url });

            if (res.status === 200) {
                setData(res.data);
                console.log("[INFO] Screnshots Fetched");
                localStorage.setItem("coins", coins - reqCoins);
                setCoins(c => c - reqCoins);
            } else {
                setError(res.data.error);
                console.error("[ERROR] An error occurred while fetching data:", res.data.error);
            }
        } catch(e) {
            setError(e);
            console.error("[ERROR] Unable to send request to server:", e)
        }
    };
    return (
        <>
            <h1>Get Screenshots of multiple pages!</h1>
            <p>Do you know, when you provide a URL, this Web Scraper provides you with not only the screenshot of that particular URL, but also with the screenshots of the links present in the provided URL</p>
            <p>Current Coins: {coins} <BsCoin /></p>
            <br />
            {error && <span>Error: {error}</span>}
            {!data &&
                <>
                <input type="text" id="url" required placeholder="Enter URL" />
                <input type="number" id="num" required placeholder="Number of screenshots" />
                <button onClick={() => screenshot(document.getElementById("num").value, document.getElementById("url").value)}>Get Screenshots!</button>
                </>
            }
            {data && data.map((item, index) => (
                <div key={index}>
                    <img src={`data:image/png;base64,${item.screenshot}`} alt="Screenshot" />
                </div>
            ))}
            <p>(Note: This is a simple MVP. Your coins will reset if you clear browser data.)</p>
        </>
    );
};
