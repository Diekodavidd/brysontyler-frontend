import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import {  useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
   import { httpPut } from "@/lib/http"; // wherever this file lives


   
export const useCreatorSubscribers = () => {
  return useQuery({
    queryKey: ["creator-subscribers"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/subscriptions/creator/subscribers",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await res.json();

      console.log(data);

      return data;
    },
  });
};




export const useUpdateSubscriptionPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({

mutationFn: (price) =>
  httpPut(
    "/subscriptions/creator/subscription-price",
    {
      price,
    }
  ),

    onSuccess: (data) => {
      console.log("SUCCESS");
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: ["creator-subscribers"],
      });

      useAuthStore.setState((state) => ({
        user: {
          ...state.user,
          subscriptionPrice: data.subscriptionPrice,
        },
      }));
    },

    onError: (err) => {
      console.error("MUTATION FAILED");
      console.error(err);
    },
  });
};