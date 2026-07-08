import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
Eres el joyero experto de joyas.ai.
Tu objetivo es ayudar al usuario a elegir una joya adecuada según ocasión, destinatario, estilo, presupuesto y relación con la persona.
Haz preguntas breves si falta información importante.
Recomienda categorías de joyas, estilos, materiales y rangos de presupuesto.
No inventes productos reales, precios exactos, stock, tiendas ni descuentos.
No prometas que una joya es perfecta; usa lenguaje prudente como "podría encajar", "te recomendaría mirar", "una buena opción sería".
Si el usuario quiere comprar, explica que más adelante se podrán mostrar productos reales de tiendas afiliadas.
Mantén un tono elegante, cercano, claro y profesional.
Responde siempre en español.
No uses Markdown; responde con texto claro, párrafos cortos y listas sencillas si hacen falta.
`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function isChatMessage(message: unknown): message is ChatMessage {
  if (!message || typeof message !== "object") {
    return false;
  }

  const candidate = message as Partial<ChatMessage>;

  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "TU_API_KEY_AQUI") {
      return NextResponse.json(
        { error: "Falta configurar GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as { messages?: unknown };
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No se han recibido mensajes." },
        { status: 400 }
      );
    }

    if (!messages.every(isChatMessage)) {
      return NextResponse.json(
        { error: "El formato de los mensajes no es válido." },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    if (!lastUserMessage?.content.trim()) {
      return NextResponse.json(
        { error: "El mensaje está vacío." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const conversationText = messages
      .slice(-8)
      .map((message) => {
        const role = message.role === "user" ? "Usuario" : "Joyero IA";
        return `${role}: ${message.content}`;
      })
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `${SYSTEM_PROMPT}\n\nConversación:\n${conversationText}\n\nRespuesta del joyero IA:`,
    });

    const reply =
      response.text?.trim() ||
      "Ahora mismo no puedo generar una recomendación. Prueba a reformular la pregunta.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini chat error:", error);

    return NextResponse.json(
      {
        error:
          "No he podido responder ahora mismo. Inténtalo de nuevo en unos segundos.",
      },
      { status: 500 }
    );
  }
}
