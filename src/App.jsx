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
import AccountProfile from "./pages/AccountProfile";
import EditRecipePage from "./pages/EditRecipePage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/recipe/new" element={<CreateRecipePage />} />
          <Route path="/recipe/edit/:id" element={<EditRecipePage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/profile/:username" element={<AccountProfile />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registerSuccess" element={<RegisterSuccess />} />
      <Route path="/signoutSuccess" element={<SignoutSuccess />} />
    </Routes>
  );
}

export default App;
