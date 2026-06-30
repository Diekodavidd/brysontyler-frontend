import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useSubscribers = () => {
  return useQuery({
    queryKey: ["creator-subscribers"],
    queryFn: async () => {
      const { data } = await api.get(
        "/subscription/creator/subscribers"
      );

      return data.subscribers;
    },
  });
};