const scoreCar = (car, filters) => {
  let score = 0;

  if (car.price <= (filters.budget?.max || Infinity) * 0.8) score += 30;
  else if (car.price <= (filters.budget?.max || Infinity)) score += 15;

  const effectiveMileage =
    car.fuelType === "Electric" ? car.range / 20 : car.mileage;
  if (effectiveMileage >= 20) score += 25;
  else if (effectiveMileage >= 15) score += 10;
  if (car.safetyRating >= 4) score += 25;
  else if (car.safetyRating >= 3) score += 10;

  if (car.useCase.includes(filters.useCase)) score += 20;

  return score;
};

const filterCars = (cars, filters) => {
  const filtered = cars.filter((car) => {
    const withinBudget =
      car.price >= filters.budget.min && car.price <= filters.budget.max;

    const fuelMatch =
      !filters.fuelType ||
      filters.fuelType === "Any" ||
      car.fuelType === filters.fuelType;
    const seatingMatch = !filters.seating || car.seating >= filters.seating;
    return withinBudget && fuelMatch && seatingMatch;
  });

  const scored = filtered.map((car) => ({
    ...car,
    score: scoreCar(car, filters),
  }));

  return scored.sort((a, b) => b.score - a.score);
};

module.exports = { filterCars, scoreCar };
