import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getWallet,
  buyCoins,
  addFunds,
} from "@/services/wallet.service";

export const useWallet = () =>
  useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });

export const useBuyCoins = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: buyCoins,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallet"],
      });
    },
  });
};

export const useAddFunds = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFunds,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wallet"],
      });
    },
  });
};