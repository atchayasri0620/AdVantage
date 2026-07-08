// Vanilla JS port of src/pages/Dashboard.jsx
import { requireAuth } from "../utils/authGuard.js";
import { renderNavbar } from "../components/navbar.js";
import {
  getDashboard,
  getAllCampaigns,
  approveCampaign,
  rejectCampaign,
} from "../services/campaignService.js";

if (requireAuth()) {
  renderNavbar();

  const contentEl = document.getElementById("dashboard-content");

  let dashboard = null;
  let pendingCampaigns = [];

  async function loadDashboard() {
    try {
      const response = await getDashboard();
      dashboard = response.data;
      render();
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard");
    }
  }

  async function loadPendingCampaigns() {
    try {
      const response = await getAllCampaigns();

      pendingCampaigns = response.data.filter(
        (campaign) => campaign.status === "PENDING_APPROVAL"
      );

      render();
    } catch (error) {
      console.log(error);
      alert("Failed to load campaigns");
    }
  }

  async function handleApprove(id) {
    try {
      await approveCampaign(id);
      alert("Campaign Approved");
      loadDashboard();
      loadPendingCampaigns();
    } catch (error) {
      console.log(error);
      alert("Approve Failed");
    }
  }

  async function handleReject(id) {
    try {
      await rejectCampaign(id);
      alert("Campaign Rejected");
      loadDashboard();
      loadPendingCampaigns();
    } catch (error) {
      console.log(error);
      alert("Reject Failed");
    }
  }

  function pendingCampaignsHtml() {
    if (pendingCampaigns.length === 0) {
      return "<p>No Pending Campaigns</p>";
    }

    return pendingCampaigns
      .map(
        (campaign) => `
        <div class="pending-campaign-card" data-id="${campaign.id}">
          <h3>${campaign.name}</h3>

          <p><strong>Budget :</strong> ₹${campaign.budget}</p>

          <p><strong>Status :</strong> ${campaign.status}</p>

          <button class="approve-btn" data-action="approve" data-id="${campaign.id}">
            Approve
          </button>

          <button class="reject-btn" data-action="reject" data-id="${campaign.id}">
            Reject
          </button>
        </div>
      `
      )
      .join("");
  }

  function render() {
    if (!dashboard) {
      contentEl.innerHTML = `<h2 style="text-align: center; margin-top: 50px;">Loading...</h2>`;
      return;
    }

    contentEl.innerHTML = `
      <div class="dashboard">

        <div class="welcome-card">
          <h1>Welcome Back 👋</h1>
          <p>
            Manage your advertising campaigns and monitor performance from one
            place.
          </p>
        </div>

        <div class="card-container">

          <div class="card">
            <h3>Total Campaigns</h3>
            <h2>${dashboard.totalCampaigns}</h2>
          </div>

          <div class="card">
            <h3>Active Campaigns</h3>
            <h2>${dashboard.activeCampaigns}</h2>
          </div>

          <div class="card">
            <h3>Total Views</h3>
            <h2>${dashboard.totalClicks}</h2>
          </div>

          <div class="card">
            <h3>Total Sales</h3>
            <h2>${dashboard.totalPurchases}</h2>
          </div>

          <div class="card">
            <h3>Total Budget</h3>
            <h2>₹${dashboard.totalBudget}</h2>
          </div>

          <div class="card">
            <h3>Average ROI</h3>
            <h2>${dashboard.averageTargetRoi}%</h2>
          </div>

        </div>

        <div class="recent-section">

          <h2>Campaign Summary</h2>

          <div class="recent-card">

            <div class="recent-item">
              <span>Pending Campaigns</span>
              <span class="badge pending">${dashboard.pendingCampaigns}</span>
            </div>

            <div class="recent-item">
              <span>Rejected Campaigns</span>
              <span class="badge rejected">${dashboard.rejectedCampaigns}</span>
            </div>

            <div class="recent-item">
              <span>Expired Campaigns</span>
              <span class="badge expired">${dashboard.expiredCampaigns}</span>
            </div>

          </div>

        </div>

        <div style="margin-top: 40px">
          <h2>Pending Campaign Approvals</h2>
          ${pendingCampaignsHtml()}
        </div>

      </div>
    `;

    contentEl.querySelectorAll("[data-action='approve']").forEach((btn) => {
      btn.addEventListener("click", () => handleApprove(btn.dataset.id));
    });

    contentEl.querySelectorAll("[data-action='reject']").forEach((btn) => {
      btn.addEventListener("click", () => handleReject(btn.dataset.id));
    });
  }

  loadDashboard();
  loadPendingCampaigns();
}
