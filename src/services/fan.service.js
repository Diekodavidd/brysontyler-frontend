import api from "@/lib/api";

export const getDashboard = async () => {
  const { data } = await api.get("/fan/dashboard");
  return data;
};

export const getHistory = async () => {
  const { data } = await api.get("/fan/history");
  return data;
};

export const getSubscriptions = async () => {
  const { data } = await api.get("/subscription/my-subscriptions");
  return data;
};

export const getPayments = async () => {
  const { data } = await api.get("/payment");
  return data;
};