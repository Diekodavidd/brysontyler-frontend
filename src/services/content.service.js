import {
  httpGet,
  httpDelete,
  httpPatch,
} from "@/lib/http";
import { getToken } from "@/lib/token";

const API = import.meta.env.VITE_API_URL;

export const getMyContent = async () => {
  const res = await httpGet("/content/my-content");
  return res.content;
};

export const deleteContent = (id) => {
  return httpDelete(`/content/${id}`);
};

export const uploadContent = async (formData) => {
  const token = getToken();

  const res = await fetch(`${API}/content/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};

export const updateContent = ({ id, title, protection }) => {
  return httpPatch(`/content/${id}`, {
    title,
    protection,
  });
};