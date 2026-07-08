import { httpGet, httpPost, httpPatch } from "@/lib/http";

/*
====================================
Membership
====================================
*/

export const createMembership = (plan, provider = "nowpayments") =>
    httpPost("/payments/membership", {
        plan,
        provider,
    });

/*
====================================
Creator Subscription
====================================
*/

export const createSubscription = (
    creatorId,
    provider = "nowpayments"
) =>
    httpPost("/payments/subscription", {
        creatorId,
        provider,
    });

/*
====================================
Wallet Deposit
====================================
*/

export const depositWallet = (
    amount,
    provider = "nowpayments"
) =>
    httpPost("/payments/wallet/deposit", {
        amount,
        provider,
    });

/*
====================================
Buy Coins
====================================
*/

export const buyCoins = (
    coinType,
    quantity,
    provider = "nowpayments"
) =>
    httpPost("/payments/wallet/coins", {
        coinType,
        quantity,
        provider,
    });

/*
====================================
History
====================================
*/

export const getPayments = () =>
    httpGet("/payments");

/*
====================================
Single Payment
====================================
*/

export const getPayment = (paymentId) =>
    httpGet(`/payments/${paymentId}`);

/*
====================================
Cancel Payment
====================================
*/

export const cancelPayment = (paymentId) =>
    httpPatch(`/payments/${paymentId}/cancel`);