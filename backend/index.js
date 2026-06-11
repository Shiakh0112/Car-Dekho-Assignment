require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const allowedOrigins = FRONTEND_URL.split(",").map((u) => u.trim());

app.use(
  cors({
    origin: (origin, callback) =>
      !origin || allowedOrigins.includes(origin)
        ? callback(null, true)
        : callback(new Error("cors backend")),
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());

const carRoutes = require("./routes/cars");
app.use("/api/cars", carRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "carSathi Backend running perfact" });
});
app.listen(PORT, () => {
  console.log(`carSathi backend running on port http://localhost:${PORT}`);
});
