
import { useNavigate } from "react-router-dom";
import { FaTimes, FaBalanceScale } from "react-icons/fa";

export default function CompareBar({ selectedCars, onRemove, filters }) {
  const navigate = useNavigate();


  if (selectedCars.length === 0) return null;

  const handleCompare = () => {

    localStorage.setItem("compareCarIds", JSON.stringify(selectedCars.map((c) => c.id)));
    localStorage.setItem("compareFilters", JSON.stringify(filters));
    navigate("/compare");
  };

  return (

    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-100 shadow-2xl px-6 py-4 flex items-center justify-between z-50">

      <div className="flex gap-2 items-center flex-wrap">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">Compare</span>
        {selectedCars.map((car) => (
          <div key={car.id} className="flex items-center bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5 gap-2">
            <span className="text-sm font-semibold text-blue-800">{car.name}</span>
            <button onClick={() => onRemove(car.id)}
              className="text-blue-300 hover:text-red-500 transition-colors">
              <FaTimes className="text-xs" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleCompare} disabled={selectedCars.length < 2}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200
          ${selectedCars.length >= 2
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 active:scale-95"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}>
        <FaBalanceScale />
        Compare ({selectedCars.length}/3)
      </button>
    </div>
  );
}
