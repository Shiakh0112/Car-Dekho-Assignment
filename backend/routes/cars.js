const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { filterCars, scoreCar } = require("../utils/filter");

const carsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/cars.json"), "utf-8"),
);

router.get("/", (req, res) => {
  res.json({ cars: carsData, total: carsData.length });
});

router.post("/filter", (req, res) => {
  const filters = req.body;

  if (!filters.budget || !filters.budget.max) {
    return res.status(400).json({ message: "Budget is required" });
  }

  const results = filterCars(carsData, filters);
  res.json({ cars: results, total: results.length });
});

router.post("/compare", (req, res) => {
  const { carIds, filters } = req.body;

  if (!carIds || carIds.length < 2) {
    return res.status(400).json({ message: "At least 2 cars required" });
  }

  // Sirf wo cars nikalo jinki IDs frontend ne bheji hain
  // EXPLANATION: carsData.filter() — 35 cars mein se sirf wo nikalo
  // jinki id carIds array mein hai
  // carIds.includes(c.id) — check karo kya ye id compare karne wali cars mein hai
  const selectedCars = carsData.filter((c) => carIds.includes(c.id));

  // Har car ko score karo — scoreCar() filter.js se aaya hai
  // EXPLANATION: .map() se har selectedCar ko score field ke saath return karo
  // ...car spread operator — car ke saare fields copy karo
  // filters ? scoreCar(...) : 0 — agar filters null ho toh score 0 rakho
  const scored = selectedCars.map((car) => ({
    ...car,
    score: filters ? scoreCar(car, filters) : 0,
  }));

  // reduce() se highest score wali car dhundho — wo winner hai
  // EXPLANATION: .reduce() array ko ek value mein compress karta hai
  // (a, b) => a.score > b.score ? a : b — do cars compare karo, zyada score wali rakho
  // pehle a=first car, b=second car — zyada score wali bachti hai
  // phir winner ko agle se compare karo — aakhir mein highest score wali bachti hai
  const winner = scored.reduce((a, b) => (a.score > b.score ? a : b));

  // EXPLANATION: generateVerdict() neeche defined hai
  // winner car aur filters leke English + Hindi verdict text banati hai
  // destructuring { verdict, verdictHindi } se dono strings nikal lete hain
  const { verdict } = generateVerdict(winner, filters);

  res.json({ cars: scored, winner: winner.name, verdict });
});
router.get("/:id", (req, res) => {
  const car = carsData.find((c) => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
});

const generateVerdict = (winner, filters) => {
  const reasons = [];
  const effectiveMileage =
    winner.fuelType === "Electric" ? winner.range / 20 : winner.mileage;

  if (filters && winner.price <= (filters.budget?.max || Infinity) * 0.8) {
    reasons.push("fits well within your budget");
  }

  if (effectiveMileage >= 20) {
    reasons.push(
      winner.fuelType === "Electric"
        ? `offers an excellent range of ${winner.range}km`
        : `delivers excellent mileage of ${winner.mileage} kmpl`,
    );
  }

  if (winner.safetyRating >= 4) {
    reasons.push(`has a strong safety rating of ${winner.safetyRating} stars`);
  }

  if (filters && winner.useCase?.includes(filters.useCase)) {
    reasons.push(`is ideal for ${filters.useCase} use`);
  }

  const reasonText =
    reasons.length > 0 ? reasons.join(", ") : "offers the best overall value";

  const verdict = `${winner.name} is the best choice for you because it ${reasonText}.`;

  return { verdict };
};

module.exports = router;
