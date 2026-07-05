import { httpGet, httpPost } from "@/lib/http";

export const getWallet = () =>
  httpGet("/wallet");

export const buyCoins = (data) =>
    httpPost("/wallet/buy-coins", data);

export const addFunds = (amount) =>
  httpPost("/wallet/deposit", {
    amount,
  });