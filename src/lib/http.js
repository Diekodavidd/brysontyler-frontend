import request from "./api";

export const httpGet = (url, config) =>
  request(url, "GET", undefined, config);

export const httpPost = (url, payload, config) =>
  request(url, "POST", payload, config);

export const httpPut = (url, payload, config) =>
  request(url, "PUT", payload, config);

export const httpPatch = (url, payload, config) =>
  request(url, "PATCH", payload, config);

export const httpDelete = (url, config) =>
  request(url, "DELETE", undefined, config);