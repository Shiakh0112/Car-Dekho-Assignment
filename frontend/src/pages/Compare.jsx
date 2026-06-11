import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompareTable from "../components/CompareTable";
import Verdict from "../components/Verdict";
import {
  FaArrowLeft,
  FaBalanceScale,
  FaSearch,
  FaCar,
  FaBookmark,
  FaCheck,
} from "react-icons/fa";

const API =
  import.meta.env.VITE_API_URL ||
  "https://car-dekho-assignment-4215.onrender.com";

export default function Compare() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [savedIds, setSavedIds] = useState(() => {
    const s = JSON.parse(localStorage.getItem("shortlist") || "[]");
    return s.map((c) => c.id);
  });

  const saveToShortlist = (car) => {
    const current = JSON.parse(localStorage.getItem("shortlist") || "[]");
    if (current.find((c) => c.id === car.id)) return;
    const updated = [...current, car];
    localStorage.setItem("shortlist", JSON.stringify(updated));
    setSavedIds(updated.map((c) => c.id)); // UI instantly update ho jaaye
  };

  useEffect(() => {
    const carIds = JSON.parse(localStorage.getItem("compareCarIds") || "[]");
    const filters = JSON.parse(
      localStorage.getItem("compareFilters") || "null",
    );

    if (carIds.length < 2) {
      navigate("/");
      return;
    }
    fetch(`${API}/api/cars/compare`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carIds, filters }),
    })
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
            <FaBalanceScale className="text-white text-xl" />
          </div>
          <p className="text-blue-700 font-bold text-lg">Comparing cars...</p>
          <p className="text-gray-400 text-sm mt-1">Just a moment</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <p className="text-red-600 font-bold text-lg mb-3">
            Comparison failed
          </p>
          <p className="text-gray-400 text-sm mb-5">
            Could not connect to the server. Please try again.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Sticky Navbar — back to results, title, shortlist badge */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
        <button
          onClick={() => navigate("/results")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold text-sm transition-colors"
        >
          <FaArrowLeft className="text-xs" /> Results
        </button>
        <div className="flex items-center gap-2">
          <FaBalanceScale className="text-blue-600" />
          <span className="font-black text-gray-900">Comparison</span>
        </div>
        {/* Shortlist badge — saved cars count */}
        <button
          onClick={() => navigate("/shortlist")}
          className="relative flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <FaBookmark />
          {savedIds.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {savedIds.length}
            </span>
          )}
        </button>
      </div>

      <div className="px-4 py-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-gray-900">Car Comparison</h2>
          <p className="text-gray-400 text-sm mt-1">
            The best option is highlighted for each category
          </p>
        </div>
        {data && <CompareTable cars={data.cars} winner={data.winner} />}

        {data && <Verdict verdict={data.verdict} winner={data.winner} />}

        {data && (
          <div className="mt-6 bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <p className="text-sm font-bold text-gray-700 mb-3">
              Save cars to your shortlist
            </p>
            <div className="flex flex-wrap gap-3">
              {data.cars.map((car) => (
                <button
                  key={car.id}
                  onClick={() => saveToShortlist(car)}
                  disabled={savedIds.includes(car.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200
                    ${
                      savedIds.includes(car.id)
                        ? "bg-green-50 border-green-200 text-green-700 cursor-default"
                        : "bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                    }`}
                >
                  {savedIds.includes(car.id) ? (
                    <>
                      <FaCheck className="text-xs" /> {car.name} Saved
                    </>
                  ) : (
                    <>
                      <FaBookmark className="text-xs" /> {car.name}
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            <FaSearch className="text-xs" /> New Search
          </button>
          <button
            onClick={() => navigate("/results")}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-7 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
          >
            <FaCar className="text-xs" /> Back to Results
          </button>
        </div>
      </div>
    </div>
  );
}
