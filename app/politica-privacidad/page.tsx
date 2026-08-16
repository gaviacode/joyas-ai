import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Politica de privacidad | joyas.ai",
  description: "Politica de privacidad basica de joyas.ai.",
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      eyebrow="Privacidad"
      title="Politica de privacidad"
      intro="Esta politica explica de forma basica que datos podrian tratarse al usar joyas.ai. Debe revisarse y completarse cuando el proyecto incorpore nuevos servicios o funcionalidades."
      sections={[
        {
          title: "Responsable",
          paragraphs: [
            "Responsable del tratamiento: [Nombre del titular]",
            "NIF/CIF: [NIF/CIF]",
            "Email de contacto: contacto@joyas.ai",
          ],
        },
        {
          title: "Datos que puede tratar la web",
          paragraphs: [
            "joyas.ai puede tratar la informacion que el usuario introduce voluntariamente en el chat para generar una orientacion sobre joyas.",
            "Tambien puede tratar los datos que el usuario envie por email si contacta con el proyecto, como direccion de correo, nombre si lo facilita y contenido del mensaje.",
          ],
        },
        {
          title: "Mensajes enviados al chat",
          paragraphs: [
            "Los mensajes del chat se utilizan para responder a la consulta del usuario y mejorar la utilidad inmediata de la conversacion.",
            "No conviene introducir datos especialmente sensibles, informacion financiera, documentos de identidad ni datos personales innecesarios para elegir una joya.",
          ],
        },
        {
          title: "Analitica con consentimiento",
          paragraphs: [
            "joyas.ai puede utilizar Google Analytics 4 para obtener informacion estadistica sobre el uso del sitio cuando el usuario autoriza las cookies analiticas.",
            "Las cookies analiticas estan desactivadas por defecto y pueden aceptarse, rechazarse o retirarse desde la configuracion de cookies.",
            "No se concede consentimiento publicitario al aceptar analitica.",
          ],
        },
        {
          title: "Derechos del usuario",
          paragraphs: [
            "El usuario puede solicitar informacion, acceso, rectificacion, supresion, oposicion, limitacion u otros derechos reconocidos por la normativa aplicable escribiendo a contacto@joyas.ai.",
            "La solicitud debera permitir identificar razonablemente a la persona interesada y el derecho que desea ejercer.",
          ],
        },
      ]}
    />
  );
}
