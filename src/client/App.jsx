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
import Text from "./components/Text";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="game" element={<Game />} />
                    <Route path="ss" element={<Screenshot />} />
                    <Route path="text" element={<Text />} />
                </Route>
                <Route>
                    <Route path="*" element={<h2>404: Page Not Found</h2>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};