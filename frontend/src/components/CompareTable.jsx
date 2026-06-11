
import { FaTrophy, FaCheck, FaRupeeSign, FaGasPump, FaUsers, FaShieldAlt, FaTag } from "react-icons/fa";
import { MdSpeed } from "react-icons/md";

export default function CompareTable({ cars, winner }) {

  const toLakhs = (p) => (p / 100000).toFixed(1);

  const rows = [
    {
      label: "Price", icon: <FaRupeeSign className="text-blue-500" />,
      getValue: (c) => `₹${toLakhs(c.price)}L`,
      getBest: () => cars.reduce((a, b) => (a.price < b.price ? a : b)).id, // lowest price = best
    },
    {
      label: "Mileage", icon: <MdSpeed className="text-green-500" />,
      getValue: (c) => c.fuelType === "Electric" ? `${c.range}km range` : `${c.mileage} kmpl`,
      getBest: () => {
        const eff = (c) => c.fuelType === "Electric" ? c.range / 20 : c.mileage;
        return cars.reduce((a, b) => (eff(a) > eff(b) ? a : b)).id; // highest = best
      },
    },
    {
      label: "Safety", icon: <FaShieldAlt className="text-red-500" />,
      getValue: (c) => `${c.safetyRating}/5 Stars`,
      getBest: () => cars.reduce((a, b) => (a.safetyRating > b.safetyRating ? a : b)).id,
    },
    {
      label: "Seating", icon: <FaUsers className="text-purple-500" />,
      getValue: (c) => `${c.seating} seats`,
      getBest: () => cars.reduce((a, b) => (a.seating > b.seating ? a : b)).id,
    },
    {
      label: "Fuel Type", icon: <FaGasPump className="text-yellow-500" />,
      getValue: (c) => c.fuelType,
      getBest: () => null, // Fuel type mein koi "best" nahi hota — preference based hai
    },
    {
      label: "Segment", icon: <FaTag className="text-indigo-500" />,
      getValue: (c) => c.segment,
      getBest: () => null, // Segment bhi preference based — highlight nahi karna
    },
  ];

  return (
    <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-100">
      <table className="w-full bg-white text-sm">

        <thead>
          <tr className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
            <th className="p-5 text-left text-xs font-bold uppercase tracking-wider text-blue-200 w-36">Feature</th>
            {cars.map((car) => (
              <th key={car.id} className="p-5 text-center">
                <p className="font-black text-base">{car.name}</p>
                <p className="text-xs text-blue-300 font-medium mt-0.5">{car.brand}</p>
                {car.name === winner && (
                  <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-black px-3 py-1 rounded-full mt-2">
                    <FaTrophy className="text-xs" /> Best Pick
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => {
            const bestId = row.getBest(); // is row mein best car ka id
            return (
              <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"} border-b border-gray-50 last:border-0`}>
                {/* Row label + icon */}
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    {row.icon}
                    <span className="font-semibold text-gray-600 text-xs uppercase tracking-wide">{row.label}</span>
                  </div>
                </td>
                {cars.map((car) => (
                  <td key={car.id}
                    className={`p-5 text-center font-bold transition-colors
                      ${bestId === car.id ? "bg-emerald-50 text-emerald-700" : "text-gray-800"}`}>
                    {row.getValue(car)}
                    {bestId === car.id && <FaCheck className="inline ml-1.5 text-emerald-500 text-xs" />}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
