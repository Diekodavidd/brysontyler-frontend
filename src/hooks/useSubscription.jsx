import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as subscriptionService from "@/services/subscription.service";
import { toast } from "react-toastify";

export const useSubscriptions = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: subscriptionService.getMySubscriptions,
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionService.cancelSubscription,

    onSuccess: () => {
      toast.success("Subscription cancelled");
      queryClient.invalidateQueries({
        queryKey: ["subscriptions"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useRenewSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionService.renewSubscription,

    onSuccess: () => {
      toast.success("Subscription renewed");
      queryClient.invalidateQueries({
        queryKey: ["subscriptions"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
};