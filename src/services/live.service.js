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

/* CREATE */

export const createLiveSession = (data) =>
  httpPost("/live/create", data);

/* SCHEDULE */

export const scheduleLiveSession = (data) =>
  httpPost("/live/create", {
    ...data,
    scheduled: true,
  });

/* JOIN */

export const joinLiveSession = (id) =>
  httpPost(`/live/${id}/join`);

/* LEAVE */

export const leaveLiveSession = (id) =>
  httpPost(`/live/${id}/leave`);

/* END */

export const endLiveSession = (id) =>
  httpPatch(`/live/end/${id}`);