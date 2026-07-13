import { httpGet } from "@/lib/http";

export const getPublicProfile = (username) =>
  httpGet(`/auth/public/profile/${username}`);