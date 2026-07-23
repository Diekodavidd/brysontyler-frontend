import {
  httpGet,
  httpPatch,
} from "@/lib/http";

export const getNotifications = () =>
  httpGet("/notifications");

export const markNotificationAsRead = (id) =>
  httpPatch(`/notifications/${id}/read`);

export const markAllNotificationsAsRead = () =>
  httpPatch("/notifications/read-all");