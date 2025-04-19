import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRecipe from "./pages/CreateRecipe";
import PrivateRoutes from "./components/PrivateRoutes";
import RegisterSuccess from "./pages/RegisterSuccess";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/recipe/new" element={<CreateRecipe />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registerSuccess" element={<RegisterSuccess />} />
    </Routes>
  );
}

export default App;
