import { useEffect, useState } from "react";
import {
  getAllCampaigns,
  approveCampaign,
  rejectCampaign,
} from "../services/campaignService";

function ManagerCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const response = await getAllCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load campaigns");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveCampaign(id);
      alert("Campaign Approved");
      loadCampaigns();
    } catch (error) {
      console.log(error);
      alert("Approve Failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectCampaign(id);
      alert("Campaign Rejected");
      loadCampaigns();
    } catch (error) {
      console.log(error);
      alert("Reject Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Manager Campaign Approval</h1>

      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          style={{
            border: "1px solid gray",
            marginBottom: "15px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{campaign.name}</h3>
          <p>Status: {campaign.status}</p>
          <p>Budget: ₹{campaign.budget}</p>

          <button onClick={() => handleApprove(campaign.id)}>
            Approve
          </button>

          <button
            onClick={() => handleReject(campaign.id)}
            style={{ marginLeft: "10px" }}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default ManagerCampaigns;