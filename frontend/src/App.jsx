import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/dashboard";
import Send from "./pages/send/Send";
import { ToastContainer } from "react-toastify";

export default function App() {
  const token = localStorage.getItem("authToken");
  const isAuthenticated = token ? true : false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Signin />}
        />
        <Route path="/send" element={isAuthenticated ? <Send /> : <Signin />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
