
import { useState } from "react";
import { FaRupeeSign, FaGasPump, FaUsers, FaRoad, FaSearch } from "react-icons/fa";

export default function FilterForm({ onSubmit }) {

  const [budget, setBudget] = useState(1500000);  // default 15 lakh
  const [fuelType, setFuelType] = useState("Any");
  const [seating, setSeating] = useState(5);
  const [useCase, setUseCase] = useState("city");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ budget: { min: 300000, max: budget }, fuelType, seating, useCase });
  };

  const toLakhs = (val) => (val / 100000).toFixed(0);

  const fuelOptions = ["Any", "Petrol", "Diesel", "Electric", "Hybrid"];
  const seatingOptions = [4, 5, 6, 7];
  const useCaseOptions = ["city", "highway", "both"];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl mx-auto border border-gray-100">

      <div className="mb-7">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          <FaRupeeSign className="text-blue-500" />
          Budget
        </label>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-3xl font-black text-gray-900">₹{toLakhs(budget)}</span>
          <span className="text-sm text-gray-400 font-medium">Lakh</span>
        </div>
        <div className="relative">
          <input
            type="range" min={300000} max={3500000} step={100000}
            value={budget} onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-blue-600 bg-gray-200"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>₹3L</span><span>₹35L</span>
          </div>
        </div>
      </div>

      <div className="mb-7">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          <FaGasPump className="text-blue-500" />
          Fuel Type
        </label>
        <div className="flex flex-wrap gap-2">
          {fuelOptions.map((f) => (
            <button key={f} type="button" onClick={() => setFuelType(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200
                ${fuelType === f
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          <FaUsers className="text-blue-500" />
          Minimum Seating
        </label>
        <div className="flex gap-3">
          {seatingOptions.map((s) => (
            <button key={s} type="button" onClick={() => setSeating(s)}
              className={`w-14 h-14 rounded-2xl text-base font-bold border-2 transition-all duration-200
                ${seating === s
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          <FaRoad className="text-blue-500" />
          Use Case
        </label>
        <div className="flex gap-2">
          {useCaseOptions.map((u) => (
            <button key={u} type="button" onClick={() => setUseCase(u)}
              className={`flex-1 py-3 rounded-2xl text-sm font-semibold border-2 capitalize transition-all duration-200
                ${useCase === u
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                }`}>
              {u}
            </button>
          ))}
        </div>
      </div>

      <button type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-4 rounded-2xl text-base transition-all duration-200 shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
        <FaSearch />
        Find My Car
      </button>
    </form>
  );
}
