import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
const Register = lazy(() => import("../features/Register"));
const Login = lazy(() => import("../features/Login"));
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const Income = lazy(() => import("../pages/Income"));
const Expense = lazy(() => import("../pages/Expense"));
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* PRIVATE + LAYOUT  */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Route>
        </Route>
        {/* Default */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
