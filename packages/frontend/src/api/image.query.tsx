import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../services/image.service";

export const useImageUpload = () => {
  return useMutation({
    mutationFn: uploadImage,
  });
};
