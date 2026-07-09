import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  sendMessage,
  getConversations,
  getConversationMessages,
  markConversationRead,
  editMessage,
  deleteMessage,
  getDiscoverCreators,
  getDiscoverSubscribers,
} from "@/services/message.service";

/*
========================================
CONVERSATIONS
========================================
*/

export const useConversations = () =>
  useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

/*
========================================AC
MESSAGES
========================================
*/

export const useMessages = (
  conversationId
) =>
  useQuery({
    queryKey: [
      "messages",
      conversationId,
    ],
    queryFn: () =>
      getConversationMessages(
        conversationId
      ),
    enabled: !!conversationId,
  });

/*
========================================
SEND MESSAGE
========================================
*/

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,

    onSuccess: (response) => {
      const conversation =
        response.conversation;

      if (conversation?._id) {
        queryClient.invalidateQueries({
          queryKey: [
            "messages",
            conversation._id,
          ],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });

      return response;
    },
  });
};

/*
========================================
MARK READ
========================================
*/

export const useMarkConversationRead =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        markConversationRead,

      onSuccess: (_, id) => {
        queryClient.invalidateQueries({
          queryKey: [
            "messages",
            id,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "conversations",
          ],
        });
      },
    });
  };

/*
========================================
EDIT MESSAGE
========================================
*/

export const useEditMessage =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        messageId,
        text,
      }) =>
        editMessage(
          messageId,
          text
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "messages",
          ],
        });
      },
    });
  };

/*
========================================
DELETE MESSAGE
========================================
*/

export const useDeleteMessage =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteMessage,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "messages",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "conversations",
          ],
        });
      },
    });
  };

export const useDiscoverCreators = (enabled = true) =>
  useQuery({
    queryKey: ["discover-creators"],
    queryFn: getDiscoverCreators,
    enabled,
  });

export const useDiscoverSubscribers = (enabled = true) =>
  useQuery({
    queryKey: ["discover-subscribers"],
    queryFn: getDiscoverSubscribers,
    enabled,
  });