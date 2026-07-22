 require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

// Middlewares
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

// Routes
const dockerRoutes = require("./routes/docker/dockerRoutes");
const dockerNetworkRoutes = require("./routes/dockerNetwork/dockerNetworkRoutes");
const kubernetesRoutes = require("./routes/kubernetes/kubernetesRoutes");
const jenkinsRoutes = require("./routes/jenkins/jenkinsRoutes");
const prometheusRoutes = require("./routes/prometheus/prometheusRoutes");
const dashboardRoutes = require("./routes/dashboard/dashboardRoutes");
const dockerVolumeRoutes = require("./routes/dockerVolume/dockerVolumeRoutes");
const monitoringRoutes = require("./routes/monitoring/monitoringRoutes");
const aiRoutes = require("./routes/ai/aiRoutes");
const app = express();

// =============================
// Global Middlewares
// =============================

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(logger);

// =============================
// API Routes
// =============================

app.use("/api/docker", dockerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/docker-networks", dockerNetworkRoutes);
app.use("/api/docker-volumes", dockerVolumeRoutes);
app.use("/api/kubernetes", kubernetesRoutes);
app.use("/api/jenkins", jenkinsRoutes);
app.use("/api/prometheus", prometheusRoutes);
app.use("/api/monitoring", monitoringRoutes);
app.use("/api/ai", aiRoutes);

// =============================
// Root Endpoint
// =============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 DevOps Toolkit Pro Backend",
    version: "2.0.0",
  });
});

// =============================
// Health
// =============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// =============================
// 404
// =============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =============================
// Error Handler
// =============================

app.use(errorHandler);

// =============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("==================================");
  console.log("🚀 DevOps Toolkit Pro Backend");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("==================================");
});
