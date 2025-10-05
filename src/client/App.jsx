/**
 * © 2025 Puneet Gopinath. All rights reserved.
 * Filename: src/client/App.jsx
 * License: MIT (see LICENSE)
 */

import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Game from "./components/Game";
import Screenshot from "./components/Screenshot";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="game" element={<Game />} />
                    <Route path="ss" element={<Screenshot />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};