import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getThemeColour, updateThemeColour } from "../services/user.service";

export const useThemeColourQuery = () => {
  return useQuery({
    queryKey: ["theme"],
    queryFn: () => getThemeColour(),
  });
};

export const useThemeColourUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedData: any) => updateThemeColour(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["theme"]);
    },
  });
};
