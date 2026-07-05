import { httpGet } from "@/lib/http";

export const getDashboard = () =>
  httpGet("/fan/dashboard");

export const getHistory = () =>
  httpGet("/fan/history");

export const getSubscriptions = () =>
  httpGet("/fan/subscriptions");

export const getPayments = () =>
  httpGet("/payment");