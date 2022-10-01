import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import County from "./router/County";
import Home from "./router/Home";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/county/:id" element={<County />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
