import { httpGet, httpDelete } from "@/lib/http";
import { getToken } from "@/lib/token";

const API = import.meta.env.VITE_API_URL;

export const getMyContent = () => {
  return httpGet("/content/my-content");
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