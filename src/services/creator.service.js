
import {
  httpGet,
  httpPatch,
} from "@/lib/http";

export const getCreators = () =>
  httpGet("/creator/all");


export const getCreatorDashboard = () =>
  httpGet("/creator/dashboard");

export const getCreatorAnalytics = () =>
  httpGet("/creator/analytics");

export const getCreatorContent = () =>
  httpGet("/creator/my-content");

export const getCreatorProfile = () =>
  httpGet("/creator/profile");

export const updateCreatorProfile = (data) =>
  httpPatch("/creator/profile", data);

export const getCreatorCollaborations = () =>
  httpGet("/creator/collaborations");

// Wallet / Earnings
export const getCreatorPayments = () =>
  httpGet("/payments");

export const getDiscoverCreators = () =>
  httpGet("/collaboration/discover");