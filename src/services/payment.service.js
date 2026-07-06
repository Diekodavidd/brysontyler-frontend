// services/payment.service.js

import { httpGet } from "@/lib/http";
import { httpPost } from "../lib/http";

export const getPayment = (invoiceId) =>
    httpGet(`/payments/invoice/${invoiceId}`);

export const createSubscriptionPayment = (creatorId) =>
  httpPost("/payments/subscription", {
    creatorId,
  });