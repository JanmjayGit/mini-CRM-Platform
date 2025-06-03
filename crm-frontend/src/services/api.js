// import axios from "axios";
//
// const API = axios.create({
//   baseURL: "http://localhost:8080/api", // Change this to your backend URL
// });
//
// export const getCampaigns = () => API.get("/campaigns");
// export const createCampaign = (data) => API.post("/campaigns", data);
// export const previewSegment = (rules) => API.post("/segments/preview", { rules });


// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // Send JSESSIONID cookie
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page if unauthorized
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// -------------------- AUTH --------------------
export const getUserProfile = () => API.get("/auth/profile");

// -------------------- CUSTOMERS --------------------
export const getCustomers = () => API.get("/customers");
export const createCustomer = (data) => API.post("/customers", data);
export const getCustomerById = (id) => API.get(`/customers/${id}`);
export const updateCustomer = (id, data) => API.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

// -------------------- ORDERS --------------------
export const getOrders = () => API.get("/orders");
export const createOrder = (data) => API.post("/orders", data);
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const updateOrder = (id, data) => API.put(`/orders/${id}`, data);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

// -------------------- CAMPAIGNS --------------------
export const getCampaigns = () => API.get("/campaigns");
export const createCampaign = (data) => API.post("/campaigns", data);
export const getCampaignById = (id) => API.get(`/campaigns/${id}`);
export const updateCampaign = (id, data) => API.put(`/campaigns/${id}`, data);
export const deleteCampaign = (id) => API.delete(`/campaigns/${id}`);

// -------------------- COMMUNICATION LOGS --------------------
export const getLogs = () => API.get("/communication-logs");
export const getLogById = (id) => API.get(`/communication-logs/${id}`);
export const createLog = (data) => API.post("/communication-logs", data);
export const updateLog = (id, data) => API.put(`/communication-logs/${id}`, data);
export const deleteLog = (id) => API.delete(`/communication-logs/${id}`);
