import {
  httpGet,
  httpDelete,
  httpPatch,
} from "@/lib/http";

import { getToken } from "@/lib/token";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getMyContent = async () => {
  const res = await httpGet("/content/my-content");
  return res.content;
};

export const deleteContent = (id) => {
  return httpDelete(`/content/${id}`);
};

export const uploadContent = async ({
  data,
  onUploadProgress,
}) => {
  const token = getToken();

  const res = await axios.post(
    `${API}/content/upload`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) return;

        const percent = Math.round(
  (progressEvent.loaded * 95) /
  progressEvent.total
);

onUploadProgress?.(percent);

      },
    }
  );

  return res.data;
};

export const updateContent = ({
  id,
  title,
  description,
  category,
  visibility,
  price,
  releaseDate,
  releaseTime,
  tags,
}) => {
  return httpPatch(`/content/${id}`, {
    title,
    description,
    category,
    visibility,
    price,
    releaseDate,
    releaseTime,
    tags,
  });
};

export const getBrandGallery = async () => {
  const res = await httpGet("/content/brand");
  return res.videos;
};

export const uploadBrandVideo = async (formData) => {
  const token = getToken();

  console.log("TOKEN FROM SERVICE:", token);

  const res = await fetch(
    `${API}/content/upload-brand`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Upload failed");
  }

  return data;
};


// export const uploadBrandVideo = async ({
//   data,
//   onUploadProgress,
// }) => {
//   const token = getToken();

//   const res = await axios.post(
//     `${API}/content/upload-brand`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },

//       onUploadProgress: (progressEvent) => {
//         if (!progressEvent.total) return;

//         const percent = Math.round(
//           (progressEvent.loaded * 100) /
//             progressEvent.total
//         );

//         onUploadProgress?.(percent);
//       },
//     }
//   );

//   return res.data;
// };

export const deleteBrandVideo = (id) => {
  return httpDelete(`/content/brand/${id}`);
};

export const getGallery = async () => {
    const res = await httpGet("/content/gallery");
    return res.videos;
};