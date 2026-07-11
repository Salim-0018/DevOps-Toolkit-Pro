import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import DockerImages from "../pages/DockerImages";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Kubernetes from "../pages/Kubernetes";

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

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
