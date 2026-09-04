export type LinkItem = {
  href: string;
  label: string;
};

export type RichParagraph = {
  parts: Array<string | LinkItem>;
};

export type ArticleTable = {
  columns: string[];
  rows: string[][];
};

export type ArticleSubsection = {
  title: string;
  paragraphs?: Array<string | RichParagraph>;
  bullets?: string[];
};

export type ArticleSection = {
  title: string;
  paragraphs: Array<string | RichParagraph>;
  bullets?: string[];
  table?: ArticleTable;
  subsections?: ArticleSubsection[];
};

export type ArticleData = {
  slug: string;
  originalSlug?: string;
  locale?: "es" | "pt-BR" | "en";
  categorySlug?: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: ArticleSection[];
  related: LinkItem[];
  advisorCta?: {
    title: string;
    description: string;
  };
};

export type GuideCategory = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  href: string;
  seoTitle: string;
  seoDescription: string;
  guideSlugs: string[];
  futureGuides: string[];
};

const advisorLink = { href: "/#joyero-ia", label: "Probar el joyero IA" };

export const jewelryCategories: ArticleData[] = [
  {
    slug: "anillos",
    eyebrow: "Joyas",
    title: "Como elegir un anillo: estilos, materiales y ocasiones",
    description:
      "Guia para elegir anillos de uso diario, regalo, compromiso o alianza segun talla, material, estilo y ocasion.",
    intro:
      "Un anillo suele tener mucha presencia porque se ve a diario y depende de una talla concreta. Antes de elegir conviene pensar en el uso, el estilo de la persona y el margen para cambiar la talla si fuera necesario.",
    sections: [
      {
        title: "Que tener en cuenta",
        paragraphs: [
          "La talla es el primer punto critico. Si no se conoce, es mejor evitar piezas muy ajustadas o consultar una guia de medicion antes de comprar.",
          "Tambien importa si la persona usa anillos a diario, si prefiere joyas discretas o llamativas y si suele llevar oro amarillo, oro blanco, oro rosa, plata u otros metales.",
        ],
      },
      {
        title: "Estilos habituales",
        paragraphs: [
          "Para uso diario suelen funcionar los anillos finos, lisos o con una piedra pequena. Para regalo pueden encajar diseños con iniciales, formas simbolicas o piedras vinculadas a un recuerdo.",
          "En compromiso son comunes el solitario, el halo y los anillos de tres piedras. En alianzas pesa mas la comodidad, el acabado y la coherencia con el gusto de cada persona que una regla universal.",
        ],
      },
      {
        title: "Materiales",
        paragraphs: [
          "El oro, la plata, el platino y otros materiales tienen comportamientos distintos en color, mantenimiento, peso y resistencia. Ninguno es mejor en todos los casos.",
          "La composicion exacta, los tratamientos y las aleaciones pueden variar segun fabricante y pieza, asi que conviene revisar la ficha del producto antes de decidir.",
        ],
      },
      {
        title: "Errores frecuentes",
        paragraphs: [
          "Comprar sin talla, elegir una pieza demasiado aparatosa para alguien minimalista o no comprobar posibles alergias conocidas puede convertir una buena idea en una compra incomoda.",
          "Tambien conviene evitar afirmar que una piedra o metal garantiza valor futuro. El valor depende de muchos factores y del mercado.",
        ],
      },
    ],
    related: [
      { href: "/joyas/anillos/como-saber-talla-anillo", label: "Como saber la talla de un anillo" },
      { href: "/ocasiones/compromiso", label: "Anillos de compromiso" },
      advisorLink,
    ],
  },
  {
    slug: "collares",
    eyebrow: "Joyas",
    title: "Como elegir un collar segun escote, estilo y ocasion",
    description:
      "Consejos para elegir collares y colgantes segun longitud, material, estilo personal y momento de uso.",
    intro:
      "El collar cambia mucho segun la longitud, el volumen y el tipo de colgante. Una pieza sencilla puede ser perfecta para diario, mientras que un collar con mas presencia puede funcionar mejor en una ocasion concreta.",
    sections: [
      {
        title: "Que tener en cuenta",
        paragraphs: [
          "Observa si la persona suele llevar cadenas cortas, colgantes medianos o collares mas largos. Esa pista suele decir mas que cualquier tendencia.",
          "La longitud debe resultar comoda y combinar con la ropa habitual. Para regalo, los collares ajustables reducen el riesgo de fallar.",
        ],
      },
      {
        title: "Estilos habituales",
        paragraphs: [
          "Las cadenas finas con colgante pequeno son versatiles. Los medallones, iniciales o simbolos personales aportan mas intencion emocional.",
          "Las perlas y piedras pueden dar un aire clasico o luminoso, pero requieren revisar cuidados y acabados segun la pieza.",
        ],
      },
      {
        title: "Materiales y cuidados",
        paragraphs: [
          "Oro, plata, acero, perlas y piedras tienen necesidades distintas. Algunas piezas toleran peor el agua, perfumes o cosméticos.",
          "Cuando haya baño, chapado o tratamiento superficial, la durabilidad dependera del grosor, del uso y de las indicaciones del fabricante.",
        ],
      },
      {
        title: "Consejos para acertar",
        paragraphs: [
          "Si dudas, elige un collar proporcionado, de color metalico parecido al que ya usa y con un detalle personal discreto.",
          "Para un regalo muy simbolico, un colgante con inicial, fecha o piedra elegida por significado personal puede resultar mas cercano que una pieza muy llamativa.",
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-collar", label: "Guia para elegir collar" },
      { href: "/guias", label: "Guías para regalar joyas" },
      advisorLink,
    ],
  },
  {
    slug: "pulseras",
    eyebrow: "Joyas",
    title: "Como elegir una pulsera comoda, elegante y facil de llevar",
    description:
      "Guia para elegir pulseras finas, rigidas, de cadena o personalizadas segun uso, talla y estilo.",
    intro:
      "Una pulsera acertada debe equilibrar estetica y comodidad. Se mueve, roza con la mesa y acompaña gestos cotidianos, por eso el cierre, el peso y la talla importan.",
    sections: [
      {
        title: "Que tener en cuenta",
        paragraphs: [
          "Para uso diario suelen funcionar las pulseras finas, de cadena o con cierre seguro. Las piezas rigidas pueden ser muy elegantes, pero conviene revisar el diametro.",
          "Si es un regalo, una pulsera ajustable o con alargador reduce el riesgo de talla.",
        ],
      },
      {
        title: "Estilos habituales",
        paragraphs: [
          "Las pulseras grabadas permiten añadir una fecha, iniciales o una palabra breve. Las pulseras con piedras aportan color y pueden combinar con otras joyas.",
          "Para un estilo sobrio, una cadena sencilla en el metal que la persona usa habitualmente suele ser una opcion prudente.",
        ],
      },
      {
        title: "Materiales",
        paragraphs: [
          "La plata, el oro, el acero y los cordones con piezas metalicas tienen sensaciones y mantenimiento distintos.",
          "La resistencia real depende de eslabones, cierre, grosor, aleacion y acabado concreto.",
        ],
      },
      {
        title: "Errores frecuentes",
        paragraphs: [
          "Elegir una pulsera pesada para alguien que no lleva joyas a diario, ignorar el cierre o comprar una talla demasiado justa son fallos comunes.",
          "Tambien conviene revisar si la persona mezcla metales o prefiere mantener siempre el mismo tono.",
        ],
      },
    ],
    related: [
      { href: "/ocasiones/dia-de-la-madre", label: "Ideas para el Dia de la madre" },
      { href: "/guias/como-cuidar-joyas", label: "Como cuidar joyas" },
      advisorLink,
    ],
  },
  {
    slug: "pendientes",
    eyebrow: "Joyas",
    title: "Como elegir pendientes: tamaño, cierre, material y estilo",
    description:
      "Consejos para elegir pendientes discretos, aros, largos o con piedras segun rostro, uso y ocasion.",
    intro:
      "Los pendientes enmarcan el rostro y pueden cambiar mucho la sensacion de un conjunto. Para acertar conviene mirar el tamaño que la persona repite y el tipo de cierre que le resulta comodo.",
    sections: [
      {
        title: "Que tener en cuenta",
        paragraphs: [
          "Los pendientes pequeños de boton o aro fino son faciles de llevar. Los diseños largos o con mas brillo pueden encajar en eventos, pero no siempre son practicos para diario.",
          "Si existen alergias conocidas, hay que revisar materiales y componentes. No basta con fijarse solo en el color del metal.",
        ],
      },
      {
        title: "Estilos habituales",
        paragraphs: [
          "Aros, botones, pendientes colgantes, trepadores y diseños con piedras cubren necesidades distintas. La clave es elegir segun el uso real, no solo por impacto visual.",
          "Para regalo sorpresa, los pendientes discretos suelen tener menos riesgo que una pieza muy grande.",
        ],
      },
      {
        title: "Materiales",
        paragraphs: [
          "Oro, plata, acero y otros metales pueden incorporar aleaciones o acabados diferentes. La ficha de cada producto debe indicar composicion y cuidados.",
          "Las piedras, perlas y esmaltes pueden requerir mas cuidado frente a golpes, humedad o productos cosmeticos.",
        ],
      },
      {
        title: "Consejos para acertar",
        paragraphs: [
          "Observa si la persona lleva siempre el mismo par, si cambia segun la ropa o si evita pendientes pesados.",
          "El cierre tambien importa: presion, rosca, gancho o criolla ofrecen sensaciones distintas.",
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-pendientes", label: "Guia para elegir pendientes" },
      { href: "/ocasiones/cumpleanos", label: "Pendientes para cumpleaños" },
      advisorLink,
    ],
  },
  {
    slug: "boda",
    eyebrow: "Joyas",
    title: "Joyas para boda: alianzas, novia, novio e invitadas",
    description:
      "Guia para elegir joyas de boda, alianzas y accesorios para novia, novio, madrina e invitadas.",
    intro:
      "En una boda conviven joyas con funciones muy distintas: alianzas, piezas para la novia, detalles para el novio, joyas de madrina, invitadas y posibles regalos relacionados con la celebracion.",
    sections: [
      {
        title: "Alianzas",
        paragraphs: [
          "Las alianzas deben priorizar comodidad, talla, acabado y mantenimiento. El estilo puede ser clasico, minimalista, texturizado o con detalles discretos.",
          "No hay una unica eleccion correcta: depende de la vida diaria, del presupuesto y del gusto de la pareja.",
        ],
      },
      {
        title: "Novia, novio e invitadas",
        paragraphs: [
          "Para la novia, las joyas suelen acompañar vestido, peinado y escote. Para el novio pueden aparecer gemelos, reloj o detalles sobrios.",
          "Madrina e invitadas pueden elegir piezas con mas presencia, pero conviene equilibrarlas con ropa, maquillaje y protocolo del evento.",
        ],
      },
      {
        title: "Materiales y estilo",
        paragraphs: [
          "Oro, plata, platino, perlas y piedras pueden funcionar en boda segun tono del conjunto y sensibilidad de la piel.",
          "La pieza concreta, sus tratamientos y sus cuidados deben revisarse antes de comprar.",
        ],
      },
      {
        title: "Errores frecuentes",
        paragraphs: [
          "Dejar las alianzas para el ultimo momento, comprar sin probar talla o elegir accesorios que compiten demasiado con el vestido son errores faciles de evitar.",
          "Tambien conviene pensar en fotografias, comodidad durante muchas horas y posibilidad de reutilizar la joya despues.",
        ],
      },
    ],
    related: [
      { href: "/ocasiones/boda", label: "Guia de joyas para boda" },
      { href: "/joyas/anillos", label: "Como elegir anillos" },
      advisorLink,
    ],
  },
];

export const occasions: ArticleData[] = [
  {
    slug: "aniversario",
    eyebrow: "Ocasiones",
    title: "Que joya regalar en un aniversario",
    description:
      "Consejos para elegir una joya de aniversario segun tiempo de relacion, estilo personal, metal, presupuesto y personalizacion.",
    intro:
      "No existe una joya universal para cada aniversario. Las tradiciones pueden inspirar, pero el estilo personal y la historia de la relacion deberian pesar mas que una regla fija.",
    sections: [
      {
        title: "Antes de elegir",
        paragraphs: [
          "Piensa en el tiempo de relacion, en el tipo de joya que suele usar y en si prefiere detalles discretos o piezas con presencia.",
          "Tambien ayuda observar el metal que lleva normalmente y si hay colores, piedras o simbolos vinculados a recuerdos importantes.",
        ],
      },
      {
        title: "Ideas con significado",
        paragraphs: [
          "Un collar con inicial, una pulsera grabada, un anillo delicado o unos pendientes con una piedra elegida por un recuerdo pueden funcionar si encajan con su estilo.",
          "Las fechas y grabados son recursos utiles, pero deben sentirse naturales y no forzados.",
        ],
      },
      {
        title: "Presupuesto",
        paragraphs: [
          "El presupuesto no determina por si solo el valor emocional del regalo. Una pieza bien elegida y ponible puede tener mas sentido que una joya cara que no se usara.",
          "Si hay piedras o metales concretos, comprueba composicion, tratamiento y condiciones de cambio.",
        ],
      },
    ],
    related: [
      { href: "/guias", label: "Guías para regalar joyas" },
      { href: "/joyas/anillos/como-saber-talla-anillo", label: "Talla de anillo" },
      advisorLink,
    ],
  },
  {
    slug: "compromiso",
    eyebrow: "Ocasiones",
    title: "Como elegir un anillo de compromiso con criterio",
    description:
      "Guia prudente sobre solitarios, halo, tres piedras, metales, talla y presupuesto en anillos de compromiso.",
    intro:
      "El anillo de compromiso suele cargar mucho simbolismo. Para elegir bien conviene unir estilo personal, comodidad, presupuesto y datos practicos como la talla.",
    sections: [
      {
        title: "Estilos habituales",
        paragraphs: [
          "El solitario destaca una piedra central. El halo rodea la piedra con otras mas pequeñas y suele aumentar la sensacion de brillo. El diseño de tres piedras tiene una presencia mas narrativa.",
          "Estos estilos son referencias, no obligaciones. Lo importante es que la persona pueda imaginarse llevando la pieza.",
        ],
      },
      {
        title: "Piedras y metales",
        paragraphs: [
          "Diamantes, zafiros u otras piedras pueden usarse como centro, con calidades y cuidados distintos. No conviene afirmar que una joya garantice valor futuro.",
          "Oro amarillo, blanco, rosa, platino u otros metales cambian el aspecto, el mantenimiento y el presupuesto segun la pieza concreta.",
        ],
      },
      {
        title: "Talla y presupuesto",
        paragraphs: [
          "La talla debe verificarse con cuidado. Si la compra es sorpresa, revisa si la tienda permite ajustes y en que condiciones.",
          "Define un presupuesto comodo antes de mirar diseños. La decision debe ser sostenible y coherente con la pareja.",
        ],
      },
    ],
    related: [
      { href: "/joyas/anillos", label: "Como elegir un anillo" },
      { href: "/guias/piedras-preciosas", label: "Piedras preciosas" },
      advisorLink,
    ],
  },
  {
    slug: "boda",
    eyebrow: "Ocasiones",
    title: "Joyas para boda: alianzas, novia, novio e invitados",
    description:
      "Ideas para alianzas, joyas de novia, novio, madrina, invitadas y regalos vinculados a una boda.",
    intro:
      "Una boda no se resume en alianzas. Tambien aparecen joyas para vestir, recuerdos y regalos que conviene elegir segun papel en la celebracion.",
    sections: [
      {
        title: "Alianzas",
        paragraphs: [
          "Las alianzas deben ser comodas, duraderas para el uso previsto y faciles de mantener. El acabado puede ser pulido, mate, texturizado o combinado.",
          "La talla y el plazo de entrega son decisivos; conviene no dejarlas para el ultimo momento.",
        ],
      },
      {
        title: "Novia, novio, madrina e invitadas",
        paragraphs: [
          "La novia puede elegir pendientes, collar, pulsera o peineta segun vestido y peinado. El novio puede optar por gemelos, reloj o detalles sobrios.",
          "Madrina e invitadas pueden usar piezas con mas color o volumen, siempre equilibradas con el conjunto.",
        ],
      },
      {
        title: "Regalos de boda",
        paragraphs: [
          "Una joya personalizada puede servir como recuerdo para una persona importante, pero hay que revisar plazos, grabados y posibilidad de cambios.",
        ],
      },
    ],
    related: [
      { href: "/joyas/boda", label: "Joyas para boda" },
      { href: "/joyas/anillos", label: "Anillos y alianzas" },
      advisorLink,
    ],
  },
  {
    slug: "cumpleanos",
    eyebrow: "Ocasiones",
    title: "Joyas para cumpleaños segun edad, relacion y estilo",
    description:
      "Como elegir joyas de cumpleaños considerando edad, relacion, uso diario, presupuesto y estilo personal.",
    intro:
      "Un cumpleaños admite regalos muy distintos: un detalle sencillo, una pieza para diario o una joya mas especial. La clave es adaptar la eleccion a la relacion y al uso real.",
    sections: [
      {
        title: "Edad y relacion",
        paragraphs: [
          "Para alguien joven puede funcionar una pieza ligera y resistente. Para una relacion cercana, un detalle personalizado puede tener mas sentido.",
          "No hace falta que la joya sea formal; debe encajar con su vida cotidiana.",
        ],
      },
      {
        title: "Uso diario",
        paragraphs: [
          "Pendientes pequeños, collares finos y pulseras ajustables suelen ser faciles de llevar. Si la persona cambia mucho de estilo, una joya versatil puede ser mejor que una muy marcada.",
        ],
      },
      {
        title: "Presupuesto",
        paragraphs: [
          "Define un rango antes de elegir. En joyeria, material, acabado, piedra, tamaño y marca pueden cambiar mucho el precio.",
        ],
      },
    ],
    related: [
      { href: "/joyas/pendientes", label: "Como elegir pendientes" },
      { href: "/guias", label: "Guías para regalar joyas" },
      advisorLink,
    ],
  },
  {
    slug: "san-valentin",
    eyebrow: "Ocasiones",
    title: "Joyas para San Valentin sin caer en cliches",
    description:
      "Ideas elegantes para regalar joyas en San Valentin, desde piezas sencillas hasta regalos personalizados.",
    intro:
      "San Valentin puede ser romantico sin resultar excesivo. Una joya bien elegida deberia hablar del gusto de la persona, no solo de simbolos obvios.",
    sections: [
      {
        title: "Alternativas sencillas",
        paragraphs: [
          "Un collar fino, unos pendientes discretos o una pulsera delicada pueden ser mas ponibles que una pieza demasiado tematica.",
          "Si la relacion es reciente, conviene evitar mensajes que parezcan mas intensos de lo que realmente se quiere comunicar.",
        ],
      },
      {
        title: "Personalizacion",
        paragraphs: [
          "Iniciales, una fecha privada o una piedra elegida por color pueden aportar intencion sin caer en excesos.",
          "Antes de grabar, revisa bien ortografia, fecha y condiciones de devolucion.",
        ],
      },
      {
        title: "Como elegir",
        paragraphs: [
          "Observa que metal usa, si prefiere joyas pequeñas y si hay alguna pieza que repite a menudo. Esa informacion suele ser mas fiable que una lista generica de ideas romanticas.",
        ],
      },
    ],
    related: [
      { href: "/joyas/collares", label: "Collares y colgantes" },
      { href: "/ocasiones/aniversario", label: "Regalos de aniversario" },
      advisorLink,
    ],
  },
  {
    slug: "dia-de-la-madre",
    eyebrow: "Ocasiones",
    title: "Joyas para el Dia de la madre con sentido personal",
    description:
      "Ideas de joyas para el Dia de la madre: iniciales, nombres, piedras, colgantes, pulseras y pendientes.",
    intro:
      "Para el Dia de la madre suelen funcionar las joyas con significado personal, siempre que el diseño siga siendo comodo y acorde a su estilo.",
    sections: [
      {
        title: "Ideas habituales",
        paragraphs: [
          "Iniciales, nombres, fechas, colgantes con formas discretas y pulseras grabadas son opciones frecuentes.",
          "Las piedras de nacimiento pueden usarse como referencia simbolica, pero su significado debe entenderse como tradicion o preferencia personal, no como hecho cientifico.",
        ],
      },
      {
        title: "Pendientes, colgantes y pulseras",
        paragraphs: [
          "Los pendientes pequeños son faciles de usar. Los colgantes permiten personalizar sin depender de talla. Las pulseras ajustables reducen riesgos.",
        ],
      },
      {
        title: "Consejos",
        paragraphs: [
          "Elige segun lo que ya lleva: metal, tamaño, color y tipo de cierre. Si no suele llevar joyas, mejor una pieza ligera y discreta.",
        ],
      },
    ],
    related: [
      { href: "/joyas/pulseras", label: "Pulseras" },
      { href: "/joyas/collares", label: "Collares personalizados" },
      advisorLink,
    ],
  },
  {
    slug: "graduacion",
    eyebrow: "Ocasiones",
    title: "Joyas de graduacion para conservar como recuerdo",
    description:
      "Como elegir una joya de graduacion duradera, ponible y vinculada a una etapa importante.",
    intro:
      "Una graduacion marca el cierre de una etapa y el inicio de otra. La joya puede ser un recuerdo discreto, duradero y facil de seguir usando.",
    sections: [
      {
        title: "Que suele funcionar",
        paragraphs: [
          "Un colgante sencillo, una pulsera con fecha, unos pendientes discretos o un reloj sobrio pueden acompañar bien este momento.",
          "La pieza no tiene que ser solemne; debe poder integrarse en la nueva rutina.",
        ],
      },
      {
        title: "Personalizacion",
        paragraphs: [
          "Una fecha, iniciales o una palabra breve pueden recordar la etapa sin convertir la joya en algo dificil de combinar.",
        ],
      },
      {
        title: "Materiales y cuidados",
        paragraphs: [
          "Si se busca conservar la pieza durante años, revisa material, acabado, cierre y cuidados recomendados por el fabricante.",
        ],
      },
    ],
    related: [
      { href: "/guias", label: "Guías para regalar joyas" },
      { href: "/guias/como-cuidar-joyas", label: "Cuidado de joyas" },
      advisorLink,
    ],
  },
  {
    slug: "regalo-sorpresa",
    eyebrow: "Ocasiones",
    title: "Como elegir una joya para un regalo sorpresa",
    description:
      "Pistas discretas para elegir una joya sorpresa: metal, tamaño, colores, estilo, alergias y talla.",
    intro:
      "Un regalo sorpresa funciona mejor cuando se investiga con discrecion. La idea no es adivinarlo todo, sino reducir riesgos antes de comprar.",
    sections: [
      {
        title: "Pistas utiles",
        paragraphs: [
          "Mira que metal utiliza normalmente, que joyas repite, si prefiere piezas pequeñas o grandes y que colores aparecen en su ropa o accesorios.",
          "Si se trata de un anillo, la talla es esencial. Si no la conoces, considera otra joya o consulta una guia de talla.",
        ],
      },
      {
        title: "Alergias y comodidad",
        paragraphs: [
          "Si sabes que tiene alergias o sensibilidad a ciertos materiales, revisa la composicion exacta. No todas las piezas de un mismo color tienen la misma aleacion.",
        ],
      },
      {
        title: "Opciones prudentes",
        paragraphs: [
          "Pendientes discretos, collares ajustables y pulseras con alargador suelen ser mas faciles de regalar que piezas muy dependientes de talla.",
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Guia para regalar" },
      { href: "/joyas/anillos/como-saber-talla-anillo", label: "Talla de anillo" },
      advisorLink,
    ],
  },
];

export const guides: ArticleData[] = [
  {
    slug: "oro-14k-18k-24k",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Oro 14k, 18k y 24k: diferencias, pureza y cuál elegir",
    description:
      "Descubre qué significan 14k, 18k y 24k, cuánta proporción de oro contiene cada aleación y qué diferencias tienen en joyería.",
    intro:
      "El oro puro se considera oro de 24 quilates, pero en joyería son habituales las aleaciones porque los metales puros pueden resultar poco prácticos para determinadas piezas.",
    sections: [
      {
        title: "Composición aproximada",
        paragraphs: [
          "El oro de 18 quilates contiene aproximadamente un 75 % de oro. El oro de 14 quilates contiene aproximadamente un 58,5 % de oro.",
          "El resto de la composición depende de las aleaciones usadas, que pueden modificar color, dureza, mantenimiento y comportamiento de la pieza.",
        ],
      },
      {
        title: "Uso en joyería",
        paragraphs: [
          "El oro de 24k tiene alta pureza, pero puede ser menos práctico para joyas sometidas a uso diario. Por eso se usan aleaciones en muchas piezas.",
          "No hay un quilataje universalmente mejor: depende del diseño, del uso, del presupuesto y de las preferencias de color.",
        ],
      },
      {
        title: "Antes de comprar",
        paragraphs: [
          "Revisa sello, ficha del producto, tratamiento, garantía comercial y recomendaciones de cuidado. Las características concretas pueden variar según fabricante y pieza.",
        ],
      },
    ],
    related: [
      { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
      { href: "/guias/oro-rosa", label: "Oro rosa" },
      { href: "/guias/platino", label: "Platino en joyería" },
    ],
  },
  {
    slug: "como-saber-si-una-joya-es-de-oro",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Cómo saber si una joya es de oro: marcas, pruebas y métodos fiables",
    description:
      "Descubre cómo comprobar si una joya es de oro, qué significan marcas como 585 y 750 y qué pruebas sirven como orientación y cuáles no son concluyentes.",
    intro:
      "Ningún método casero aislado ofrece certeza absoluta. Esta guía explica cómo revisar marcas, contrastes, documentación y cuándo conviene acudir a un profesional.",
    sections: [
      {
        title: "Marcas y contrastes",
        paragraphs: [
          "Busca números como 585, 750 o 999 e indicaciones de quilates, pero recuerda que un grabado puede falsificarse o no describir toda la pieza.",
        ],
      },
    ],
    related: [
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
      { href: "/guias/plata-925", label: "Plata 925 o plata de ley" },
      { href: "/guias/platino", label: "Platino en joyería" },
    ],
  },
  {
    slug: "plata-925",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Plata 925 o plata de ley: qué significa y cómo reconocerla",
    description:
      "Descubre qué significa plata 925, qué es la plata de ley, por qué puede oscurecerse y cómo distinguirla de una pieza bañada en plata.",
    intro:
      "La plata de ley 925 contiene un 92,5 % de plata. El porcentaje restante corresponde a otros metales que ayudan a mejorar su comportamiento para joyería.",
    sections: [
      {
        title: "Por qué se alea",
        paragraphs: [
          "La plata pura puede ser demasiado blanda para muchas piezas de uso diario. La aleación permite fabricar joyas más prácticas.",
          "La composición concreta y los tratamientos superficiales pueden variar según fabricante y pieza.",
        ],
      },
      {
        title: "Cuidados",
        paragraphs: [
          "La plata puede oscurecerse con el tiempo por contacto con aire, humedad, cosméticos o ciertas sustancias. Esto no implica necesariamente que sea falsa.",
          "Guardarla seca, separada y limpiarla con productos adecuados ayuda a conservar mejor el aspecto.",
        ],
      },
      {
        title: "Antes de comprar",
        paragraphs: [
          "Comprueba si la pieza es plata maciza, baño de plata u otro acabado. El mantenimiento y la durabilidad no son iguales.",
        ],
      },
    ],
    related: [
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
    ],
  },
  {
    slug: "platino",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Platino en joyería: cuándo puede tener sentido",
    description:
      "Introducción al platino en joyería, características generales, usos habituales y aspectos a revisar.",
    intro:
      "El platino se usa en joyería por su color claro y su presencia en piezas de alta durabilidad percibida, pero la elección depende siempre del diseño, presupuesto y pieza concreta.",
    sections: [
      {
        title: "Características generales",
        paragraphs: [
          "Suele asociarse a joyas de compromiso y alianzas por su aspecto sobrio y blanco natural. Aun así, no todas las piezas de platino son iguales.",
          "Pureza, aleación, acabado y construcción influyen en peso, mantenimiento y precio.",
        ],
      },
      {
        title: "Cuando elegirlo",
        paragraphs: [
          "Puede encajar si se busca un metal claro, discreto y con presencia en joyería de compromiso o uso prolongado.",
          "No debe elegirse solo por prestigio: conviene comparar comodidad, presupuesto y cuidados frente a otras opciones.",
        ],
      },
      {
        title: "Cuidados",
        paragraphs: [
          "Como cualquier metal, puede marcarse con el uso. El acabado puede cambiar con el tiempo y conviene seguir las indicaciones de la joyería.",
        ],
      },
    ],
    related: [
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
    ],
  },
  {
    slug: "como-saber-talla-anillo",
    categorySlug: "anillos",
    eyebrow: "Guías",
    title: "Cómo saber la talla de un anillo",
    description:
      "Consejos para estimar talla de anillo, medir una pieza existente y evitar errores en regalos sorpresa.",
    intro:
      "La talla de un anillo es una de las variables más delicadas al regalar. Una medición aproximada puede ayudar, pero la confirmación profesional o las condiciones de ajuste siguen siendo importantes.",
    sections: [
      {
        title: "Medir un anillo existente",
        paragraphs: [
          "Si tienes acceso a un anillo que le queda bien en el mismo dedo, puedes medir su diámetro interior con cuidado o llevarlo a una joyería.",
          "Debe ser un anillo del dedo correcto: la talla cambia entre manos y dedos.",
        ],
      },
      {
        title: "Medir el dedo",
        paragraphs: [
          "Las mediciones caseras con papel o hilo pueden fallar si se aprietan demasiado. La temperatura y la hora del día también pueden afectar ligeramente.",
          "Para una compra importante, intenta confirmar con un medidor fiable o pregunta por ajustes posteriores.",
        ],
      },
      {
        title: "Regalo sorpresa",
        paragraphs: [
          "Si no conoces la talla, valora collares, pulseras ajustables o pendientes. Si eliges anillo, revisa política de cambio y ajuste antes de comprar.",
        ],
      },
    ],
    related: [
      { href: "/joyas/anillos", label: "Cómo elegir anillos" },
      { href: "/guias/tipos-de-anillos", label: "Tipos de anillos" },
      { href: "/ocasiones/regalo-sorpresa", label: "Regalo sorpresa" },
    ],
  },
  {
    slug: "como-elegir-collar",
    categorySlug: "collares",
    eyebrow: "Guías",
    title: "Cómo elegir un collar o colgante",
    description:
      "Guía para elegir collar según longitud, escote, estilo, material y significado del colgante.",
    intro:
      "Elegir un collar implica pensar en longitud, proporciones, tipo de colgante y uso. La pieza debería acompañar el estilo de la persona sin obligarla a cambiar su forma de vestir.",
    sections: [
      {
        title: "Longitud",
        paragraphs: [
          "Las cadenas cortas se ven más cerca del cuello y dependen mucho del escote. Las medianas suelen ser versátiles. Las largas tienen más presencia y movimiento.",
          {
            parts: [
              "Si quieres verlo con más detalle, consulta nuestra guía de ",
              { href: "/guias/collares-segun-escote", label: "collares según el escote" },
              ", donde explicamos qué tipos de collar suelen funcionar con escotes en V, redondos, cuadrados, palabra de honor y otros diseños.",
            ],
          },
        ],
      },
      {
        title: "Colgante",
        paragraphs: [
          "Un colgante pequeño es fácil de llevar. Uno personalizado puede tener más significado, pero debe mantener un tamaño cómodo.",
        ],
      },
      {
        title: "Material",
        paragraphs: [
          "Oro, plata, acero, perlas o piedras cambian color, peso y cuidados. Revisa siempre composición y tratamientos.",
        ],
      },
    ],
    related: [
      { href: "/guias/collares-segun-escote", label: "Collares según escote" },
      { href: "/joyas/collares", label: "Collares" },
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
    ],
  },
  {
    slug: "collares-segun-escote",
    categorySlug: "collares",
    eyebrow: "Guías",
    title: "Collares según escote: qué collar elegir para cada tipo de escote",
    description:
      "Descubre qué collar elegir según el escote: en V, redondo, cuadrado, palabra de honor, barco, corazón, halter o cuello alto.",
    intro:
      "Elegir un collar no depende únicamente de que nos guste su diseño. La forma del escote, la longitud de la cadena y el tamaño del colgante pueden cambiar notablemente cómo se percibe el conjunto.",
    sections: [
      {
        title: "Antes de elegir un collar según escote",
        paragraphs: [
          "Un collar que funciona bien con un escote en V puede no producir el mismo efecto con un cuello alto o un vestido palabra de honor.",
          "La idea de elegir un collar según escote es útil sobre todo en vestidos y prendas donde la línea del cuello tiene mucho protagonismo.",
          "En esta guía repasamos qué tipos de collares suelen funcionar mejor con cada escote y qué aspectos conviene tener en cuenta antes de elegir.",
          {
            parts: [
              "Si además quieres comparar longitudes, estilos, materiales y tipos de colgante, puedes consultar nuestra guía sobre ",
              { href: "/guias/como-elegir-collar", label: "cómo elegir un collar o colgante" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Tabla rápida: qué collar elegir según el escote",
        paragraphs: [
          "Esta tabla resume orientaciones habituales para elegir collares según el escote del vestido o de una prenda superior. No son reglas absolutas: la prenda, la ocasión, el estilo personal y el diseño concreto de la joya también importan.",
        ],
        table: {
          columns: ["Tipo de escote", "Collar recomendado"],
          rows: [
            ["Escote en V", "Collar o colgante que siga la forma en V"],
            ["Escote redondo", "Collar corto o de longitud media"],
            ["Escote cuadrado", "Collar corto o medio con líneas suaves"],
            ["Palabra de honor", "Gargantilla, collar corto o pieza protagonista"],
            ["Escote corazón", "Collar corto o colgante delicado"],
            ["Escote barco", "Collar largo o pieza sencilla"],
            ["Cuello alto", "Collar largo"],
            ["Halter", "Collar muy discreto o prescindir del collar"],
            ["Escote asimétrico", "Collar minimalista o sin collar"],
          ],
        },
      },
      {
        title: "Collar para escote en V",
        paragraphs: [
          "El escote en V crea una línea visual que dirige la mirada hacia el centro del pecho. Por eso suelen funcionar especialmente bien los collares que acompañan esa misma dirección.",
          "Un colgante fino que termine antes de llegar al borde del escote puede crear un resultado equilibrado. Las cadenas finas con un pequeño colgante, los collares con caída en forma de V, los colgantes verticales y los collares de longitud media que queden dentro de la zona visible del escote son opciones habituales.",
          "Es conveniente evitar que el colgante termine exactamente sobre el borde de la prenda, porque visualmente puede competir con la línea del escote.",
          "Cuando el escote en V es profundo puede utilizarse un collar algo más largo, siempre que mantenga una separación visual respecto a la ropa. Por eso los collares para vestido con escote en V deben elegirse mirando tanto la profundidad como la anchura del escote.",
        ],
        subsections: [
          {
            title: "¿Qué collar usar con un escote en V?",
            paragraphs: [
              "Como regla sencilla, puede buscarse una pieza que repita o acompañe la geometría del escote.",
              "Para un estilo discreto puede funcionar una cadena fina con un pequeño diamante, circonita, piedra de color o motivo geométrico.",
              "Para un look más llamativo puede utilizarse un colgante algo mayor, siempre que guarde proporción con la profundidad del escote.",
            ],
          },
        ],
      },
      {
        title: "Collar para escote redondo",
        paragraphs: [
          "Los escotes redondos funcionan bien con numerosos tipos de collar. Una de las opciones más fáciles es utilizar un collar que siga aproximadamente la forma curva del cuello.",
          "Pueden funcionar cadenas cortas, gargantillas, collares de longitud media y colgantes pequeños o medianos.",
          "Si el cuello de la prenda es bastante cerrado, puede ser preferible que el collar quede claramente por encima o claramente por debajo del borde. Evitar que collar y escote se superpongan de forma accidental suele producir un resultado visualmente más limpio.",
        ],
        subsections: [
          {
            title: "Collares para vestido de cuello redondo",
            paragraphs: [
              "En un vestido con cuello redondo puede elegirse una pieza corta y sencilla si se busca un estilo discreto.",
              "Si el vestido es muy simple, el collar también puede convertirse en el elemento protagonista mediante una pieza de mayor tamaño o varias cadenas combinadas.",
            ],
          },
        ],
      },
      {
        title: "Collar para escote cuadrado",
        paragraphs: [
          "El escote cuadrado tiene líneas geométricas marcadas y deja visible una zona amplia alrededor de la clavícula.",
          "Suelen funcionar bien collares cortos o de longitud media que aporten contraste sin ocultar completamente la forma del escote.",
        ],
        bullets: [
          "Cadenas finas.",
          "Colgantes pequeños.",
          "Collares con formas redondeadas.",
          "Piezas delicadas situadas cerca de la clavícula.",
        ],
        subsections: [
          {
            title: "Qué conviene evitar",
            paragraphs: [
              "Un collar excesivamente ancho puede competir con las líneas del escote, especialmente si la propia prenda ya tiene muchos detalles.",
            ],
          },
        ],
      },
      {
        title: "Collar para escote palabra de honor",
        paragraphs: [
          "El escote palabra de honor deja completamente libres el cuello y los hombros, por lo que ofrece mucho espacio para utilizar joyería.",
          "Es uno de los escotes que mejor admite gargantillas, chokers, collares cortos, piezas protagonistas y colgantes delicados.",
          "Si el vestido ya tiene bordados, pedrería o muchos detalles, un collar sencillo suele proporcionar mayor equilibrio. Con prendas minimalistas puede utilizarse una pieza más llamativa como elemento principal del conjunto.",
          "También existe la opción de no utilizar collar y dar protagonismo a unos pendientes largos.",
        ],
      },
      {
        title: "Collar para escote corazón",
        paragraphs: [
          "El escote corazón crea una curva suave en la zona superior del pecho.",
          "Suelen funcionar especialmente bien los collares cortos, las cadenas delicadas, los pequeños colgantes y las piezas con formas redondeadas.",
          "Un colgante situado en el centro puede acompañar visualmente la forma del escote. En vestidos de fiesta o prendas muy elaboradas conviene adaptar el tamaño del collar al nivel de detalle de la ropa.",
        ],
      },
      {
        title: "Collar para escote barco",
        paragraphs: [
          "El escote barco se extiende horizontalmente de un hombro al otro y deja menos espacio vertical alrededor del cuello.",
          "Puede combinarse con collares largos, cadenas de longitud media, colgantes verticales y piezas sencillas.",
          "Los collares largos pueden aportar una línea vertical que contraste con la horizontalidad del escote. Si el escote queda muy cerca del cuello, normalmente conviene evitar collares que terminen exactamente sobre el borde de la prenda.",
        ],
      },
      {
        title: "Collar para cuello alto",
        paragraphs: [
          "El cuello alto cubre gran parte del cuello, pero eso no significa que haya que renunciar al collar.",
          "Una de las combinaciones más sencillas consiste en llevar el collar por encima de la prenda. Suelen funcionar especialmente bien los collares largos, las cadenas largas con colgante, los collares de longitud media claramente visibles y las piezas protagonistas sobre prendas lisas.",
          "Por ejemplo, un jersey negro de cuello alto puede servir como fondo para un collar dorado o plateado. Cuando la ropa ya tiene estampados o adornos abundantes, puede ser preferible utilizar una pieza más sencilla.",
        ],
      },
      {
        title: "Collar para escote halter",
        paragraphs: [
          "El escote halter dirige gran parte de la atención hacia hombros y cuello. Como la propia prenda ya ocupa visualmente esa zona, muchas veces no es necesario añadir un collar.",
          "Las alternativas suelen ser prescindir del collar, utilizar una cadena extremadamente fina, dar protagonismo a los pendientes o utilizar pulseras y anillos como complemento principal.",
          "En este tipo de escote, añadir más joyería no siempre produce un mejor resultado.",
        ],
      },
      {
        title: "Collar para escote asimétrico",
        paragraphs: [
          "Los escotes asimétricos ya generan una línea visual muy marcada. Por ello, suele ser recomendable no introducir otro elemento que compita con esa geometría.",
          "Puede funcionar un collar minimalista, una cadena muy fina o directamente no llevar collar. Una alternativa interesante es prescindir del collar y utilizar pendientes como pieza protagonista.",
        ],
      },
      {
        title: "Cómo elegir la longitud del collar",
        paragraphs: [
          "Además del escote, hay que tener en cuenta la longitud de la cadena. Estas medidas son orientaciones de estilo y dependen también de la persona, la prenda y el diseño concreto de la joya.",
        ],
        subsections: [
          {
            title: "Gargantilla",
            paragraphs: [
              "Se sitúa muy cerca del cuello y puede funcionar especialmente bien con palabra de honor, escotes abiertos y escotes corazón.",
            ],
          },
          {
            title: "Collar corto",
            paragraphs: [
              "Suele situarse aproximadamente alrededor de la clavícula. Es una opción versátil para escotes redondos, cuadrados y palabra de honor.",
            ],
          },
          {
            title: "Collar de longitud media",
            paragraphs: [
              "Desciende algo más sobre el pecho y permite utilizar diferentes tipos de colgante. Puede combinar especialmente bien con escotes en V, redondos y prendas relativamente abiertas.",
            ],
          },
          {
            title: "Collar largo",
            paragraphs: [
              "Puede resultar especialmente útil con cuello alto, escote barco, prendas lisas y looks en los que se busca crear una línea vertical.",
            ],
          },
        ],
      },
      {
        title: "Collares y pendientes según el escote",
        paragraphs: [
          "El collar no debe elegirse de forma aislada. Cuando se utilizan pendientes grandes o muy llamativos, un collar discreto puede mantener mejor el equilibrio del conjunto.",
          "Por el contrario, cuando el collar es la pieza protagonista, pueden utilizarse pendientes pequeños.",
        ],
        bullets: [
          "Escote en V + colgante delicado + pendientes pequeños.",
          "Palabra de honor + collar protagonista + pendientes discretos.",
          "Halter + sin collar + pendientes largos.",
          "Cuello alto + collar largo + pendientes pequeños.",
          "Escote asimétrico + sin collar + pendientes protagonistas.",
        ],
        subsections: [
          {
            title: "Equilibrio visual",
            paragraphs: [
              "No existe una combinación obligatoria. El objetivo es evitar que demasiadas piezas compitan visualmente entre sí.",
            ],
          },
        ],
      },
      {
        title: "El material y el color también importan",
        paragraphs: [
          "Después de decidir el tipo de collar, puede elegirse el material. Entre las opciones habituales están oro amarillo, oro blanco, oro rosa, plata 925, platino, joyas con piedras de color, diamantes u otras gemas.",
          "El color de la ropa, el estilo personal y las demás joyas que se lleven pueden ayudar a decidir.",
          "No es obligatorio que todas las piezas sean exactamente del mismo metal, aunque combinar materiales requiere algo más de intención para mantener coherencia visual.",
        ],
      },
      {
        title: "Qué evitar al elegir un collar según el escote",
        paragraphs: [
          "No existen reglas rígidas, pero algunos problemas habituales pueden hacer que el conjunto se vea menos limpio o menos proporcionado.",
        ],
        subsections: [
          {
            title: "Collar y escote terminan exactamente en el mismo punto",
            paragraphs: ["Puede hacer que ambas líneas compitan entre sí."],
          },
          {
            title: "Demasiados elementos protagonistas",
            paragraphs: [
              "Un vestido muy elaborado, un collar grande y unos pendientes grandes pueden producir un conjunto visualmente muy cargado.",
            ],
          },
          {
            title: "No tener en cuenta la profundidad del escote",
            paragraphs: [
              "La misma longitud de cadena puede funcionar de manera diferente en un escote muy cerrado y en uno profundo.",
            ],
          },
          {
            title: "Elegir solo por el tipo de escote",
            paragraphs: [
              "También deben considerarse el estilo personal, la ocasión, el tamaño de la joya, el material, el resto de accesorios y la comodidad.",
            ],
          },
        ],
      },
      {
        title: "Entonces, ¿qué collar elegir?",
        paragraphs: [
          "Si quieres una regla rápida, estas combinaciones pueden servir como punto de partida.",
        ],
        bullets: [
          "Escote en V: colgantes que acompañen la forma del escote.",
          "Escote redondo: collares cortos o medios.",
          "Escote cuadrado: piezas cortas y equilibradas.",
          "Palabra de honor: gargantillas o collares protagonistas.",
          "Escote corazón: colgantes delicados.",
          "Escote barco: collares medios o largos.",
          "Cuello alto: collares largos sobre la prenda.",
          "Halter: collar muy discreto o ningún collar.",
          "Asimétrico: minimalismo o protagonismo para los pendientes.",
        ],
        subsections: [
          {
            title: "Orientación, no norma obligatoria",
            paragraphs: [
              "Estas combinaciones deben entenderse como orientación, no como normas obligatorias. La mejor opción será aquella que encaje con la prenda y, sobre todo, con el estilo de quien la lleva.",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-collar", label: "Cómo elegir un collar o colgante" },
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
      { href: "/guias/plata-925", label: "Plata 925 o plata de ley: qué significa y cómo reconocerla" },
    ],
    advisorCta: {
      title: "¿No sabes qué collar elegir?",
      description:
        "Dinos qué escote vas a llevar, la ocasión, tu estilo y tu presupuesto, y nuestro joyero IA puede ayudarte a elegir un tipo de collar adecuado.",
    },
  },
  {
    slug: "tipos-de-cadenas",
    categorySlug: "collares",
    eyebrow: "Guías",
    title: "Tipos de cadenas para collares: nombres, estilos y cómo elegir",
    description:
      "Descubre los principales tipos de cadenas para collares, sus nombres, estilos, resistencia y cuáles funcionan mejor con colgantes.",
    intro:
      "La cadena influye en la comodidad, el estilo y la seguridad de un collar. No solo importa el metal: también cuentan el tipo de eslabón, el grosor, la flexibilidad y el cierre.",
    sections: [
      {
        title: "Tabla rápida de tipos de cadenas",
        paragraphs: [
          "Esta comparativa resume estilos habituales. La resistencia real depende también del grosor, material, soldaduras, calidad, cierre y construcción.",
        ],
        table: {
          columns: ["Tipo", "Aspecto", "Flexibilidad", "Adecuada para colgante", "Estilo"],
          rows: [
            ["Forzada", "Eslabones sencillos", "Alta", "Sí", "Clásico"],
            ["Barbada/cubana", "Eslabones planos", "Media", "Depende del grosor", "Marcado"],
            ["Figaro", "Alternancia de eslabones", "Alta", "Sí", "Clásico"],
            ["Veneciana", "Eslabones cuadrados", "Media", "Muy adecuada", "Elegante"],
            ["Rolo", "Eslabones redondos", "Alta", "Sí", "Versátil"],
            ["Singapur", "Trenzada", "Alta", "Sí", "Brillante"],
            ["Serpiente", "Superficie continua", "Media", "Sí", "Minimalista"],
            ["Espiga", "Patrón en V", "Media", "No siempre", "Elegante"],
          ],
        },
      },
      {
        title: "Cadenas clásicas: forzada, barbada, Figaro y rolo",
        subsections: [
          {
            title: "Cadena forzada",
            paragraphs: [
              "La cadena forzada utiliza eslabones sencillos y suele ser flexible. Es una opción muy habitual para colgantes discretos y para quien busca un diseño fácil de combinar.",
            ],
          },
          {
            title: "Cadena barbada o cubana",
            paragraphs: [
              "La cadena barbada o cubana tiene eslabones más planos y una presencia visual marcada. Puede llevar colgante si el grosor lo permite, aunque muchas veces funciona como pieza protagonista.",
            ],
          },
          {
            title: "Cadena Figaro",
            paragraphs: [
              "Alterna eslabones cortos y más largos. Es reconocible, clásica y puede funcionar tanto sola como con colgantes proporcionados.",
            ],
          },
          {
            title: "Cadena rolo",
            paragraphs: [
              "Tiene eslabones redondos y aspecto equilibrado. Es versátil, flexible y suele combinar bien con colgantes pequeños o medianos.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Cadenas con más textura o brillo",
        subsections: [
          {
            title: "Cadena veneciana",
            paragraphs: [
              "Está formada por eslabones cuadrados que crean una línea limpia y elegante. Suele ser muy adecuada para llevar colgantes.",
            ],
          },
          {
            title: "Cadena singapur",
            paragraphs: [
              "Presenta un efecto trenzado y brillante. Aporta movimiento y luz, por lo que puede funcionar bien en diseños delicados.",
            ],
          },
          {
            title: "Cadena serpiente",
            paragraphs: [
              "Tiene una superficie continua y aspecto minimalista. Conviene evitar doblarla en exceso porque puede marcarse según la construcción.",
            ],
          },
          {
            title: "Cadena espiga, cordón y bolas",
            paragraphs: [
              "La espiga crea un patrón en V elegante, el cordón tiene efecto trenzado y la cadena de bolas aporta un estilo más informal o gráfico. No todas funcionan igual de bien con colgantes pesados.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Qué cadena elegir para llevar un colgante",
        paragraphs: [
          {
            parts: [
              "Para colgantes suelen funcionar cadenas flexibles, proporcionadas y con un cierre fiable. Si dudas sobre longitud y estilo, revisa también ",
              { href: "/guias/como-elegir-collar", label: "cómo elegir un collar o colgante" },
              ".",
            ],
          },
          "La cadena no debería competir con el colgante ni ser tan fina que sufra con el peso. En colgantes grandes, el grosor y las soldaduras importan mucho.",
        ],
      },
      {
        title: "Tipos de cadenas de oro y de plata",
        subsections: [
          {
            title: "Tipos de cadenas de oro",
            paragraphs: [
              {
                parts: [
                  "En oro, el quilataje influye en color, pureza y comportamiento. Una cadena de oro 18k no se comporta igual que una de 14k en todos los casos. Puedes ampliar en ",
                  { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" },
                  ".",
                ],
              },
            ],
          },
          {
            title: "Tipos de cadenas de plata",
            paragraphs: [
              {
                parts: [
                  "En plata, conviene revisar si es plata 925, baño de plata u otro acabado. La plata puede oscurecerse con el uso y necesita cuidados adecuados. Consulta ",
                  { href: "/guias/plata-925", label: "plata 925 o plata de ley" },
                  ".",
                ],
              },
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Resistencia, grosor y enredos",
        paragraphs: [
          "No hay una cadena universalmente más resistente. Influyen el material, grosor, soldaduras, cierre, construcción y trato diario.",
          "Una cadena muy fina puede verse delicada, pero también es más vulnerable a tirones. Una cadena gruesa puede ser más visible y pesada.",
          {
            parts: [
              "Para evitar enredos, guarda las cadenas separadas, abrochadas y extendidas cuando sea posible. Si vas a elegir collar para una prenda concreta, te puede ayudar la guía de ",
              { href: "/guias/collares-segun-escote", label: "collares según escote" },
              ".",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-collar", label: "Cómo elegir un collar o colgante" },
      { href: "/guias/collares-segun-escote", label: "Collares según escote" },
      { href: "/guias/plata-925", label: "Plata 925 o plata de ley" },
    ],
    advisorCta: {
      title: "¿Necesitas ayuda para elegir una cadena?",
      description:
        "Cuéntale a nuestro joyero IA qué colgante o estilo buscas, la ocasión y tu presupuesto, y te ayudará a comparar opciones.",
    },
  },
  {
    slug: "como-elegir-pendientes",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Cómo elegir pendientes",
    description:
      "Consejos para elegir pendientes según tamaño, cierre, peso, estilo, material y ocasión.",
    intro:
      "Unos pendientes pueden ser discretos o protagonistas. Para acertar, observa qué tamaño lleva la persona y cuánto peso tolera en el día a día.",
    sections: [
      {
        title: "Tamaño y peso",
        paragraphs: [
          "Los pendientes de botón y aros pequeños suelen ser cómodos. Los pendientes largos pueden favorecer mucho, pero no siempre son prácticos para muchas horas.",
        ],
      },
      {
        title: "Cierres",
        paragraphs: [
          "Presión, rosca, gancho o criolla ofrecen seguridad y comodidad distintas. Para regalo, un cierre sencillo y conocido reduce riesgos.",
          {
            parts: [
              "Si quieres comparar sistemas concretos, consulta la guía de ",
              { href: "/guias/tipos-cierre-pendientes", label: "tipos de cierre de pendientes" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Materiales",
        paragraphs: [
          "Si hay sensibilidad cutánea, revisa composición. No todas las piezas doradas o plateadas tienen la misma base ni el mismo baño.",
        ],
      },
    ],
    related: [
      { href: "/guias/tipos-cierre-pendientes", label: "Tipos de cierre de pendientes" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
      { href: "/guias/pendientes-boda-invitada", label: "Pendientes para boda de invitada" },
      { href: "/guias/como-elegir-pendientes-novia", label: "Cómo elegir pendientes de novia" },
    ],
  },
  {
    slug: "tipos-cierre-pendientes",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Tipos de cierre de pendientes: cuáles existen y cuál elegir",
    description:
      "Descubre los principales tipos de cierre de pendientes, sus ventajas, comodidad, seguridad y para qué tipo de pendiente resulta más adecuado cada uno.",
    intro:
      "El cierre de unos pendientes puede parecer un detalle secundario, pero influye directamente en la comodidad, la seguridad y la facilidad con la que podemos ponernos y quitarnos una pieza.",
    sections: [
      {
        title: "Antes de elegir un cierre",
        paragraphs: [
          "No todos los cierres de pendientes funcionan igual ni son adecuados para todos los diseños. Un pendiente pequeño para uso diario puede necesitar un sistema diferente al de unos pendientes largos o una pieza de cierto peso.",
          {
            parts: [
              "Conocer los principales tipos de cierres para pendientes permite elegir mejor una joya. Para criterios generales de tamaño, peso y material, puedes consultar también ",
              { href: "/guias/como-elegir-pendientes", label: "cómo elegir pendientes" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Tabla rápida de cierres de pendientes",
        paragraphs: ["La seguridad y comodidad reales dependen del ajuste, el peso del pendiente y el estado del mecanismo."],
        table: {
          columns: ["Tipo de cierre", "Seguridad", "Comodidad", "Uso habitual"],
          rows: [
            ["Presión o mariposa", "Media-alta", "Alta", "Pendientes pequeños y medianos"],
            ["Rosca", "Alta", "Media-alta", "Pendientes pequeños y joyería infantil"],
            ["Catalán", "Alta", "Alta", "Pendientes medianos"],
            ["Omega", "Alta", "Alta", "Pendientes medianos o pesados"],
            ["Gancho", "Media", "Alta", "Pendientes largos"],
            ["Aro", "Alta", "Alta", "Aros"],
            ["Palanca", "Alta", "Alta", "Pendientes colgantes"],
            ["Clip", "Variable", "Variable", "Personas sin agujero"],
          ],
        },
      },
      {
        title: "Cierre de presión o mariposa",
        paragraphs: [
          "Es uno de los sistemas más habituales. El pendiente incorpora un pequeño poste que atraviesa el agujero de la oreja y, por detrás, se introduce una pieza que mantiene el pendiente en su posición.",
          "El cierre presión en pendientes es fácil de poner, fácil de quitar, poco voluminoso y cómodo para pendientes pequeños o medianos.",
          "Conviene comprobar periódicamente que la pieza trasera mantiene suficiente presión. Con el uso puede aflojarse y aumentar el riesgo de perder el pendiente.",
        ],
      },
      {
        title: "Cierre de rosca",
        paragraphs: [
          "El cierre de rosca en pendientes utiliza un poste roscado y una pieza posterior que se enrosca sobre él. Proporciona una sujeción muy segura y dificulta que el pendiente se desprenda accidentalmente.",
          "Puede encontrarse en pendientes pequeños, joyería infantil, piezas de cierto valor y pendientes destinados a permanecer puestos durante bastante tiempo.",
          "Como inconveniente, ponerlo y quitarlo requiere algo más de tiempo que un cierre de presión.",
        ],
      },
      {
        title: "Cierre catalán",
        paragraphs: [
          "El cierre catalán en pendientes utiliza una pieza trasera articulada que encaja sobre el extremo del poste. Suele proporcionar una combinación interesante de seguridad y facilidad de uso.",
          "Se utiliza especialmente en pendientes medianos y diseños clásicos. Al cerrar correctamente, la propia estructura mantiene el pendiente asegurado sin necesidad de una pieza trasera independiente.",
        ],
      },
      {
        title: "Cierre omega",
        paragraphs: [
          "El cierre omega en pendientes incorpora una pieza articulada que presiona suavemente la parte posterior del lóbulo.",
          "Es habitual en pendientes de cierto tamaño o peso porque ayuda a distribuir mejor la presión. Puede ofrecer buena estabilidad, sensación de seguridad, mayor apoyo y comodidad cuando está correctamente ajustado.",
          "Un cierre omega demasiado apretado puede resultar incómodo. El ajuste debe ser adecuado para cada persona.",
        ],
      },
      {
        title: "Cierre de gancho, aro, palanca y clip",
        subsections: [
          {
            title: "Cierre de gancho",
            paragraphs: [
              "Es muy frecuente en pendientes largos y colgantes. Una pieza metálica curva atraviesa el agujero y queda suspendida. Es ligero, permite movimiento y puede combinarse con una pieza de silicona posterior para reducir el riesgo de salida.",
            ],
          },
          {
            title: "Cierre de aro",
            paragraphs: [
              "El cierre de aro puede introducir un extremo del aro en el agujero y encajarlo en el otro extremo, o usar postes y cierres articulados. Lo importante es comprobar que el mecanismo cierre correctamente.",
            ],
          },
          {
            title: "Cierre de palanca",
            paragraphs: [
              "Se utiliza especialmente en pendientes colgantes. El poste atraviesa la oreja y una pieza articulada se cierra detrás. Es cómodo, seguro y no necesita una pieza posterior independiente.",
            ],
          },
          {
            title: "Pendientes de clip",
            paragraphs: [
              "Permiten utilizar pendientes sin perforación. La comodidad depende mucho del diseño y de la presión ejercida sobre el lóbulo.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Cuál elegir según seguridad, peso y uso",
        subsections: [
          {
            title: "¿Cuál es el cierre más seguro?",
            paragraphs: [
              "No existe un único cierre perfecto. Para pendientes pequeños y valiosos, la rosca puede proporcionar mucha seguridad. Para pendientes medianos o grandes pueden funcionar muy bien los cierres catalán u omega.",
              "También importa el estado del cierre. Incluso un sistema seguro puede dejar de serlo si está deformado o desgastado.",
            ],
          },
          {
            title: "¿Qué cierre es mejor para pendientes pesados?",
            paragraphs: [
              "Los pendientes grandes necesitan distribuir correctamente el peso. Los sistemas omega pueden ser útiles porque proporcionan una superficie de apoyo mayor en la parte posterior del lóbulo.",
              "Un cierre adecuado no elimina los problemas de usar durante muchas horas una pieza excesivamente pesada.",
            ],
          },
          {
            title: "Qué revisar antes de comprar",
            paragraphs: [
              {
                parts: [
                  "Comprueba que el cierre funciona suavemente, no se abre por accidente, no ejerce presión excesiva, tiene una longitud adecuada y no presenta bordes incómodos. Para conservar el mecanismo, revisa también ",
                  { href: "/guias/como-cuidar-joyas", label: "cómo cuidar joyas sin dañarlas" },
                  ".",
                ],
              },
            ],
          },
        ],
        paragraphs: [],
      },
    ],
    related: [
      { href: "/guias/como-elegir-pendientes", label: "Cómo elegir pendientes" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
      { href: "/guias/pendientes-boda-invitada", label: "Pendientes para boda de invitada" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
    ],
    advisorCta: {
      title: "¿Necesitas ayuda para elegir pendientes?",
      description:
        "Cuéntale a nuestro joyero IA qué tipo de pendientes buscas, para quién son, tu estilo y tu presupuesto, y te ayudará a encontrar una opción adecuada.",
    },
  },
  {
    slug: "tipos-de-pendientes",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Tipos de pendientes: nombres, estilos y cómo elegir",
    description:
      "Conoce los principales tipos de pendientes: botón, aros, criollas, colgantes, largos, ear cuffs, trepadores y otros estilos habituales.",
    intro:
      "Los nombres de pendientes ayudan a comparar diseños, entender su uso y elegir una pieza que encaje con el estilo, la ocasión y la comodidad esperada.",
    sections: [
      {
        title: "Tabla rápida de tipos de pendientes",
        paragraphs: ["Esta tabla resume clases de pendientes habituales y su uso más común."],
        table: {
          columns: ["Tipo", "Tamaño habitual", "Movimiento", "Uso"],
          rows: [
            ["Botón", "Pequeño", "Bajo", "Diario"],
            ["Aro", "Variable", "Medio", "Muy versátil"],
            ["Criolla", "Variable", "Medio", "Casual/elegante"],
            ["Colgante", "Medio-largo", "Alto", "Versátil"],
            ["Chandelier", "Grande", "Alto", "Eventos"],
            ["Ear cuff", "Variable", "Bajo", "Estilo moderno"],
            ["Trepador", "Medio", "Bajo", "Moderno"],
          ],
        },
      },
      {
        title: "Pendientes pequeños y versátiles",
        subsections: [
          {
            title: "Pendientes de botón o stud",
            paragraphs: [
              "Los pendientes de botón quedan pegados al lóbulo y suelen tener poco movimiento. Son cómodos para diario y fáciles de combinar.",
            ],
          },
          {
            title: "Dormilonas",
            paragraphs: [
              "Las dormilonas son pendientes pequeños y cómodos, pensados para resultar discretos y prácticos. Pueden ser una opción prudente para regalo.",
            ],
          },
          {
            title: "Pendientes con piedras",
            paragraphs: [
              "Pueden aparecer en formato botón, aro, colgante o lágrima. Conviene revisar el engaste y los cuidados de la piedra.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Aros, criollas y estilos con movimiento",
        subsections: [
          {
            title: "Pendientes de aro",
            paragraphs: [
              "Los pendientes de aro pueden ser pequeños, medianos o grandes. Son muy versátiles y cambian mucho según grosor, diámetro y cierre.",
            ],
          },
          {
            title: "Criollas",
            paragraphs: [
              "Las criollas son una familia de aros con presencia clásica y uso cotidiano o elegante según el diseño.",
            ],
          },
          {
            title: "Pendientes colgantes y largos",
            paragraphs: [
              "Los pendientes colgantes y pendientes largos aportan movimiento. Pueden favorecer mucho en ocasiones especiales, aunque el peso debe revisarse.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Diseños protagonistas y modernos",
        subsections: [
          {
            title: "Pendientes de lágrima",
            paragraphs: [
              "Tienen una caída suave y forma alargada. Suelen funcionar bien en eventos porque estilizan sin ser necesariamente excesivos.",
            ],
          },
          {
            title: "Pendientes chandelier",
            paragraphs: [
              "Son pendientes grandes, con varios niveles o piezas colgantes. Están pensados para eventos y looks donde la joya tiene protagonismo.",
            ],
          },
          {
            title: "Ear cuffs",
            paragraphs: [
              "Los ear cuffs rodean parte de la oreja y pueden utilizarse con o sin perforación según el diseño. Aportan un estilo moderno.",
            ],
          },
          {
            title: "Pendientes trepadores",
            paragraphs: [
              "Los pendientes trepadores siguen la línea de la oreja hacia arriba. Suelen tener poco movimiento y un efecto visual contemporáneo.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Qué pendientes elegir según uso y ocasión",
        subsections: [
          {
            title: "Uso diario",
            paragraphs: [
              "Para diario suelen funcionar pendientes de botón, aros pequeños, criollas ligeras o piezas con poco peso y cierre cómodo.",
            ],
          },
          {
            title: "Ocasión especial",
            paragraphs: [
              "Para eventos pueden encajar pendientes largos, chandelier, lágrimas o piezas con piedras, siempre que el peso no resulte incómodo.",
            ],
          },
          {
            title: "El peso también importa",
            paragraphs: [
              "Un pendiente bonito puede ser poco práctico si tira del lóbulo o molesta después de varias horas. El diseño debe equilibrar presencia y comodidad.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "El cierre del pendiente",
        paragraphs: [
          {
            parts: [
              "El diseño del pendiente es solo una parte de la elección. Consulta también nuestra guía sobre ",
              { href: "/guias/tipos-cierre-pendientes", label: "tipos de cierre de pendientes" },
              " para comparar sistemas de presión, rosca, omega, catalán y otros cierres.",
            ],
          },
          {
            parts: [
              "Para una visión general de tamaño, material y ocasión, revisa ",
              { href: "/guias/como-elegir-pendientes", label: "cómo elegir pendientes" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cómo elegir el tipo de pendiente",
        paragraphs: [
          {
            parts: [
              "Ten en cuenta estilo personal, ocasión, peso, cierre, sensibilidad de la piel y relación con otras joyas. Si se trata de un regalo, puede ayudarte ",
              { href: "/guias/como-elegir-una-joya-para-regalar", label: "cómo elegir una joya para regalar" },
              ".",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-pendientes", label: "Cómo elegir pendientes" },
      { href: "/guias/tipos-cierre-pendientes", label: "Tipos de cierre de pendientes" },
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
    ],
    advisorCta: {
      title: "¿Necesitas ayuda para elegir pendientes?",
      description:
        "Cuéntale a nuestro joyero IA qué estilo buscas, para quién son, la ocasión y tu presupuesto, y te ayudará a comparar opciones.",
    },
  },
  {
    slug: "como-cuidar-joyas",
    categorySlug: "cuidados",
    eyebrow: "Guías",
    title: "Cómo cuidar joyas sin dañarlas",
    description:
      "Cuidados generales para conservar joyas: almacenamiento, limpieza, humedad, perfumes y revisiones.",
    intro:
      "Cada joya tiene cuidados propios según metal, piedra, engaste y acabado. Aun así, hay hábitos generales que ayudan a conservarlas mejor.",
    sections: [
      {
        title: "Uso diario",
        paragraphs: [
          "Evita exponer joyas a perfumes, cosméticos, cloro, agua salada o golpes cuando no sea necesario. Algunas piezas lo toleran mejor que otras, pero conviene ser prudente.",
        ],
      },
      {
        title: "Almacenamiento",
        paragraphs: [
          "Guarda las piezas secas y separadas para reducir roces. Las cadenas finas se enredan con facilidad y las piedras pueden rayar otros materiales.",
        ],
      },
      {
        title: "Limpieza",
        paragraphs: [
          "Usa paños y productos adecuados para el material. Si hay piedras, perlas, esmaltes o baños, evita limpiezas agresivas sin confirmar compatibilidad.",
        ],
      },
    ],
    related: [
      { href: "/guias/como-limpiar-plata", label: "Cómo limpiar plata" },
      { href: "/guias/como-limpiar-oro", label: "Cómo limpiar oro" },
      { href: "/guias/plata-925", label: "Plata 925" },
      { href: "/guias/piedras-preciosas", label: "Piedras preciosas" },
    ],
  },
  {
    slug: "como-elegir-una-joya-para-regalar",
    categorySlug: "regalos",
    eyebrow: "Guías",
    title: "Cómo elegir una joya para regalar",
    description:
      "Método práctico para regalar joyas según estilo, metal, ocasión, presupuesto, talla y significado.",
    intro:
      "Regalar joyas no va de encontrar una fórmula perfecta, sino de reunir buenas pistas y elegir una pieza coherente con la persona.",
    sections: [
      {
        title: "Observa antes de comprar",
        paragraphs: [
          "Mira que metal usa, si lleva pendientes, si repite collares, si mezcla joyas y si prefiere piezas discretas o visibles.",
        ],
      },
      {
        title: "Ajusta la elección",
        paragraphs: [
          "Para poca información, collares, pendientes pequeños o pulseras ajustables suelen ser opciones prudentes. Para anillos, la talla es clave.",
        ],
      },
      {
        title: "Significado",
        paragraphs: [
          "Una fecha, inicial o piedra vinculada a un recuerdo puede aportar cercanía, siempre que el resultado siga siendo ponible.",
        ],
      },
    ],
    related: [
      { href: "/guias/joyas-para-regalar-mujer", label: "Joyas para regalar a una mujer" },
      { href: "/guias/como-elegir-collar", label: "Cómo elegir un collar o colgante" },
      { href: "/guias/como-elegir-pendientes", label: "Cómo elegir pendientes" },
      { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" },
    ],
  },
  {
    slug: "piedras-preciosas",
    categorySlug: "piedras",
    eyebrow: "Guías",
    title: "Piedras preciosas: color, dureza y cuidados",
    description:
      "Introducción a diamante, rubí, zafiro, esmeralda, amatista, topacio, aguamarina y granate.",
    intro:
      "Las piedras aportan color, brillo y carácter a una joya. Su precio depende de calidad, tamaño, tratamiento, origen, talla, color, claridad y mercado, por eso no conviene generalizar.",
    sections: [
      {
        title: "Sobre la escala de Mohs",
        paragraphs: [
          "La escala de Mohs mide resistencia al rayado. No equivale directamente a resistencia a golpes o roturas.",
          "Una piedra dura puede astillarse si recibe un golpe mal situado, y una piedra menos dura puede durar bien si se usa con cuidado.",
        ],
      },
      {
        title: "Piedras habituales",
        bullets: [
          "Diamante: conocido por su alta dureza frente al rayado y brillo; puede usarse en compromiso y joyas de diario bien protegidas.",
          "Rubí: variedad roja del corindón, apreciada por color intenso; conviene revisar tratamientos.",
          "Zafiro: corindón en distintos colores, especialmente azul; habitual en anillos y pendientes.",
          "Esmeralda: verde característico; suele requerir más cuidado por inclusiones y tratamientos frecuentes.",
          "Amatista: cuarzo violeta, usada en joyas de color con precios muy variables según calidad y pieza.",
          "Topacio: aparece en varios colores; algunos tonos pueden deberse a tratamientos.",
          "Aguamarina: tono azul verdoso suave, habitual en joyas luminosas y delicadas.",
          "Granate: grupo de minerales con varios colores, aunque se asocia mucho al rojo profundo.",
        ],
        paragraphs: [
          "Si se mencionan significados tradicionales de piedras, deben entenderse como creencias culturales o simbólicas, no como propiedades médicas, energéticas o científicas.",
        ],
      },
      {
        title: "Cuidados generales",
        paragraphs: [
          "Evita golpes, cambios bruscos, productos químicos y limpiezas agresivas sin confirmar que son adecuadas para la piedra concreta.",
          "Engaste, exposición de la piedra y frecuencia de uso influyen tanto como la piedra en sí.",
        ],
      },
    ],
    related: [
      { href: "/ocasiones/compromiso", label: "Piedras en compromiso" },
      { href: "/guias/moissanita-vs-diamante", label: "Moissanita vs diamante" },
      { href: "/guias/diamantes-rosados", label: "Diamantes rosados" },
      { href: "/guias/como-cuidar-joyas", label: "Cuidado de joyas" },
    ],
  },
  {
    slug: "tipos-de-anillos",
    categorySlug: "anillos",
    eyebrow: "Guías",
    title: "Tipos de anillos: nombres, estilos y significado",
    description:
      "Conoce los principales tipos de anillos: solitario, halo, trilogy, eternity, sello, cóctel, toi et moi y otros diseños habituales en joyería.",
    intro:
      "Existen numerosos tipos de anillos y algunos nombres hacen referencia al diseño, mientras que otros describen el uso o el significado de la pieza.",
    sections: [
      {
        title: "Por qué conocer los nombres de anillos",
        paragraphs: [
          "Conocer los estilos más habituales facilita comparar diseños y explicar qué estamos buscando en una joyería.",
          {
            parts: [
              "Si estás mirando anillos para regalar, recuerda que la talla también importa. Puedes revisar nuestra guía sobre ",
              { href: "/guias/como-saber-talla-anillo", label: "cómo saber la talla de un anillo" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Anillo solitario",
        paragraphs: [
          "El anillo solitario se caracteriza por tener una piedra principal como protagonista. Aunque suele asociarse a los anillos de compromiso, puede utilizarse en muchos otros tipos de joya.",
          "Su diseño permite concentrar la atención en la piedra central.",
        ],
      },
      {
        title: "Anillo halo",
        paragraphs: [
          "En un anillo halo, una piedra central aparece rodeada por piedras más pequeñas. Este diseño puede aumentar visualmente el protagonismo de la zona central y añadir brillo.",
          "Puede encontrarse con halos redondos, cuadrados, ovalados o adaptados a otras formas de piedra.",
        ],
      },
      {
        title: "Anillo trilogy o de tres piedras",
        paragraphs: [
          "El diseño trilogy incorpora tres piedras principales. A menudo se atribuyen significados relacionados con pasado, presente y futuro, aunque estos significados son simbólicos y no universales.",
          "Es especialmente habitual en joyas románticas y aniversarios.",
        ],
      },
      {
        title: "Anillo eternity",
        paragraphs: [
          "Los anillos eternity incorporan una línea de piedras alrededor de todo o parte del aro. Cuando las piedras rodean completamente la pieza se habla habitualmente de eternity completo.",
          "Cuando ocupan solo una parte, suele resultar más fácil ajustar la talla posteriormente.",
        ],
      },
      {
        title: "Anillo toi et moi",
        paragraphs: [
          "El nombre francés significa aproximadamente “tú y yo”. El diseño utiliza dos piedras principales enfrentadas o situadas muy cerca una de otra.",
        ],
        bullets: [
          "Diferentes gemas.",
          "Distintos colores.",
          "Formas diferentes.",
          "Dos piedras con significado personal.",
        ],
      },
      {
        title: "Anillo sello y anillo cóctel",
        subsections: [
          {
            title: "Anillo sello",
            paragraphs: [
              "El anillo sello presenta una superficie superior relativamente amplia. Tradicionalmente podía incorporar iniciales, escudos, símbolos o grabados. Actualmente existen diseños clásicos y versiones minimalistas.",
            ],
          },
          {
            title: "Anillo cóctel",
            paragraphs: [
              "Los anillos cóctel se caracterizan por diseños grandes y llamativos. Pueden incorporar piedras grandes, composiciones de varias gemas o diseños escultóricos pensados para tener protagonismo visual.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Alianza, compromiso y promesa",
        subsections: [
          {
            title: "Alianza",
            paragraphs: [
              "La alianza es un aro utilizado tradicionalmente como símbolo de matrimonio. Puede ser lisa o incorporar piedras, texturas, grabados y acabados diferentes.",
            ],
          },
          {
            title: "Anillo de compromiso",
            paragraphs: [
              "El término describe principalmente la función de la pieza y no un único diseño. Un anillo de compromiso puede ser solitario, halo, trilogy, pavé, vintage o toi et moi.",
            ],
          },
          {
            title: "Anillo de promesa",
            paragraphs: [
              "Representa un compromiso personal entre dos personas, aunque su significado concreto depende de quienes lo utilizan. No existe un diseño oficial.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Anillos apilables",
        paragraphs: [
          "Son piezas pensadas para combinarse entre sí. Permiten crear diferentes composiciones cambiando metales, texturas, piedras y anchuras.",
          "También pueden añadirse gradualmente con el tiempo.",
        ],
      },
      {
        title: "¿Qué tipo de anillo elegir?",
        paragraphs: [
          {
            parts: [
              "Depende de la ocasión, presupuesto, uso diario, estilo personal, tipo de piedra, mantenimiento y comodidad. Para regalar, también puede ayudarte nuestra guía sobre ",
              { href: "/guias/como-elegir-una-joya-para-regalar", label: "cómo elegir una joya para regalar" },
              ".",
            ],
          },
          "Para uso cotidiano suele ser importante considerar también cuánto sobresale la piedra y la seguridad del engaste.",
        ],
      },
    ],
    related: [
      { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" },
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
    ],
    advisorCta: {
      title: "¿Necesitas ayuda para elegir un anillo?",
      description:
        "Cuéntale a nuestro joyero IA qué estilo buscas, para quién es, la ocasión y tu presupuesto, y te ayudará a ordenar opciones.",
    },
  },
  {
    slug: "oro-rosa",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Oro rosa: qué es, composición, quilates y diferencias",
    description:
      "Descubre qué es el oro rosa, de qué está compuesto, qué significan 14k y 18k y cuáles son sus diferencias frente al oro amarillo y blanco.",
    intro:
      "El oro rosa es una aleación de oro cuyo característico tono rosado se consigue combinando oro con otros metales.",
    sections: [
      {
        title: "Qué es el oro rosa",
        paragraphs: [
          "No se trata de una variedad de oro que tenga ese color de forma natural. El oro puro es amarillo y muy maleable, por lo que en joyería suele combinarse con otros metales para modificar dureza, color y resistencia.",
          "También puede aparecer descrito como oro rosado, especialmente cuando el tono es más suave.",
        ],
      },
      {
        title: "¿De qué está compuesto el oro rosa?",
        paragraphs: [
          "Normalmente el tono rosado se obtiene mediante una aleación en la que intervienen oro y cobre. También pueden utilizarse pequeñas cantidades de otros metales dependiendo de la formulación.",
          "Cuanto mayor sea la proporción de cobre respecto a determinadas aleaciones, más marcado puede resultar el tono rojizo.",
          "No existe una única receta universal de composición del oro rosa. Dos joyas con los mismos quilates pueden presentar tonos ligeramente diferentes.",
        ],
      },
      {
        title: "Oro rosa 18k y oro rosa 14k",
        subsections: [
          {
            title: "Oro rosa de 18 quilates",
            paragraphs: [
              "El oro rosa 18k contiene aproximadamente un 75 % de oro. El porcentaje restante corresponde a los metales utilizados en la aleación, entre los que suele tener presencia el cobre.",
            ],
          },
          {
            title: "Oro rosa de 14 quilates",
            paragraphs: [
              "El oro rosa 14k contiene aproximadamente un 58,5 % de oro. Al existir una proporción superior de aleación frente al oro de 18k, puede presentar diferencias de color, dureza, precio y comportamiento frente al uso.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "¿El oro rosa es oro de verdad?",
        paragraphs: [
          "Sí, siempre que estemos hablando de una aleación de oro auténtica. El color no determina si una pieza es oro.",
          {
            parts: [
              "Lo importante es su contenido real de oro y su contraste o documentación. Marcas como 750 suelen relacionarse con oro de aproximadamente 75 % de pureza, y 585 con aproximadamente 58,5 %. Para comprobar una pieza, consulta ",
              { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "cómo saber si una joya es de oro" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Oro rosa vs oro amarillo",
        paragraphs: [
          "La principal diferencia visual es el color. El oro amarillo mantiene una apariencia más próxima al color tradicional del oro, mientras que el oro rosa incorpora una mayor influencia del cobre en la aleación.",
          "La elección suele depender del gusto y de cómo combine con tono de piel, ropa, piedras y otras joyas.",
        ],
      },
      {
        title: "Oro rosa vs oro blanco",
        paragraphs: [
          "El oro blanco utiliza aleaciones que reducen el tono amarillo del oro. Muchas piezas de oro blanco reciben además un recubrimiento de rodio para conseguir un acabado blanco brillante.",
          "El oro rosa obtiene su tonalidad principalmente por la aleación con cobre. Ambos son oro si contienen la proporción correspondiente.",
        ],
      },
      {
        title: "Desgaste, uso diario y cuidados",
        paragraphs: [
          "Si la pieza es oro rosa macizo, el tono procede de la propia aleación y no simplemente de una capa superficial. Esto es diferente de una pieza únicamente bañada o chapada en color rosa.",
          {
            parts: [
              "Puede ser adecuado para uso frecuente, dependiendo del diseño, grosor, engaste, piedras y exposición a golpes. Revisa también ",
              { href: "/guias/como-cuidar-joyas", label: "cómo cuidar joyas sin dañarlas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "¿Por qué elegir oro rosa?",
        paragraphs: [
          "Puede resultar interesante si gusta su tono cálido, se buscan alternativas al amarillo o blanco, combina bien con otras joyas personales o se quiere un diseño con estética romántica o contemporánea.",
          {
            parts: [
              "No es intrínsecamente mejor ni peor que otros colores de oro. Para entender purezas y quilates, consulta ",
              { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" },
              ".",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
    ],
    advisorCta: {
      title: "¿Necesitas ayuda para elegir una joya de oro rosa?",
      description:
        "Cuéntale a nuestro joyero IA el tipo de joya, la ocasión, tu estilo y tu presupuesto, y te ayudará a encontrar una opción adecuada.",
    },
  },
  {
    slug: "oro-laminado-chapado-bano",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Oro laminado, chapado y baño de oro: diferencias, duración y cuál elegir",
    description:
      "Descubre las diferencias entre oro laminado, chapado y baño de oro, cuánto suelen durar, cómo cuidarlos y en qué se diferencian del oro macizo.",
    intro:
      "Oro laminado, chapado en oro y baño de oro no significan lo mismo. Los tres pueden contener oro en una capa o recubrimiento, pero no equivalen a una pieza de oro macizo.",
    sections: [
      {
        title: "Comparativa rápida",
        paragraphs: [
          "No existen duraciones exactas universales: dependen del grosor de la capa, uso, sudor, productos químicos, roce y fabricación.",
        ],
        table: {
          columns: ["Tipo", "Qué es", "Cantidad relativa de oro", "Durabilidad aproximada", "¿Es oro macizo?"],
          rows: [
            ["Oro macizo", "Aleación cuyo contenido incluye oro en toda la pieza", "Alta según quilates", "Muy alta", "Sí"],
            ["Oro laminado / gold filled", "Capa de oro unida a un metal base", "Superior a un chapado convencional", "Generalmente alta", "No"],
            ["Chapado en oro", "Capa de oro sobre otro metal", "Baja", "Variable", "No"],
            ["Baño de oro", "Recubrimiento superficial de oro", "Baja", "Variable", "No"],
          ],
        },
      },
      {
        title: "Qué es el oro macizo",
        paragraphs: [
          {
            parts: [
              "En una joya de oro macizo, la aleación contiene oro en toda la pieza, no solo en la superficie. El porcentaje depende del quilataje, como explicamos en ",
              { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Qué es el oro laminado",
        subsections: [
          {
            title: "Cómo se fabrica",
            paragraphs: [
              "El oro laminado, también llamado gold filled en algunos mercados, une una capa de oro a un metal base mediante procesos mecánicos o térmicos según el fabricante.",
            ],
          },
          {
            title: "Cuánto puede durar",
            paragraphs: [
              "Puede durar más que un chapado convencional cuando la capa de oro es más gruesa y la fabricación es buena, pero sigue dependiendo del uso y cuidado.",
            ],
          },
          {
            title: "Oro laminado 18k: qué significa realmente",
            paragraphs: [
              "18k puede referirse a la pureza del oro utilizado en la capa. No significa necesariamente que toda la pieza sea oro macizo de 18 quilates.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Qué significa chapado en oro",
        subsections: [
          {
            title: "Cómo se realiza el chapado",
            paragraphs: [
              "El chapado en oro aplica una capa de oro sobre otro metal. El grosor, el proceso y la preparación de la base influyen mucho en el resultado.",
            ],
          },
          {
            title: "Cuánto dura un chapado",
            paragraphs: [
              "La duración es variable. Roce, sudor, perfumes, agua, productos de limpieza y frecuencia de uso pueden acelerar el desgaste.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Qué es un baño de oro",
        paragraphs: [
          "Un baño de oro es un recubrimiento superficial. En el uso comercial puede solaparse con términos como chapado, pero conviene revisar la descripción exacta de cada vendedor.",
        ],
        subsections: [
          {
            title: "Diferencias entre baño y chapado",
            paragraphs: [
              "La diferencia práctica suele estar en el grosor, proceso y durabilidad del recubrimiento. Si la ficha no lo especifica, no conviene asumir que un baño tenga alta resistencia.",
            ],
          },
        ],
      },
      {
        title: "Oro laminado vs chapado en oro",
        paragraphs: [
          "El oro laminado suele tener una capa de oro más relevante que un chapado convencional, por lo que puede ofrecer mayor durabilidad. Aun así, ambos tienen un metal base y no son oro macizo.",
        ],
      },
      {
        title: "Chapado vs baño de oro",
        paragraphs: [
          "En ambos casos hablamos de un recubrimiento sobre otro material. Lo decisivo es conocer grosor, calidad del proceso, metal base y cuidados recomendados.",
        ],
      },
      {
        title: "Cómo saber qué tipo de joya estás comprando",
        paragraphs: [
          {
            parts: [
              "Lee la ficha del producto, busca términos como macizo, laminado, chapado, bañado o vermeil, revisa marcas y pregunta al vendedor. Para pruebas y contrastes, consulta ",
              { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "cómo saber si una joya es de oro" },
              ".",
            ],
          },
        ],
      },
      {
        title: "¿Se puede mojar una joya chapada o bañada en oro?",
        paragraphs: [
          "Lo prudente es evitar agua frecuente, piscina, mar, perfumes y productos químicos. El contacto ocasional no siempre arruina una pieza, pero puede acortar la vida del recubrimiento.",
        ],
      },
      {
        title: "Cómo hacer que dure más",
        paragraphs: [
          {
            parts: [
              "Guarda la joya seca y separada, evita roce continuo, no apliques perfume encima y limpia con suavidad. Puedes ampliar en ",
              { href: "/guias/como-cuidar-joyas", label: "cómo cuidar joyas sin dañarlas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "¿Cuál elegir?",
        paragraphs: [
          {
            parts: [
              "Si quieres máxima durabilidad, el oro macizo suele ser más estable. Si buscas precio más accesible, oro laminado, chapado o baño pueden tener sentido si entiendes sus límites. También puedes comparar colores como ",
              { href: "/guias/oro-rosa", label: "oro rosa" },
              " u ",
              { href: "/guias/oro-blanco", label: "oro blanco" },
              ".",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
    ],
    advisorCta: {
      title: "¿Necesitas ayuda para elegir una joya dorada?",
      description:
        "Cuéntale a nuestro joyero IA qué tipo de acabado buscas, la ocasión, tu estilo y tu presupuesto, y te ayudará a comparar opciones.",
    },
  },
  {
    slug: "oro-blanco",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Oro blanco: qué es, composición, 18k, precio y diferencias",
    description:
      "Descubre qué es el oro blanco, cómo se fabrica, qué significa oro blanco 18k, el papel del rodio y sus diferencias con el oro amarillo y rosa.",
    intro:
      "El oro blanco es una aleación de oro con otros metales. No es oro puro de color blanco, y muchas piezas reciben un acabado de rodio para lograr un tono más blanco y brillante.",
    sections: [
      {
        title: "Tabla comparativa",
        paragraphs: ["Esta tabla ayuda a situar el oro blanco frente a otros materiales habituales sin afirmar que uno sea universalmente mejor."],
        table: {
          columns: ["Material", "Color", "Oro aproximado", "Mantenimiento", "Característica"],
          rows: [
            ["Oro blanco 18k", "Blanco", "75 %", "Puede requerir mantenimiento de rodio", "Oro de alta pureza"],
            ["Oro amarillo 18k", "Amarillo", "75 %", "Normal", "Color tradicional"],
            ["Oro rosa 18k", "Rosado", "75 %", "Normal", "Aleación con influencia del cobre"],
            ["Plata 925", "Blanco/gris", "No contiene oro", "Puede oscurecerse", "Más económica"],
            ["Platino", "Blanco natural", "No es oro", "Mantenimiento diferente", "Metal muy denso"],
          ],
        },
      },
      {
        title: "Qué es el oro blanco",
        paragraphs: [
          "Es oro mezclado con otros metales para modificar su color y propiedades. Puede tener diferentes quilatajes y formulaciones según fabricante.",
          {
            parts: [
              "Para entender qué significa el porcentaje de oro, consulta ",
              { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" },
              ".",
            ],
          },
        ],
      },
      {
        title: "De qué está compuesto el oro blanco",
        paragraphs: [
          "No hay una composición universal. El oro se alea con otros metales que reducen el tono amarillo y ajustan dureza, color y comportamiento.",
          "La ficha de la pieza debe indicar el quilataje y, cuando sea relevante, tratamientos o recubrimientos.",
        ],
      },
      {
        title: "Oro blanco de 18 quilates y 14 quilates",
        subsections: [
          {
            title: "Oro blanco 18k",
            paragraphs: [
              "Contiene aproximadamente 75 % de oro. El resto depende de la aleación usada para conseguir el tono y propiedades deseadas.",
            ],
          },
          {
            title: "Oro blanco 14k",
            paragraphs: [
              "Contiene aproximadamente 58,5 % de oro. Puede presentar diferencias de precio, dureza y tono frente al oro blanco 18k.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Por qué el oro blanco no es naturalmente blanco",
        paragraphs: [
          "El oro puro es amarillo. El color blanco se consigue mediante aleación y, en muchas joyas, con un recubrimiento exterior de rodio.",
        ],
      },
      {
        title: "Qué es el rodio y por qué se utiliza",
        paragraphs: [
          "El rodio puede aportar un acabado blanco brillante y proteger visualmente la superficie. Con el uso puede desgastarse y requerir mantenimiento del recubrimiento.",
        ],
      },
      {
        title: "¿El oro blanco se vuelve amarillo?",
        paragraphs: [
          "Si la pieza lleva rodio, el desgaste del recubrimiento puede dejar ver un tono menos blanco debajo. No significa necesariamente que la joya sea falsa.",
        ],
      },
      {
        title: "Oro blanco vs oro amarillo, oro rosa, plata y platino",
        paragraphs: [
          {
            parts: [
              "El oro amarillo conserva el color tradicional del oro. El ",
              { href: "/guias/oro-rosa", label: "oro rosa" },
              " obtiene su tono por la influencia del cobre. La plata 925 no contiene oro y puede oscurecerse. El platino es otro metal, blanco de forma natural y muy denso.",
            ],
          },
          {
            parts: [
              "Puedes ampliar en ",
              { href: "/guias/plata-925", label: "plata 925" },
              " y ",
              { href: "/guias/platino", label: "platino" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cuánto vale el oro blanco",
        paragraphs: [
          "No conviene dar un precio fijo. El precio del oro blanco depende de quilates, peso, diseño, mano de obra, piedras, marca, acabado y mercado del oro.",
          "Dos joyas de oro blanco 18k pueden tener precios muy distintos por diseño, peso, engaste o marca.",
        ],
      },
      {
        title: "Cómo saber si una joya es de oro blanco",
        paragraphs: [
          {
            parts: [
              "Revisa marcas, documentación, vendedor y ficha técnica. El color por sí solo no demuestra que sea oro blanco. Consulta ",
              { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "cómo saber si una joya es de oro" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cómo cuidar el oro blanco",
        paragraphs: [
          {
            parts: [
              "Evita golpes, productos químicos, cloro y limpiezas agresivas. Si lleva rodio, pregunta por mantenimiento del baño. Puedes ampliar en ",
              { href: "/guias/como-cuidar-joyas", label: "cómo cuidar joyas sin dañarlas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "¿Merece la pena elegir oro blanco?",
        paragraphs: [
          "Puede tener sentido si buscas un tono claro, estilo discreto o combinación con diamantes y piedras frías. No es mejor en todos los casos: depende de gusto, presupuesto, mantenimiento y pieza concreta.",
        ],
      },
    ],
    related: [
      { href: "/guias/oro-rosa", label: "Oro rosa" },
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/plata-925", label: "Plata 925" },
      { href: "/guias/platino", label: "Platino" },
    ],
    advisorCta: {
      title: "¿Necesitas ayuda para elegir oro blanco?",
      description:
        "Cuéntale a nuestro joyero IA qué joya buscas, la ocasión, tu estilo y tu presupuesto, y te ayudará a comparar opciones.",
    },
  },
  {
    slug: "moissanita-vs-diamante",
    categorySlug: "piedras",
    eyebrow: "Guías",
    title: "Moissanita vs diamante: diferencias, precio, brillo y cuál elegir",
    description:
      "Compara moissanita y diamante: brillo, dureza, precio, apariencia, durabilidad y ventajas para elegir la piedra que mejor encaja contigo.",
    intro:
      "A simple vista, una moissanita y un diamante pueden resultar similares para muchas personas. Ambas son piedras transparentes, muy brillantes y utilizadas frecuentemente en anillos y otras joyas.",
    sections: [
      {
        title: "Comparativa rápida",
        paragraphs: [
          "Precios y características concretas dependen de calidad, tamaño, origen y vendedor. Esta comparativa de moissanita vs diamante resume diferencias generales.",
        ],
        table: {
          columns: ["Característica", "Diamante", "Moissanita"],
          rows: [
            ["Material", "Carbono cristalizado", "Carburo de silicio"],
            ["Dureza Mohs", "10", "Aproximadamente 9,25"],
            ["Brillo", "Muy alto", "Muy alto"],
            ["Fuego", "Moderado", "Más intenso"],
            ["Precio", "Generalmente superior", "Generalmente inferior"],
            ["Uso diario", "Excelente", "Excelente"],
            ["Disponibilidad", "Natural y laboratorio", "Principalmente laboratorio"],
          ],
        },
      },
      {
        title: "Qué es cada piedra",
        subsections: [
          {
            title: "¿Qué es un diamante?",
            paragraphs: [
              "El diamante es una forma cristalina de carbono. Es conocido por su dureza y por su uso tradicional en joyería, particularmente en anillos de compromiso.",
              "Existen diamantes naturales y diamantes creados en laboratorio. Ambos son diamantes desde el punto de vista químico y cristalino, aunque su origen es diferente.",
            ],
          },
          {
            title: "¿Qué es la moissanita?",
            paragraphs: [
              "La moissanita utilizada actualmente en joyería se produce principalmente en laboratorio. Está compuesta por carburo de silicio y posee una dureza muy elevada.",
              "Su apariencia transparente y su capacidad para reflejar la luz hacen que pueda utilizarse como alternativa al diamante en numerosos diseños.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Diferencia moissanita diamante en brillo y resistencia",
        paragraphs: [
          "Una de las diferencias visuales más conocidas está en la forma en que ambas piedras interactúan con la luz. El diamante produce un brillo característico compuesto por luz blanca y destellos de color.",
          "La moissanita presenta una dispersión de la luz mayor, por lo que puede mostrar destellos de colores más intensos. A algunas personas les encanta ese efecto y otras prefieren el brillo más sobrio del diamante.",
          "El diamante tiene dureza 10 en la escala de Mohs. La moissanita se sitúa ligeramente por debajo, pero sigue siendo extremadamente dura. Ambas pueden resultar apropiadas para joyas usadas con frecuencia.",
          "La dureza no significa que una piedra sea imposible de romper. También pueden producirse golpes, daños en el engaste o fracturas dependiendo de la fuerza y la dirección del impacto.",
        ],
      },
      {
        title: "Moissanita vs diamante precio",
        paragraphs: [
          "Una de las principales diferencias es el precio. A igualdad aproximada de tamaño visual, una moissanita suele costar considerablemente menos que un diamante.",
          "No debe compararse únicamente el tamaño. El precio de un diamante depende de peso, color, claridad, talla, origen y certificación. En la moissanita también existen diferencias de calidad y fabricante.",
          "Por tanto, no existe una proporción de precio universal.",
        ],
      },
      {
        title: "Cómo distinguir una moissanita de un diamante",
        paragraphs: [
          "Dependiendo del tamaño y la iluminación, una persona acostumbrada a trabajar con gemas puede detectar diferencias visuales. El mayor fuego de la moissanita puede ser una pista.",
          "Identificar una piedra únicamente a simple vista no siempre es fiable. Cuando sea importante conocer con certeza el material, lo adecuado es recurrir a documentación, certificados o análisis profesional.",
        ],
      },
      {
        title: "Anillo moissanita vs diamante",
        paragraphs: [
          "La moissanita puede ser interesante cuando se busca una piedra muy brillante, buena durabilidad, mayor tamaño visual con un presupuesto limitado o una alternativa diferente al diamante.",
          "El diamante puede resultar preferible cuando se valora la tradición, la identidad del material, determinadas características gemológicas o la importancia simbólica asociada históricamente al diamante.",
        ],
      },
      {
        title: "Moissanita o diamante: cuál elegir",
        subsections: [
          {
            title: "Elige moissanita si",
            bullets: [
              "Quieres maximizar tamaño y brillo con menor presupuesto.",
              "Te gustan los destellos intensos.",
              "No necesitas que la piedra sea un diamante.",
            ],
          },
          {
            title: "Elige diamante si",
            bullets: [
              "Quieres específicamente un diamante.",
              "Valoras su tradición.",
              "Prefieres su tipo de brillo.",
              "El presupuesto permite obtener la calidad deseada.",
            ],
          },
        ],
        paragraphs: [
          {
            parts: [
              "La mejor opción no es necesariamente la más cara, sino la que mejor encaja con las prioridades de quien va a llevar la joya. Para ver otras gemas, consulta ",
              { href: "/guias/piedras-preciosas", label: "piedras preciosas" },
              ".",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/piedras-preciosas", label: "Piedras preciosas: color, dureza y cuidados" },
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
      { href: "/guias/diamantes-rosados", label: "Diamantes rosados: qué son y por qué son tan raros" },
    ],
    advisorCta: {
      title: "¿Necesitas ayuda para elegir una piedra?",
      description:
        "Cuéntale a nuestro joyero IA qué joya buscas, qué estilo te gusta y tu presupuesto, y te ayudará a comparar opciones.",
    },
  },
  {
    slug: "diamantes-rosados",
    categorySlug: "piedras",
    eyebrow: "Guías",
    title: "Diamantes rosados: qué son y por qué son tan raros",
    description:
      "Descubre qué son los diamantes rosados, de dónde procede su color, por qué son tan raros y qué factores influyen en su valor.",
    intro:
      "Los diamantes rosados pertenecen al grupo de los llamados diamantes de color o fancy color diamonds.",
    sections: [
      {
        title: "Qué es un diamante rosa",
        paragraphs: [
          "A diferencia de los diamantes incoloros tradicionales, presentan tonalidades que pueden ir desde rosas muy suaves hasta colores mucho más intensos.",
          "Su rareza y el reducido número de ejemplares naturales con colores intensos hacen que algunos diamantes rosas alcancen precios extraordinariamente elevados.",
        ],
      },
      {
        title: "¿Por qué un diamante puede ser rosa?",
        paragraphs: [
          "El origen del color rosa es especialmente interesante porque no se explica de la misma manera que otros colores de diamante.",
          "En determinados diamantes, la estructura cristalina ha sufrido alteraciones durante su formación geológica. Estas modificaciones pueden afectar a la forma en la que la piedra absorbe y transmite la luz, produciendo tonalidades rosadas.",
        ],
      },
      {
        title: "Color, rareza y valor",
        subsections: [
          {
            title: "¿Todos tienen el mismo color?",
            paragraphs: [
              "No. Existen importantes diferencias de intensidad, saturación y tonalidad secundaria. Un diamante puede mostrar un rosa muy tenue o un color intenso y evidente.",
              "También pueden aparecer tonalidades secundarias como púrpura, marrón o naranja. Estas diferencias afectan significativamente a la apariencia y al valor.",
            ],
          },
          {
            title: "¿Por qué son tan raros?",
            paragraphs: [
              "Los diamantes naturales de color rosa intenso representan una fracción extremadamente pequeña de la producción mundial de diamantes.",
              "La rareza aumenta todavía más cuando se combinan tamaño grande, color intenso, buena claridad y buena talla.",
            ],
          },
          {
            title: "Precio diamante rosa",
            paragraphs: [
              "No existe un precio único. El valor puede variar enormemente en función de peso en quilates, intensidad del color, tonalidad, claridad, talla, procedencia, certificación y mercado.",
              "No conviene incluir cifras concretas sin una fuente actual y fiable.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Diamantes rosas de laboratorio",
        paragraphs: [
          "Actualmente pueden producirse diamantes de laboratorio con diferentes colores, incluido el rosa.",
          "Un diamante de laboratorio sigue siendo diamante desde el punto de vista químico y cristalino, pero su origen es artificial en lugar de geológico.",
          "El precio y rareza son diferentes respecto a determinados diamantes naturales. Por eso es fundamental saber qué se está comprando.",
        ],
      },
      {
        title: "Diamante rosa vs zafiro rosa",
        paragraphs: [
          "Aunque visualmente pueden compartir tonalidades, son minerales diferentes. El diamante está compuesto fundamentalmente por carbono y el zafiro pertenece a la familia del corindón.",
          "Ambos pueden ser muy resistentes, pero tienen propiedades gemológicas diferentes. No deben confundirse únicamente por el color.",
        ],
      },
      {
        title: "Cómo comprar un diamante rosa",
        paragraphs: [
          "En piezas de cierto valor conviene revisar certificado gemológico, origen natural o laboratorio, descripción exacta del color, peso, claridad, talla y vendedor.",
          "La certificación es especialmente importante cuando el precio depende mucho de la rareza del color.",
        ],
      },
      {
        title: "¿Merece la pena?",
        paragraphs: [
          {
            parts: [
              "Depende del objetivo. Para alguien que busca simplemente una piedra rosa bonita, existen numerosas alternativas más económicas. Puedes compararlo con otras gemas en nuestra guía de ",
              { href: "/guias/piedras-preciosas", label: "piedras preciosas" },
              ".",
            ],
          },
          {
            parts: [
              "Un diamante rosa natural cobra especial interés cuando se valora rareza, coleccionismo, gemología, exclusividad e historia del material. Si estás comparando alternativas transparentes, revisa también ",
              { href: "/guias/moissanita-vs-diamante", label: "moissanita vs diamante" },
              ".",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/piedras-preciosas", label: "Piedras preciosas: color, dureza y cuidados" },
      { href: "/guias/moissanita-vs-diamante", label: "Moissanita vs diamante" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
    ],
    advisorCta: {
      title: "¿Necesitas ayuda para elegir una piedra rosa?",
      description:
        "Cuéntale a nuestro joyero IA qué tipo de joya buscas, la ocasión, tu estilo y tu presupuesto, y te ayudará a comparar opciones.",
    },
  },
  {
    slug: "como-saber-si-una-perla-es-autentica",
    categorySlug: "perlas",
    eyebrow: "Guías",
    title: "Cómo saber si una perla es auténtica: diferencias entre perlas reales y falsas",
    description:
      "Descubre cómo reconocer una perla auténtica, qué diferencias hay frente a una imitación y qué pruebas pueden orientar sin sustituir una valoración profesional.",
    intro:
      "Distinguir una perla auténtica de una imitación no siempre es sencillo a simple vista. Las perlas cultivadas son perlas auténticas y no deben confundirse con perlas falsas.",
    sections: [
      {
        title: "Qué significa que una perla sea auténtica",
        paragraphs: [
          "Una perla cultivada se forma dentro de un molusco mediante un proceso controlado por el ser humano, mientras que una imitación puede estar fabricada con vidrio, plástico u otros materiales recubiertos para parecer una perla.",
          "Existen varios indicios que pueden ayudar a orientar una primera valoración, pero ninguna prueba casera aislada debería presentarse como una confirmación definitiva.",
          "Para piezas de valor, lo adecuado es recurrir a un profesional o laboratorio gemológico.",
        ],
      },
      {
        title: "Diferencia entre perla natural, cultivada e imitación",
        paragraphs: [
          "Las perlas cultivadas constituyen la inmensa mayoría de las perlas utilizadas actualmente en joyería. Cultivada no significa artificial ni falsa.",
        ],
        table: {
          columns: ["Tipo", "Origen", "¿Es una perla auténtica?"],
          rows: [
            ["Perla natural", "Se forma sin intervención humana dentro del molusco", "Sí"],
            ["Perla cultivada", "Se forma en un molusco mediante cultivo controlado", "Sí"],
            ["Perla de imitación", "Fabricada con otros materiales", "No"],
          ],
        },
      },
      {
        title: "Señales que pueden orientar",
        subsections: [
          {
            title: "1. Observa la superficie",
            paragraphs: [
              "Las perlas auténticas suelen presentar pequeñas irregularidades: ligeras variaciones, marcas sutiles o diferencias entre unas perlas y otras.",
              "Una imitación industrial puede resultar excesivamente uniforme, aunque esto no es una regla absoluta. Existen perlas cultivadas de gran calidad con superficies muy limpias e imitaciones capaces de reproducir irregularidades.",
            ],
          },
          {
            title: "2. Observa el brillo o lustre",
            paragraphs: [
              "Una buena perla puede mostrar reflejos profundos y una sensación visual de luminosidad que parece proceder de diferentes capas.",
              "Algunas imitaciones presentan un brillo más superficial o parecido a un recubrimiento, pero el brillo por sí solo tampoco permite garantizar autenticidad.",
            ],
          },
          {
            title: "3. Compara unas perlas con otras",
            paragraphs: [
              "En un collar de perlas verdaderas pueden existir ligeras diferencias de tamaño, forma, color, superficie u orientación de los reflejos.",
              "Cuando todas las piezas son absolutamente idénticas puede ser una señal para investigar más, aunque los collares de gran calidad pueden estar cuidadosamente seleccionados para verse muy uniformes.",
            ],
          },
          {
            title: "4. Examina el agujero de perforación",
            paragraphs: [
              "En algunas imitaciones puede apreciarse acumulación del recubrimiento, pérdida de la capa superficial o un material diferente bajo la capa exterior.",
              "La inspección debe ser visual y no destructiva. No conviene raspar, cortar o dañar la perla para comprobarla.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Tacto, peso y prueba del diente",
        subsections: [
          {
            title: "El tacto puede ofrecer pistas",
            paragraphs: [
              "Las perlas auténticas pueden sentirse inicialmente frescas al contacto con la piel antes de adaptarse a la temperatura corporal. Sin embargo, otros materiales como el vidrio también pueden sentirse fríos.",
              "Sentirse fría no demuestra que sea una perla auténtica.",
            ],
          },
          {
            title: "La conocida prueba del diente",
            paragraphs: [
              "Existe una prueba popular que consiste en rozar suavemente una perla contra la superficie de un diente. Las perlas auténticas pueden producir una sensación ligeramente granulada por la estructura del nácar.",
              "No es concluyente, puede resultar poco higiénica, algunas imitaciones pueden engañar y nunca debe hacerse de forma que dañe la pieza. No debe resumirse como “si raspa es real”.",
            ],
          },
          {
            title: "El peso puede ayudar, pero tampoco confirma",
            paragraphs: [
              "Las imitaciones de plástico pueden pesar menos que determinadas perlas auténticas, pero las imitaciones de vidrio pueden tener un peso considerable.",
              "El peso solo aporta información cuando se compara con piezas conocidas y no confirma por sí solo la autenticidad.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "Cómo saber con certeza si una perla es auténtica",
        paragraphs: [
          "Cuando existe una duda importante, especialmente en una pieza valiosa, heredada o antigua, la forma adecuada de confirmarlo es mediante evaluación profesional.",
          "Un especialista puede utilizar aumento, análisis de superficie, técnicas gemológicas, radiografía en determinados casos e instrumental especializado.",
          "Esto permite diferenciar una imitación de una perla auténtica y, en ciertos casos, estudiar si se trata de una perla natural o cultivada.",
        ],
      },
      {
        title: "Una perla cultivada es una perla real",
        paragraphs: [
          "Una perla cultivada es una perla auténtica. La diferencia respecto a una perla natural está en cómo comienza su formación, no en que sea una pieza de plástico o una imitación.",
          "Por eso, al preguntarte cómo saber si una perla es natural o cómo saber si una perla es cultivada, conviene separar origen y autenticidad.",
        ],
      },
      {
        title: "Cómo saber si una perla tiene valor",
        paragraphs: [
          {
            parts: [
              "La autenticidad no determina por sí sola el valor. Influyen tipo de perla, tamaño, lustre, superficie, forma, color, grosor y calidad del nácar, uniformidad en un collar, origen y estado de conservación. Si quieres entender mejor estas diferencias, consulta nuestra guía sobre ",
              { href: "/guias/tipos-de-perlas", label: "tipos de perlas y los factores que influyen en su valor" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Resumen: señales que pueden orientar",
        paragraphs: [
          "Superficie ligeramente irregular, lustre profundo, pequeñas diferencias entre perlas y agujero de perforación pueden aportar pistas.",
          "Tacto, peso y prueba del diente son únicamente orientativos. Ninguna prueba casera por sí sola garantiza autenticidad.",
          "Para confirmar una perla auténtica, la valoración gemológica es la opción adecuada.",
        ],
      },
    ],
    related: [
      { href: "/guias/tipos-de-perlas", label: "Tipos de perlas y su valor" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
      { href: "/guias/como-elegir-collar", label: "Cómo elegir un collar o colgante" },
    ],
    advisorCta: {
      title: "¿Estás pensando en comprar una joya con perlas?",
      description:
        "Nuestro joyero IA puede ayudarte a comparar tipos de perlas, materiales, estilos y opciones según tu presupuesto, sin sustituir una valoración gemológica profesional.",
    },
  },
  {
    slug: "tipos-de-perlas",
    categorySlug: "perlas",
    eyebrow: "Guías",
    title: "Tipos de perlas: cuáles existen, diferencias y qué influye en su valor",
    description:
      "Conoce los principales tipos de perlas: agua dulce, Akoya, Tahití y Mar del Sur, sus diferencias y los factores que influyen en su valor.",
    intro:
      "No todas las perlas son iguales. Existen diferentes tipos según el molusco en el que se forman, el lugar de cultivo, el tamaño, el color y otras características.",
    sections: [
      {
        title: "Tabla rápida de tipos de perlas",
        paragraphs: [
          "Esta comparación es únicamente orientativa. Una perla excepcional de una categoría puede valer más que una pieza de menor calidad perteneciente a otra.",
        ],
        table: {
          columns: ["Tipo", "Entorno", "Colores habituales", "Tamaño habitual", "Valor relativo orientativo"],
          rows: [
            ["Agua dulce", "Agua dulce", "Blanco, crema, rosa, melocotón", "Muy variable", "Bajo-medio"],
            ["Akoya", "Agua salada", "Blanco, crema", "Pequeño-medio", "Medio-alto"],
            ["Tahití", "Agua salada", "Gris, verde, oscuro", "Medio-grande", "Alto"],
            ["Mar del Sur", "Agua salada", "Blanco, plateado, dorado", "Grande", "Alto-muy alto"],
          ],
        },
      },
      {
        title: "Perlas de agua dulce",
        paragraphs: [
          "Las perlas de agua dulce se cultivan principalmente en moluscos que viven en ríos y lagos.",
          "Presentan una enorme variedad de formas, colores, tamaños y niveles de calidad. Pueden encontrarse en tonos blancos, crema, rosados y melocotón.",
          "Su disponibilidad suele hacerlas más accesibles que determinadas perlas de agua salada, pero eso no significa que todas sean baratas o de poca calidad.",
        ],
      },
      {
        title: "Perlas Akoya",
        paragraphs: [
          "Las perlas Akoya son conocidas por su forma generalmente redonda, lustre elevado, apariencia clásica y tonalidades blancas o crema.",
          "Son muy utilizadas en collares tradicionales de perlas y suelen tener tamaños más contenidos que las grandes perlas del Mar del Sur.",
        ],
      },
      {
        title: "Perlas de Tahití",
        paragraphs: [
          "Las perlas de Tahití son conocidas por sus tonos oscuros. Aunque se las denomina con frecuencia perlas negras, pueden presentar gris, verde, azul, berenjena o tonos metálicos.",
          "No conviene asumir que una perla auténtica de Tahití es necesariamente negra pura. Su gama cromática es una de sus características más atractivas.",
        ],
      },
      {
        title: "Perlas del Mar del Sur",
        paragraphs: [
          "Las perlas del Mar del Sur se encuentran entre las perlas cultivadas de mayor tamaño utilizadas habitualmente en joyería.",
          "Pueden mostrar tonos blancos, plateados o dorados. Su tamaño, rareza y dificultad de producción pueden contribuir a precios elevados en ejemplares de buena calidad.",
        ],
      },
      {
        title: "Perlas naturales vs perlas cultivadas",
        subsections: [
          {
            title: "Perla natural",
            paragraphs: [
              "Se forma en un molusco sin que el proceso sea iniciado deliberadamente por una persona. Su rareza puede darle interés para coleccionistas, pero no todas son automáticamente más valiosas sin considerar calidad, procedencia y documentación.",
            ],
          },
          {
            title: "Perla cultivada",
            paragraphs: [
              "El proceso comienza mediante intervención humana, pero la perla se desarrolla dentro de un molusco. Tanto las perlas naturales como las cultivadas son perlas auténticas.",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        title: "De qué depende el valor de una perla",
        subsections: [
          {
            title: "Lustre",
            paragraphs: ["La intensidad y calidad de los reflejos es uno de los aspectos visuales más importantes."],
          },
          {
            title: "Superficie",
            paragraphs: ["Las imperfecciones pueden afectar al valor, aunque pequeñas marcas son naturales."],
          },
          {
            title: "Forma",
            paragraphs: [
              "Las perlas perfectamente redondas pueden resultar especialmente apreciadas en ciertas variedades. También existen formas ovaladas, botón, gota y barrocas.",
              "Las perlas barrocas pueden tener gran interés estético aunque no sean redondas.",
            ],
          },
          {
            title: "Tamaño, color, nácar y uniformidad",
            paragraphs: [
              "Dentro de una calidad comparable, las perlas grandes pueden resultar más raras. El color depende de tono principal, matices, intensidad, rareza y demanda.",
              "La calidad del nácar influye en apariencia y durabilidad. En un collar completo puede valorarse la uniformidad de tamaño, color, forma y lustre.",
            ],
          },
        ],
        paragraphs: [
          "Los factores que influyen en los tipos de perlas y su valor deben evaluarse en conjunto. No hay un color o variedad que sea siempre superior en cualquier pieza.",
        ],
      },
      {
        title: "Qué tipo de perla es mejor",
        paragraphs: [
          "No existe una mejor para todo el mundo. Depende de presupuesto, estilo, color, tamaño, tipo de joya y uso previsto.",
          "Como orientación, agua dulce ofrece gran variedad y precios generalmente más accesibles; Akoya aporta estética clásica; Tahití destaca por tonos oscuros; y Mar del Sur por tamaños grandes y apariencia lujosa.",
        ],
      },
      {
        title: "Cómo saber si una perla es auténtica",
        paragraphs: [
          {
            parts: [
              "El tipo de perla no debe confundirse con su autenticidad. Una perla cultivada sigue siendo una perla auténtica. Si tienes dudas sobre una pieza, consulta nuestra guía sobre ",
              { href: "/guias/como-saber-si-una-perla-es-autentica", label: "cómo saber si una perla es auténtica" },
              ", donde explicamos qué señales pueden orientar y por qué las pruebas caseras no son concluyentes.",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/como-saber-si-una-perla-es-autentica", label: "Cómo saber si una perla es auténtica" },
      { href: "/guias/como-elegir-collar", label: "Cómo elegir un collar o colgante" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
    ],
    advisorCta: {
      title: "¿No sabes qué tipo de perla elegir?",
      description:
        "Cuéntale a nuestro joyero IA qué joya buscas, la ocasión, tu estilo y tu presupuesto, y te ayudará a valorar qué opción puede encajar mejor.",
    },
  },
  {
    slug: "oro-vermeil",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Oro vermeil: qué es, cuánto dura y diferencias con el chapado en oro",
    description:
      "Descubre qué es el oro vermeil, qué relación tiene con la plata, cuánto puede durar y en qué se diferencia de una joya simplemente chapada en oro.",
    intro:
      "El oro vermeil suele aparecer en joyas que buscan el aspecto cálido del oro con un precio más accesible que el oro macizo. Para valorarlo bien conviene entender qué metal hay debajo, qué significa el baño de oro y qué cuidados necesita.",
    sections: [
      {
        title: "Qué es el oro vermeil",
        paragraphs: [
          {
            parts: [
              "El oro vermeil es una pieza de ",
              { href: "/guias/plata-925", label: "plata" },
              " recubierta con una capa de oro. En joyería se asocia normalmente a plata de ley como base y a un recubrimiento de oro de cierta calidad.",
            ],
          },
          "La clave es que no se trata solo de una joya dorada: el metal base importa. Por eso suele considerarse una opción más noble que muchas piezas chapadas sobre metales comunes.",
        ],
      },
      {
        title: "¿El vermeil es oro macizo?",
        paragraphs: [
          "No. El vermeil no es oro macizo. Su apariencia exterior puede ser dorada, pero la estructura principal de la pieza es plata recubierta de oro.",
          "Esta diferencia es importante para el precio, el mantenimiento y las expectativas de uso. Si buscas una joya para llevar todos los días durante muchos años, conviene comparar el vermeil con oro macizo, oro laminado y otros acabados.",
        ],
      },
      {
        title: "Qué significa plata vermeil",
        paragraphs: [
          "Cuando se habla de plata vermeil se hace referencia a una joya con base de plata y acabado exterior de oro. En la práctica, la calidad depende de la plata utilizada, el grosor del recubrimiento, el quilataje del oro y la calidad del fabricante.",
          {
            parts: [
              "Si quieres entender mejor la base de la pieza, puedes leer la guía sobre ",
              { href: "/guias/plata-925", label: "plata 925" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Oro vermeil 18k",
        paragraphs: [
          {
            parts: [
              "El oro vermeil 18k indica que el recubrimiento exterior utiliza oro de 18 quilates. Eso afecta al color y a la composición del baño, pero no convierte la joya en oro macizo de 18k. Para comparar quilatajes puedes consultar la guía de ",
              { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Oro vermeil vs chapado en oro",
        paragraphs: [
          "La diferencia principal está en el metal base y en el nivel de exigencia del acabado. El chapado en oro puede aplicarse sobre distintos metales, mientras que el vermeil se asocia a una base de plata.",
        ],
        table: {
          columns: ["Aspecto", "Oro vermeil", "Chapado en oro"],
          rows: [
            ["Metal base", "Plata, habitualmente plata de ley", "Puede ser latón, cobre, acero u otros metales"],
            ["Exterior", "Capa de oro sobre plata", "Capa de oro sobre un metal base variable"],
            ["Percepción", "Más cercano a joyería fina accesible", "Muy variable según fabricante y grosor"],
            ["Durabilidad", "Depende del grosor, uso y cuidados", "Depende mucho del grosor, base y fricción"],
            ["Precio", "Suele ser superior al chapado básico", "Puede ser más económico"],
          ],
        },
      },
      {
        title: "Oro vermeil vs oro laminado",
        paragraphs: [
          {
            parts: [
              "El oro laminado suele tener una construcción distinta, con una capa de oro unida mecánicamente a otro metal base. El vermeil se define por su base de plata y su recubrimiento de oro. Si quieres comparar oro laminado, chapado y baño de oro con más detalle, consulta nuestra guía sobre ",
              { href: "/guias/oro-laminado-chapado-bano", label: "oro laminado, chapado y baño de oro" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cuánto dura el oro vermeil",
        paragraphs: [
          "Puede durar bastante si la capa de oro es adecuada y la pieza se usa con cuidado, pero no conviene prometer una duración universal. La fricción, el sudor, perfumes, cosméticos, agua, almacenamiento y frecuencia de uso influyen mucho.",
          "En anillos y pulseras, el desgaste puede notarse antes porque rozan más. En pendientes o collares delicados, el acabado suele estar menos expuesto.",
        ],
      },
      {
        title: "¿Se puede mojar?",
        paragraphs: [
          "Es mejor evitar mojar el oro vermeil de forma habitual. Duchas, piscina, mar, sudor intenso y productos químicos pueden acelerar el desgaste del recubrimiento.",
          "Si se moja de forma puntual, conviene secarlo con suavidad y guardarlo completamente seco.",
        ],
      },
      {
        title: "¿Se desgasta?",
        paragraphs: [
          "Sí, puede desgastarse con el uso. El oro exterior no atraviesa toda la pieza, por lo que las zonas de roce pueden perder color con el tiempo.",
          "Esto no significa que sea una mala opción. Significa que hay que comprarlo con expectativas realistas y cuidarlo como una joya con acabado delicado.",
        ],
      },
      {
        title: "Cómo cuidar el oro vermeil",
        paragraphs: [
          {
            parts: [
              "Guárdalo separado de otras joyas, evita perfumes y cremas directas, límpialo con un paño suave y no uses productos abrasivos. Para una rutina general puedes apoyarte en la guía de ",
              { href: "/guias/como-cuidar-joyas", label: "cómo cuidar joyas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "¿Merece la pena?",
        paragraphs: [
          "Puede merecer la pena si quieres una pieza dorada con base de plata, estética cuidada y precio más contenido que el oro macizo.",
          "No es la mejor elección si esperas la resistencia de una joya maciza o si vas a llevarla a diario en condiciones de mucho roce. Para regalos y piezas de uso moderado puede ser una opción muy equilibrada.",
        ],
      },
    ],
    related: [
      { href: "/guias/oro-laminado-chapado-bano", label: "Oro laminado, chapado y baño de oro" },
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/plata-925", label: "Plata 925" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas" },
    ],
    advisorCta: {
      title: "¿No sabes qué material elegir?",
      description:
        "Cuéntale a nuestro joyero IA qué tipo de pieza buscas, tu presupuesto y cómo piensas utilizarla, y te ayudará a comparar materiales.",
    },
  },
  {
    slug: "tipos-de-collares",
    categorySlug: "collares",
    eyebrow: "Guías",
    title: "Tipos de collares: nombres, longitudes y estilos",
    description:
      "Conoce los principales tipos de collares, sus nombres, longitudes y estilos: choker, gargantilla, princesa, matiné, ópera, babero, corbata y más.",
    intro:
      "Los tipos de collares se diferencian por longitud, posición en el cuello, volumen, presencia visual y forma de caer sobre la ropa. Conocer sus nombres ayuda a buscar mejor y a elegir una pieza proporcionada.",
    sections: [
      {
        title: "Tabla rápida de tipos de collares",
        paragraphs: [
          "Las longitudes son orientativas. La altura, el cuello, la complexión, el cierre ajustable y el diseño concreto pueden cambiar cómo queda cada collar.",
        ],
        table: {
          columns: ["Tipo", "Longitud o posición", "Estilo"],
          rows: [
            ["Choker", "Muy cerca del cuello", "Actual, marcado, minimalista o protagonista"],
            ["Gargantilla", "Corta, sobre la base del cuello", "Clásico, elegante, fácil de combinar"],
            ["Princesa", "Zona alta del pecho", "Versátil, habitual con colgantes"],
            ["Matiné", "Pecho medio", "Formal, equilibrado, con más presencia"],
            ["Ópera", "Largo, por debajo del pecho", "Sofisticado, vertical, llamativo"],
            ["Rope", "Muy largo", "Flexible, envolvente, combinable en varias vueltas"],
            ["Babero", "Cubre parte del escote", "Protagonista, ornamental"],
            ["Corbata o lariat", "Caída vertical ajustable", "Estilizado, fluido"],
            ["Multicadena", "Varias capas", "Moderno, dinámico"],
            ["Perlas", "Variable según diseño", "Clásico, luminoso, formal o contemporáneo"],
          ],
        },
      },
      {
        title: "Choker",
        paragraphs: [
          {
            parts: [
              "El choker queda muy cerca del cuello y crea una línea visual marcada. Puede ser fino y discreto o convertirse en una pieza protagonista. Funciona especialmente bien cuando el escote deja espacio alrededor del cuello; puedes comparar combinaciones en la guía de ",
              { href: "/guias/collares-segun-escote", label: "collares según escote" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Gargantilla",
        paragraphs: [
          "La gargantilla es un collar corto que descansa en la base del cuello o un poco por debajo. Es una opción clásica y suele resultar fácil de llevar con camisas abiertas, escotes redondos y vestidos sencillos.",
        ],
      },
      {
        title: "Collar princesa",
        paragraphs: [
          "El collar princesa cae en la parte alta del pecho y es una de las longitudes más versátiles. Suele funcionar bien con colgantes, perlas, cadenas delicadas y piezas de diario.",
        ],
      },
      {
        title: "Collar matiné",
        paragraphs: [
          "El matiné queda algo más largo que el princesa y aporta presencia sin llegar a ser excesivo. Puede encajar con looks de oficina, prendas cerradas o piezas con caída más elegante.",
        ],
      },
      {
        title: "Collar ópera",
        paragraphs: [
          "El collar ópera es largo y crea una línea vertical. Puede llevarse solo, combinado con otras cadenas o incluso en doble vuelta si el diseño lo permite.",
        ],
      },
      {
        title: "Collar rope",
        paragraphs: [
          "El rope es un collar muy largo. Su ventaja es la versatilidad: puede llevarse suelto, anudado o en varias vueltas, especialmente en diseños de perlas o cadenas ligeras.",
        ],
      },
      {
        title: "Collar babero",
        paragraphs: [
          "El collar babero cubre una parte visible del escote y suele tener mucho protagonismo. Conviene equilibrarlo con prendas sencillas y pendientes más discretos si no se quiere recargar el conjunto.",
        ],
      },
      {
        title: "Collar corbata o lariat",
        paragraphs: [
          {
            parts: [
              "El collar corbata, también llamado lariat, tiene una caída vertical que puede estilizar mucho el cuello y el torso. Suele combinar bien con escotes en V o prendas abiertas. Para afinar la elección, revisa la guía de ",
              { href: "/guias/collares-segun-escote", label: "collares según escote" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Collar de perlas",
        paragraphs: [
          {
            parts: [
              "El collar de perlas puede ser corto, princesa, largo o multicapa. Su efecto cambia según el tipo de perla, tamaño, forma, lustre y uniformidad. Para profundizar, consulta la guía de ",
              { href: "/guias/tipos-de-perlas", label: "tipos de perlas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Collar multicadena",
        paragraphs: [
          "El multicadena combina varias longitudes en una sola pieza o mediante capas independientes. Aporta movimiento y puede funcionar bien cuando se quiere un efecto trabajado sin elegir un collar muy voluminoso.",
        ],
      },
      {
        title: "Collar con colgante",
        paragraphs: [
          {
            parts: [
              "En un collar con colgante importan tanto la longitud como el tipo de cadena. El peso del colgante, el grosor y el cierre deben estar equilibrados. Para no mezclar conceptos, puedes leer la guía específica de ",
              { href: "/guias/tipos-de-cadenas", label: "tipos de cadenas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Tipo de collar vs tipo de cadena",
        paragraphs: [
          {
            parts: [
              "El tipo de collar describe cómo queda la pieza en el cuerpo: choker, gargantilla, princesa, ópera, babero o lariat. El tipo de cadena describe la construcción del eslabón: forzada, barbada, Figaro, veneciana, rolo y otras. Son búsquedas relacionadas, pero no idénticas; para cadenas concretas consulta ",
              { href: "/guias/tipos-de-cadenas", label: "tipos de cadenas para collares" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Qué tipo de collar elegir",
        paragraphs: [
          {
            parts: [
              "Empieza por la ropa con la que se va a llevar, la longitud que resulta cómoda y el protagonismo que quieres dar a la joya. Si necesitas una guía más general, puedes leer ",
              { href: "/guias/como-elegir-collar", label: "cómo elegir un collar o colgante" },
              ".",
            ],
          },
          {
            parts: [
              "Para un vestido o una prenda concreta, la guía de ",
              { href: "/guias/collares-segun-escote", label: "collares según escote" },
              " te ayudará a aterrizar mejor la decisión.",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-collar", label: "Cómo elegir un collar o colgante" },
      { href: "/guias/collares-segun-escote", label: "Collares según escote" },
      { href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas" },
      { href: "/guias/tipos-de-perlas", label: "Tipos de perlas" },
    ],
    advisorCta: {
      title: "¿No sabes qué tipo de collar elegir?",
      description:
        "Indica tu estilo, el escote, la ocasión y el presupuesto, y nuestro joyero IA puede ayudarte a encontrar un tipo de collar adecuado.",
    },
  },
  {
    slug: "pulsera-tennis",
    categorySlug: "pulseras",
    eyebrow: "Guías",
    title: "Pulsera tennis: qué es, por qué se llama así y cómo elegirla",
    description:
      "Descubre qué es una pulsera tennis, de dónde viene su nombre, qué piedras y materiales se utilizan y qué debes revisar antes de elegir una.",
    intro:
      "La pulsera tennis, también escrita a veces como pulsera tenis o pulsera de tenis, es una joya flexible formada por una línea casi continua de piedras. Su estética suele ser simétrica, fina y elegante, aunque existen versiones discretas, brillantes y también diseños pensados para hombre.",
    sections: [
      {
        title: "Por qué se llama pulsera tennis",
        paragraphs: [
          "El nombre se popularizó por su asociación con el tenis profesional y con una pulsera de piedras llevada durante un partido. La historia se cuenta a menudo en joyería, pero conviene tomarla como origen cultural del término más que como una ficha técnica de la pieza.",
          "Hoy se usa para describir una pulsera flexible con piedras alineadas, independientemente de que se lleve para deporte, diario o una ocasión especial.",
        ],
      },
      {
        title: "Cómo es una pulsera tennis",
        paragraphs: [
          "Suele estar formada por engastes repetidos que sostienen piedras de tamaño parecido, creando una línea continua alrededor de la muñeca.",
          "La flexibilidad es importante: una buena pulsera tennis debe adaptarse a la muñeca sin girar de forma incómoda ni sentirse rígida. También necesita un cierre seguro, porque suele incluir muchas piedras pequeñas.",
        ],
        bullets: [
          "Piedras redondas para un brillo clásico.",
          "Piedras princess para una línea más geométrica.",
          "Piedras baguette para un efecto más sobrio y arquitectónico.",
        ],
      },
      {
        title: "Pulsera tennis de diamantes",
        paragraphs: [
          "La versión con diamantes es la más conocida. Su precio depende de factores como quilates totales, color, pureza, talla, tipo de engaste, metal, acabado y documentación.",
          "No conviene comparar solo por número de quilates: dos pulseras con el mismo peso total pueden tener calidades, tamaños de piedra y acabados muy distintos.",
        ],
      },
      {
        title: "Pulsera tennis de moissanita",
        paragraphs: [
          {
            parts: [
              "La moissanita puede ofrecer mucho brillo con un precio normalmente más accesible que el diamante natural. No es diamante, y su fuego visual puede ser distinto. Si dudas entre ambas opciones, revisa la comparativa de ",
              { href: "/guias/moissanita-vs-diamante", label: "moissanita vs diamante" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Pulsera tennis con circonitas",
        paragraphs: [
          "Las circonitas permiten un aspecto luminoso con coste más contenido, aunque suelen tener menos prestigio y diferente comportamiento visual que diamantes o moissanitas.",
          "Pueden ser una buena opción para una pieza de moda o uso ocasional, siempre que el cierre y el engaste sean correctos.",
        ],
      },
      {
        title: "Oro, plata y materiales",
        paragraphs: [
          {
            parts: [
              "El metal condiciona color, peso, durabilidad y mantenimiento. El ",
              { href: "/guias/oro-blanco", label: "oro blanco" },
              " aporta una estética fría y brillante; el ",
              { href: "/guias/oro-rosa", label: "oro rosa" },
              " ofrece un tono cálido; y la ",
              { href: "/guias/plata-925", label: "plata 925" },
              " puede ser una alternativa más accesible, aunque requiere atención al mantenimiento.",
            ],
          },
        ],
      },
      {
        title: "Pulsera tennis para hombre",
        paragraphs: [
          "Una pulsera tennis para hombre no tiene por qué seguir reglas rígidas. Suelen verse diseños algo más anchos, piedras más discretas, metales fríos o líneas sobrias, pero la elección depende del estilo personal.",
          "Lo importante es que el ancho, el brillo y el ajuste encajen con cómo se va a llevar: sola, junto a reloj o combinada con otras pulseras.",
        ],
      },
      {
        title: "Cómo elegir la talla",
        paragraphs: [
          "Debe quedar cómoda, con un pequeño margen de movimiento, pero sin deslizarse demasiado. Una pulsera demasiado justa puede resultar incómoda y una demasiado amplia puede girar, engancharse o sufrir más golpes.",
          "Si compras para regalo, revisa si la tienda permite ajuste o cambio de talla. En pulseras con piedras alrededor, modificar la longitud puede ser más delicado que en una cadena sencilla.",
        ],
      },
      {
        title: "Qué cierre debe tener",
        paragraphs: [
          "El cierre es uno de los puntos más importantes. En una pulsera tennis conviene buscar un cierre firme y, si la pieza tiene valor alto, un sistema de seguridad adicional.",
          "Comprueba que abre y cierra con precisión, que no se engancha con facilidad y que no queda torcido al llevar la pulsera puesta.",
        ],
      },
      {
        title: "Checklist antes de comprar",
        paragraphs: [
          "Antes de elegir, revisa los datos de piedras, metal, cierre, garantía, posibilidad de ajuste y política de devolución.",
        ],
        bullets: [
          "Tipo de piedra y si hay certificado cuando corresponda.",
          "Metal, quilataje o composición indicada por la tienda.",
          "Cierre principal y cierre de seguridad.",
          "Longitud y posibilidad de ajustar talla.",
          "Calidad visual de los engastes y alineación de las piedras.",
        ],
      },
      {
        title: "Diamantes naturales o de laboratorio",
        paragraphs: [
          "Una pulsera tennis puede montarse con diamantes naturales o diamantes creados en laboratorio. La elección depende de presupuesto, preferencias, documentación y disponibilidad.",
          "Lo importante es que la descripción sea clara y no confunda diamante natural, diamante de laboratorio, moissanita o circonita.",
        ],
      },
      {
        title: "Cómo cuidar una pulsera tennis",
        paragraphs: [
          {
            parts: [
              "Evita golpes, productos químicos, perfumes directos y guardarla mezclada con otras joyas. Revisa de vez en cuando los engastes y el cierre. Para una rutina general, consulta la guía de ",
              { href: "/guias/como-cuidar-joyas", label: "cómo cuidar joyas" },
              ".",
            ],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/moissanita-vs-diamante", label: "Moissanita vs diamante" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
      { href: "/guias/oro-rosa", label: "Oro rosa" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas" },
    ],
    advisorCta: {
      title: "¿Estás buscando una pulsera?",
      description:
        "Cuéntale a nuestro joyero IA el material, estilo, piedras y presupuesto que tienes en mente para recibir una orientación personalizada.",
    },
  },
  {
    slug: "como-limpiar-plata",
    categorySlug: "cuidados",
    eyebrow: "Guías",
    title: "Cómo limpiar plata en casa sin dañar tus joyas",
    description:
      "Aprende cómo limpiar joyas de plata de forma segura, qué métodos pueden ayudar a recuperar su brillo y qué productos conviene evitar para no dañarlas.",
    intro:
      "La plata puede perder brillo u oscurecerse con el uso, el ambiente y el contacto con determinadas sustancias. La buena noticia es que muchas joyas pueden limpiarse en casa si se empieza por métodos suaves y se evita tratar todas las piezas como si fueran iguales.",
    sections: [
      {
        title: "Por qué la plata se oscurece",
        paragraphs: [
          {
            parts: [
              "La plata puede reaccionar con sustancias presentes en el ambiente y formar una capa superficial oscura. Que una joya de plata se oscurezca no significa necesariamente que sea falsa. Para entender marcas y composición, consulta la guía de ",
              { href: "/guias/plata-925", label: "plata 925" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cómo limpiar plata de forma segura",
        paragraphs: [
          "Empieza siempre por el método menos agresivo: agua templada, una pequeña cantidad de jabón neutro o suave, limpieza delicada con un paño blando, aclarado y secado completo.",
          "No uses agua excesivamente caliente, cepillos duros ni productos abrasivos como primera opción. Si la joya tiene piedras, esmaltes, pegamentos o recubrimientos, conviene extremar la prudencia.",
        ],
        subsections: [
          {
            title: "Limpieza básica con agua templada y jabón suave",
            paragraphs: [
              "Coloca la pieza en un recipiente limpio con agua templada y una pequeña cantidad de jabón suave. Limpia con movimientos delicados y aclara bien para no dejar residuos.",
            ],
          },
          {
            title: "Cómo utilizar un paño para plata",
            paragraphs: [
              "Un paño específico para plata puede ayudar a retirar parte del oscurecimiento superficial. Úsalo con suavidad, sin frotar de forma agresiva ni insistir en zonas delicadas.",
            ],
          },
        ],
      },
      {
        title: "Cómo limpiar plata 925",
        paragraphs: [
          {
            parts: [
              "La plata 925 contiene un 92,5 % de plata y una parte de otros metales para aportar resistencia. Esa composición no evita que pueda oscurecerse. Si quieres profundizar en el marcado, lee ",
              { href: "/guias/plata-925", label: "qué significa plata 925" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cómo limpiar una cadena de plata",
        paragraphs: [
          "En cadenas conviene limpiar sin tirar de los eslabones. Sécala extendida sobre un paño suave y comprueba que no quede humedad en el cierre o entre los eslabones.",
        ],
      },
      {
        title: "Cómo limpiar pendientes de plata",
        paragraphs: [
          "En pendientes, presta atención a cierres, tuercas y zonas que están en contacto con la piel. Limpia con suavidad y seca bien antes de guardarlos.",
        ],
      },
      {
        title: "Cómo limpiar anillos de plata",
        paragraphs: [
          "Los anillos acumulan residuos con facilidad por el uso diario. Si tienen relieves o engastes, evita rascar con objetos duros y seca bien las zonas interiores.",
        ],
      },
      {
        title: "Cómo limpiar plata con piedras",
        paragraphs: [
          "No todos los métodos adecuados para plata desnuda sirven cuando la pieza contiene perlas, ópalos, esmeraldas, piedras porosas, materiales pegados, esmaltes o recubrimientos.",
          "Cuando haya piedras o materiales delicados, consulta las instrucciones del fabricante o acude a un profesional si existe duda.",
        ],
      },
      {
        title: "Métodos caseros que requieren precaución",
        paragraphs: [
          "Algunos métodos domésticos pueden ayudar en piezas sencillas, pero también pueden ser demasiado abrasivos o inadecuados según acabado, piedras, recubrimientos o construcción.",
        ],
        subsections: [
          {
            title: "Bicarbonato",
            paragraphs: [
              "Puede resultar abrasivo si se frota con fuerza o si se usa en piezas delicadas. No lo trates como solución universal.",
            ],
          },
          {
            title: "Papel de aluminio",
            paragraphs: [
              "Algunas limpiezas por reacción química pueden ser útiles en plata sin piedras, pero no son adecuadas para todas las joyas ni para acabados especiales.",
            ],
          },
          {
            title: "Vinagre",
            paragraphs: [
              "El vinagre puede ser demasiado agresivo para ciertas piezas, especialmente si hay piedras, esmaltes o elementos pegados.",
            ],
          },
          {
            title: "Pasta de dientes",
            paragraphs: [
              "No debería recomendarse como método general: muchas pastas contienen partículas abrasivas que pueden marcar la superficie.",
            ],
          },
        ],
      },
      {
        title: "Qué métodos conviene evitar",
        paragraphs: [
          "Evita cepillos duros, limpiadores abrasivos, mezclas agresivas y productos no pensados para joyería. También conviene evitar sumergir piezas con partes pegadas o materiales porosos sin confirmarlo antes.",
        ],
      },
      {
        title: "Cómo evitar que la plata se oscurezca",
        paragraphs: [
          {
            parts: [
              "Guarda las joyas limpias y secas, evita humedad prolongada, separa las piezas, reduce el contacto con productos químicos y aplica perfumes o cosméticos antes de ponerte las joyas. Puedes ampliar estos hábitos en ",
              { href: "/guias/como-cuidar-joyas", label: "cómo cuidar joyas sin dañarlas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cuándo acudir a un joyero",
        paragraphs: [
          "Acude a un profesional si la joya tiene piedras valiosas, perlas, esmaltes, antigüedad, daños visibles, engastes flojos o un valor sentimental importante.",
        ],
      },
      {
        title: "Preguntas frecuentes",
        paragraphs: [],
        subsections: [
          {
            title: "¿La plata oscura es falsa?",
            paragraphs: ["No necesariamente. La plata auténtica puede oscurecerse por una reacción superficial."],
          },
          {
            title: "¿Puedo limpiar plata con piedras igual que plata lisa?",
            paragraphs: ["No siempre. Las piedras y el engaste pueden cambiar por completo el método adecuado."],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/plata-925", label: "Plata 925" },
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas sin dañarlas" },
      { href: "/guias/como-limpiar-oro", label: "Cómo limpiar oro" },
      { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
    ],
    advisorCta: {
      title: "¿Tienes dudas sobre cómo limpiar una joya?",
      description:
        "Cuéntale a nuestro joyero IA el material, las piedras y el estado de la pieza para recibir una orientación prudente antes de limpiarla.",
    },
  },
  {
    slug: "como-limpiar-oro",
    categorySlug: "cuidados",
    eyebrow: "Guías",
    title: "Cómo limpiar oro en casa sin dañar tus joyas",
    description:
      "Descubre cómo limpiar joyas de oro de forma segura, qué cuidados necesitan el oro amarillo, blanco y rosa y qué productos conviene evitar.",
    intro:
      "Limpiar oro en casa no debería empezar por trucos agresivos. La mayoría de joyas agradecen una limpieza suave, pero el método correcto depende también del acabado, los engastes y las piedras que acompañan al metal.",
    sections: [
      {
        title: "Cómo limpiar una joya de oro",
        paragraphs: [
          "Antes de limpiar, revisa si la pieza tiene piedras, perlas, esmaltes, partes pegadas, baños o acabados delicados. Una cadena lisa no necesita las mismas precauciones que un anillo antiguo con piedras.",
        ],
      },
      {
        title: "Método básico con agua y jabón suave",
        paragraphs: [
          "Utiliza agua templada, jabón suave, un recipiente limpio, un paño blando, aclarado cuidadoso y secado completo.",
          "Para zonas difíciles puede usarse un cepillo extremadamente suave solo cuando el diseño y las piedras lo permitan. No lo conviertas en una recomendación universal.",
        ],
      },
      {
        title: "Cómo limpiar oro amarillo",
        paragraphs: [
          {
            parts: [
              "Las joyas de oro amarillo macizo pueden tolerar una limpieza suave, pero los engastes y piedras siguen necesitando precaución. Para entender pureza y quilates, consulta ",
              { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cómo limpiar oro blanco",
        paragraphs: [
          {
            parts: [
              "Muchas joyas de oro blanco llevan un acabado superficial de rodio. Evita pulidos abrasivos domésticos porque pueden afectar al acabado. Si el aspecto blanco ha disminuido, una limpieza casera no sustituye necesariamente el mantenimiento profesional. Amplía en ",
              { href: "/guias/oro-blanco", label: "oro blanco" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cómo limpiar oro rosa",
        paragraphs: [
          {
            parts: [
              "El oro rosa obtiene su tono de la aleación, normalmente con influencia del cobre. Aun así, conviene aplicar métodos suaves y tener en cuenta piedras o acabados. Puedes leer más en ",
              { href: "/guias/oro-rosa", label: "oro rosa" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Cómo limpiar oro con diamantes",
        paragraphs: [
          "Los diamantes pueden tolerar limpiezas suaves en muchas monturas, pero el engaste es igual de importante que la piedra. Si hay movimiento, suciedad incrustada o golpes, acude a revisión profesional.",
        ],
      },
      {
        title: "Cómo limpiar oro con piedras preciosas",
        paragraphs: [
          "El método adecuado depende también de las piedras y del tipo de engaste. No conviene sumergir indiscriminadamente cualquier joya.",
          "Extrema precaución con perlas, ópalos, esmeraldas, piedras porosas, piezas pegadas, joyería antigua y esmaltes.",
        ],
      },
      {
        title: "Cómo limpiar cadenas de oro",
        paragraphs: [
          "Limpia sin forzar eslabones ni cierres. Aclara con cuidado y deja secar completamente antes de guardar la cadena para evitar humedad retenida.",
        ],
      },
      {
        title: "Cómo limpiar anillos de oro",
        paragraphs: [
          "Los anillos acumulan crema, jabón y residuos bajo la montura. Usa un método suave y revisa que las piedras no se muevan antes y después de limpiar.",
        ],
      },
      {
        title: "Qué productos no utilizar",
        paragraphs: [
          "No uses como método universal lejía, cloro, productos de limpieza doméstica, limpiadores abrasivos, pasta de dientes ni cepillos duros.",
          "La piscina y los productos químicos también pueden afectar a determinadas aleaciones, baños y acabados.",
        ],
      },
      {
        title: "¿Se puede limpiar oro con bicarbonato?",
        paragraphs: [
          "El bicarbonato puede ser abrasivo si se frota o si la superficie es delicada. No debería ser la primera opción para joyas de oro con piedras, rodio, esmaltes o valor especial.",
        ],
      },
      {
        title: "¿Se puede limpiar oro con pasta de dientes?",
        paragraphs: [
          "No es recomendable como método general. Muchas pastas dentales contienen partículas pensadas para dientes, no para acabados de joyería.",
        ],
      },
      {
        title: "Cuándo llevar una joya al joyero",
        paragraphs: [
          "Lleva la pieza a un profesional si hay piedras flojas, engastes dañados, suciedad difícil, valor alto, joyería antigua o dudas sobre el acabado.",
        ],
      },
      {
        title: "Cómo conservar el brillo del oro",
        paragraphs: [
          {
            parts: [
              "Guarda las piezas separadas, evita golpes, perfumes directos y productos químicos, y limpia suavemente cuando sea necesario. Para hábitos generales, consulta ",
              { href: "/guias/como-cuidar-joyas", label: "cómo cuidar joyas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Preguntas frecuentes",
        paragraphs: [],
        subsections: [
          {
            title: "¿El oro se puede mojar?",
            paragraphs: ["Depende de la pieza completa. El metal puede resistir mejor que las piedras, baños, cierres o acabados."],
          },
          {
            title: "¿Una limpieza casera arregla el rodio gastado?",
            paragraphs: ["No necesariamente. Si el rodio se ha desgastado, puede requerir mantenimiento profesional."],
          },
        ],
      },
    ],
    related: [
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
      { href: "/guias/oro-rosa", label: "Oro rosa" },
      { href: "/guias/como-limpiar-plata", label: "Cómo limpiar plata" },
    ],
    advisorCta: {
      title: "¿No sabes cómo cuidar una joya de oro?",
      description:
        "Cuéntale a nuestro joyero IA qué tipo de oro, piedras y acabado tiene la pieza para recibir una orientación prudente.",
    },
  },
  {
    slug: "pendientes-boda-invitada",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Pendientes para boda de invitada: cómo elegirlos según vestido, escote y peinado",
    description:
      "Descubre cómo elegir pendientes para una boda como invitada según el vestido, el escote, el peinado, el color y el estilo del look.",
    intro:
      "Los pendientes pueden rematar un look de invitada o competir demasiado con él. La elección debería equilibrar vestido, escote, peinado, horario de la boda y comodidad durante muchas horas.",
    sections: [
      {
        title: "Qué pendientes llevar como invitada de boda",
        paragraphs: [
          "No hay una regla única. Un vestido minimalista puede admitir pendientes protagonistas, mientras que un diseño con pedrería, textura o estampado suele agradecer piezas más contenidas.",
        ],
      },
      {
        title: "Pendientes según el escote",
        paragraphs: [
          {
            parts: [
              "El collar y los pendientes deben considerarse conjuntamente para evitar que demasiados elementos compitan visualmente. La guía de ",
              { href: "/guias/collares-segun-escote", label: "collares según escote" },
              " puede ayudarte a leer mejor la zona del cuello.",
            ],
          },
        ],
        subsections: [
          { title: "Escote en V", paragraphs: ["Suele admitir pendientes alargados o diseños que acompañen la verticalidad sin recargar."] },
          { title: "Escote palabra de honor", paragraphs: ["Deja mucho espacio visual, por lo que pueden funcionar pendientes protagonistas si no se añade un collar potente."] },
          { title: "Escote redondo", paragraphs: ["Suele combinar bien con pendientes medios o pequeños, especialmente si el vestido ya tiene detalle cerca del cuello."] },
          { title: "Escote halter", paragraphs: ["Como el cuello ya tiene presencia, suele ser prudente elegir pendientes más limpios."] },
          { title: "Escote asimétrico", paragraphs: ["Un pendiente discreto o geométrico puede acompañar sin competir con la línea del vestido."] },
          { title: "Cuello alto", paragraphs: ["Los pendientes pueden llevar el protagonismo, especialmente si no se usa collar."] },
        ],
      },
      {
        title: "Pendientes según el peinado",
        paragraphs: [
          "El peinado cambia cuánto se ven los pendientes. Estas sugerencias son orientativas, no normas obligatorias.",
        ],
        subsections: [
          { title: "Pelo recogido", paragraphs: ["Deja más visibles pendientes largos o protagonistas."] },
          { title: "Pelo suelto", paragraphs: ["Un pendiente algo más visible puede evitar que quede oculto."] },
          { title: "Pelo corto", paragraphs: ["Permite que pendientes pequeños, geométricos o de color tengan bastante presencia."] },
          { title: "Semirrecogido", paragraphs: ["Admite diseños intermedios, con movimiento moderado y peso cómodo."] },
        ],
      },
      {
        title: "Pendientes según el vestido",
        paragraphs: [
          "Considera color, estampado, textura, decoración, pedrería, escote y formalidad. Si el vestido ya tiene mucho protagonismo, unos pendientes discretos pueden equilibrar. Si es minimalista, unos pendientes más especiales pueden convertirse en el punto focal.",
        ],
      },
      {
        title: "Pendientes largos para boda",
        paragraphs: [
          "Aportan verticalidad y suelen verse bien con recogidos, escotes despejados o vestidos sencillos. Revisa siempre peso y comodidad.",
        ],
      },
      {
        title: "Pendientes pequeños para boda",
        paragraphs: [
          "Son útiles cuando el vestido, el peinado o el collar ya tienen protagonismo. También pueden ser una buena opción para bodas largas o si no sueles llevar pendientes pesados.",
        ],
      },
      {
        title: "Pendientes de colores",
        paragraphs: [
          "Pueden dialogar con el vestido, el bolso, los zapatos o el maquillaje. Evita forzar una coincidencia exacta si el conjunto queda más natural con contraste suave.",
        ],
      },
      {
        title: "Pendientes dorados o plateados",
        paragraphs: [
          {
            parts: [
              "Elige el tono según el vestido, otras joyas y tu preferencia personal. Puedes comparar materiales como ",
              { href: "/guias/oro-blanco", label: "oro blanco" },
              ", ",
              { href: "/guias/oro-rosa", label: "oro rosa" },
              " o ",
              { href: "/guias/plata-925", label: "plata 925" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Pendientes con perlas",
        paragraphs: [
          {
            parts: [
              "Las perlas pueden dar un aire clásico, luminoso o muy actual según diseño y tamaño. Si quieres entender variedades y valor, consulta ",
              { href: "/guias/tipos-de-perlas", label: "tipos de perlas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Pendientes según boda de día o de noche",
        paragraphs: [
          "En bodas de día suelen funcionar piezas luminosas pero no excesivas. En bodas de noche puede haber más margen para brillo, longitud o color, siempre que el conjunto siga siendo cómodo.",
        ],
      },
      {
        title: "Cómo combinar pendientes, collar y otros accesorios",
        paragraphs: [
          "Si los pendientes son protagonistas, reduce collar o pulsera. Si llevas collar llamativo, unos pendientes discretos pueden ordenar el look.",
        ],
      },
      {
        title: "Errores habituales",
        paragraphs: [
          "Elegir pendientes demasiado pesados, competir con un vestido muy decorado, mezclar demasiados focos de brillo o no probarlos con el peinado antes del evento.",
        ],
      },
      {
        title: "Preguntas frecuentes",
        paragraphs: [],
        subsections: [
          { title: "¿Puedo llevar pendientes largos a una boda de día?", paragraphs: ["Sí, si el diseño, el vestido y la comodidad encajan. No depende solo del horario."] },
          { title: "¿Mejor dorado o plateado?", paragraphs: ["Depende del look completo, de las demás joyas y de lo que te favorezca o te guste llevar."] },
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-pendientes", label: "Cómo elegir pendientes" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
      { href: "/guias/tipos-cierre-pendientes", label: "Tipos de cierre de pendientes" },
      { href: "/guias/collares-segun-escote", label: "Collares según escote" },
    ],
    advisorCta: {
      title: "¿No sabes qué pendientes combinar con tu look?",
      description:
        "Cuéntale a nuestro joyero IA cómo es el vestido, el escote, el peinado y tu presupuesto.",
    },
  },
  {
    slug: "joyas-para-regalar-mujer",
    categorySlug: "regalos",
    eyebrow: "Guías",
    title: "Joyas para regalar a una mujer: ideas según estilo, ocasión y presupuesto",
    description:
      "Encuentra ideas de joyas para regalar a una mujer según su estilo, la ocasión, el presupuesto y vuestra relación.",
    intro:
      "Esta guía complementa la metodología general para regalar joyas con ideas concretas según estilo, relación y ocasión. La intención no es encajar a nadie en una edad o cliché, sino convertir pistas reales en una elección más fácil.",
    sections: [
      {
        title: "Cómo elegir una joya para regalar",
        paragraphs: [
          {
            parts: [
              "Empieza observando qué usa ya: metal, tamaño, tipo de pieza, colores y frecuencia. Si necesitas un método más general, consulta ",
              { href: "/guias/como-elegir-una-joya-para-regalar", label: "cómo elegir una joya para regalar" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Qué joya regalar según su estilo",
        paragraphs: [],
        subsections: [
          { title: "Estilo minimalista", paragraphs: ["Pendientes pequeños, cadena fina, colgante sencillo o pulsera delicada suelen encajar si prefiere joyas discretas."] },
          { title: "Estilo clásico", paragraphs: ["Perlas, pendientes discretos, cadenas tradicionales y piezas atemporales pueden ser buenas opciones."] },
          { title: "Estilo moderno", paragraphs: ["Ear cuffs, joyas geométricas, combinaciones de cadenas o diseños contemporáneos pueden funcionar si ya usa piezas actuales."] },
          { title: "Joyas llamativas", paragraphs: ["Si disfruta las piezas visibles, considera pendientes protagonistas, collares con presencia o piedras de color, siempre dentro de su estilo real."] },
        ],
      },
      {
        title: "Qué joya regalar según la ocasión",
        paragraphs: [],
        subsections: [
          { title: "Cumpleaños", paragraphs: ["Una pieza ponible con un detalle personal suele tener buen equilibrio entre intención y uso diario."] },
          { title: "Aniversario", paragraphs: ["Puede tener más sentido simbólico: iniciales, piedras con recuerdo o una pieza que conecte con vuestra historia."] },
          { title: "Navidad", paragraphs: ["Funcionan joyas versátiles, fáciles de combinar y con margen de cambio si no se conoce todo."] },
          { title: "Día de la Madre", paragraphs: ["Una joya grabada, una pulsera delicada o un collar simbólico pueden resultar cercanos sin caer en exceso."] },
          { title: "Graduación", paragraphs: ["Una pieza sobria y duradera puede acompañar una nueva etapa sin resultar demasiado formal."] },
          { title: "Regalo sin ocasión especial", paragraphs: ["Mejor elegir algo cómodo, natural y fácil de incorporar a su rutina."] },
        ],
      },
      {
        title: "Qué joya regalar según la relación",
        paragraphs: [],
        subsections: [
          { title: "Pareja", paragraphs: ["Puedes permitirte más carga simbólica, pero evita anillos si el mensaje puede confundirse o no conoces la talla."] },
          { title: "Madre", paragraphs: ["Suelen funcionar piezas con significado familiar, diseños atemporales o joyas cómodas para diario."] },
          { title: "Hermana", paragraphs: ["Puedes apoyarte más en estilo personal, tendencias que ya use o piezas combinables."] },
          { title: "Hija", paragraphs: ["Prioriza comodidad, seguridad, material y una estética acorde a su etapa y gusto."] },
          { title: "Amiga", paragraphs: ["Mejor evitar mensajes demasiado románticos y apostar por piezas ponibles o personalizadas con sutileza."] },
        ],
      },
      {
        title: "Ideas según presupuesto",
        paragraphs: [
          "Con presupuesto contenido, prioriza diseño, material claro y buen acabado antes que tamaño. Con presupuesto medio, puedes buscar mejores metales, perlas o piedras pequeñas. Con presupuesto alto, cobra más sentido revisar documentación, fabricación y posibilidad de mantenimiento.",
        ],
      },
      {
        title: "Collar como regalo",
        paragraphs: [
          {
            parts: [
              "Es una opción flexible porque no requiere talla tan precisa como un anillo. Puedes comparar estilos en ",
              { href: "/guias/tipos-de-collares", label: "tipos de collares" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Pendientes como regalo",
        paragraphs: [
          {
            parts: [
              "Son prácticos si sabes que tiene agujeros y qué tamaños lleva. Para afinar, consulta ",
              { href: "/guias/tipos-de-pendientes", label: "tipos de pendientes" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Pulsera como regalo",
        paragraphs: [
          "Las pulseras ajustables o con alargador reducen el riesgo de talla. Revisa cierre, peso y si la persona suele llevar reloj u otras pulseras.",
        ],
      },
      {
        title: "Anillo como regalo",
        paragraphs: [
          {
            parts: [
              "Puede ser muy especial, pero exige más precisión. Si no conoces la talla, revisa ",
              { href: "/guias/como-saber-talla-anillo", label: "cómo saber la talla de un anillo" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Joyas personalizadas",
        paragraphs: [
          "Iniciales, fechas o símbolos pueden aportar intención, pero conviene comprobar plazos y condiciones de devolución porque muchas piezas personalizadas no se cambian fácilmente.",
        ],
      },
      {
        title: "Qué hacer si no sabes su talla",
        paragraphs: [
          "Pendientes, collares y ciertas pulseras suelen ser más sencillos de regalar que un anillo cuando no conoces la talla. Si eliges anillo, intenta medir una pieza que use en el mismo dedo.",
        ],
      },
      {
        title: "Qué metal elegir",
        paragraphs: [
          "Mira qué tono repite: oro amarillo, blanco, rosa, plata u otros acabados. No hace falta asociar edad y metal; manda más su estilo real.",
        ],
      },
      {
        title: "Errores que conviene evitar",
        paragraphs: [
          "Comprar una joya demasiado aparatosa para alguien discreto, elegir anillo sin talla, ignorar alergias conocidas o dejarse llevar solo por una tendencia.",
        ],
      },
      {
        title: "Preguntas frecuentes",
        paragraphs: [],
        subsections: [
          { title: "¿Qué joya es más fácil de regalar?", paragraphs: ["Normalmente pendientes, collares y pulseras ajustables tienen menos riesgo que un anillo."] },
          { title: "¿Conviene regalar joyas personalizadas?", paragraphs: ["Sí, si el detalle encaja con su estilo y aceptas que puede haber menos margen de devolución."] },
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
      { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" },
      { href: "/guias/tipos-de-collares", label: "Tipos de collares" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
    ],
    advisorCta: {
      title: "¿No sabes qué joya regalar?",
      description:
        "Dinos para quién es, la ocasión, su estilo y tu presupuesto y nuestro joyero IA te ayudará a valorar distintas opciones.",
    },
  },
  {
    slug: "como-elegir-pendientes-novia",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Cómo elegir pendientes de novia según vestido, peinado y estilo",
    description:
      "Descubre cómo elegir pendientes de novia según el vestido, el peinado, el escote, el estilo de la boda y las demás joyas.",
    intro:
      "Los pendientes de novia deben verse bonitos, pero también resultar cómodos y coherentes con el vestido, el peinado, el velo o tocado y el resto de joyas. La mejor elección no siempre es la más llamativa.",
    sections: [
      {
        title: "Qué pendientes elegir para una novia",
        paragraphs: [
          "Empieza por el conjunto completo: vestido, escote, peinado, estilo de boda, ramo, maquillaje y joyas familiares si las hay. Los pendientes deben acompañar, no imponerse sin intención.",
        ],
      },
      {
        title: "Pendientes según el vestido",
        paragraphs: [
          "Un vestido muy ornamentado, con bordados o pedrería puede combinar mejor con pendientes más discretos. Un vestido minimalista puede permitir pendientes protagonistas. No son reglas rígidas: el equilibrio visual es la clave.",
        ],
      },
      {
        title: "Pendientes según el escote",
        paragraphs: [
          {
            parts: [
              "Aunque hable de collares, la guía de ",
              { href: "/guias/collares-segun-escote", label: "collares según escote" },
              " ayuda a entender cómo la zona del cuello afecta al equilibrio de las joyas.",
            ],
          },
        ],
      },
      {
        title: "Pendientes según el peinado",
        paragraphs: [],
        subsections: [
          { title: "Recogido", paragraphs: ["Deja los pendientes muy visibles y permite diseños largos, perlas o piezas con más presencia."] },
          { title: "Pelo suelto", paragraphs: ["Puede ocultar pendientes pequeños, así que conviene probar el conjunto con movimiento real."] },
          { title: "Semirrecogido", paragraphs: ["Admite diseños intermedios, con caída moderada o detalles luminosos."] },
          { title: "Pelo corto", paragraphs: ["Hace que pendientes pequeños, vintage o geométricos tengan más protagonismo del esperado."] },
        ],
      },
      {
        title: "Pendientes largos de novia",
        paragraphs: [
          "Pueden estilizar y aportar movimiento, pero hay que revisar peso, cierre y si se enganchan con velo, cabello o tocado.",
        ],
      },
      {
        title: "Pendientes pequeños de novia",
        paragraphs: [
          "Son una opción elegante cuando el vestido ya tiene mucho detalle o cuando se busca comodidad absoluta durante todo el día.",
        ],
      },
      {
        title: "Pendientes de perlas",
        paragraphs: [
          {
            parts: [
              "Las perlas pueden resultar clásicas, románticas o contemporáneas según diseño. Para comparar variedades, consulta ",
              { href: "/guias/tipos-de-perlas", label: "tipos de perlas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Pendientes con diamantes o piedras",
        paragraphs: [
          "Aportan brillo y pueden funcionar en diseños discretos o protagonistas. Revisa calidad, engaste, peso y coherencia con el vestido.",
        ],
      },
      {
        title: "Pendientes de plata, oro blanco, amarillo o rosa",
        paragraphs: [
          {
            parts: [
              "El metal puede dialogar con el tono del vestido, otros accesorios y gusto personal. Puedes ampliar sobre ",
              { href: "/guias/oro-blanco", label: "oro blanco" },
              ", ",
              { href: "/guias/oro-rosa", label: "oro rosa" },
              " y ",
              { href: "/guias/plata-925", label: "plata 925" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Pendientes vintage",
        paragraphs: [
          "Pueden aportar carácter si el vestido, el peinado o la historia de la pieza lo acompañan. En joyería antigua conviene revisar cierres y estado.",
        ],
      },
      {
        title: "Cómo combinar pendientes con collar",
        paragraphs: [
          "Si el collar tiene protagonismo, reduce tamaño o brillo en pendientes. Si no llevas collar, los pendientes pueden sostener más atención visual.",
        ],
      },
      {
        title: "Cómo combinar pendientes con velo, tiara o tocado",
        paragraphs: [
          "Prueba los pendientes con el accesorio real. Un diseño bonito puede resultar incómodo si se engancha, tira del lóbulo o compite con una tiara muy decorada.",
        ],
      },
      {
        title: "El peso y la comodidad",
        paragraphs: [
          "Unos pendientes pueden ser preciosos pero poco prácticos si pesan demasiado, tiran del lóbulo o molestan después de varias horas.",
        ],
      },
      {
        title: "El cierre también importa",
        paragraphs: [
          {
            parts: [
              "El cierre debe sentirse seguro y cómodo. Si tienes dudas entre presión, rosca, gancho o criolla, revisa ",
              { href: "/guias/tipos-cierre-pendientes", label: "tipos de cierre de pendientes" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Errores frecuentes",
        paragraphs: [
          "Elegirlos sin probar con el peinado, olvidar el peso, competir con demasiados accesorios o comprar una pieza que no se parece al estilo real de la novia.",
        ],
      },
      {
        title: "Preguntas frecuentes",
        paragraphs: [],
        subsections: [
          { title: "¿Pendientes largos o pequeños para novia?", paragraphs: ["Depende del vestido, el peinado, el escote y la comodidad. Ambos pueden ser elegantes."] },
          { title: "¿Conviene llevar collar y pendientes llamativos?", paragraphs: ["Solo si el conjunto está muy equilibrado. Normalmente es mejor elegir un foco principal."] },
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-pendientes", label: "Cómo elegir pendientes" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
      { href: "/guias/tipos-cierre-pendientes", label: "Tipos de cierre de pendientes" },
      { href: "/guias/tipos-de-perlas", label: "Tipos de perlas" },
    ],
    advisorCta: {
      title: "¿Buscas unos pendientes para tu boda?",
      description:
        "Cuéntale a nuestro joyero IA el estilo del vestido, el peinado, el escote y tu presupuesto.",
    },
  },
];

export const guideCategories: GuideCategory[] = [
  {
    slug: "anillos",
    title: "Anillos",
    description: "Tallas, tipos, materiales y consejos para elegir el anillo adecuado.",
    intro:
      "Información práctica sobre tallas, tipos de anillos, materiales y criterios para elegir correctamente.",
    href: "/guias/anillos",
    seoTitle: "Guías sobre anillos: tallas, tipos y consejos | joyas.ai",
    seoDescription:
      "Guías sobre anillos: talla, materiales, estilos y consejos para elegir una pieza adecuada sin tecnicismos innecesarios.",
    guideSlugs: ["como-saber-talla-anillo", "tipos-de-anillos"],
    futureGuides: [
      "Cómo elegir un anillo",
      "Tipos de anillos",
      "Anillos de compromiso",
      "Anillos según estilo",
      "Anillos según forma de la mano",
    ],
  },
  {
    slug: "collares",
    title: "Collares y colgantes",
    description:
      "Longitudes, estilos, escotes, materiales y consejos para elegir collares y colgantes.",
    intro:
      "Guías para entender longitudes, escotes, estilos y materiales antes de elegir un collar o colgante.",
    href: "/guias/collares",
    seoTitle: "Guías sobre collares y colgantes | joyas.ai",
    seoDescription:
      "Consejos para elegir collares y colgantes según longitud, escote, estilo, material y ocasión.",
    guideSlugs: ["como-elegir-collar", "collares-segun-escote", "tipos-de-cadenas", "tipos-de-collares"],
    futureGuides: [
      "Longitudes de collar",
      "Tipos de cadenas",
      "Cómo combinar collares",
    ],
  },
  {
    slug: "pendientes",
    title: "Pendientes",
    description: "Tipos, cierres, tamaños, estilos y consejos para elegir pendientes.",
    intro:
      "Información útil sobre tipos de pendientes, cierres, tamaños, peso, materiales y ocasiones de uso.",
    href: "/guias/pendientes",
    seoTitle: "Guías sobre pendientes: tipos, cierres y consejos | joyas.ai",
    seoDescription:
      "Guías para elegir pendientes según tamaño, cierre, estilo, material, rostro y ocasión.",
    guideSlugs: [
      "como-elegir-pendientes",
      "tipos-cierre-pendientes",
      "tipos-de-pendientes",
      "pendientes-boda-invitada",
      "como-elegir-pendientes-novia",
    ],
    futureGuides: [
      "Tipos de pendientes",
      "Tipos de cierre",
      "Pendientes según forma del rostro",
      "Pendientes según ocasión",
    ],
  },
  {
    slug: "pulseras",
    title: "Pulseras",
    description:
      "Guías sobre tipos de pulseras, tallas, materiales, piedras y consejos para elegir una pieza cómoda y adecuada para cada ocasión.",
    intro:
      "Descubre los principales tipos de pulseras, materiales, piedras y criterios para elegir una pieza cómoda y adecuada para cada estilo.",
    href: "/guias/pulseras",
    seoTitle: "Guías sobre pulseras: tipos, materiales y consejos | joyas.ai",
    seoDescription:
      "Guías sobre tipos de pulseras, tallas, materiales, piedras y consejos para elegir una pieza cómoda y adecuada para cada ocasión.",
    guideSlugs: ["pulsera-tennis"],
    futureGuides: [
      "Tipos de pulseras",
      "Cómo saber la talla de una pulsera",
      "Pulseras de charms",
      "Brazalete vs pulsera",
      "Pulseras de oro",
      "Pulseras de plata",
    ],
  },
  {
    slug: "metales",
    title: "Oro y metales",
    description:
      "Guías sobre oro, plata, platino, pureza, aleaciones y materiales utilizados en joyería.",
    intro:
      "Guías para comparar oro, plata, platino, purezas, marcados y acabados con criterio antes de comprar.",
    href: "/guias/metales",
    seoTitle: "Guías sobre oro, plata y metales | joyas.ai",
    seoDescription:
      "Guías sobre oro 14k, 18k y 24k, plata 925, platino, pureza, marcas y materiales de joyería.",
    guideSlugs: [
      "oro-14k-18k-24k",
      "como-saber-si-una-joya-es-de-oro",
      "plata-925",
      "platino",
      "oro-rosa",
      "oro-laminado-chapado-bano",
      "oro-blanco",
      "oro-vermeil",
    ],
    futureGuides: [
      "Oro blanco vs oro amarillo",
      "Oro rosa",
      "Oro 18k vs 14k",
      "Oro macizo vs chapado",
      "Qué significa 585",
      "Qué significa 750",
    ],
  },
  {
    slug: "piedras",
    title: "Piedras preciosas",
    description:
      "Diamantes, rubíes, zafiros, esmeraldas y otras piedras utilizadas en joyería.",
    intro:
      "Descubre guías sobre diamantes, moissanita, gemas de color y otras piedras utilizadas en joyería, con información sobre características, diferencias, dureza y cuidados.",
    href: "/guias/piedras",
    seoTitle: "Guías sobre piedras preciosas y gemas | joyas.ai",
    seoDescription:
      "Guías sobre diamantes, moissanita, gemas de color y otras piedras utilizadas en joyería: características, diferencias y cuidados.",
    guideSlugs: ["piedras-preciosas", "moissanita-vs-diamante", "diamantes-rosados"],
    futureGuides: ["Diamantes", "Rubí", "Zafiro", "Esmeralda", "Amatista", "Topacio", "Aguamarina", "Granate"],
  },
  {
    slug: "perlas",
    title: "Perlas",
    description:
      "Tipos de perlas, autenticidad, calidad, valor y consejos para elegir joyas con perlas.",
    intro:
      "Aprende a reconocer los principales tipos de perlas, entender qué factores influyen en su calidad y descubrir cómo distinguir una perla auténtica de una imitación.",
    href: "/guias/perlas",
    seoTitle: "Guías sobre perlas: tipos, autenticidad y valor | joyas.ai",
    seoDescription:
      "Guías para conocer los tipos de perlas, distinguir perlas auténticas de imitaciones y entender qué factores influyen en su calidad y valor.",
    guideSlugs: ["como-saber-si-una-perla-es-autentica", "tipos-de-perlas"],
    futureGuides: [
      "Perlas naturales vs cultivadas",
      "Cómo cuidar perlas",
      "Perlas de Tahití",
      "Perlas Akoya",
      "Perlas del Mar del Sur",
      "Cómo elegir un collar de perlas",
    ],
  },
  {
    slug: "cuidados",
    title: "Cuidado de joyas",
    description: "Limpieza, conservación, almacenamiento y mantenimiento de joyas y materiales.",
    intro:
      "Consejos para limpiar, guardar y mantener joyas sin dañar metales, piedras, baños o acabados delicados.",
    href: "/guias/cuidados",
    seoTitle: "Guías para cuidar joyas: limpieza y conservación | joyas.ai",
    seoDescription:
      "Guías de cuidado de joyas: limpieza, almacenamiento, conservación y mantenimiento de metales y piedras.",
    guideSlugs: ["como-cuidar-joyas", "como-limpiar-plata", "como-limpiar-oro"],
    futureGuides: [
      "Cómo limpiar oro",
      "Cómo limpiar plata",
      "Cómo limpiar diamantes",
      "Cómo guardar joyas",
      "Cómo evitar que la plata se oscurezca",
    ],
  },
  {
    slug: "regalos",
    title: "Regalar joyas",
    description:
      "Consejos para elegir una joya según la persona, la ocasión, el presupuesto y el significado.",
    intro:
      "Ideas y criterios para elegir una joya de regalo según la relación, la ocasión, el presupuesto y el estilo personal.",
    href: "/guias/regalos",
    seoTitle: "Guías para regalar joyas: ideas y consejos | joyas.ai",
    seoDescription:
      "Consejos para regalar joyas según persona, ocasión, presupuesto, estilo y significado.",
    guideSlugs: ["como-elegir-una-joya-para-regalar", "joyas-para-regalar-mujer"],
    futureGuides: [
      "Joyas para aniversario",
      "Joyas para cumpleaños",
      "Joyas para San Valentín",
      "Joyas para una madre",
      "Joyas para una pareja",
      "Joyas según presupuesto",
    ],
  },
];

export function findArticle(items: ArticleData[], slug: string) {
  return items.find((item) => item.slug === slug);
}

export function findGuideCategory(slug: string) {
  return guideCategories.find((category) => category.slug === slug);
}

export function getGuidesForCategory(category: GuideCategory) {
  return category.guideSlugs
    .map((slug) => findArticle(guides, slug))
    .filter((guide): guide is ArticleData => Boolean(guide));
}

export function findGuideCategoryForArticle(article: ArticleData) {
  return article.categorySlug ? findGuideCategory(article.categorySlug) : undefined;
}
