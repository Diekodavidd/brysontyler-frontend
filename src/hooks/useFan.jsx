import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-toastify";

import * as fanService from "@/services/fan.service";

export const useFanDashboard = () =>
  useQuery({
    queryKey: ["fan-dashboard"],
    queryFn: fanService.getDashboard,
  });

export const useFanHistory = () =>
  useQuery({
    queryKey: ["fan-history"],
    queryFn: fanService.getHistory,
  });

export const useSubscriptions = () =>
  useQuery({
    queryKey: ["subscriptions"],
    queryFn: fanService.getSubscriptions,
  });

export const usePayments = () =>
  useQuery({
    queryKey: ["payments"],
    queryFn: fanService.getPayments,
  });

export const useCreatorr = (id) =>
  useQuery({
    queryKey: ["creator", id],
    queryFn: () => fanService.getCreatorById(id),
    enabled: !!id,
  });

  export const useUploadBankReceipt = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn:
      fanService.uploadBankReceipt,

    onSuccess: () => {
      toast.success(
        "Receipt uploaded successfully."
      );

      qc.invalidateQueries({
        queryKey: ["payments"],
      });

      qc.invalidateQueries({
        queryKey: ["fan-history"],
      });
    },

    onError: (err) => {
      toast.error(
        err.message ||
          "Failed to upload receipt."
      );
    },
  });
};