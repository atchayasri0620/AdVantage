import { useEffect, useState } from "react";
import "./CampaignModal.css";

function CampaignModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [targetRoi, setTargetRoi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setBudget(initialData.budget || "");
      setTargetRoi(initialData.targetRoi || "");
      setStartDate(initialData.startDate || "");
      setEndDate(initialData.endDate || "");
    } else {
      setName("");
      setBudget("");
      setTargetRoi("");
      setStartDate("");
      setEndDate("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSubmit({
      name,
      budget,
      targetRoi,
      startDate,
      endDate,
    });
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>{title}</h2>

        <input
          type="text"
          placeholder="Campaign Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          type="number"
          placeholder="Target ROI"
          value={targetRoi}
          onChange={(e) => setTargetRoi(e.target.value)}
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="create-btn"
            onClick={handleSave}
          >
            {title.includes("Edit") ? "Update" : "Create"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default CampaignModal;