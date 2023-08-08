import { useQuery } from "@tanstack/react-query";
import { getImage, getImages } from "../services/image.service";

export const useImageQuery = () => {
  return useQuery({
    queryKey: ["image"],
    queryFn: () => getImage(),
  });
};

export const useImagesQuery = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: () => getImages(),
  });
};
