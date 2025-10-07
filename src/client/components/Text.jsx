/**
 * © 2025 Puneet Gopinath. All rights reserved.
 * Filename: src/client/components/Text.jsx
 * License: MIT (see LICENSE)
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { BsCoin } from "react-icons/bs";

export default function Text() {
    const [ coins, setCoins ] = useState(0);
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);

    const coinsPerE = 100;

    useEffect(() => {
        const currentCoins = parseInt(localStorage.getItem("coins"));

        if (currentCoins) setCoins(currentCoins);
        else localStorage.setItem("coins", 0);
    }, []);

    const extract = async (e) => {
        e.preventDefault();
        setError(null);
        
        const url = document.getElementById("url").value;
        const reqCoins = coinsPerE;
        if (coins < reqCoins) {
            return alert(`Not enough coins! You need more ${reqCoins - coins} coins`);
        }

        try {
            const res = await axios.post("/api/text", { url });

            if (res.status === 200) {
                setData(res.data);
                console.log("[INFO] Text Extraction complete.");
                localStorage.setItem("coins", coins - reqCoins);
                setCoins(c => c - reqCoins);
            } else {
                if (res.status === 429)
                    return setError("Status 429. Too Many Requests. Please wait for a while");
                setError(res.data.error);
                console.error("[ERROR] An error occurred while fetching data:", res.data.error);
            }
        } catch(err) {
            setError(err?.message || err);
            console.error("[ERROR] Unable to send request to server:", err);
        }
    };

    return (
        <div className="main-container">
            <h2>Extract Text from Web Pages</h2>
            <p>{error && <span className="error">Error: {error}</span>}</p>
            <p>Coins: {coins} <BsCoin /></p>
            <br />
            {!data &&
                <form onSubmit={extract}>
                    <h5>NOTE: Rate limits are 10 requests per minute</h5>
                    <input type="url" id="url" required placeholder="Enter URL" />
                    <br />
                    <button type="submit" className="btn">Extract Text</button>
                </form>
            }
            {data && <div className="text-container">
                {data.map((item, index) => (
                    <span key={index}>{item.content}</span>
                ))}
            </div>}
        </div>
    );
};