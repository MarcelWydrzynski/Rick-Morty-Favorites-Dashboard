import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) return <Loader />;
  if (!session) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
