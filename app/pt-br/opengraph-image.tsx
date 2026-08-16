import OpenGraphImage, { contentType, size } from "@/app/opengraph-image";

export { contentType, size };

export default function PtBrOpenGraphImage() {
  return OpenGraphImage({ params: { locale: "pt-br" } });
}
