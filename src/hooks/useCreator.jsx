  import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { getCreators } from "@/services/creator.service";

export const useCreators = () =>
  useQuery({
    queryKey: ["creators"],
    queryFn: getCreators,
  });


import {
  getCreatorDashboard,
  getCreatorAnalytics,
  getCreatorContent,getDiscoverCreators,
  getCreatorProfile,
  updateCreatorProfile,
  getCreatorCollaborations,
  getCreatorPayments,
} from "@/services/creator.service";

export const useCreatorDashboard = () =>
  useQuery({
    queryKey: ["creator-dashboard"],
    queryFn: getCreatorDashboard,
  });

export const useCreatorAnalytics = () =>
  useQuery({
    queryKey: ["creator-analytics"],
    queryFn: getCreatorAnalytics,
  });

export const useCreatorContent = () =>
  useQuery({
    queryKey: ["creator-content"],
    queryFn: getCreatorContent,
  });

export const useCreatorProfile = () =>
  useQuery({
    queryKey: ["creator-profile"],
    queryFn: getCreatorProfile,
  });

export const useCreatorCollaborations = () =>
  useQuery({
    queryKey: ["creator-collaborations"],
    queryFn: getCreatorCollaborations,
  });

export const useCreatorPayments = () =>
  useQuery({
    queryKey: ["creator-payments"],
    queryFn: getCreatorPayments,
  });

export const useUpdateCreatorProfile = () =>
  useMutation({
    mutationFn: updateCreatorProfile,
  });

  export const useDiscoverCreators = () =>
  useQuery({
    queryKey: ["discover-creators"],
    queryFn: getDiscoverCreators,
  });