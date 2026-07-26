import {
  httpGet,
  httpPatch,
  httpPost,
  httpDelete,
} from "@/lib/http";
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

export const rejectContent = ({
    id,
    comment,
}) =>
    httpPatch(
        `/admin/content/${id}/reject`,
        {
            comment,
        }
    );



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

  export const deleteUser = (id) =>
  httpDelete(`/admin/users/${id}`);


  export const requestChanges = ({
    id,
    comment,
}) =>
    httpPatch(
        `/admin/content/${id}/request-changes`,
        { comment }
    );

    export const getReviewedContent = () =>
  httpGet("/admin/content/reviewed");

    export const getAdminPayouts = async () => {
  const res = await httpGet(
    "/admin/payouts"
  );

  return res;
};

export const getAdminPayoutStats = async () => {
  const res = await httpGet(
    "/admin/payouts/stats"
  );

  return res;
};

export const approveAdminPayout = (
  id
) => {
  return httpPatch(
    `/admin/payouts/${id}/approve`
  );
};

export const declineAdminPayout = ({
  id,
  reason,
}) => {
  return httpPatch(
    `/admin/payouts/${id}/decline`,
    {
      reason,
    }
  );
};

export const processAdminPayout = (
  id
) => {
  return httpPatch(
    `/admin/payouts/${id}/process`
  );
};

export const completeAdminPayout = ({
  id,
  transactionId,
}) => {
  return httpPatch(
    `/admin/payouts/${id}/complete`,
    {
      transactionId,
    }
  );
};

// ==============================
// ADMIN REPORTS
// ==============================

export const getAdminReports = (range = 30) => {
  return httpGet(`/admin/reports?range=${range}`);
};