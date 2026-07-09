import {
  httpGet,
  httpPost,
  httpPatch,
  httpDelete,
} from "@/lib/http";

/*
========================================
SEND MESSAGE
========================================
Supports:
- text
- image
- video
*/

export const sendMessage = (payload) => {
  const formData = new FormData();

  if (payload.creatorId)
    formData.append(
      "creatorId",
      payload.creatorId
    );

  if (payload.fanId)
    formData.append(
      "fanId",
      payload.fanId
    );

  if (payload.text)
    formData.append(
      "text",
      payload.text
    );

  if (payload.attachment)
    formData.append(
      "attachment",
      payload.attachment
    );

  return httpPost(
    "/messages/send",
    formData
  );
};

/*
========================================
CONVERSATIONS
========================================
*/

export const getConversations = () =>
  httpGet("/messages/conversations");

/*
========================================
MESSAGES
========================================
*/

export const getConversationMessages = (
  conversationId
) =>
  httpGet(
    `/messages/conversation/${conversationId}`
  );

/*
========================================
MARK READ
========================================
*/

export const markConversationRead = (
  conversationId
) =>
  httpPatch(
    `/messages/conversation/${conversationId}/read`
  );

/*
========================================
EDIT
========================================
*/

export const editMessage = (
  messageId,
  text
) =>
  httpPatch(
    `/messages/${messageId}`,
    {
      text,
    }
  );

/*
========================================
DELETE
========================================
*/

export const deleteMessage = (
  messageId
) =>
  httpDelete(
    `/messages/${messageId}`
  );

  export const getDiscoverCreators = () =>
  httpGet("/messages/discover");

  export const getDiscoverSubscribers = () =>
  httpGet("/messages/subscribers");