import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { getPayment } from "../services/payment.service";

export const usePayment = (paymentId) =>
  useQuery({
    queryKey: ["payment", paymentId],
    queryFn: async () => {
      const res = await getPayment(paymentId);

      console.log("PAYMENT QUERY:", res);

      return res;
    },
    enabled: !!paymentId,
    refetchInterval: 5000,
  });

  import { useMutation } from "@tanstack/react-query";
import { createSubscriptionPayment } from "@/services/payment.service";

export const useCreateSubscriptionPayment = () =>
  useMutation({
    mutationFn: createSubscriptionPayment,
  });