const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "🚀 HealthIntel backend is live and running smoothly!" });
});

// Example API route
app.get("/api/status", (req, res) => {
  res.json({
    service: "HealthIntel",
    status: "operational",
    timestamp: new Date().toISOString(),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ HealthIntel backend is running on port ${PORT}`);
});
