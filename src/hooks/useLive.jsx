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
  joinLiveSession,
  leaveLiveSession,
  endLiveSession,
} from "@/services/live.service";

export const useLiveSessions = () =>
  useQuery({
    queryKey: ["live-sessions"],
    queryFn: getLiveSessions,
  });

export const useLiveSession = (id) =>
  useQuery({
    queryKey: ["live-session", id],
    queryFn: () => getLiveSession(id),
    enabled: !!id,
  });

export const useMyLiveSessions = () =>
  useQuery({
    queryKey: ["my-live-sessions"],
    queryFn: getMyLiveSessions,
  });

export const useCreateLive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLiveSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-live-sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["live-sessions"],
      });
    },
  });
};

export const useJoinLive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinLiveSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["live-sessions"],
      });
    },
  });
};

export const useLeaveLive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveLiveSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["live-sessions"],
      });
    },
  });
};

export const useEndLive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: endLiveSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-live-sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["live-sessions"],
      });
    },
  });
};