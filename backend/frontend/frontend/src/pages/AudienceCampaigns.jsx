import { useEffect, useState } from "react";
import {
  getActiveCampaigns,
  clickCampaign,
  buyCampaign,
} from "../services/campaignService";
import Navbar from "../components/layout/Navbar";
import "./AudienceCampaigns.css";


function AudienceCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const response = await getActiveCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load campaigns");
    }
  };

  const handleClick = async (id) => {
    try {
      await clickCampaign(id);
      alert("Click Recorded");
      loadCampaigns();
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  const handleBuy = async (id) => {
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
  };

  return (
  <>
    <Navbar />

    <div className="audience-page">

      <h1 className="audience-title">
        Available Campaigns
      </h1>

      <div className="audience-grid">

        {campaigns.map((campaign) => (

          <div
            className="audience-card"
            key={campaign.id}
          >

            <h2>{campaign.name}</h2>

            <p>
              <strong>Budget :</strong>
              ₹{Number(campaign.budget).toLocaleString()}
            </p>

            <p>
              <strong>Target ROI :</strong>
              {campaign.targetRoi}%
            </p>

            <div className="audience-buttons">

              <button
                className="click-btn"
                onClick={() => handleClick(campaign.id)}
              >
                Click
              </button>

              <button
                className="buy-btn"
                onClick={() => handleBuy(campaign.id)}
              >
                Buy
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  </>
);
}

export default AudienceCampaigns;