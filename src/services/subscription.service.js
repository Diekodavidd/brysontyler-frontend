import api from "@/lib/api";

export const getMySubscriptions = async () => {
  const { data } = await api.get("/subscription/my-subscriptions");
  return data;
};

export const cancelSubscription = async (id) => {
  const { data } = await api.patch(`/subscription/cancel/${id}`);
  return data;
};

export const renewSubscription = async (id) => {
  const { data } = await api.patch(`/subscription/renew/${id}`);
  return data;
};