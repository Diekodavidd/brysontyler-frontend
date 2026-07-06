import { useQuery } from "@tanstack/react-query";
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