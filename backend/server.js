const express = require("express");
const cors = require("cors");

const dockerRoutes = require("./routes/dockerRoutes");
const kubernetesRoutes = require("./routes/kubernetesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docker", dockerRoutes);
app.use("/api/kubernetes", kubernetesRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "DevOps Toolkit Backend Running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    service: "DevOps Toolkit Backend",
    version: "1.0.0",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
