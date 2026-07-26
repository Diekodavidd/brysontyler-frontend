import {
  httpGet,
  httpPost,
  httpDelete,
  httpPatch,
} from "@/lib/http";

import { getToken } from "@/lib/token";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// =====================================================
// CREATOR CONTENT
// =====================================================

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

// =====================================================
// BRAND GALLERY
// =====================================================

export const getBrandGallery = async () => {
  const res = await httpGet("/content/brand");

  return res.videos;
};

export const uploadBrandVideo = async (formData) => {
  const token = getToken();

  console.log(
    "TOKEN FROM SERVICE:",
    token
  );

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
    throw new Error(
      data.error || "Upload failed"
    );
  }

  return data;
};

export const uploadBrandGallery = async (
  formData
) => {
  const token = getToken();

  const res = await fetch(
    `${API}/content/upload-brand-gallery`,
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
    throw new Error(
      data.error ||
        "Gallery upload failed"
    );
  }

  return data;
};

export const deleteBrandVideo = (id) => {
  return httpDelete(
    `/content/brand/${id}`
  );
};

// =====================================================
// GENERAL GALLERY
// =====================================================

export const getGallery = async () => {
  const res = await httpGet(
    "/content/gallery"
  );

  return res.content || [];
};

export const uploadCreatorImages = async ({
  data,
  onUploadProgress,
}) => {
  const token = getToken();

  const res = await axios.post(
    `${API}/content/upload-images`,
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