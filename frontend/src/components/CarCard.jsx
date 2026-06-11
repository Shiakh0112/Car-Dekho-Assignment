
import { FaStar, FaRegStar, FaPlus, FaCheck, FaGasPump, FaUsers, FaBolt } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";


export default function CarCard({ car, onCompare, isSelected }) {

  const toLakhs = (p) => (p / 100000).toFixed(1);


  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => {
      if (i < rating) return <FaStar key={i} className="text-amber-400" />;
      return <FaRegStar key={i} className="text-gray-300" />;
    });

  return (

    <div className={`bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${isSelected ? "border-blue-500" : "border-transparent"}`}>

      {/* Car Image + Segment Badge */}
      <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
        {/* Segment badge — top left corner pe */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold text-gray-600 px-3 py-1 rounded-full shadow-sm">
          {car.segment}
        </span>

        {isSelected && (
          <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Selected
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Car Name + Brand */}
        <div className="mb-4">
          <h3 className="text-lg font-black text-gray-900 leading-tight">{car.name}</h3>
          <p className="text-sm text-gray-400 font-medium">{car.brand}</p>
        </div>

        {/* Price — sabse prominent element, buyer ki pehli zaroorat */}
        <div className="mb-4">
          <span className="text-2xl font-black text-blue-700">₹{toLakhs(car.price)}L</span>
          <span className="text-xs text-gray-400 ml-1">ex-showroom</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center bg-slate-50 rounded-2xl py-3 gap-1">
            {car.fuelType === "Electric"
              ? <FaBolt className="text-yellow-500 text-base" />
              : <FaGasPump className="text-blue-500 text-base" />}
            <span className="text-xs font-bold text-gray-700">
              {car.fuelType === "Electric" ? `${car.range}km` : `${car.mileage}kpl`}
            </span>
            <span className="text-[10px] text-gray-400">{car.fuelType === "Electric" ? "Range" : "Mileage"}</span>
          </div>
          <div className="flex flex-col items-center bg-slate-50 rounded-2xl py-3 gap-1">
            <FaUsers className="text-purple-500 text-base" />
            <span className="text-xs font-bold text-gray-700">{car.seating}</span>
            <span className="text-[10px] text-gray-400">Seats</span>
          </div>
          <div className="flex flex-col items-center bg-slate-50 rounded-2xl py-3 gap-1">
            <MdSpeed className="text-green-500 text-lg" />
            <span className="text-xs font-bold text-gray-700">{car.fuelType}</span>
            <span className="text-[10px] text-gray-400">Fuel</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <div className="flex gap-0.5">{renderStars(car.safetyRating)}</div>
          <span className="text-xs text-gray-400 ml-1">Safety</span>
        </div>

        <button onClick={() => onCompare(car)} disabled={isSelected}
          className={`w-full py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2
            ${isSelected
              ? "bg-blue-50 text-blue-700 border-2 border-blue-200 cursor-default"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md shadow-blue-200"
            }`}>
          {isSelected ? <><FaCheck className="text-xs" /> Added to Compare</> : <><FaPlus className="text-xs" /> Add to Compare</>}
        </button>
      </div>
    </div>
  );
}
