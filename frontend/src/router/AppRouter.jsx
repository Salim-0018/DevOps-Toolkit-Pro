import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import DockerImages from "../pages/DockerImages";
import DockerVolumes from "../pages/DockerVolumes";
import DockerContainers from "../pages/DockerContainers";
import DockerContainerDetails from "../pages/DockerContainerDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Kubernetes from "../pages/Kubernetes";
import JenkinsJobDetails from "../pages/JenkinsJobDetails";
import Jenkins from "../pages/Jenkins";
import Settings from "../pages/Settings";
import Monitoring from "../pages/Monitoring";
import AIAssistant from "../pages/AIAssistant";

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
          path="/docker-volumes"
          element={<DockerVolumes />}
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
         
         <Route
          path="/settings"
          element={<Settings />}
         />
       
        <Route
          path="/monitoring"
          element={<Monitoring />}
         />


         <Route
          path="/ai"
          element={<AIAssistant />}
         />


      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
