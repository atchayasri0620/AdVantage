// Vanilla JS port of src/services/campaignService.js
// Endpoints are IDENTICAL to the original — nothing changed here.
import api from "../api.js";

export const createCampaign = (data) => api.post("/campaigns", data);

export const getCampaigns = () => api.get("/campaigns/my");

export const getAllCampaigns = () => api.get("/campaigns");

export const getDashboard = () => api.get("/campaigns/dashboard");

export const approveCampaign = (id) => api.put(`/campaigns/approve/${id}`);

export const rejectCampaign = (id) => api.put(`/campaigns/reject/${id}`);

export const deleteCampaign = (id) => api.delete(`/campaigns/${id}`);

export const updateCampaign = (id, data) => api.put(`/campaigns/${id}`, data);

export const searchByStatus = (status) =>
  api.get(`/campaigns/search/status/${status}`);

export const searchByName = (name) =>
  api.get(`/campaigns/search/name/${name}`);

export const getRoi = (id) => api.get(`/campaigns/${id}/roi`);

export const getCampaignById = (id) => api.get(`/campaigns/${id}`);

export const clickCampaign = (id) => api.post(`/campaigns/${id}/click`);

export const buyCampaign = (id) => api.post(`/campaigns/${id}/buy`);

export const getActiveCampaigns = () => api.get("/campaigns/active");
