// Vanilla JS port of src/pages/Roi.jsx
import { requireAuth } from "../utils/authGuard.js";
import { renderNavbar } from "../components/navbar.js";
import { getRoi } from "../services/campaignService.js";

if (requireAuth()) {
  renderNavbar();

  const idInput = document.getElementById("campaign-id");
  const calcBtn = document.getElementById("calc-roi-btn");
  const resultContainer = document.getElementById("roi-result-container");

  async function handleRoi() {
    try {
      const response = await getRoi(idInput.value);
      renderResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch ROI");
    }
  }

  function renderResult(roi) {
    resultContainer.innerHTML = `
      <div class="roi-result">
        <h3>Campaign : ${roi.campaignName}</h3>
        <h3>Budget : ₹${roi.budget}</h3>
        <h3>Revenue : ₹${roi.estimatedRevenue}</h3>
        <h3 class="roi-percent">ROI : ${roi.roiPercentage}%</h3>
      </div>
    `;
  }

  calcBtn.addEventListener("click", handleRoi);
}
