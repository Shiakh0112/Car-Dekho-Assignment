
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Shortlist() {
  const navigate = useNavigate();

  const [cars, setCars] = useState(() =>
    JSON.parse(localStorage.getItem("shortlist") || "[]")
  );

 const handleRemove = (id) => {
    const updated = cars.filter((c) => c.id !== id);
    setCars(updated);
    localStorage.setItem("shortlist", JSON.stringify(updated));
  };

  const toLakhs = (p) => (p / 100000).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50">

     <div className="bg-white shadow-sm px-6 py-4 flex items-center gap-4 border-b">
        <button onClick={() => navigate(-1)}
          className="text-blue-600 font-semibold text-sm">
          Back
        </button>
        <h1 className="font-black text-gray-900 text-lg">My Shortlist</h1>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto">

         {cars.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-gray-700 font-bold text-xl mb-2">
              No cars saved yet
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Compare cars and save them to your shortlist
            </p>
            <button onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl
                font-bold text-sm hover:bg-blue-700 transition-all">
              Find Cars
            </button>
          </div>
        ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cars.map((car) => (
              <div key={car.id}
                className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">

                {/* Car image */}
                <img src={car.image} alt={car.name}
                  className="w-full h-32 object-cover rounded-xl mb-4" />

                {/* Name + brand */}
                <h3 className="font-black text-gray-900">{car.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{car.brand}</p>

                {/* Price */}
                <p className="text-xl font-black text-blue-700 mb-4">
                  Rs.{toLakhs(car.price)}L
                </p>

              <button onClick={() => handleRemove(car.id)}
                  className="w-full py-2 rounded-xl text-sm font-bold
                    border-2 border-red-200 text-red-500
                    hover:bg-red-50 transition-all">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

      {cars.length > 0 && (
          <div className="mt-8 text-center">
            <button onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white
                px-8 py-3 rounded-2xl font-bold text-sm transition-all">
              New Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
