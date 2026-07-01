import { useMutation } from "@tanstack/react-query";
import { createCollaboration } from "../services/collaboration.service";





export const useCreateCollaboration = () =>
    useMutation({
        mutationFn: createCollaboration,
    });