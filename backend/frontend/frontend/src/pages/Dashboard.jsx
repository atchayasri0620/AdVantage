import { useEffect, useState } from "react";
import {
  getDashboard,
  getAllCampaigns,
  approveCampaign,
  rejectCampaign,
} from "../services/campaignService";
import Navbar from "../components/layout/Navbar";
import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [pendingCampaigns, setPendingCampaigns] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadPendingCampaigns();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard");
    }
  };

  const loadPendingCampaigns = async () => {
    try {
      const response = await getAllCampaigns();

      const pending = response.data.filter(
        (campaign) => campaign.status === "PENDING_APPROVAL"
      );

      setPendingCampaigns(pending);
    } catch (error) {
      console.log(error);
      alert("Failed to load campaigns");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveCampaign(id);
      alert("Campaign Approved");
      loadDashboard();
      loadPendingCampaigns();
    } catch (error) {
      console.log(error);
      alert("Approve Failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectCampaign(id);
      alert("Campaign Rejected");
      loadDashboard();
      loadPendingCampaigns();
    } catch (error) {
      console.log(error);
      alert("Reject Failed");
    }
  };

  if (!dashboard) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="welcome-card">
          <h1>Welcome Back 👋</h1>
          <p>
            Manage your advertising campaigns and monitor performance from one
            place.
          </p>
        </div>

        <div className="card-container">

          <div className="card">
            <h3>Total Campaigns</h3>
            <h2>{dashboard.totalCampaigns}</h2>
          </div>

          <div className="card">
            <h3>Active Campaigns</h3>
            <h2>{dashboard.activeCampaigns}</h2>
          </div>

          <div className="card">
            <h3>Total Views</h3>
            <h2>{dashboard.totalClicks}</h2>
          </div>

          <div className="card">
            <h3>Total Sales</h3>
            <h2>{dashboard.totalPurchases}</h2>
          </div>

          <div className="card">
            <h3>Total Budget</h3>
            <h2>₹{dashboard.totalBudget}</h2>
          </div>

          <div className="card">
            <h3>Average ROI</h3>
            <h2>{dashboard.averageTargetRoi}%</h2>
          </div>

        </div>

        <div className="recent-section">

          <h2>Campaign Summary</h2>

          <div className="recent-card">

            <div className="recent-item">
              <span>Pending Campaigns</span>
              <span className="badge pending">
                {dashboard.pendingCampaigns}
              </span>
            </div>

            <div className="recent-item">
              <span>Rejected Campaigns</span>
              <span className="badge rejected">
                {dashboard.rejectedCampaigns}
              </span>
            </div>

            <div className="recent-item">
              <span>Expired Campaigns</span>
              <span className="badge expired">
                {dashboard.expiredCampaigns}
              </span>
            </div>

          </div>

        </div>

        <div style={{ marginTop: "40px" }}>
          <h2>Pending Campaign Approvals</h2>

          {pendingCampaigns.length === 0 ? (
            <p>No Pending Campaigns</p>
          ) : (
            pendingCampaigns.map((campaign) => (
              <div
            key={campaign.id}
             className="pending-campaign-card"
       >
                <h3>{campaign.name}</h3>

                <p>
                  <strong>Budget :</strong> ₹{campaign.budget}
                </p>

                <p>
                  <strong>Status :</strong> {campaign.status}
                </p>

                <button
                  onClick={() => handleApprove(campaign.id)}
                  className="approve-btn"
                >
                 Approve
                 </button>

                 <button
                 onClick={() => handleReject(campaign.id)}
                 className="reject-btn"
                  >
                 Reject
                </button>
              </div>
            ))
          )}

        </div>

      </div>
    </>
  );
}

export default Dashboard;