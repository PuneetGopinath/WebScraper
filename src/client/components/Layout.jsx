/**
 * © 2025 Puneet Gopinath. All rights reserved.
 * Filename: src/client/components/Layout.jsx
 * License: MIT (see LICENSE)
 */

import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <header>
                <h1>Web Scraper Suite</h1>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>Puneet Gopinath &copy; 2025</p>
                <p>Credits to font-awesome as we have used their icons to display the symbol for coins.</p>
            </footer>
        </>
    );
};