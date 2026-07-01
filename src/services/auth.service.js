import {
  httpGet,
  httpPost,
} from "../lib/http";
import { clearToken } from "../lib/token";

export const signUp = (payload) => {
  return httpPost(
    "/auth/register",
    payload
  );
};

export const signIn = (payload) => {
  return httpPost(
    "/auth/login",
    payload
  );
};

export const forgotPassword = (payload) => {
  return httpPost(
    "/auth/forgot-password",
    payload
  );
};

export const ChangePassword = (payload) => {
  return httpPost(
    "/auth/change-password",
    payload
  );
};

export const resetPassword = (payload) => {
  return httpPost(
    `/auth/reset-password/${payload.token}`,
    payload
  );
};

export const getAuthUser = () => {
  return httpGet("/auth/me");
};

// Pure-SPA logout: the JWT lives in localStorage,
// so clearing it is the logout.
export const logout = async () => {
  clearToken();

  return {
    message: "Logged out",
  };
};

export const startKYC = () => {
  return httpPost(
    "/kyc/start",
    undefined
  );
};

export const getMe = () => httpGet("/auth/me");