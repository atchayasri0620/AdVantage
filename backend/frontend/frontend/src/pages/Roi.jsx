import { useState } from "react";
import { getRoi } from "../services/campaignService";
import Navbar from "../components/layout/Navbar";
import "./Roi.css";

function Roi() {
  const [id, setId] = useState("");
  const [roi, setRoi] = useState(null);

  const handleRoi = async () => {
    try {
      const response = await getRoi(id);
      setRoi(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch ROI");
    }
  };

  return (
    <>
      <Navbar />

      <div className="roi-page">

        <div className="roi-card">

          <h2>Campaign ROI Calculator</h2>

          <input
            type="number"
            placeholder="Enter Campaign ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <button onClick={handleRoi}>
            Calculate ROI
          </button>

          {roi && (
            <div className="roi-result">

              <h3>Campaign : {roi.campaignName}</h3>

              <h3>Budget : ₹{roi.budget}</h3>

              <h3>Revenue : ₹{roi.estimatedRevenue}</h3>

              <h3 className="roi-percent">
                ROI : {roi.roiPercentage}%
              </h3>

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Roi;