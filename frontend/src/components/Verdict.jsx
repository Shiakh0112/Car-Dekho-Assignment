
import { FaTrophy, FaRobot } from "react-icons/fa";

export default function Verdict({ verdict, winner }) {

  if (!verdict) return null;

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-7 text-white shadow-2xl shadow-blue-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="flex items-start gap-5 relative">
        <div className="bg-white/15 rounded-2xl p-3 flex-shrink-0">
          <FaRobot className="text-2xl text-white" />
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-1">
            CarSathi Recommendation
          </p>
          <h3 className="text-xl font-black mb-3">CarSathi's Verdict</h3>

          <p className="text-blue-100 text-sm leading-relaxed">{verdict}</p>

          <div className="mt-5 inline-flex items-center gap-2.5 bg-white/15 backdrop-blur border border-white/20 px-5 py-2.5 rounded-full">
            <FaTrophy className="text-amber-400" />
            <span className="font-black text-sm">{winner}</span>
            <span className="text-blue-300 text-xs">— Best Choice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
