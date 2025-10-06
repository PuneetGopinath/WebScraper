/**
 * © 2025 Puneet Gopinath. All rights reserved.
 * Filename: src/client/components/Text.jsx
 * License: MIT (see LICENSE)
 */

import { useState, useEffect } from "react";
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
            setError(err);
            console.error("[ERROR] Unable to send request to server:", err);
        }
    };

    return (
        <>
            <h2>Extract Text from Web Pages</h2>
            <p>{error && <span>Error: {error}</span>}</p>
            <p>Coins: {coins} <BsCoin /></p>
            <br />
            {!data &&
                <form>
                    <h5>NOTE: Rate limits are 10 requests per minute</h5>
                    <input type="url" id="url" required placeholder />
                    <button onClick={extract}>Extract Text</button>
                </form>
            }
            {data && data.map((item, index) => (
                <div key={index}>{item.text}</div>
            ))}
            <p>(Note: This is a simple MVP. Your coins will reset if you clear browser data.)</p>
        </>
    );
};