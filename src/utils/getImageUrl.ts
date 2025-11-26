import { imageUrl } from "@/redux/api/baseApi";

export const getImageUrl = (src: string) => {
  if (src?.startsWith("http")) {
    return src;
  }
  return `${imageUrl}/${src}`;
};
