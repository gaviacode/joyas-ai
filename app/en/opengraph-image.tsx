import OpenGraphImage, { contentType, size } from "@/app/opengraph-image";

export { contentType, size };

export default function EnOpenGraphImage() {
  return OpenGraphImage({ params: { locale: "en" } });
}
