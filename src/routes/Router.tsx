import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import County from "./County";
import Home from "./Home";

function Router() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/county/:id" element={<County />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
