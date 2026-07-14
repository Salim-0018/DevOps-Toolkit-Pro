require("dotenv").config();

const prometheusRoutes = require("./routes/prometheusRoutes");
const jenkinsRoutes = require("./routes/jenkinsRoutes");
const express = require("express");
const cors = require("cors");
const dockerRoutes = require("./routes/dockerRoutes");
const kubernetesRoutes = require("./routes/kubernetesRoutes");
const dockerNetworkRoutes = require("./routes/dockerNetworkRoutes")

const app = express();

app.use(cors());
app.use(express.json());

// ==========================
// API Routes
// ==========================

app.use("/api/docker", dockerRoutes);

app.use("/api/docker-networks", dockerNetworkRoutes);

app.use("/api/kubernetes", kubernetesRoutes);

app.use("/api/prometheus", prometheusRoutes);

app.use("/api/jenkins", jenkinsRoutes);

// ==========================
// Root
// ==========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 DevOps Toolkit Pro Backend Running",
    version: "2.0.0",
  });
});

// ==========================
// Health Check
// ==========================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    service: "DevOps Toolkit Pro Backend",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 DevOps Toolkit Backend Running : http://localhost:${PORT}`
  );
});
