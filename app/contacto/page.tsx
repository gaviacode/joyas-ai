import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Contacto | joyas.ai",
  description: "Página de contacto de joyas.ai.",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contacto"
      title="Contacto"
      intro="Puedes contactar con joyas.ai para consultas, colaboraciones o información sobre el proyecto."
      sections={[
        {
          title: "Email",
          paragraphs: [
            "Email de contacto: contacto@joyas.ai",
            "Por ahora no hay formulario funcional en la web. Si se añade uno más adelante, se indicará claramente cómo se tratan los datos enviados.",
          ],
        },
      ]}
    />
  );
}
