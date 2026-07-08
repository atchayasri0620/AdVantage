// Vanilla JS port of src/pages/AudienceCampaigns.jsx
import { requireAuth } from "../utils/authGuard.js";
import { renderNavbar } from "../components/navbar.js";
import {
  getActiveCampaigns,
  clickCampaign,
  buyCampaign,
} from "../services/campaignService.js";

if (requireAuth()) {
  renderNavbar();

  const gridEl = document.getElementById("audience-grid");

  let campaigns = [];

  function render() {
    gridEl.innerHTML = campaigns
      .map(
        (campaign) => `
        <div class="audience-card" data-id="${campaign.id}">
          <h2>${campaign.name}</h2>

          <p>
            <strong>Budget :</strong>
            ₹${Number(campaign.budget).toLocaleString()}
          </p>

          <p>
            <strong>Target ROI :</strong>
            ${campaign.targetRoi}%
          </p>

          <div class="audience-buttons">
            <button class="click-btn" data-action="click" data-id="${campaign.id}">
              Click
            </button>

            <button class="buy-btn" data-action="buy" data-id="${campaign.id}">
              Buy
            </button>
          </div>
        </div>
      `
      )
      .join("");

    gridEl.querySelectorAll("[data-action='click']").forEach((btn) => {
      btn.addEventListener("click", () => handleClick(btn.dataset.id));
    });

    gridEl.querySelectorAll("[data-action='buy']").forEach((btn) => {
      btn.addEventListener("click", () => handleBuy(btn.dataset.id));
    });
  }

  async function loadCampaigns() {
    try {
      const response = await getActiveCampaigns();
      campaigns = response.data;
      render();
    } catch (error) {
      console.log(error);
      alert("Failed to load campaigns");
    }
  }

  async function handleClick(id) {
    try {
      await clickCampaign(id);
      alert("Click Recorded");
      loadCampaigns();
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  }

  async function handleBuy(id) {
    try {
      await buyCampaign(id);
      alert("Purchase Recorded");
      loadCampaigns();
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.status);
      console.log(error.response?.data);

      alert(JSON.stringify(error.response?.data));
    }
  }

  loadCampaigns();
}
