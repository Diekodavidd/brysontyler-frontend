// services/payment.service.js

import { httpGet } from "@/lib/http";
import { httpPost } from "../lib/http";

export const getPayment = (paymentId) =>
  httpGet(`/payments/now/${paymentId}`);

export const createSubscriptionPayment = (creatorId) =>
  httpPost("/payments/subscription", {
    creatorId,
  });