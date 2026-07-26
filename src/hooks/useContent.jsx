import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as contentService from "@/services/content.service";
import { toast } from "react-toastify";

export function useMyContent() {
  return useQuery({
    queryKey: ["creator-content"],
    queryFn: contentService.getMyContent,
  });
}

export function useUploadContent() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: contentService.uploadContent,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["creator-content"],
      });

      toast.success("Content uploaded");
    },
  });
}

export function useUpdateContent() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: contentService.updateContent,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["creator-content"],
      });

      toast.success("Content updated");
    },
  });
}

export function useDeleteContent() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: contentService.deleteContent,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["creator-content"],
      });

      toast.success("Content deleted");
    },
  });
}
export function useBrandGallery() {
  return useQuery({
    queryKey: ["brand-gallery"],
    queryFn: contentService.getBrandGallery,
  });
}

export function useUploadBrandVideo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: contentService.uploadBrandVideo,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["brand-gallery"],
      });

      toast.success(
        "Video uploaded successfully."
      );
    },
  });
}

export function useDeleteBrandVideo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: contentService.deleteBrandVideo,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["brand-gallery"],
      });

      toast.success("Video deleted.");
    },
  });
}
export function useGallery() {
    return useQuery({
        queryKey: ["gallery"],
        queryFn: contentService.getGallery,
    });
}

export function useUploadBrandGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contentService.uploadBrandGallery,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brand-gallery"],
      });

      toast.success(
        "Gallery images uploaded successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error?.message ||
        "Failed to upload gallery images."
      );
    },
  });
}

export function useUploadCreatorImages() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn:
      contentService.uploadCreatorImages,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["creator-content"],
      });

      toast.success(
        "Images uploaded successfully."
      );
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.error ||
        error?.message ||
        "Image upload failed."
      );
    },
  });
}