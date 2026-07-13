import { useQuery } from "@tanstack/react-query";
import * as publicService from "@/services/public.service";

export const usePublicProfile = (username) =>
  useQuery({
    queryKey: ["public-profile", username],
    queryFn: () =>
      publicService.getPublicProfile(username),
    enabled: !!username,
  });