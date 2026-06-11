
import { useNavigate } from "react-router-dom";
import FilterForm from "../components/FilterForm";
import { FaCar, FaShieldAlt, FaChartBar, FaBookmark } from "react-icons/fa";

export default function Home() {
 const navigate = useNavigate();

const shortlistCount = JSON.parse(localStorage.getItem("shortlist") || "[]").length;
 const handleFilterSubmit = (filters) => {
    localStorage.setItem("carFilters", JSON.stringify(filters));
    navigate("/results");
  };

 const features = [
    { icon: <FaCar className="text-blue-600 text-xl" />, text: "Smart Filters" },
    { icon: <FaChartBar className="text-blue-600 text-xl" />, text: "Side-by-Side Compare" },
    { icon: <FaShieldAlt className="text-blue-600 text-xl" />, text: "AI Verdict" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* Navbar — logo + shortlist button */}
      <nav className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
            <FaCar className="text-white text-sm" />
          </div>
          <span className="font-black text-xl text-gray-900">CarSathi</span>
        </div>
      <button onClick={() => navigate("/shortlist")} className="relative flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
          <FaBookmark />
          Shortlist
          {shortlistCount > 0 && (
            <span className="bg-blue-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {shortlistCount}
            </span>
          )}
        </button>
      </nav>

      {/* Hero Section — headline + feature pills */}
      <div className="text-center pt-10 pb-12 px-4">
        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
          India's Smartest Car Finder
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
          Find your perfect car<br />
          <span className="text-blue-600">in under 2 minutes</span>
        </h1>
        <p className="text-gray-500 text-base max-w-md mx-auto mb-8">
          From confused to confident — shortlist the best cars based on your budget, fuel type, and use case
        </p>
<div className="flex items-center justify-center gap-4 flex-wrap mb-12">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-full text-sm text-gray-600 font-medium">
              {f.icon} {f.text}
            </div>
          ))}
        </div>
      </div>

 <div className="px-4 pb-24">
        <FilterForm onSubmit={handleFilterSubmit} />
      </div>
    </div>
  );
}
