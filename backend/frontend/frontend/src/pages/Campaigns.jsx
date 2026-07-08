import { useEffect, useState } from "react";
import {
  getCampaigns,
  searchByName,
  searchByStatus,
  deleteCampaign,
} from "../services/campaignService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import "./Campaigns.css";

function Campaigns() {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const response = await getCampaigns();
      setCampaigns(response.data);
    }catch (error) {
  console.log(error);
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);
  console.log("Headers:", error.response?.headers);

  alert(JSON.stringify(error.response?.data));
}
  };

  const handleDelete = async (id) => {
    try {
      await deleteCampaign(id);
      alert("Campaign Deleted Successfully");
      loadCampaigns();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const handleSearchByName = async () => {
    try {
      const response = await searchByName(searchName);
      setCampaigns(response.data);
    } catch (error) {
      console.log(error);
      alert("Search Failed");
    }
  };

  const handleSearchByStatus = async () => {
    try {
      const response = await searchByStatus(searchStatus);
      setCampaigns(response.data);
    } catch (error) {
      console.log(error);
      alert("Search Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="campaign-page">

        <h1 className="campaign-title">Campaigns</h1>

        <div className="search-bar">

          <input
            type="text"
            placeholder="Search Campaign Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <button onClick={handleSearchByName}>
            Search
          </button>

          <input
            type="text"
            placeholder="Search Status"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          />

          <button onClick={handleSearchByStatus}>
            Filter
          </button>

        </div>

        <div className="campaign-grid">

          {campaigns.map((campaign) => (

            <div className="campaign-card" key={campaign.id}>

              <h2>{campaign.name}</h2>

              <span
                className={`status ${
                  campaign.status === "ACTIVE"
                    ? "active"
                    : campaign.status === "PENDING_APPROVAL"
                    ? "pending"
                    : campaign.status === "REJECTED"
                    ? "rejected"
                    : "expired"
                }`}
              >
                {campaign.status}
              </span>

              <p>
                <strong>Budget :</strong> ₹
                {Number(campaign.budget).toLocaleString()}
              </p>

              <p>
                <strong>Target ROI :</strong> {campaign.targetRoi}%
              </p>

              <p>
                <strong>Start Date :</strong> {campaign.startDate}
              </p>

              <p>
                <strong>End Date :</strong> {campaign.endDate}
              </p>

              <div className="card-buttons">

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/edit-campaign/${campaign.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(campaign.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Campaigns;