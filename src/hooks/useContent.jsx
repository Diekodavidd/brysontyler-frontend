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