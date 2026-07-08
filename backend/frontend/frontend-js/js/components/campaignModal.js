// Vanilla JS port of src/components/campaign/CampaignModal.jsx
// NOTE: In the original React project this component is not imported or
// used by any page (Campaigns.jsx / CreateCampaign.jsx / EditCampaign.jsx
// all use their own inline forms instead). It's ported here 1:1 for
// completeness/parity but is likewise not wired into any page by default.
//
// Usage:
//   import { openCampaignModal } from "./components/campaignModal.js";
//   openCampaignModal({
//     title: "Edit Campaign",
//     initialData: { name, budget, targetRoi, startDate, endDate },
//     onSubmit: (data) => { ... },
//   });

export function openCampaignModal({ title, initialData, onSubmit }) {
  const data = initialData || {};

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  overlay.innerHTML = `
    <div class="modal">
      <h2>${title}</h2>

      <input type="text" id="cm-name" placeholder="Campaign Name" value="${
        data.name || ""
      }" />

      <input type="number" id="cm-budget" placeholder="Budget" value="${
        data.budget || ""
      }" />

      <input type="number" id="cm-targetRoi" placeholder="Target ROI" value="${
        data.targetRoi || ""
      }" />

      <input type="date" id="cm-startDate" value="${data.startDate || ""}" />

      <input type="date" id="cm-endDate" value="${data.endDate || ""}" />

      <div class="modal-buttons">
        <button class="cancel-btn" id="cm-cancel-btn">Cancel</button>
        <button class="create-btn" id="cm-save-btn">${
          title.includes("Edit") ? "Update" : "Create"
        }</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  function closeModal() {
    document.body.removeChild(overlay);
  }

  overlay.querySelector("#cm-cancel-btn").addEventListener("click", closeModal);

  overlay.querySelector("#cm-save-btn").addEventListener("click", () => {
    const payload = {
      name: overlay.querySelector("#cm-name").value,
      budget: overlay.querySelector("#cm-budget").value,
      targetRoi: overlay.querySelector("#cm-targetRoi").value,
      startDate: overlay.querySelector("#cm-startDate").value,
      endDate: overlay.querySelector("#cm-endDate").value,
    };

    if (onSubmit) onSubmit(payload);
  });

  return { close: closeModal };
}
