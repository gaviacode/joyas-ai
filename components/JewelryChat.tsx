"use client";

import {
  FormEvent,
  KeyboardEvent,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const quickSuggestions = [
  "Quiero regalar algo por menos de 100 €",
  "Busco una joya para aniversario",
  "No sé si regalar collar o pulsera",
  "Quiero algo elegante pero discreto",
];

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Cuéntame para quién es la joya, la ocasión y un presupuesto aproximado. Te orientaré con opciones generales sin inventar productos concretos.",
  },
];

export default function JewelryChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  async function sendMessage(messageText = input) {
    const content = messageText.trim();

    if (!content || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "No he podido responder ahora mismo.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            data.reply ||
            "Ahora mismo no puedo generar una recomendación. Prueba a reformular la pregunta.",
        },
      ]);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "No he podido responder ahora mismo. Inténtalo de nuevo en unos segundos.";

      setError(message);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            "No he podido conectar con el joyero IA ahora mismo. Revisa la configuración o inténtalo de nuevo en unos segundos.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      void sendMessage();
    }
  }

  function handleInputPointerDown(event: PointerEvent<HTMLInputElement>) {
    if (document.activeElement === event.currentTarget) {
      return;
    }

    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
  }

  return (
    <div className="w-full max-w-full overflow-hidden rounded-3xl border border-[#ead8b3] bg-white/90 p-4 shadow-2xl shadow-[#805400]/10 sm:p-5 lg:p-6">
      <div className="flex min-w-0 flex-col gap-6 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9b7b3a]">
            Joyero IA
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#17120b] sm:text-4xl">
            Pregunta al joyero IA
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#63584c]">
            Cuéntanos la ocasión, presupuesto y estilo. Te orientaremos sin
            inventar productos concretos.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void sendMessage(suggestion)}
                disabled={isLoading}
                className="max-w-full rounded-full border border-[#ead8b3] bg-[#fffaf1] px-4 py-2 text-left text-xs font-semibold text-[#5f4a24] transition hover:border-[#c89a43] hover:bg-[#fff4dd] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-3xl border border-[#eadfca] bg-[#fbf7ef] p-3 sm:p-4">
          <div
            ref={messagesContainerRef}
            className="max-h-[360px] min-h-[300px] space-y-3 overflow-y-auto overscroll-contain pr-1 sm:max-h-[420px] sm:min-h-[340px]"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] whitespace-pre-wrap break-words rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                  message.role === "user"
                    ? "ml-auto bg-[#17120b] text-white"
                    : "bg-white text-[#4f463c]"
                }`}
              >
                {message.content}
              </div>
            ))}

            {isLoading ? (
              <div className="max-w-[88%] rounded-3xl bg-white px-4 py-3 text-sm leading-6 text-[#4f463c] shadow-sm">
                Pensando una recomendación prudente...
              </div>
            ) : null}

          </div>

          {error ? (
            <p className="mt-3 rounded-2xl border border-[#ead8b3] bg-white px-4 py-3 text-xs leading-5 text-[#7a5a1d]">
              {error}
            </p>
          ) : null}

          <form
            onSubmit={handleSubmit}
            className="mt-4 flex min-w-0 flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              onPointerDown={handleInputPointerDown}
              placeholder="Ej: quiero regalar una joya elegante por menos de 150 €"
              className="h-12 w-full min-w-0 flex-1 rounded-2xl border border-[#ead8b3] bg-[#fffdf8] px-4 text-sm text-[#17120b] outline-none transition placeholder:text-[#9a8d7b] focus:border-[#d7a63c] focus:ring-2 focus:ring-[#d7a63c]/20"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-full rounded-2xl bg-gradient-to-r from-[#b97a05] to-[#d7a63c] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-[#a86f05] hover:to-[#c89a34] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-end"
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
