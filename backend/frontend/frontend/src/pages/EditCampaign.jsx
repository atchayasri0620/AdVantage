import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCampaignById,
  updateCampaign,
} from "../services/campaignService";
import Navbar from "../components/layout/Navbar";
import "./CreateCampaign.css";

function EditCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [targetRoi, setTargetRoi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      const response = await getCampaignById(id);

      setName(response.data.name);
      setBudget(response.data.budget);
      setTargetRoi(response.data.targetRoi);
      setStartDate(response.data.startDate);
      setEndDate(response.data.endDate);
    } catch (error) {
      console.log(error);
      alert("Failed to load campaign");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateCampaign(id, {
        name,
        budget,
        targetRoi,
        startDate,
        endDate,
      });

      alert("Campaign Updated Successfully");
      navigate("/campaigns");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-page">
        <div className="create-card">

          <h2>Edit Campaign</h2>

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

          <button onClick={handleUpdate}>
            Update Campaign
          </button>

        </div>
      </div>
    </>
  );
}

export default EditCampaign;