// services/membership.service.js

import { httpGet, httpPost } from "@/lib/http";

export const createMembership = (plan) =>
  httpPost("/membership/create", {
    plan,
    
  });

export const getMembership = () =>
  httpGet("/membership/me");