import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import StatisticsDashboard from "./pages/Collisions";
import AddCollision from "./pages/AddCollision";
import EditCollision from "./pages/EditCollision";
import HomePage from "./pages/Home";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/home" element={<HomePage />} />
      <Route path="/collisions" element={<StatisticsDashboard />} />
      <Route path="/collisions/add" element={<AddCollision />} />
      <Route path="/collisions/edit/:id" element={<EditCollision />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}

export default App;
