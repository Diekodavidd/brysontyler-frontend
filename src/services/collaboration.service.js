
import {
  httpGet,
  httpPost,
} from "@/lib/http";




export const createCollaboration = (data) =>
    httpPost("/collaboration/request", data);