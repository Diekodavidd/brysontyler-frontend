import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getLiveSessions,
  getMyLiveSessions,
  getLiveSession,
  createLiveSession,
  scheduleLiveSession,
  joinLiveSession,
  leaveLiveSession,
  endLiveSession,
} from "@/services/live.service";

import { toast } from "react-toastify";

/* ===========================
   QUERIES
=========================== */

export const useLiveSessions = () =>
  useQuery({
    queryKey: ["live-sessions"],
    queryFn: getLiveSessions,
  });

export const useMyLiveSessions = () =>
  useQuery({
    queryKey: ["my-live-sessions"],
    queryFn: getMyLiveSessions,
  });

export const useLiveSession = (id) =>
  useQuery({
    queryKey: ["live-session", id],
    queryFn: () => getLiveSession(id),
    enabled: !!id,
  });

/* ===========================
   CREATE LIVE
=========================== */

export const useCreateLive = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createLiveSession,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["my-live-sessions"],
      });

      qc.invalidateQueries({
        queryKey: ["live-sessions"],
      });

      toast.success("Live stream created.");
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          "Unable to create live stream."
      );
    },
  });
};

/* ===========================
   SCHEDULE LIVE
=========================== */

export const useScheduleLive = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: scheduleLiveSession,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["my-live-sessions"],
      });

      toast.success("Live stream scheduled.");
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          "Unable to schedule stream."
      );
    },
  });
};

/* ===========================
   JOIN LIVE
=========================== */

export const useJoinLive = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: joinLiveSession,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["live-sessions"],
      });
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          "Unable to join stream."
      );
    },
  });
};

/* ===========================
   LEAVE LIVE
=========================== */

export const useLeaveLive = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: leaveLiveSession,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["live-sessions"],
      });
    },
  });
};

/* ===========================
   END LIVE
=========================== */

export const useEndLive = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: endLiveSession,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["my-live-sessions"],
      });

      qc.invalidateQueries({
        queryKey: ["live-sessions"],
      });

      toast.success("Live stream ended.");
    },

    onError: (err) => {
      toast.error(
        err?.response?.data?.error ||
          "Unable to end stream."
      );
    },
  });
};