import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../services/campaignService";
import Navbar from "../components/layout/Navbar";
import "./CreateCampaign.css";

function CreateCampaign() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [targetRoi, setTargetRoi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    try {
      await createCampaign({
        name,
        budget,
        targetRoi,
        startDate,
        endDate,
      });

      alert("Campaign Created Successfully");
      navigate("/campaigns");
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to create campaign");
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-page">
        <div className="create-card">

          <h2>Create Campaign</h2>

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

          <button onClick={handleSubmit}>
            Create Campaign
          </button>

        </div>
      </div>
    </>
  );
}

export default CreateCampaign;