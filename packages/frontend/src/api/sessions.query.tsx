import { useMutation } from "@tanstack/react-query";
import { createSession } from "../services/sessions.service";

export const useSessionCreation = () => {
  return useMutation({
    mutationFn: createSession,
  });
};
