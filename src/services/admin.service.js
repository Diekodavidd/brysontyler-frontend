import { httpGet, httpPatch, httpPost } from "@/lib/http";

export const getAdminStats = () =>
  httpGet("/admin/stats");

export const getAllUsers = () =>
  httpGet("/admin/users");

export const getAllContent = () =>
  httpGet("/admin/content");

export const getPendingContent = () =>
  httpGet("/admin/content/pending");

export const approveContent = (id) =>
  httpPatch(`/admin/content/${id}/approve`);

export const rejectContent = (id, comment) =>
  httpPatch(`/admin/content/${id}/reject`, {
    comment,
  });

export const requestChanges = (id, comment) =>
  httpPatch(`/admin/content/${id}/request-changes`, {
    comment,
  });

export const publishScheduledContent = () =>
  httpPost("/admin/content/publish");


// ======================
// CREATOR APPLICATIONS
// ======================

export const getPendingCreators = () =>
  httpGet("/admin/creators/pending");

export const approveCreator = (id) =>
  httpPatch(`/admin/creators/${id}/approve`);

export const rejectCreator = (id, reason) =>
  httpPatch(`/admin/creators/${id}/reject`, {
    reason,
  });

  export const getAllCreators = () =>
  httpGet("/admin/creators");

  export const getAllFans = () =>
  httpGet("/admin/fans");

  export const getMemberships = () =>
  httpGet("/admin/memberships");