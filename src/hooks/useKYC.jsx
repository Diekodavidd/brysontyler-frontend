import { useMutation } from "@tanstack/react-query";
import {
  restartKYC,
  updateCreatorProfile,
} from "@/services/kyc.service";

export const useRestartKYC = () =>
  useMutation({
    mutationFn: restartKYC,
  });

export const useUpdateCreatorProfile = () =>
  useMutation({
    mutationFn: updateCreatorProfile,
  });