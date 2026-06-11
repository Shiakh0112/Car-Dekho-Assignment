require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const carRoutes = require("./routes/cars");
app.use("/api/cars", carRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "carSathi Backend running perfact" });
});
app.listen(PORT, () => {
  console.log(`carSathi backend running on port http://localhost:${PORT}`);
});
