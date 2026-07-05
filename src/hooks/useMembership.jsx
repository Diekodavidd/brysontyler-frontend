import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createMembership,
  getMembership,
} from "@/services/membership.service";

  export const useMembership = () =>
  useQuery({
    queryKey: ["membership"],
    queryFn: getMembership,

    refetchInterval: 10000,
  });

export const useCreateMembership = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMembership,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["membership"],
      });
    },
  });
};