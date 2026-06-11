# 🚗 CarSathi — Smart Car Finder & Comparator

CarSathi is a full-stack web application that helps users find, compare, and shortlist the best cars based on their budget, fuel type, seating capacity, and use case. It features an AI-powered verdict that recommends the best car after comparison.

---

## 🔗 Live URLs

| Service      | URL |
|--------------|-----|
| **Frontend** | [https://car-dekho-assignment-ecru.vercel.app](https://car-dekho-assignment-ecru.vercel.app) |
| **Backend**  | [https://car-dekho-assignment-4215.onrender.com](https://car-dekho-assignment-4215.onrender.com) |

---

## ✨ Features

- **Smart Filters** — Filter cars by budget range, fuel type, seating capacity, and use case (city / highway)
- **Side-by-Side Comparison** — Compare up to 3 cars across price, mileage, safety rating, seating, and segment
- **AI Verdict** — Automatically picks the best car based on your filters using a scoring algorithm
- **Shortlist** — Save favourite cars locally (stored in localStorage)
- **Responsive UI** — Mobile-friendly interface built with Tailwind CSS

---

## 🗂️ Project Structure

```
CarDekho/
├── backend/                  # Node.js + Express API
│   ├── data/
│   │   └── cars.json         # Car dataset (35 cars)
│   ├── routes/
│   │   └── cars.js           # Routes: filter, compare, AI verdict
│   ├── utils/
│   │   └── filter.js         # Scoring & filtering logic
│   ├── .env                  # Backend environment variables
│   └── index.js              # Express server entry point
│
└── frontend/                 # React + Vite + Tailwind CSS
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx          # Landing page with filter form
    │   │   ├── Results.jsx       # Filtered car grid
    │   │   ├── Compare.jsx       # Comparison table + AI verdict
    │   │   └── Shortlist.jsx     # Saved cars list
    │   └── components/
    │       ├── CarCard.jsx        # Individual car card
    │       ├── CompareBar.jsx     # Floating bar to start comparison
    │       ├── CompareTable.jsx   # Side-by-side comparison table
    │       ├── FilterForm.jsx     # Filter form (budget, fuel, seating, use case)
    │       └── Verdict.jsx        # AI recommendation card
    └── .env                   # Frontend environment variables
```

---

## ⚙️ Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS v3, React Router v7 |
| Backend   | Node.js, Express                                |
| Hosting   | Vercel (frontend), Render (backend)             |

---

## 🚀 Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Server runs at `http://localhost:3000`

Set up `backend/.env`:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

Set up `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint            | Description                              |
|--------|---------------------|------------------------------------------|
| `GET`  | `/api/cars`         | Get all cars                             |
| `POST` | `/api/cars/filter`  | Filter cars by budget, fuel, seating, use case |
| `POST` | `/api/cars/compare` | Compare selected cars + get AI verdict   |
| `GET`  | `/api/cars/:id`     | Get a single car by ID                   |
| `GET`  | `/health`           | Server health check                      |

---

## 🌍 Environment Variables

### `frontend/.env`

```env
VITE_API_URL=https://car-dekho-assignment-4215.onrender.com
```

### `backend/.env` (or Render dashboard → Environment)

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
```

---

## 👨‍💻 Author

Built as a company assignment project — CarDekho / GoViClass.
