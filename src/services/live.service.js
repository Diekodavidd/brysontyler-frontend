import {
  httpGet,
  httpPost,
  httpPatch,
} from "@/lib/http";

export const getLiveSessions = () =>
  httpGet("/live");

export const getMyLiveSessions = () =>
  httpGet("/live/my-sessions");

export const getLiveSession = (id) =>
  httpGet(`/live/${id}`);

export const createLiveSession = (payload) =>
  httpPost("/live/create", payload);

export const joinLiveSession = (id) =>
  httpPost(`/live/${id}/join`);

export const leaveLiveSession = (id) =>
  httpPost(`/live/${id}/leave`);

export const endLiveSession = (id) =>
  httpPatch(`/live/end/${id}`);