import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  createMembership,
  getMembership,
} from "@/services/membership.service";

export const useMembership = () =>
  useQuery({
    queryKey: ["membership"],
    queryFn: getMembership,
  });

export const useCreateMembership = () =>
  useMutation({
    mutationFn: createMembership,
  });