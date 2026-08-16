import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Politica de cookies | joyas.ai",
  description:
    "Informacion sobre cookies necesarias y cookies analiticas de Google Analytics en joyas.ai.",
};

export default function CookiesPage() {
  return (
    <InfoPage
      eyebrow="Cookies"
      title="Politica de cookies"
      intro="Esta pagina explica que cookies puede utilizar joyas.ai y como puedes aceptar, rechazar o cambiar el consentimiento para cookies analiticas."
      sections={[
        {
          title: "Cookies necesarias",
          paragraphs: [
            "joyas.ai puede usar almacenamiento tecnico necesario para recordar tu decision sobre cookies y para que la web funcione correctamente.",
            "Estas cookies o mecanismos tecnicos necesarios no se usan para analitica y permanecen siempre activados.",
          ],
        },
        {
          title: "Cookies analiticas",
          paragraphs: [
            "joyas.ai utiliza Google Analytics 4 unicamente cuando autorizas las cookies analiticas.",
            "Google Analytics permite obtener informacion estadistica sobre el uso del sitio, como interacciones y cambios de pagina, para entender como se utiliza la web y mejorarla.",
            "No afirmamos que estos datos sean completamente anonimos. El tratamiento concreto depende de Google Analytics, de la configuracion aplicada y de la informacion tecnica que pueda transmitirse durante la navegacion.",
          ],
        },
        {
          title: "Cookies de Google Analytics 4",
          paragraphs: [
            "Segun la documentacion oficial de Google Analytics 4, sus etiquetas JavaScript pueden usar cookies de primera parte como _ga, usada para distinguir usuarios, y _ga_<container-id>, usada para mantener el estado de la sesion.",
            "Google indica una duracion predeterminada de 2 años para esas cookies. Esta informacion puede cambiar si Google modifica su documentacion o si se cambia la configuracion de la propiedad.",
          ],
        },
        {
          title: "Consentimiento",
          paragraphs: [
            "Las cookies analiticas estan desactivadas por defecto. Entrar en la web, navegar, hacer scroll o cerrar el banner no implica consentimiento.",
            "Puedes aceptar, rechazar o configurar la categoria Analiticas desde el banner inicial. Tambien puedes cambiar tu decision desde el enlace Configurar cookies del footer.",
            "Si retiras el consentimiento, joyas.ai actualiza Google Consent Mode a analytics_storage: denied, impide futuros envios analiticos desde la implementacion y elimina las cookies de Google Analytics que la web puede controlar tecnicamente.",
          ],
        },
        {
          title: "Marketing",
          paragraphs: [
            "Actualmente el banner no incluye una categoria de marketing porque joyas.ai no ha implementado un sistema de publicidad personalizada que la requiera.",
            "El consentimiento publicitario se mantiene separado de la analitica y no se concede automaticamente al aceptar Google Analytics.",
          ],
        },
      ]}
    />
  );
}
