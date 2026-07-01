import { httpPost } from "@/lib/http";

export const restartKYC = (payload) =>
    httpPost("/kyc/restart", payload);

import { httpPatch } from "@/lib/http";

export const updateCreatorProfile = (payload) =>
  httpPatch("/kyc/creator-profile", payload);