import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import PrivateRoutes from "./components/PrivateRoutes";
import RegisterSuccess from "./pages/RegisterSuccess";
import MainLayout from "./components/layout/MainLayout";
import SignoutSuccess from "./pages/SignoutSuccess";
import RecipePage from "./pages/RecipePage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/recipe/new" element={<CreateRecipePage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registerSuccess" element={<RegisterSuccess />} />
      <Route path="/signoutSuccess" element={<SignoutSuccess />} />
    </Routes>
  );
}

export default App;
