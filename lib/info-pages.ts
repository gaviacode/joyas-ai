import type { InfoPageKind, Locale } from "@/lib/i18n";

export type LocalizedInfoPage = {
  kind: InfoPageKind;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
  }>;
  ctaLabel?: string;
};

const infoPages: Record<Locale, Record<InfoPageKind, LocalizedInfoPage>> = {
  es: {
    "como-funciona": {
      kind: "como-funciona",
      title: "Cómo funciona joyas.ai",
      description: "Explicación transparente de cómo joyas.ai usa la información proporcionada para generar recomendaciones orientativas de joyas.",
      eyebrow: "Joyero IA",
      intro: "joyas.ai genera orientación a partir de la información que le das. No conoce los gustos reales de otra persona ni sustituye la comprobación de talla, materiales, precio o condiciones de compra.",
      sections: [
        { title: "Proceso", paragraphs: ["Explica qué estás buscando, añade presupuesto, ocasión, destinatario, estilo y materiales si los conoces, y el joyero IA propondrá tipos de joya y criterios de elección.", "Puedes continuar la conversación para afinar la recomendación sin que la web invente productos, tiendas, reseñas ni stock."] },
        { title: "Qué puede y qué no puede hacer", paragraphs: ["Puede ayudarte a comparar tipos de joyas, identificar riesgos de compra y ordenar criterios como ocasión, presupuesto, metal, talla o estilo.", "No puede garantizar que el regalo guste, confirmar disponibilidad de productos externos ni verificar por sí sola composición, certificados o políticas de una tienda."] },
      ],
      ctaLabel: "Probar el joyero IA",
    },
    "joyero-ia": {
      kind: "joyero-ia",
      title: "Joyero IA: recomendador de joyas",
      description: "Qué puede hacer el joyero IA de joyas.ai y ejemplos de consultas para recibir recomendaciones orientativas.",
      eyebrow: "Recomendador",
      intro: "El joyero IA ayuda a ordenar preferencias y convertirlas en ideas de joyas genéricas, prudentes y fáciles de comparar.",
      sections: [
        { title: "Qué puedes pedir", paragraphs: ["Puedes pedir ideas por ocasión, destinatario, presupuesto, estilo, materiales o dudas concretas sobre una compra.", "El recomendador no muestra productos concretos en esta fase; su objetivo es ayudarte a decidir qué tipo de joya buscar."] },
      ],
      ctaLabel: "Abrir recomendador",
    },
    "preguntas-frecuentes": {
      kind: "preguntas-frecuentes",
      title: "Preguntas frecuentes",
      description: "Respuestas transparentes sobre el recomendador de joyas con IA, presupuesto, afiliación, tallas y materiales.",
      eyebrow: "Ayuda",
      intro: "Respuestas prudentes sobre el recomendador, materiales, tallas y transparencia comercial.",
      sections: [
        { title: "¿joyas.ai vende joyas directamente?", paragraphs: ["No. joyas.ai orienta la elección y ofrece contenido informativo. Si aparecen enlaces a tiendas externas, se identificarán con claridad."] },
        { title: "¿Cómo sabe la IA qué joya recomendarme?", paragraphs: ["Usa los datos que introduces, como ocasión, presupuesto, destinatario, estilo y materiales, para proponer opciones razonables."] },
        { title: "¿Puede garantizar que el regalo guste?", paragraphs: ["No. Puede reducir dudas y proponer opciones coherentes, pero el gusto personal nunca se puede garantizar."] },
      ],
    },
    "sobre-joyas-ai": {
      kind: "sobre-joyas-ai",
      title: "Sobre joyas.ai",
      description: "Conoce joyas.ai, un proyecto para elegir joyas con ayuda de IA, contenido educativo y criterios de compra claros.",
      eyebrow: "Proyecto",
      intro: "joyas.ai nace con la idea de hacer más sencilla una decisión que a menudo resulta complicada: elegir una joya para otra persona o para uno mismo.",
      sections: [
        { title: "Orientación mediante IA", paragraphs: ["El recomendador ayuda a ordenar información sobre ocasión, presupuesto, destinatario y estilo para proponer tipos de joyas y criterios de elección."] },
        { title: "Contenido educativo", paragraphs: ["Las guías explican materiales, tallas, cuidados y piedras con prudencia, indicando cuándo algo depende de la pieza concreta."] },
      ],
      ctaLabel: "Preguntar al joyero IA",
    },
    transparencia: {
      kind: "transparencia",
      title: "Transparencia y afiliación",
      description: "Información sobre enlaces externos, posible afiliación y criterios de transparencia en joyas.ai.",
      eyebrow: "Transparencia",
      intro: "Algunas secciones pueden incorporar enlaces a tiendas externas. Cuando un enlace sea de afiliado, se indicará de forma clara.",
      sections: [
        { title: "Estado actual", paragraphs: ["joyas.ai es un proyecto en desarrollo. No debe entenderse que todas las secciones tengan afiliación activa ni acuerdos comerciales con tiendas concretas salvo que se indique expresamente."] },
        { title: "Enlaces externos", paragraphs: ["Antes de comprar en una tienda externa, revisa precio, disponibilidad, composición, envío, devoluciones, garantía y condiciones de ajuste o personalización."] },
      ],
    },
    "transparencia-afiliacion": {
      kind: "transparencia-afiliacion",
      title: "Transparencia de afiliación",
      description: "Criterios de joyas.ai sobre enlaces de afiliado y recomendaciones comerciales.",
      eyebrow: "Afiliación",
      intro: "Si joyas.ai usa enlaces de afiliado, la relación comercial se explicará para que puedas valorar la recomendación con contexto.",
      sections: [
        { title: "Criterio editorial", paragraphs: ["La existencia de una comisión no debe justificar reseñas inventadas, métricas falsas ni promesas que no se puedan comprobar."] },
      ],
    },
    contacto: {
      kind: "contacto",
      title: "Contacto",
      description: "Página de contacto de joyas.ai.",
      eyebrow: "Contacto",
      intro: "Puedes contactar con joyas.ai para consultas, colaboraciones o información sobre el proyecto.",
      sections: [{ title: "Email", paragraphs: ["Email de contacto: gaviacode@gmail.com"] }],
    },
    "aviso-legal": {
      kind: "aviso-legal",
      title: "Aviso legal",
      description: "Información legal básica de joyas.ai.",
      eyebrow: "Legal",
      intro: "Esta página reúne información legal básica del proyecto joyas.ai.",
      sections: [
        { title: "Datos del titular pendientes", paragraphs: ["Antes de promocionar la web de forma definitiva conviene completar nombre o razón social, NIF/CIF si procede, domicilio o dirección de contacto legal y cualquier dato exigible según la normativa aplicable."] },
        { title: "Contacto operativo", paragraphs: ["Email de contacto: gaviacode@gmail.com"] },
        { title: "Uso del sitio", paragraphs: ["El contenido de joyas.ai tiene carácter informativo y no sustituye la revisión de datos concretos antes de comprar una joya."] },
      ],
    },
    "politica-privacidad": {
      kind: "politica-privacidad",
      title: "Política de privacidad",
      description: "Política de privacidad básica de joyas.ai.",
      eyebrow: "Privacidad",
      intro: "Esta política explica de forma básica qué datos podrían tratarse al usar joyas.ai.",
      sections: [
        { title: "Responsable pendiente de completar", paragraphs: ["La información identificativa completa del responsable debe añadirse antes de promocionar joyas.ai de forma definitiva. Email operativo: gaviacode@gmail.com."] },
        { title: "Datos del chat", paragraphs: ["El chat puede tratar la información que introduces voluntariamente para generar recomendaciones. No conviene introducir datos especialmente sensibles, información financiera, documentos de identidad ni datos personales innecesarios para elegir una joya."] },
        { title: "Analítica con consentimiento", paragraphs: ["Google Analytics solo se carga si existe configuración de Analytics y si aceptas las cookies analíticas. Puedes retirar o cambiar el consentimiento desde la configuración de cookies."] },
      ],
    },
    cookies: {
      kind: "cookies",
      title: "Política de cookies",
      description: "Información sobre cookies necesarias y cookies analíticas en joyas.ai.",
      eyebrow: "Cookies",
      intro: "Esta página explica qué cookies puede utilizar joyas.ai y cómo puedes aceptar, rechazar o cambiar el consentimiento para cookies analíticas.",
      sections: [{ title: "Cookies necesarias y analíticas", paragraphs: ["Las cookies necesarias permiten funciones básicas. Las analíticas solo se usan con consentimiento y ayudan a medir el uso de la web."] }],
    },
  },
  "pt-BR": {
    "como-funciona": {
      kind: "como-funciona",
      title: "Como funciona a joyas.ai",
      description: "Explicação transparente de como a joyas.ai usa as informações fornecidas para gerar recomendações orientativas de joias.",
      eyebrow: "Joalheiro IA",
      intro: "A joyas.ai gera orientação a partir das informações que você fornece. Ela não conhece os gostos reais de outra pessoa nem substitui a verificação de tamanho, materiais, preço ou condições de compra.",
      sections: [
        { title: "Processo", paragraphs: ["Explique o que procura, adicione orçamento, ocasião, destinatário, estilo e materiais se souber, e o joalheiro IA sugerirá tipos de joia e critérios de escolha.", "Você pode continuar a conversa para refinar a recomendação sem que o site invente produtos, lojas, avaliações ou estoque."] },
        { title: "O que pode e o que não pode fazer", paragraphs: ["Pode ajudar a comparar tipos de joias, identificar riscos de compra e organizar critérios como ocasião, orçamento, metal, tamanho ou estilo.", "Não pode garantir que o presente agrade, confirmar disponibilidade de produtos externos nem verificar sozinho composição, certificados ou políticas de uma loja."] },
      ],
      ctaLabel: "Testar o joalheiro IA",
    },
    "joyero-ia": {
      kind: "joyero-ia",
      title: "Joalheiro IA: recomendador de joias",
      description: "O que o joalheiro IA da joyas.ai pode fazer e exemplos de consultas para receber recomendações orientativas.",
      eyebrow: "Recomendador",
      intro: "O joalheiro IA ajuda a organizar preferências e transformá-las em ideias de joias genéricas, prudentes e fáceis de comparar.",
      sections: [{ title: "O que você pode pedir", paragraphs: ["Você pode pedir ideias por ocasião, destinatário, orçamento, estilo, materiais ou dúvidas concretas sobre uma compra.", "Nesta fase, o recomendador não mostra produtos concretos; seu objetivo é ajudar a decidir que tipo de joia procurar."] }],
      ctaLabel: "Abrir recomendador",
    },
    "preguntas-frecuentes": {
      kind: "preguntas-frecuentes",
      title: "Perguntas frequentes",
      description: "Respostas transparentes sobre o recomendador de joias com IA, orçamento, afiliados, tamanhos e materiais.",
      eyebrow: "Ajuda",
      intro: "Respostas prudentes sobre o recomendador, materiais, tamanhos e transparência comercial.",
      sections: [
        { title: "A joyas.ai vende joias diretamente?", paragraphs: ["Não. A joyas.ai orienta a escolha e oferece conteúdo informativo. Se houver links para lojas externas, eles serão identificados com clareza."] },
        { title: "Como a IA sabe que joia recomendar?", paragraphs: ["Ela usa os dados que você informa, como ocasião, orçamento, destinatário, estilo e materiais, para propor opções razoáveis."] },
        { title: "Pode garantir que o presente vai agradar?", paragraphs: ["Não. Pode reduzir dúvidas e propor opções coerentes, mas o gosto pessoal nunca pode ser garantido."] },
      ],
    },
    "sobre-joyas-ai": {
      kind: "sobre-joyas-ai",
      title: "Sobre a joyas.ai",
      description: "Conheça a joyas.ai, um projeto para escolher joias com ajuda de IA, conteúdo educativo e critérios claros de compra.",
      eyebrow: "Projeto",
      intro: "A joyas.ai nasceu para tornar mais simples uma decisão que muitas vezes é difícil: escolher uma joia para outra pessoa ou para si mesmo.",
      sections: [
        { title: "Orientação com IA", paragraphs: ["O recomendador ajuda a organizar informações sobre ocasião, orçamento, destinatário e estilo para propor tipos de joias e critérios de escolha."] },
        { title: "Conteúdo educativo", paragraphs: ["Os guias explicam materiais, tamanhos, cuidados e pedras com prudência, indicando quando algo depende da peça concreta."] },
      ],
      ctaLabel: "Perguntar ao joalheiro IA",
    },
    transparencia: {
      kind: "transparencia",
      title: "Transparência e afiliação",
      description: "Informação sobre links externos, possível afiliação e critérios de transparência na joyas.ai.",
      eyebrow: "Transparência",
      intro: "Algumas seções podem incluir links para lojas externas. Quando um link for de afiliado, isso será indicado com clareza.",
      sections: [
        { title: "Estado atual", paragraphs: ["A joyas.ai é um projeto em desenvolvimento. Não se deve entender que todas as seções tenham afiliação ativa nem acordos comerciais com lojas específicas salvo indicação expressa."] },
        { title: "Links externos", paragraphs: ["Antes de comprar em uma loja externa, revise preço, disponibilidade, composição, envio, devoluções, garantia e condições de ajuste ou personalização."] },
      ],
    },
    "transparencia-afiliacion": {
      kind: "transparencia-afiliacion",
      title: "Transparência de afiliação",
      description: "Critérios da joyas.ai sobre links de afiliado e recomendações comerciais.",
      eyebrow: "Afiliação",
      intro: "Se a joyas.ai usar links de afiliado, a relação comercial será explicada para que você avalie a recomendação com contexto.",
      sections: [{ title: "Critério editorial", paragraphs: ["A existência de comissão não deve justificar avaliações inventadas, métricas falsas nem promessas que não possam ser comprovadas."] }],
    },
    contacto: {
      kind: "contacto",
      title: "Contato",
      description: "Página de contato da joyas.ai.",
      eyebrow: "Contato",
      intro: "Você pode entrar em contato com a joyas.ai para consultas, colaborações ou informações sobre o projeto.",
      sections: [{ title: "Email", paragraphs: ["Email de contato: gaviacode@gmail.com"] }],
    },
    "aviso-legal": {
      kind: "aviso-legal",
      title: "Aviso legal",
      description: "Informação legal básica da joyas.ai.",
      eyebrow: "Legal",
      intro: "Esta página reúne informação legal básica do projeto joyas.ai.",
      sections: [
        { title: "Dados do titular pendentes", paragraphs: ["Antes de promover o site de forma definitiva, convém completar nome ou razão social, identificação fiscal se aplicável, endereço ou contato legal e qualquer dado exigido pela norma aplicável."] },
        { title: "Contato operacional", paragraphs: ["Email de contato: gaviacode@gmail.com"] },
        { title: "Uso do site", paragraphs: ["O conteúdo da joyas.ai tem caráter informativo e não substitui a revisão de dados concretos antes de comprar uma joia."] },
      ],
    },
    "politica-privacidad": {
      kind: "politica-privacidad",
      title: "Política de privacidade",
      description: "Política de privacidade básica da joyas.ai.",
      eyebrow: "Privacidade",
      intro: "Esta política explica de forma básica quais dados podem ser tratados ao usar a joyas.ai.",
      sections: [
        { title: "Responsável pendente de completar", paragraphs: ["A identificação completa do responsável deve ser adicionada antes de promover a joyas.ai de forma definitiva. Email operacional: gaviacode@gmail.com."] },
        { title: "Dados do chat", paragraphs: ["O chat pode tratar as informações que você fornece voluntariamente para gerar recomendações. Não convém inserir dados especialmente sensíveis, informação financeira, documentos de identidade nem dados pessoais desnecessários para escolher uma joia."] },
        { title: "Analytics com consentimento", paragraphs: ["O Google Analytics só é carregado se houver configuração de Analytics e se você aceitar cookies analíticos. Você pode retirar ou alterar o consentimento na configuração de cookies."] },
      ],
    },
    cookies: {
      kind: "cookies",
      title: "Política de cookies",
      description: "Informação sobre cookies necessários e cookies analíticos na joyas.ai.",
      eyebrow: "Cookies",
      intro: "Esta página explica que cookies a joyas.ai pode usar e como você pode aceitar, recusar ou alterar o consentimento para cookies analíticos.",
      sections: [{ title: "Cookies necessários e analíticos", paragraphs: ["Os cookies necessários permitem funções básicas. Os analíticos só são usados com consentimento e ajudam a medir o uso do site."] }],
    },
  },
  en: {
    "como-funciona": {
      kind: "como-funciona",
      title: "How joyas.ai works",
      description: "A transparent explanation of how joyas.ai uses the information you provide to generate indicative jewelry recommendations.",
      eyebrow: "AI jeweler",
      intro: "joyas.ai generates guidance from the information you provide. It does not know another person's real tastes and does not replace checking size, materials, price or purchase conditions.",
      sections: [
        { title: "Process", paragraphs: ["Explain what you are looking for, add budget, occasion, recipient, style and materials if you know them, and the AI jeweler will suggest jewelry types and selection criteria.", "You can continue the conversation to refine the recommendation without the site inventing products, stores, reviews or stock."] },
        { title: "What it can and cannot do", paragraphs: ["It can help you compare jewelry types, identify buying risks and organize criteria such as occasion, budget, metal, size or style.", "It cannot guarantee that a gift will be liked, confirm availability of external products or verify composition, certificates or store policies by itself."] },
      ],
      ctaLabel: "Try the AI jeweler",
    },
    "joyero-ia": {
      kind: "joyero-ia",
      title: "AI Jewelry Advisor",
      description: "What the joyas.ai advisor can do and examples of prompts for indicative jewelry recommendations.",
      eyebrow: "Advisor",
      intro: "The AI jewelry advisor helps organize preferences and turn them into generic, careful and easy-to-compare jewelry ideas.",
      sections: [{ title: "What you can ask", paragraphs: ["You can ask for ideas by occasion, recipient, budget, style, materials or concrete doubts about a purchase.", "At this stage the advisor does not show specific products; its goal is to help you decide what type of jewelry to look for."] }],
      ctaLabel: "Open advisor",
    },
    "preguntas-frecuentes": {
      kind: "preguntas-frecuentes",
      title: "FAQ",
      description: "Transparent answers about the AI jewelry advisor, budget, affiliate links, sizing and materials.",
      eyebrow: "Help",
      intro: "Careful answers about the advisor, materials, sizing and commercial transparency.",
      sections: [
        { title: "Does joyas.ai sell jewelry directly?", paragraphs: ["No. joyas.ai helps guide the choice and offers informational content. If links to external stores appear, they will be identified clearly."] },
        { title: "How does the AI know what jewelry to recommend?", paragraphs: ["It uses the details you provide, such as occasion, budget, recipient, style and materials, to suggest reasonable options."] },
        { title: "Can it guarantee that a gift will be liked?", paragraphs: ["No. It can reduce doubts and suggest coherent options, but personal taste can never be guaranteed."] },
      ],
    },
    "sobre-joyas-ai": {
      kind: "sobre-joyas-ai",
      title: "About joyas.ai",
      description: "Learn about joyas.ai, a project for choosing jewelry with AI support, educational content and clear buying criteria.",
      eyebrow: "Project",
      intro: "joyas.ai was created to make a difficult decision simpler: choosing jewelry for someone else or for yourself.",
      sections: [
        { title: "AI guidance", paragraphs: ["The advisor helps organize information about occasion, budget, recipient and style to suggest jewelry types and selection criteria."] },
        { title: "Educational content", paragraphs: ["The guides explain materials, sizing, care and gemstones carefully, noting when something depends on the specific piece."] },
      ],
      ctaLabel: "Ask the AI jeweler",
    },
    transparencia: {
      kind: "transparencia",
      title: "Transparency and affiliate disclosure",
      description: "Information about external links, possible affiliate relationships and transparency criteria at joyas.ai.",
      eyebrow: "Transparency",
      intro: "Some sections may include links to external stores. When a link is an affiliate link, it will be clearly disclosed.",
      sections: [
        { title: "Current status", paragraphs: ["joyas.ai is a project in development. Not every section should be understood as having active affiliate relationships or commercial agreements with specific stores unless clearly stated."] },
        { title: "External links", paragraphs: ["Before buying from an external store, check price, availability, composition, shipping, returns, warranty and resizing or personalization conditions."] },
      ],
    },
    "transparencia-afiliacion": {
      kind: "transparencia-afiliacion",
      title: "Affiliate transparency",
      description: "joyas.ai criteria for affiliate links and commercial recommendations.",
      eyebrow: "Affiliation",
      intro: "If joyas.ai uses affiliate links, the commercial relationship will be explained so you can evaluate the recommendation with context.",
      sections: [{ title: "Editorial criteria", paragraphs: ["A commission should not justify invented reviews, false metrics or promises that cannot be verified."] }],
    },
    contacto: {
      kind: "contacto",
      title: "Contact",
      description: "Contact page for joyas.ai.",
      eyebrow: "Contact",
      intro: "You can contact joyas.ai for questions, collaborations or information about the project.",
      sections: [{ title: "Email", paragraphs: ["Contact email: gaviacode@gmail.com"] }],
    },
    "aviso-legal": {
      kind: "aviso-legal",
      title: "Legal notice",
      description: "Basic legal information for joyas.ai.",
      eyebrow: "Legal",
      intro: "This page gathers basic legal information about the joyas.ai project.",
      sections: [
        { title: "Owner details pending", paragraphs: ["Before seriously promoting the site, add the legal name or company name, tax ID if applicable, legal address or contact address and any details required by applicable rules."] },
        { title: "Operational contact", paragraphs: ["Contact email: gaviacode@gmail.com"] },
        { title: "Site use", paragraphs: ["The content on joyas.ai is informational and does not replace checking concrete details before buying jewelry."] },
      ],
    },
    "politica-privacidad": {
      kind: "politica-privacidad",
      title: "Privacy policy",
      description: "Basic privacy policy for joyas.ai.",
      eyebrow: "Privacy",
      intro: "This policy explains in basic terms what data may be processed when using joyas.ai.",
      sections: [
        { title: "Controller details pending", paragraphs: ["The full identity of the controller should be added before joyas.ai is promoted seriously. Operational email: gaviacode@gmail.com."] },
        { title: "Chat data", paragraphs: ["The chat may process the information you voluntarily provide to generate recommendations. Do not enter especially sensitive data, financial information, identity documents or personal data that is unnecessary for choosing jewelry."] },
        { title: "Analytics with consent", paragraphs: ["Google Analytics only loads if Analytics is configured and you accept analytics cookies. You can withdraw or change consent from cookie settings."] },
      ],
    },
    cookies: {
      kind: "cookies",
      title: "Cookie policy",
      description: "Information about necessary and analytics cookies at joyas.ai.",
      eyebrow: "Cookies",
      intro: "This page explains what cookies joyas.ai may use and how you can accept, reject or change consent for analytics cookies.",
      sections: [{ title: "Necessary and analytics cookies", paragraphs: ["Necessary cookies enable basic functions. Analytics cookies are only used with consent and help measure site usage."] }],
    },
  },
};

export function getInfoPage(kind: InfoPageKind, locale: Locale) {
  return infoPages[locale][kind];
}
