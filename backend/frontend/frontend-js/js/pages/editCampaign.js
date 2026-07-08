// Vanilla JS port of src/pages/EditCampaign.jsx
// React Router's useParams() -> :id is replaced with a ?id= query string,
// since plain HTML pages have no client-side dynamic routing.
import { requireAuth } from "../utils/authGuard.js";
import { renderNavbar } from "../components/navbar.js";
import {
  getCampaignById,
  updateCampaign,
} from "../services/campaignService.js";
 
if (requireAuth()) {
  renderNavbar();
 
  const params = new URLSearchParams(window.location.search);
  let id = params.get("id");
 
  // Fallback: if the query string lost the id in transit (e.g. a static
  // file server redirected the .html request and stripped it, or the page
  // was refreshed/bookmarked without it), recover it from the sessionStorage
  // backup that campaigns.js sets right before navigating here.
  if (!id || id === "null" || id === "undefined") {
    id = sessionStorage.getItem("editCampaignId");
  }
 
  // Hard guard: never let a missing id reach the API (that's what was
  // producing "PUT /campaigns/null 500"). Bounce back to Campaigns instead.
  if (!id || id === "null" || id === "undefined") {
    alert("No campaign selected. Please choose a campaign to edit again.");
    window.location.href = "campaigns.html";
  } else {
    // Keep the backup in sync with whichever id we ended up using, so a
    // page refresh on this same edit page still works.
    sessionStorage.setItem("editCampaignId", id);
 
    runEditCampaignPage(id);
  }
}
 
function runEditCampaignPage(id) {
  const nameInput = document.getElementById("name");
  const budgetInput = document.getElementById("budget");
  const targetRoiInput = document.getElementById("targetRoi");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const updateBtn = document.getElementById("update-btn");
 
  async function loadCampaign() {
    try {
      const response = await getCampaignById(id);
 
      nameInput.value = response.data.name;
      budgetInput.value = response.data.budget;
      targetRoiInput.value = response.data.targetRoi;
      startDateInput.value = response.data.startDate;
      endDateInput.value = response.data.endDate;
    } catch (error) {
      console.log(error);
      alert("Failed to load campaign");
    }
  }
 
  async function handleUpdate() {
    try {
      await updateCampaign(id, {
        name: nameInput.value,
        budget: budgetInput.value,
        targetRoi: targetRoiInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
      });
 
      alert("Campaign Updated Successfully");
      window.location.href = "campaigns.html";
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  }
 
  updateBtn.addEventListener("click", handleUpdate);
 
  loadCampaign();
}
 