import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import StatisticsDashboard from "./pages/Collisions";
import AddCollision from "./pages/AddCollision";
import EditCollision from "./pages/EditCollision";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/collisions" element={<StatisticsDashboard />} />
      <Route path="/collisions/add" element={<AddCollision />} />
      <Route path="/collisions/edit/:id" element={<EditCollision />} />
    </Routes>
  );
}

export default App;
