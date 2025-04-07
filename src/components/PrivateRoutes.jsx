import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "../hooks/useToken";

function PrivateRoutes() {
  const { token } = useToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
