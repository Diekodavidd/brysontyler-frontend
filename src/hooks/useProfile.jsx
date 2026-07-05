import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useProfile = () => {
  return useQuery({
    queryKey:["profile"],
    queryFn: async () => {
      const res = await api.get("/fan/profile");
      return res.data.user;
    }
  });
};

import { getPayment } from "@/services/payment.service";

export const usePayment = (paymentId) =>
  useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getPayment(paymentId),
    enabled: !!paymentId,
    refetchInterval: 5000,
  });