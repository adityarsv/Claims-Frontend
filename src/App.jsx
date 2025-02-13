import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Policyholders from "./pages/Policyholders";
import Policies from "./pages/Policies";
import Claims from "./pages/Claims";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePolicy from "./pages/CreatePolicy";  // Import CreatePolicy component
import CreatePolicyholder from "./pages/CreatePolicyholder";
import CreateClaim from "./pages/CreateClaim";
import EditPolicyholder from "./pages/EditPolicyholder";
import EditPolicy from "./pages/EditPolicy";
import EditClaim from "./pages/EditClaim";
import "./pages/style.css";



function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/policyholders" element={<ProtectedRoute><Policyholders /></ProtectedRoute>} />
        <Route path="/policyholders/create" element={<ProtectedRoute><CreatePolicyholder /></ProtectedRoute>} />
        <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
        <Route path="/claims" element={<ProtectedRoute><Claims /></ProtectedRoute>} />
        <Route path="/policies/create" element={<ProtectedRoute><CreatePolicy /></ProtectedRoute>} /> {/* Add route */}
        <Route path="/claims/create" element={<ProtectedRoute><CreateClaim /></ProtectedRoute>} /> {/* Add route */}
        <Route path="/policyholders/:policyholder_id" element={<EditPolicyholder />} />
        <Route path="/policies/:policy_id" element={<EditPolicy />} />
        <Route path="/claims/:claim_id" element={<EditClaim />} />
      </Routes>
    </div>
  );
}

export default App;
