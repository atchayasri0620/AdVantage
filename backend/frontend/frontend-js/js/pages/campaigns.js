// Vanilla JS port of src/pages/Campaigns.jsx
import { requireAuth } from "../utils/authGuard.js";
import { renderNavbar } from "../components/navbar.js";
import {
  getCampaigns,
  searchByName,
  searchByStatus,
  deleteCampaign,
} from "../services/campaignService.js";
 console.log("Campaigns JS Loaded");
if (requireAuth()) {

  console.log("Passed Auth");
  
  
  renderNavbar();
 
  const gridEl = document.getElementById("campaign-grid");
  const searchNameInput = document.getElementById("search-name");
  const searchStatusInput = document.getElementById("search-status");
 
  let campaigns = [];
 
  function statusClass(status) {
    if (status === "ACTIVE") return "active";
    if (status === "PENDING_APPROVAL") return "pending";
    if (status === "REJECTED") return "rejected";
    return "expired";
  }
 
  function render() {
    gridEl.innerHTML = campaigns
      .map(
        (campaign) => `
        <div class="campaign-card" data-id="${campaign.id}">
          <h2>${campaign.name}</h2>
 
          <span class="status ${statusClass(campaign.status)}">
            ${campaign.status}
          </span>
 
          <p><strong>Budget :</strong> ₹${Number(
            campaign.budget
          ).toLocaleString()}</p>
 
          <p><strong>Target ROI :</strong> ${campaign.targetRoi}%</p>
 
          <p><strong>Start Date :</strong> ${campaign.startDate}</p>
 
          <p><strong>End Date :</strong> ${campaign.endDate}</p>
 
          <div class="card-buttons">
            <button class="edit-btn" data-action="edit" data-id="${campaign.id}">
              Edit
            </button>
 
            <button class="delete-btn" data-action="delete" data-id="${campaign.id}">
              Delete
            </button>
          </div>
        </div>
      `
      )
      .join("");
 
    gridEl.querySelectorAll("[data-action='edit']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const campaignId = btn.dataset.id;
 
        // Belt-and-braces: keep a backup copy of the id in sessionStorage
        // in case the query string gets dropped in transit (some static
        // file servers strip query params on .html redirects).
        sessionStorage.setItem("editCampaignId", campaignId);
 
        window.location.href = `edit-campaign.html?id=${encodeURIComponent(
          campaignId
        )}`;
      });
    });
 
    gridEl.querySelectorAll("[data-action='delete']").forEach((btn) => {
      btn.addEventListener("click", () => handleDelete(btn.dataset.id));
    });
  }
 
  async function loadCampaigns() {
    try {
      const response = await getCampaigns();
      campaigns = response.data;
      render();
    } catch (error) {
      console.log(error);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Headers:", error.response?.headers);
 
      alert(JSON.stringify(error.response?.data));
    }
  }
 
  async function handleDelete(id) {
    try {
      await deleteCampaign(id);
      alert("Campaign Deleted Successfully");
      loadCampaigns();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  }
 
  async function handleSearchByName() {
    try {
      const response = await searchByName(searchNameInput.value);
      campaigns = response.data;
      render();
    } catch (error) {
      console.log(error);
      alert("Search Failed");
    }
  }
 
  async function handleSearchByStatus() {
    try {
      const response = await searchByStatus(searchStatusInput.value);
      campaigns = response.data;
      render();
    } catch (error) {
      console.log(error);
      alert("Search Failed");
    }
  }
 
  document
    .getElementById("search-name-btn")
    .addEventListener("click", handleSearchByName);
 
  document
    .getElementById("search-status-btn")
    .addEventListener("click", handleSearchByStatus);
 
  loadCampaigns();
}
 