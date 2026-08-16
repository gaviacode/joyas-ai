import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Aviso legal | joyas.ai",
  description: "Aviso legal básico de joyas.ai.",
};

export default function LegalNoticePage() {
  return (
    <InfoPage
      eyebrow="Información legal"
      title="Aviso legal"
      intro="Esta página recoge información legal básica sobre el uso de joyas.ai. Los datos identificativos definitivos deben completarse antes de la publicación formal del sitio."
      sections={[
        {
          title: "Titular del sitio",
          paragraphs: [
            "Titular: [Nombre del titular]",
            "NIF/CIF: [NIF/CIF]",
            "Dirección: [Dirección]",
            "Email de contacto: contacto@joyas.ai",
          ],
        },
        {
          title: "Objeto de la web",
          paragraphs: [
            "joyas.ai ofrece información orientativa y asistencia mediante inteligencia artificial para ayudar a elegir ideas de joyas según ocasión, estilo, presupuesto y destinatario.",
            "La información mostrada no constituye asesoramiento profesional personalizado ni garantiza la idoneidad de una joya concreta.",
          ],
        },
        {
          title: "Responsabilidad",
          paragraphs: [
            "El titular del sitio procurará que la información sea clara y prudente, pero no garantiza que todos los contenidos estén libres de errores o desactualizaciones.",
            "El usuario debe comprobar la información relevante antes de tomar decisiones de compra o contratación en sitios externos.",
          ],
        },
        {
          title: "Propiedad intelectual",
          paragraphs: [
            "Los textos, diseño, estructura y elementos visuales propios de joyas.ai están protegidos por la normativa aplicable sobre propiedad intelectual e industrial.",
            "No se permite reproducir o reutilizar contenidos del sitio sin autorización, salvo en los casos permitidos por la ley.",
          ],
        },
        {
          title: "Enlaces externos",
          paragraphs: [
            "joyas.ai puede incluir enlaces a sitios de terceros. Estos enlaces se ofrecen como referencia o posible vía comercial, pero joyas.ai no controla sus contenidos, políticas o condiciones.",
            "Cuando existan enlaces de afiliación, se indicará de forma transparente.",
          ],
        },
      ]}
    />
  );
}
