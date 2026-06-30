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