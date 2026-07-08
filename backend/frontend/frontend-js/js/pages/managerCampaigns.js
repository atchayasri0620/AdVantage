// Vanilla JS port of src/pages/ManagerCampaigns.jsx
// NOTE: the original component does NOT render <Navbar />, so this page
// intentionally has no navbar either, to match the original exactly.
import { requireAuth } from "../utils/authGuard.js";
import {
  getAllCampaigns,
  approveCampaign,
  rejectCampaign,
} from "../services/campaignService.js";

if (requireAuth()) {
  const contentEl = document.getElementById("manager-campaigns-content");

  let campaigns = [];

  function render() {
    contentEl.innerHTML = `
      <h1>Manager Campaign Approval</h1>
      ${campaigns
        .map(
          (campaign) => `
        <div
          data-id="${campaign.id}"
          style="border: 1px solid gray; margin-bottom: 15px; padding: 15px; border-radius: 10px;"
        >
          <h3>${campaign.name}</h3>
          <p>Status: ${campaign.status}</p>
          <p>Budget: ₹${campaign.budget}</p>

          <button data-action="approve" data-id="${campaign.id}">
            Approve
          </button>

          <button data-action="reject" data-id="${campaign.id}" style="margin-left: 10px">
            Reject
          </button>
        </div>
      `
        )
        .join("")}
    `;

    contentEl.querySelectorAll("[data-action='approve']").forEach((btn) => {
      btn.addEventListener("click", () => handleApprove(btn.dataset.id));
    });

    contentEl.querySelectorAll("[data-action='reject']").forEach((btn) => {
      btn.addEventListener("click", () => handleReject(btn.dataset.id));
    });
  }

  async function loadCampaigns() {
    try {
      const response = await getAllCampaigns();
      campaigns = response.data;
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
      loadCampaigns();
    } catch (error) {
      console.log(error);
      alert("Approve Failed");
    }
  }

  async function handleReject(id) {
    try {
      await rejectCampaign(id);
      alert("Campaign Rejected");
      loadCampaigns();
    } catch (error) {
      console.log(error);
      alert("Reject Failed");
    }
  }

  loadCampaigns();
}
