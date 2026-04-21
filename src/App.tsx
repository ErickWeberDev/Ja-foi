"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Stopwatch } from "./Stopwatch";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
