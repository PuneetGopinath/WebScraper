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
            <br />
            <h5>Current Coins: {coins} <BsCoin /></h5>
            <p>(Note: This is a simple MVP. Your coins will reset if you clear browser data.)</p>
            <h5>200 coins per screenshot.</h5>
            <h5>100 coins per text extraction.</h5>
            <Link to="/ss" className="btn">Get Screenshots!</Link>
            <Link to="/text" className="btn">Extract Text!</Link>
        </>
    );
};