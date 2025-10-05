import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BsCoin } from "react-icons/bs";

export default function Game() {
    const [ coins, setCoins ] = useState(0);
    useEffect(() => {
        const storedCoins = localStorage.getItem("coins") || 0;
        if (storedCoins) setCoins(parseInt(storedCoins));
        else localStorage.setItem("coins", 0);
    }, []);

    const handleClick = () => {
        const currentCoins = parseInt(localStorage.getItem("coins"));
        localStorage.setItem("coins", currentCoins + 1);
        setCoins(currentCoins + 1);
    };

    return (
        <>
            <h1>Simple Clicker Game</h1>
            <h5>Click the button to earn coins!</h5>
            <button onClick={handleClick}>Click me!</button>
            <p>You can use the coins you earn to access web scraping features.</p>
            <p>Current Coins: {coins} <BsCoin /></p>
            <p>(Note: This is a simple MVP. Your coins will reset if you clear browser data.)</p>
            <h5>50 coins per screenshot you want to get.</h5>
            <Link to="/ss" className="btn">Get Screenshots!</Link>
        </>
    );
};