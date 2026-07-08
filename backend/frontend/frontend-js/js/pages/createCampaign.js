// Vanilla JS port of src/pages/CreateCampaign.jsx
import { requireAuth } from "../utils/authGuard.js";
import { renderNavbar } from "../components/navbar.js";
import { createCampaign } from "../services/campaignService.js";

if (requireAuth()) {
  renderNavbar();

  const nameInput = document.getElementById("name");
  const budgetInput = document.getElementById("budget");
  const targetRoiInput = document.getElementById("targetRoi");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const submitBtn = document.getElementById("submit-btn");

  async function handleSubmit() {
    try {
      await createCampaign({
        name: nameInput.value,
        budget: budgetInput.value,
        targetRoi: targetRoiInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
      });

      alert("Campaign Created Successfully");
      window.location.href = "campaigns.html";
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to create campaign");
    }
  }

  submitBtn.addEventListener("click", handleSubmit);
}
