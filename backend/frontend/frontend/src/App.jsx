import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import EditCampaign from "./pages/EditCampaign";
import ManagerCampaigns from "./pages/ManagerCampaigns";
import ProtectedRoute from "./pages/ProtectedRoute";
import Roi from "./pages/Roi";
import AudienceCampaigns from "./pages/AudienceCampaigns";

function App() {
  return (
    <BrowserRouter>
     <Routes>
  <Route path="/" element={<Login />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/campaigns"
    element={
      <ProtectedRoute>
        <Campaigns />
      </ProtectedRoute>
    }
  />

  <Route
    path="/create-campaign"
    element={
      <ProtectedRoute>
        <CreateCampaign />
      </ProtectedRoute>
    }
  />

  <Route
    path="/edit-campaign/:id"
    element={
      <ProtectedRoute>
        <EditCampaign />
      </ProtectedRoute>
    }
  />
  <Route
  path="/roi"
  element={
    <ProtectedRoute>
      <Roi />
    </ProtectedRoute>
  }
  
/>
<Route
  path="/manager-campaigns"
  element={
    <ProtectedRoute>
      <ManagerCampaigns />
    </ProtectedRoute>
  }
/>
<Route
  path="/audience"
  element={
    <ProtectedRoute>
      <AudienceCampaigns />
    </ProtectedRoute>
  }
/>
</Routes>
    </BrowserRouter>
  );
}

export default App;