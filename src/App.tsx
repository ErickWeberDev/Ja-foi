"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Stopwatch } from "./page/Stopwatch";
import { StudyCycle } from "./page/StudyCycle";
import { Journal } from "./page/Journal";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/study-cycle" element={<StudyCycle />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
