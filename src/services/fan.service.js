import {
  httpGet,
  httpPatch,
} from "@/lib/http";

export const getDashboard = () =>
  httpGet("/fan/dashboard");

export const getHistory = () =>
  httpGet("/fan/history");

export const getSubscriptions = () =>
  httpGet("/fan/subscriptions");

export const getPayments = () =>
  httpGet("/payments");

export const getCreatorById = (id) =>
  httpGet(`/fan/creator/${id}`);

// ===============================
// BANK TRANSFER
// ===============================

export const uploadBankReceipt = ({
    paymentId,
    file,
}) => {

    console.log("FILE:", file);

    const formData = new FormData();

    formData.append("receipt", file);

    console.log(formData.get("receipt"));

    return httpPatch(
        `/fan/payments/${paymentId}/receipt`,
        formData
    );
};