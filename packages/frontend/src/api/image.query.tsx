import { useQuery } from "@tanstack/react-query";
import { getImages } from "../services/image.service";

export const useImageQuery = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: () => getImages(),
  });
};
