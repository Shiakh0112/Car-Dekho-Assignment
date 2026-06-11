
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import CompareBar from "../components/CompareBar";
import { FaArrowLeft, FaCar, FaSearch, FaFilter, FaBookmark } from "react-icons/fa";
import { MdSearchOff } from "react-icons/md";

const API = import.meta.env.VITE_API_URL || "https://car-dekho-assignment-4215.onrender.com";

export default function Results() {
  const navigate = useNavigate();
 const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(null);
  const [selectedCars, setSelectedCars] = useState([]);
  const shortlistCount = JSON.parse(localStorage.getItem("shortlist") || "[]").length;

useEffect(() => {
  const saved = localStorage.getItem("carFilters");
    if (!saved) { navigate("/"); return; }

    const parsedFilters = JSON.parse(saved);
    setFilters(parsedFilters);

   fetch(`${API}/api/cars/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedFilters),
    })
      .then((r) => r.json())
      .then((data) => { setCars(data.cars || []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

 const handleCompare = (car) => {
    if (selectedCars.find((c) => c.id === car.id) || selectedCars.length >= 3) return;
    setSelectedCars([...selectedCars, car]);
  };

  const handleRemove = (id) => setSelectedCars(selectedCars.filter((c) => c.id !== id));

 const toLakhs = (v) => (v / 100000).toFixed(0);
 if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
          <FaSearch className="text-white text-xl" />
        </div>
        <p className="text-blue-700 font-bold text-lg">Finding the best cars for you...</p>
        <p className="text-gray-400 text-sm mt-1">Just a moment</p>
      </div>
    </div>
  );

if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <p className="text-red-600 font-bold text-lg mb-3">Failed to load cars</p>
        <p className="text-gray-400 text-sm mb-5">Could not connect to the server. Please try again.</p>
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-700">
          Go Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-32">

   <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold text-sm transition-colors">
          <FaArrowLeft className="text-xs" /> Back
        </button>
        <div className="flex items-center gap-2">
          <FaCar className="text-blue-600" />
          <span className="font-black text-gray-900">CarSathi</span>
        </div>
        <button onClick={() => navigate("/shortlist")} className="relative flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors text-sm font-semibold">
          <FaBookmark />
          {shortlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {shortlistCount}
            </span>
          )}
        </button>
      </div>
{filters && (
        <div className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FaFilter className="text-blue-500 text-xs" />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Filters</p>
              </div>
              <p className="text-sm font-semibold text-gray-700">
                ₹{toLakhs(filters.budget.min)}L – ₹{toLakhs(filters.budget.max)}L
                {filters.fuelType !== "Any" && ` · ${filters.fuelType}`}
                {` · ${filters.seating}+ Seats · ${filters.useCase}`}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-700">{cars.length}</span>
              <p className="text-xs text-gray-400">cars found</p>
            </div>
          </div>
        </div>
      )}

      <div className="px-6 py-8 max-w-6xl mx-auto">
        {cars.length === 0 ? (
          // Empty state — koi car match nahi ki filters se
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <MdSearchOff className="text-gray-400 text-3xl" />
            </div>
            <p className="text-gray-700 font-bold text-xl mb-2">No cars found</p>
            <p className="text-gray-400 text-sm mb-6">Try adjusting your filters for more results</p>
            <button onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95">
              Change Filters
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onCompare={handleCompare}
                isSelected={!!selectedCars.find((c) => c.id === car.id)}
              />
            ))}
          </div>
        )}
      </div>

    <CompareBar selectedCars={selectedCars} onRemove={handleRemove} filters={filters} />
    </div>
  );
}
