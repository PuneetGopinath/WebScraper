/**
 * © 2025 Puneet Gopinath. All rights reserved.
 * Filename: src/client/components/Layout.jsx
 * License: MIT (see LICENSE)
 */

import { Outlet, Link } from "react-router";

export default function Layout() {
    return (
        <>
            <header className="header">
                <div className="brand">
                    <Link to="/" className="logo"><h1>Web Scraper Suite</h1></Link>
                </div>
                <div className="nav-links">
                    <Link to="/game">Earn Coins</Link>
                    <Link to="/ss">Screenshots</Link>
                    <Link to="/text">Text Extraction</Link>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Puneet Gopinath</p>
                <p>Note: This is a simple MVP. Your coins will reset if you clear browser data.</p>
                <p>Credits to bootstrap-icons as we have used their icons to display the symbol for coins.</p>
            </footer>
        </>
    );
};