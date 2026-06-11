import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Compare from "./pages/Compare";
import Shortlist from "./pages/Shortlist";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/shortlist" element={<Shortlist />} />
      </Routes>
    </BrowserRouter>
  );
}
