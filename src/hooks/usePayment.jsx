import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await api.get("/payment");
      return data;
    },
  });
}