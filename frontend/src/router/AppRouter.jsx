import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import DockerImages from "../pages/DockerImages";
import DockerContainers from "../pages/DockerContainers";
import DockerContainerDetails from "../pages/DockerContainerDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Kubernetes from "../pages/Kubernetes";
import Jenkins from "../pages/Jenkins";
import JenkinsJobDetails from "../pages/JenkinsJobDetails";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/docker-images"
          element={<DockerImages />}
        />

       <Route
         path="/docker-containers"
         element={<DockerContainers />}
        />

       <Route
         path="/docker/container/:name"
         element={<DockerContainerDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />


        <Route
          path="/kubernetes"
          element={<Kubernetes />}
         />

        <Route
          path="/jenkins"
          element={<Jenkins />}
         />

        <Route
          path="/jenkins/job/:name"
          element={<JenkinsJobDetails />}
         />


      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
