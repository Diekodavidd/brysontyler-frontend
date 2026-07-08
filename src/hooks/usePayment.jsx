
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createMembership,
  createSubscription,
  depositWallet,
  buyCoins,
  getPayments,
  getPayment,
  cancelPayment,
} from "@/services/payment.service";

/*
=====================================
Payment History
=====================================
*/

export const usePayments = () =>
  useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

/*
=====================================
Single Payment
=====================================
*/

export const usePayment = (paymentId) =>
  useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getPayment(paymentId),
    enabled: !!paymentId,
    refetchInterval: 5000,
  });

/*
=====================================
Membership
=====================================
*/

export const useCreateMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ plan, provider }) =>
      createMembership(plan, provider),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
};

/*
=====================================
Creator Subscription
=====================================
*/

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ creatorId, provider }) =>
      createSubscription(
        creatorId,
        provider
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
};

/*
=====================================
Wallet Deposit
=====================================
*/

export const useDepositWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ amount, provider }) =>
      depositWallet(
        amount,
        provider
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
};

/*
=====================================
Buy Coins
=====================================
*/

export const useBuyCoins = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      coinType,
      quantity,
      provider,
    }) =>
      buyCoins(
        coinType,
        quantity,
        provider
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
};

/*
=====================================
Cancel Payment
=====================================
*/

export const useCancelPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelPayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
};