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
      "Para saber si es oro, empieza por buscar contrastes, revisar el estado de la pieza y contrastar su documentación. Ningún método casero aislado ofrece certeza absoluta: una comprobación profesional es la vía fiable cuando el valor de la joya importa.",
    sections: [
      {
        title: "Cómo saber si una joya es de oro",
        paragraphs: [
          "Revisa primero marcas, contrastes, factura o certificado si existen, y el estado general del metal. Son indicios útiles, pero no una garantía aislada: el marcado puede faltar, estar desgastado o no describir toda la pieza.",
        ],
      },
      { title: "Sellos y quilates", paragraphs: ["Las marcas 750, 585 y 375 se asocian habitualmente a aleaciones con 75 %, 58,5 % y 37,5 % de oro, equivalentes de forma habitual a 18K, 14K y 9K. El sello debe interpretarse junto al origen y la construcción de la joya; no confirma por sí solo que toda la pieza sea de oro macizo.", { parts: ["Para comparar quilates y aleaciones, consulta ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, "."] }] },
      { title: "Cómo saber si un anillo es de oro", paragraphs: ["En un anillo, busca el contraste en el interior del aro, sin raspar ni forzar la pieza. Revisa también desgaste en bordes, zonas de contacto y monturas: una diferencia de color puede ser un indicio de baño o de otro metal, pero no sustituye una verificación."] },
      { title: "Cómo saber si una cadena es de oro", paragraphs: ["En una cadena, las marcas suelen aparecer cerca del cierre, en una plaquita o en un eslabón próximo. No tires de los eslabones para buscarla: observa el cierre, las uniones y las zonas de mayor roce con buena luz."] },
      { title: "Prueba del imán", paragraphs: ["Que una joya sea atraída por un imán puede indicar la presencia de componentes ferromagnéticos, pero no demuestra por sí solo que sea falsa ni identifica todos los metales de una aleación. Que no sea magnética tampoco garantiza que sea oro."] },
      { title: "Color y desgaste", paragraphs: ["El color y el desgaste pueden orientar, sobre todo si aparece un metal distinto bajo una capa dorada. Sin embargo, el oro existe en diferentes aleaciones y acabados, y una pieza bien bañada puede parecer oro macizo a simple vista."] },
      { title: "Métodos caseros que conviene evitar", paragraphs: ["Evita ácidos, lejía, abrasivos, rayar la joya o pruebas que puedan dañar el metal, el baño, el engaste o las piedras. Un método que altera la pieza no es una comprobación prudente en casa."] },
      { title: "Cuándo acudir a un joyero", paragraphs: ["Si necesitas confirmar el metal antes de comprar, vender, asegurar o valorar una pieza, acude a un profesional. Puede revisar contrastes y utilizar métodos adecuados sin convertir una prueba orientativa en una certeza infundada."] },
    ],
    related: [
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
      { href: "/guias/como-saber-si-es-plata", label: "Cómo saber si una joya es de plata" },
      { href: "/guias/plata-925", label: "Plata 925 o plata de ley" },
      { href: "/guias/platino", label: "Platino en joyería" },
    ],
  },
  {
    slug: "como-saber-si-es-plata",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Cómo saber si una joya es de plata: marcas y pruebas para comprobarlo",
    description: "Aprende cómo saber si una joya es de plata, dónde buscar el sello 925 y qué pruebas dan indicios sin sustituir una comprobación profesional.",
    intro: "Para saber si una joya es de plata, empieza por buscar marcas, observar la pieza y revisar cualquier documentación disponible. Las pruebas caseras pueden orientar, pero no confirman un metal por sí solas ni justifican dañar una joya.",
    sections: [
      { title: "Cómo saber si una joya es de plata", paragraphs: ["Los indicios más útiles son el contraste, la información del vendedor y el examen cuidadoso de cierres, interiores y zonas de desgaste. Si el material debe confirmarse con certeza, la respuesta fiable requiere una comprobación profesional."] },
      { title: "Buscar el sello 925", paragraphs: ["El marcado 925 suele indicar una aleación de plata de ley. También pueden aparecer referencias como sterling, según origen y fabricante. La ausencia de sello no demuestra que una joya no sea plata, y un sello aislado tampoco garantiza el material de toda la pieza.", { parts: ["Para entender el marcado con más detalle, consulta ", { href: "/guias/plata-925", label: "plata 925: qué significa y cómo reconocerla" }, "."] }] },
      { title: "Cómo saber si un anillo es de plata", paragraphs: ["Revisa el interior del aro con buena luz, sin rasparlo. Busca contrastes y observa si hay diferencias de color en zonas de roce; pueden ser pistas de un baño o de otro metal, pero no una conclusión definitiva."] },
      { title: "Cómo saber si una cadena es de plata", paragraphs: ["En cadenas y collares, la marca puede estar en una plaquita, junto al cierre o en un eslabón cercano. Examina el cierre sin tirar de él y evita manipular uniones delicadas."] },
      { title: "Cómo saber si una pulsera es de plata", paragraphs: ["En pulseras, busca el contraste cerca del cierre o en una pieza interior. Si tiene charms, piedras o partes de otro material, un sello puede referirse solo a una parte de la joya."] },
      { title: "Prueba del imán", paragraphs: ["Un imán solo aporta un indicio limitado. Que una pieza no sea atraída no garantiza que sea plata, y que reaccione puede deberse a componentes concretos, cierres o elementos internos."] },
      { title: "Color, brillo y oxidación", paragraphs: ["La plata puede adquirir un oscurecimiento superficial con el uso y el ambiente. El color, el brillo o el deslustre ayudan a observar una pieza, pero no sustituyen un análisis: otros metales y baños pueden dar apariencias parecidas."] },
      { title: "Qué significa que la plata se oscurezca", paragraphs: [{ parts: ["El oscurecimiento no significa necesariamente que la joya sea falsa. Si la pieza es apta para limpieza doméstica, empieza por métodos suaves; consulta ", { href: "/guias/como-limpiar-plata", label: "cómo limpiar joyas de plata sin dañarlas" }, "."] }] },
      { title: "Métodos que pueden dañar una joya", paragraphs: ["No uses ácidos, lejía, abrasivos, productos de limpieza doméstica ni pruebas que rayen o alteren la pieza. Son especialmente inadecuados si hay piedras, perlas, adhesivos, baños o acabados delicados."] },
      { title: "Cuándo acudir a un joyero", paragraphs: ["Acude a un profesional cuando necesites confirmar autenticidad, la joya tenga valor económico o sentimental, o existan dudas sobre su composición. Puede realizar comprobaciones más adecuadas sin convertir una prueba casera en una certeza."] },
      { title: "Plata auténtica y metal plateado", paragraphs: ["La plata de ley contiene plata en la aleación; una pieza bañada o plateada puede tener una capa superficial de plata sobre otro metal. El aspecto, el cuidado y el desgaste pueden ser distintos, por lo que conviene revisar la descripción completa antes de comprar."] },
    ],
    related: [
      { href: "/guias/plata-925", label: "Plata 925: qué significa y cómo reconocerla" },
      { href: "/guias/como-limpiar-plata", label: "Cómo limpiar joyas de plata" },
      { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
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
      { title: "Qué significa plata 925", paragraphs: ["El número 925 indica que la aleación contiene 925 partes de plata por cada mil. En joyería se conoce habitualmente como plata de ley 925, aunque la composición y los acabados concretos pueden variar según la pieza."] },
      { title: "Qué significa 925 en una joya", paragraphs: ["Un sello 925 suele referirse al metal de la pieza o de una de sus partes, pero debe interpretarse con el diseño y la información completa. No es una garantía absoluta por sí solo ni explica si existen baños, piedras o componentes de otros materiales."] },
      { title: "Qué significa 925 en un anillo", paragraphs: ["En un anillo, el marcado suele aparecer en el interior del aro. El significado del sello no cambia por ser anillo, cadena o pulsera: indica la aleación a la que se refiere, no el tipo de joya."] },
      { title: "Plata 925 y plata de ley: ¿es lo mismo?", paragraphs: ["En el uso habitual de joyería, plata 925 y plata de ley suelen referirse a la misma proporción de 92,5 % de plata. Conviene revisar siempre la descripción exacta si una pieza combina metales o acabados distintos."] },
      {
        title: "Por qué no es plata 100 % pura",
        paragraphs: [
          "La plata pura puede ser demasiado blanda para muchas piezas de uso diario. La aleación permite fabricar joyas más prácticas.",
          "La composición concreta y los tratamientos superficiales pueden variar según fabricante y pieza.",
        ],
      },
      { title: "Cómo saber si realmente es plata 925", paragraphs: [{ parts: ["Busca el sello, examina el estado de la pieza y revisa cualquier documentación disponible. Estos elementos son indicios; para una explicación completa de las comprobaciones y sus límites, consulta ", { href: "/guias/como-saber-si-es-plata", label: "cómo saber si una joya es de plata" }, "."] }] },
      {
        title: "¿La plata 925 se pone negra?",
        paragraphs: [
          "La plata puede oscurecerse con el tiempo por contacto con aire, humedad, cosméticos o ciertas sustancias. Esto no implica necesariamente que sea falsa.",
          { parts: ["Guardarla seca, separada y limpiarla con métodos adecuados ayuda a conservar mejor el aspecto. Consulta ", { href: "/guias/como-limpiar-plata", label: "cómo limpiar joyas de plata en casa" }, "."] },
        ],
      },
      {
        title: "Cómo cuidar una joya de plata 925",
        paragraphs: [
          "Evita humedad prolongada, perfumes y productos químicos directamente sobre la joya. Antes de limpiarla, comprueba si incorpora piedras, perlas, adhesivos, baños o acabados que requieran un cuidado distinto.",
        ],
      },
      {
        title: "Plata de ley, baño de plata y otros acabados",
        paragraphs: [
          "Comprueba si la pieza es plata de ley, baño de plata u otro acabado. El mantenimiento, el desgaste y la durabilidad no son iguales, por lo que la descripción del producto importa tanto como el aspecto exterior.",
        ],
      },
    ],
    related: [
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
      { href: "/guias/como-saber-si-es-plata", label: "Cómo saber si una joya es de plata" },
      { href: "/guias/como-limpiar-plata", label: "Cómo limpiar joyas de plata" },
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
    title: "Qué collar elegir según el escote: guía para acertar con cada vestido",
    description:
      "Descubre qué collar elegir según el escote: en V, redondo, cuadrado, palabra de honor, barco, corazón, halter o cuello alto.",
    intro:
      "Para elegir un collar según el escote, mira la forma y la profundidad del vestido antes que una regla fija. La longitud de la cadena, el tamaño del colgante y los pendientes cambian cómo se percibe el conjunto.",
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
        title: "Cuándo es mejor no llevar collar",
        paragraphs: [
          "No llevar collar también puede ser una elección intencionada. Un escote halter, asimétrico o muy trabajado, un cuello alto con textura, la pedrería cerca del cuello o unos pendientes protagonistas pueden hacer que añadir otra pieza reste claridad al look.",
          "Prueba el conjunto completo con el peinado y la ocasión real. Si la zona del cuello ya tiene presencia, unos pendientes, una pulsera o un anillo pueden aportar el acabado que buscas sin competir con el vestido.",
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
      { href: "/guias/collares-invitada-boda", label: "Collares para invitada de boda" },
      { href: "/guias/pendientes-boda-invitada", label: "Pendientes para invitada de boda" },
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
    ],
    advisorCta: {
      title: "Encuentra el collar ideal para tu look",
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
    title: "Cómo limpiar joyas de plata en casa sin dañarlas",
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
        title: "Cómo limpiar joyas de plata en casa",
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
      { href: "/guias/como-saber-si-es-plata", label: "Cómo saber si una joya es de plata" },
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
    title: "Pendientes para invitada de boda: cómo elegirlos según vestido y estilo",
    description:
      "Guía para elegir pendientes invitada boda según vestido, escote, peinado, color, horario y estilo del look.",
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
          {
            parts: [
              "El color también influye, pero no exige una fórmula fija. Si llevas rojo, puedes ampliar criterios en la guía de ",
              { href: "/guias/pendientes-vestido-rojo-boda", label: "pendientes para vestido rojo de boda" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Pendientes con tocado o pamela",
        paragraphs: [
          "Cuando el tocado, la pamela o el peinado ya tienen volumen, reduce los demás focos de atención. Prueba el conjunto completo para comprobar proporciones, comodidad y movimiento antes de la boda.",
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
      { href: "/guias/pendientes-vestido-rojo-boda", label: "Pendientes para vestido rojo de boda" },
      { href: "/guias/pendientes-madrina-mantilla", label: "Pendientes para madrina con mantilla" },
      { href: "/guias/como-elegir-pendientes", label: "Cómo elegir pendientes" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
      { href: "/guias/tipos-cierre-pendientes", label: "Tipos de cierre de pendientes" },
      { href: "/guias/collares-segun-escote", label: "Collares según escote" },
    ],
    advisorCta: {
      title: "Encuentra los pendientes ideales para tu look de boda",
      description:
        "Cuéntale a nuestro joyero IA cómo es el vestido, el escote, el peinado y tu presupuesto.",
    },
  },
  {
    slug: "joyas-para-regalar-mujer",
    categorySlug: "regalos",
    eyebrow: "Guías",
    title: "Joyas para regalar a una mujer: ideas para acertar",
    description:
      "Ideas de joyas para regalar a una mujer según vuestra relación, su estilo, la ocasión y tu presupuesto.",
    intro:
      "Para acertar al regalar una joya a una mujer, parte de pistas concretas: qué lleva, qué ocasión celebráis y qué mensaje quieres transmitir. Aquí encontrarás una forma práctica de decidir sin apoyarte en clichés.",
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
          { title: "Estilo elegante o romántico", paragraphs: ["Una pieza atemporal, un detalle con significado o un diseño delicado puede encajar mejor que una joya llamativa si busca un acabado cuidado."] },
          { title: "Estilo moderno", paragraphs: ["Ear cuffs, joyas geométricas, combinaciones de cadenas o diseños contemporáneos pueden funcionar si ya usa piezas actuales."] },
          { title: "Estilo atrevido", paragraphs: ["Si disfruta las piezas visibles, considera pendientes protagonistas, collares con presencia o piedras de color, siempre dentro de su estilo real."] },
        ],
      },
      {
        title: "Qué joya regalar según la ocasión",
        paragraphs: [],
        subsections: [
          { title: "Cumpleaños", paragraphs: ["Una pieza ponible con un detalle personal suele tener buen equilibrio entre intención y uso diario."] },
          { title: "Aniversario", paragraphs: ["Puede tener más sentido simbólico: iniciales, piedras con recuerdo o una pieza que conecte con vuestra historia."] },
          { title: "Navidad", paragraphs: ["Funcionan joyas versátiles, fáciles de combinar y con margen de cambio si no se conoce todo."] },
          { title: "San Valentín", paragraphs: ["Un detalle romántico funciona mejor cuando conserva su estilo real y no transmite un compromiso que no buscas expresar."] },
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
          { title: "Esposa", paragraphs: ["Una pieza vinculada a una fecha, recuerdo o uso cotidiano puede ser más personal que elegir solo por tendencia."] },
          { title: "Madre", paragraphs: ["Suelen funcionar piezas con significado familiar, diseños atemporales o joyas cómodas para diario."] },
          { title: "Hermana", paragraphs: ["Puedes apoyarte más en estilo personal, tendencias que ya use o piezas combinables."] },
          { title: "Hija", paragraphs: ["Prioriza comodidad, seguridad, material y una estética acorde a su etapa y gusto."] },
          { title: "Amiga", paragraphs: ["Mejor evitar mensajes demasiado románticos y apostar por piezas ponibles o personalizadas con sutileza."] },
        ],
      },
      {
        title: "Ideas según presupuesto",
        paragraphs: [
          "Menos de 50 €: prioriza diseño, material claro y buen acabado antes que tamaño. Entre 50 y 100 €: puedes comparar mejores metales, perlas o piedras pequeñas. Entre 100 y 250 €: cobra más sentido revisar fabricación, piedras y cuidados. Por encima de 250 €: revisa documentación, garantía, mantenimiento y posibilidad de devolución.",
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
      { href: "/guias/joyas-para-regalar-novia", label: "Joyas para regalar a tu novia" },
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
      { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" },
      { href: "/guias/tipos-de-collares", label: "Tipos de collares" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
    ],
    advisorCta: {
      title: "Encuentra la joya perfecta con inteligencia artificial",
      description:
        "Dinos para quién es, la ocasión, su estilo y tu presupuesto y nuestro joyero IA te ayudará a valorar distintas opciones.",
    },
  },
  {
    slug: "joyas-para-regalar-novia",
    categorySlug: "regalos",
    eyebrow: "Guías",
    title: "Joyas para regalar a mi novia: ideas para acertar",
    description:
      "Descubre qué joyas para regalar a mi novia encajan según su personalidad, el momento de la relación, la ocasión y tu presupuesto.",
    intro:
      "Elegir joyas para regalar a mi novia no consiste en buscar la pieza más llamativa: importa que encaje con su forma de vestir, el momento de vuestra relación y la ocasión. Estas pistas te ayudan a elegir con intención.",
    sections: [
      {
        title: "Qué joya regalar a mi novia",
        paragraphs: [
          "Un collar es una opción versátil si no conoces su talla. Los pendientes funcionan cuando sabes qué estilos lleva y una pulsera ajustable es práctica para el día a día. Un anillo puede ser un regalo precioso, pero exige talla y cuidado por el significado que puede transmitir. Un charm tiene sentido si ya usa una pulsera compatible, y un conjunto solo si suele coordinar sus joyas.",
        ],
      },
      {
        title: "Joyas para regalar a mi novia según su personalidad",
        paragraphs: [],
        subsections: [
          { title: "Romántica o elegante", paragraphs: ["Un detalle grabado, perlas, una cadena fina o un diseño clásico pueden encajar si ya elige piezas con un aire cuidado y personal."] },
          { title: "Minimalista o clásica", paragraphs: ["Busca pendientes pequeños, un colgante sencillo o una pulsera delicada en el tono de metal que usa con más frecuencia."] },
          { title: "Moderna o atrevida", paragraphs: ["Los diseños geométricos, pendientes protagonistas o combinaciones de cadenas funcionan si forman parte de su estilo habitual."] },
          { title: "Aventurera", paragraphs: ["Prioriza comodidad, cierres seguros y piezas resistentes a su rutina; una joya que no use por miedo a dañarla no será un buen regalo."] },
        ],
      },
      {
        title: "Qué regalar según el momento de la relación",
        paragraphs: [],
        subsections: [
          { title: "Primeros meses", paragraphs: ["Una joya fácil de llevar y con un significado ligero suele ser más natural que una pieza muy solemne o personalizada."] },
          { title: "Relación consolidada o de varios años", paragraphs: ["Puedes incorporar una referencia compartida, una fecha o una pieza con más intención, siempre que encaje con sus gustos reales."] },
          { title: "Aniversario u ocasión especial", paragraphs: ["Elige una pieza que recuerde el momento sin forzar un mensaje. Si consideras un anillo, evita diseños que parezcan de compromiso si no es esa la intención."] },
        ],
      },
      {
        title: "Joyas para regalar a mi novia según la ocasión",
        paragraphs: [
          "Para su cumpleaños busca una pieza que pueda estrenar pronto. En un aniversario, un símbolo compartido puede aportar valor. En Navidad conviene una joya versátil y con margen de cambio; en San Valentín, un detalle romántico sin alejarse de su estilo. Un regalo sorpresa o una celebración especial funciona mejor cuando el diseño se parece a lo que ya usa.",
        ],
      },
      {
        title: "Joyas según presupuesto",
        paragraphs: [
          "Por debajo de 50 €, prioriza un diseño sencillo, información clara sobre el material y buen acabado. Entre 50 y 100 €, compara metales, perlas o diseños con más detalle. Entre 100 y 250 €, revisa fabricación, piedras y cuidados. Por encima de 250 €, valora documentación, garantía, mantenimiento y devolución; no hace falta que el precio sustituya al criterio.",
        ],
      },
      {
        title: "Qué joya regalar a mi novia si no sé qué le gusta",
        paragraphs: [
          {
            parts: [
              "Fíjate en si usa oro o plata, piezas discretas o llamativas, y qué repite más: pendientes, collares, pulseras o charms. Mira también cómo viste y evita adivinar una talla de anillo. Si aún dudas, cuéntale estas pistas a ",
              { href: "/#joyero-ia", label: "nuestro recomendador IA de joyas" },
              " para comparar opciones acordes a ella.",
            ],
          },
        ],
      },
      {
        title: "Errores que conviene evitar",
        paragraphs: [
          "No compres un anillo sin talla ni sin pensar en el posible mensaje de compromiso. Evita elegir por una moda que ella no usa, ignorar alergias conocidas o encargar una personalización sin revisar plazos y devolución.",
        ],
      },
    ],
    related: [
      { href: "/guias/joyas-para-regalar-mujer", label: "Ideas de joyas para regalar a una mujer" },
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
      { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
    ],
    advisorCta: {
      title: "Encuentra una joya para tu novia",
      description:
        "Cuéntale a nuestro joyero IA cómo es su estilo, la ocasión y tu presupuesto para recibir una orientación más afinada.",
    },
  },
  {
    slug: "pulseras-de-la-amistad",
    categorySlug: "regalos",
    eyebrow: "Guías",
    title: "Pulseras de la amistad: significado, tipos e ideas para regalar",
    description: "Guía para elegir pulseras de la amistad, pulseras para amigas y detalles con significado según estilo, ocasión y talla.",
    intro: "Una pulsera de la amistad puede ser un detalle cotidiano, un recuerdo compartido o un regalo para una nueva etapa. La clave es que tenga sentido para vuestra relación y que la otra persona quiera llevarla.",
    sections: [
      { title: "Qué significa una pulsera de la amistad", paragraphs: ["Puede representar cercanía, una experiencia compartida o simplemente el deseo de celebrar una amistad. No hay un significado único: el valor lo aportan las personas, el momento y el detalle elegido."] },
      { title: "Tipos de pulseras de la amistad", paragraphs: [], subsections: [
        { title: "Minimalistas y a juego", paragraphs: ["Una cadena fina o dos piezas relacionadas funcionan si buscáis un detalle discreto. No tienen que ser idénticas: pueden compartir un material, una forma o un símbolo."] },
        { title: "Con charms, iniciales o símbolos", paragraphs: ["Son buenas opciones cuando hay una referencia real que compartir. Comprueba que el charm sea compatible con la pulsera y que la personalización tenga plazos y condiciones claras."] },
        { title: "Personalizadas o de hilo", paragraphs: ["Una fecha, una inicial o un color puede aportar intención. Las pulseras de hilo son adecuadas si forman parte de su estilo; no hace falta elegirlas solo por asociación."] },
      ] },
      { title: "Pulseras para mejores amigas", paragraphs: ["Si buscas una pulsera amigas, empieza por pensar qué le resultaría natural llevar: una pieza discreta para todos los días, dos pulseras complementarias o un detalle que recuerde un viaje, una graduación o una etapa compartida. Las pulseras para dos amigas suelen funcionar mejor cuando respetan el estilo de cada una." ] },
      { title: "Pulseras para regalar a una amiga", paragraphs: ["Para regalar a una amiga, una pulsera minimalista, un charm, unas iniciales, un símbolo compartido o dos diseños a juego pueden tener sentido. Comprueba primero su metal habitual, la longitud y si prefiere una pieza discreta o una personalización visible."] },
      { title: "Qué pulsera regalar según su personalidad", paragraphs: ["Para alguien minimalista, una cadena fina o un símbolo pequeño. Para una amiga elegante, un acabado sobrio y combinable. Para una persona divertida o moderna, puede encajar un charm o color si ya los usa. Si es sentimental, una inicial o fecha puede tener sentido; si es atrevida, busca una pieza con presencia sin alejarte de su estilo habitual."] },
      { title: "Pulseras de amistad según la ocasión", paragraphs: ["En cumpleaños o Navidad, prioriza una pulsera fácil de usar. Una graduación, despedida, nueva etapa o amistad a distancia puede admitir un símbolo compartido. Para un regalo espontáneo, suele funcionar mejor una pieza ligera y sin demasiada carga simbólica."] },
      { title: "Cómo elegir una pulsera de amistad", paragraphs: [
        { parts: ["Mira el metal que utiliza, si prefiere joyas discretas o llamativas y si lleva pulseras con frecuencia. Comprueba la talla y el cierre; los modelos ajustables reducen el riesgo. Si necesitas comparar opciones, usa ", { href: "/#joyero-ia", label: "el recomendador IA de joyas.ai" }, "."] },
      ] },
    ],
    related: [
      { href: "/guias/pulseras-para-regalar", label: "Pulseras para regalar" },
      { href: "/guias/joyas-para-regalar-mujer", label: "Joyas para regalar a una mujer" },
      { href: "/joyas/pulseras", label: "Pulseras" },
    ],
    advisorCta: { title: "Encuentra una pulsera perfecta para vuestra amistad", description: "Cuéntale a nuestro joyero IA cómo es tu amiga, la ocasión y el estilo que quieres transmitir." },
  },
  {
    slug: "pulseras-para-mama",
    categorySlug: "regalos",
    eyebrow: "Guías",
    title: "Pulseras para mamá: ideas para acertar con el regalo",
    description: "Ideas de pulsera mamá para elegir un regalo según su estilo, la ocasión, el material, la talla y el significado que buscas.",
    intro: "Una pulsera para mamá funciona mejor cuando encaja con su rutina y no solo con la fecha del regalo. Estas ideas sirven para decidir el diseño, el material y el nivel de personalización con criterio.",
    sections: [
      { title: "Qué pulsera regalar a mamá", paragraphs: ["Una pulsera sencilla es fácil de llevar a diario; una pieza elegante puede encajar en ocasiones especiales. Los charms, iniciales, grabados o piedras aportan significado cuando se relacionan con algo real para ella. No hace falta personalizar para que el regalo sea personal."] },
      { title: "Pulseras según su estilo", paragraphs: [], subsections: [
        { title: "Clásica o minimalista", paragraphs: ["Busca un diseño atemporal, ligero y fácil de combinar con reloj u otras joyas."] },
        { title: "Moderna o elegante", paragraphs: ["Elige una forma más actual o un acabado cuidado si ya utiliza piezas protagonistas, sin asumir que una joya grande será siempre mejor."] },
        { title: "Sentimental o colorida", paragraphs: ["Una inicial, una fecha, un charm o una piedra puede tener sentido si refleja sus gustos y no un cliché sobre la maternidad."] },
      ] },
      { title: "Pulseras con significado para mamá", paragraphs: ["Las referencias familiares, una fecha importante o un símbolo compartido pueden aportar intención. Antes de grabar, confirma la ortografía, los plazos y las condiciones de cambio; las personalizaciones suelen tener menos margen de devolución."] },
      { title: "Pulseras según la ocasión", paragraphs: ["Para cumpleaños, Día de la Madre o Navidad, busca una pieza que pueda disfrutar enseguida. Un aniversario, una jubilación, un agradecimiento o el nacimiento de un nieto pueden justificar un detalle más personal, siempre acorde a su gusto."] },
      { title: "Qué material elegir y cómo acertar con la talla", paragraphs: ["El oro, la plata, el acero y otros materiales habituales se diferencian por aspecto, cuidados y presupuesto; observa qué metal lleva ya. Comprueba también el cierre, el diámetro o la longitud. Si no conoces la medida, una pulsera ajustable o con alargador reduce el riesgo."] },
      { title: "Cómo acertar si no sabes qué pulsera le gustaría", paragraphs: [
        { parts: ["Fíjate en si usa pulseras con frecuencia, qué tono de metal repite y si prefiere líneas sencillas o detalles visibles. Puedes ordenar esas pistas con ", { href: "/#joyero-ia", label: "el recomendador IA de joyas.ai" }, "."] },
      ] },
    ],
    related: [
      { href: "/guias/joya-regalo-madre-primeriza", label: "Joya para regalar a una madre primeriza" },
      { href: "/guias/pulseras-para-regalar", label: "Pulseras para regalar" },
      { href: "/guias/joyas-para-regalar-mujer", label: "Joyas para regalar a una mujer" },
    ],
    advisorCta: { title: "Encuentra una pulsera para mamá con IA", description: "Indica su estilo, la ocasión y las pistas que conoces para recibir una orientación personalizada." },
  },
  {
    slug: "joya-regalo-madre-primeriza",
    categorySlug: "regalos",
    eyebrow: "Guías",
    title: "Qué joya regalar a una madre primeriza: ideas con significado",
    description: "Guía para elegir un regalo madre primeriza joya con opciones prácticas, personales y adecuadas para pareja, familia o amistades.",
    intro: "Un regalo de joyería para una madre primeriza puede celebrar el nacimiento sin imponer una idea de cómo debería vivir la maternidad. Busca una pieza cómoda, coherente con sus gustos y pensada para su día a día.",
    sections: [
      { title: "Qué joya regalar a una madre primeriza", paragraphs: ["Un collar o medalla puede admitir un detalle personal sin requerir talla. Una pulsera ajustable es práctica si suele llevarlas. Los pendientes funcionan si conoces bien sus preferencias; un charm encaja si ya tiene una pieza compatible. Evita anillos si no conoces la talla."] },
      { title: "Joyas relacionadas con el nacimiento", paragraphs: ["Una inicial, una fecha, una piedra de nacimiento, un nombre o un símbolo son posibilidades, no obligaciones. Elige solo una referencia que tenga sentido para ella y revisa los plazos antes de encargar una pieza personalizada."] },
      { title: "Regalos de pareja, familiares o amigos", paragraphs: ["La pareja puede elegir una pieza más íntima o vinculada a una experiencia compartida. Familiares y amistades suelen acertar mejor con una joya cómoda y menos personal, especialmente si no conocen bien sus preferencias o presupuesto."] },
      { title: "Qué evitar", paragraphs: ["Evita piezas incómodas, demasiado delicadas para el uso cotidiano, diseños que no se parecen a su estilo y anillos sin talla. No asumas que quiere un nombre, una fecha o un símbolo de maternidad: la intención debe respetar sus gustos."] },
      { title: "Presupuesto y elección personal", paragraphs: [
        { parts: ["Con un presupuesto contenido, prioriza comodidad, material indicado y un diseño sencillo. Con más margen, valora personalización, fabricación y cuidados sin convertir el precio en el único criterio. Si necesitas decidir entre opciones, prueba ", { href: "/#joyero-ia", label: "el recomendador IA de joyas.ai" }, "."] },
      ] },
    ],
    related: [
      { href: "/guias/pulseras-para-mama", label: "Pulseras para mamá" },
      { href: "/guias/joyas-para-regalar-mujer", label: "Joyas para regalar a una mujer" },
      { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" },
    ],
    advisorCta: { title: "Encuentra una joya especial para una madre primeriza", description: "Explica quién hace el regalo, qué estilo tiene ella y qué quieres celebrar." },
  },
  {
    slug: "joyas-para-parejas",
    categorySlug: "regalos",
    eyebrow: "Guías",
    title: "Joyas para parejas: ideas originales y su significado",
    description: "Ideas de joyas para parejas, desde piezas a juego o complementarias hasta joyas personalizadas según ocasión y estilo.",
    intro: "Las joyas para parejas no tienen por qué ser idénticas ni llevar un símbolo evidente. Una pieza compartida funciona cuando representa algo reconocible para ambos y cada persona tiene ganas de usarla.",
    sections: [
      { title: "Qué son las joyas para parejas", paragraphs: ["Pueden ser dos pulseras, collares, anillos, charms o piezas personalizadas que comparten una referencia. Lo importante no es que sean iguales, sino que mantengan una conexión sin forzar el estilo de ninguna de las dos personas."] },
      { title: "Ideas de joyas para parejas", paragraphs: ["Las pulseras son prácticas si buscáis algo cotidiano. Los collares pueden compartir un símbolo o diseño complementario. Los anillos requieren talla y atención a su posible significado. Los charms, grabados o piezas personalizadas encajan cuando existe una referencia que los dos reconocéis."] },
      { title: "Joyas iguales o complementarias", paragraphs: ["Dos piezas complementarias suelen ser más fáciles de llevar que dos diseños idénticos. Podéis compartir metal, piedra, fecha o forma y adaptar el tamaño y la presencia al gusto de cada persona."] },
      { title: "Joyas para parejas según la ocasión", paragraphs: ["Un aniversario, cumpleaños, Navidad o San Valentín puede inspirar un detalle compartido. Para un compromiso, un anillo puede tener sentido si ambos buscáis ese mensaje. Un regalo espontáneo suele funcionar mejor con una pieza sencilla y fácil de usar."] },
      { title: "Joyas para parejas con significado", paragraphs: ["Iniciales, fechas, símbolos, coordenadas de un lugar importante, piedras o grabados pueden aportar intención. Evita referencias demasiado literales si no encajan con vuestro estilo y confirma siempre cualquier personalización antes de encargarla."] },
      { title: "Cómo elegir una joya que represente a los dos", paragraphs: [
        { parts: ["No presupongas talla de anillo ni un significado de compromiso que no queréis transmitir. Parte de lo que ambos llevan ya y de la ocasión. Para contrastar ideas, usa ", { href: "/#joyero-ia", label: "el recomendador IA de joyas.ai" }, "."] },
      ] },
    ],
    related: [
      { href: "/guias/joyas-para-regalar-novia", label: "Joyas para regalar a mi novia" },
      { href: "/ocasiones/aniversario", label: "Joyas para aniversario" },
      { href: "/guias/pulseras-para-regalar", label: "Pulseras para regalar" },
    ],
    advisorCta: { title: "Encuentra una joya para vuestra historia", description: "Cuéntale a nuestro joyero IA la ocasión, lo que compartís y el estilo de ambos." },
  },
  {
    slug: "pulseras-para-regalar",
    categorySlug: "regalos",
    eyebrow: "Guías",
    title: "Pulseras para regalar: cómo elegir según persona y ocasión",
    description: "Consejos para elegir pulseras para regalar según la persona, el estilo, el material, la talla, el presupuesto y la ocasión.",
    intro: "Una pulsera es un regalo flexible, pero acertar depende de observar qué joyas lleva la otra persona, cómo ajusta sus accesorios y qué quieres celebrar. Esta guía reúne los criterios generales antes de pasar a casos más concretos.",
    sections: [
      { title: "Cómo elegir una pulsera para regalar", paragraphs: ["Observa si lleva pulseras, reloj u otras joyas, qué metal repite y cuánto protagonismo da a sus accesorios. Prioriza un cierre cómodo, un ajuste adecuado y una pieza que pueda incorporar a su rutina."] },
      { title: "Pulseras según la persona", paragraphs: [
        { parts: ["Para una pareja puedes considerar un detalle compartido; para una madre, una pieza con significado familiar si encaja con ella; para una amiga o hermana, una pulsera fácil de combinar suele ser una apuesta segura. Encuentra ideas específicas en nuestras guías de ", { href: "/guias/pulseras-para-mama", label: "pulseras para mamá" }, " y ", { href: "/guias/pulseras-de-la-amistad", label: "pulseras de la amistad" }, "."] },
      ] },
      { title: "Pulseras según el estilo", paragraphs: ["Las líneas finas y limpias suelen encajar con un estilo minimalista; una pieza sobria y bien acabada, con uno elegante o clásico. Los diseños geométricos pueden funcionar en un estilo moderno y los detalles visibles en uno atrevido, siempre que ya los use."] },
      { title: "Significado, material y talla", paragraphs: ["Un grabado, inicial o símbolo solo suma si es relevante. Observa si prefiere oro, plata, acero u otros materiales habituales, y revisa sus cuidados. Para la talla, una pulsera ajustable o con alargador ofrece más margen; comprueba además que el cierre sea fácil de manejar."] },
      { title: "Pulseras según presupuesto", paragraphs: ["Con menos de 50 €, prioriza un diseño sencillo y material claramente indicado. Entre 50 y 100 €, compara acabados y versatilidad. Entre 100 y 250 €, revisa fabricación, piedras y cuidados. Por encima de esa cifra, añade documentación, garantía y devolución a los criterios de compra."] },
      { title: "Qué hacer si no conoces bien sus gustos", paragraphs: [
        { parts: ["Evita elegir una pieza muy llamativa solo por la ocasión. Mira su estilo real y usa ", { href: "/#joyero-ia", label: "el recomendador IA de joyas.ai" }, " para convertir esas pistas en opciones coherentes."] },
      ] },
    ],
    related: [
      { href: "/guias/pulseras-para-mama", label: "Pulseras para mamá" },
      { href: "/guias/pulseras-de-la-amistad", label: "Pulseras de la amistad" },
      { href: "/guias/joyas-para-parejas", label: "Joyas para parejas" },
    ],
    advisorCta: { title: "Encuentra la pulsera perfecta para regalar", description: "Indica para quién es, qué suele llevar y la ocasión para recibir una recomendación más útil." },
  },
  {
    slug: "pendientes-madrina-mantilla",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Pendientes para madrina con mantilla: cómo elegirlos",
    description: "Guía para elegir pendientes para madrina con mantilla según vestido, peineta, peinado, color, comodidad y equilibrio visual.",
    intro: "Con mantilla, peineta y vestido ya hay varios elementos con presencia. Los pendientes adecuados acompañan el conjunto sin competir con ellos y deben seguir siendo cómodos durante muchas horas.",
    sections: [
      { title: "Qué pendientes llevar con mantilla", paragraphs: ["Valora a la vez longitud, volumen, movimiento y peso visual. Una peineta elaborada o una mantilla con mucho dibujo puede agradecer pendientes más limpios; un conjunto sobrio puede admitir una pieza con más presencia. No hay una combinación obligatoria."] },
      { title: "Pendientes largos o cortos", paragraphs: ["Los largos pueden aportar verticalidad cuando el peinado deja el cuello despejado, pero conviene comprobar que no se enganchen. Los cortos o medios pueden equilibrar una peineta protagonista y suelen dar más comodidad. Prueba siempre el conjunto completo antes del evento."] },
      { title: "Oro, plata o piedras de color", paragraphs: ["El metal puede dialogar con el color del vestido, la peineta y los demás accesorios. Las piedras de color funcionan si no introducen otro foco sin relación con el look. En caso de duda, mira qué tono de metal te favorece y qué usas normalmente."] },
      { title: "Cómo combinar pendientes, mantilla y peineta", paragraphs: ["Elige un elemento principal y deja que los demás lo acompañen. Si la peineta o el bordado tienen mucha presencia, evita sumar pendientes muy grandes y un collar llamativo a la vez."] },
      { title: "Pendientes según el peinado", paragraphs: ["Los recogidos hacen más visible el pendiente y permiten valorar mejor su largo real. Con un peinado bajo o con volumen, revisa que el cierre sea cómodo y que la pieza no se enrede ni roce la mantilla."] },
      { title: "Qué evitar", paragraphs: ["Pendientes demasiado grandes junto a una peineta protagonista, piezas pesadas, demasiados elementos llamativos o comprar sin probar el vestido, la mantilla y el peinado juntos."] },
      { title: "Cómo encontrar unos pendientes que encajen con tu vestido", paragraphs: [{ parts: ["Describe el vestido, el color, la mantilla y el peinado en ", { href: "/#joyero-ia", label: "el recomendador IA de joyas.ai" }, " para comparar opciones sin partir de una regla rígida."] }] },
    ],
    related: [
      { href: "/guias/pendientes-madrina-boda", label: "Pendientes para madrina de boda" },
      { href: "/guias/pendientes-boda-invitada", label: "Pendientes para boda de invitada" },
      { href: "/guias/pendientes-vestido-rojo-boda", label: "Pendientes para vestido rojo de boda" },
      { href: "/guias/tipos-cierre-pendientes", label: "Tipos de cierre de pendientes" },
    ],
    advisorCta: { title: "Encuentra los pendientes para tu look de madrina", description: "Cuéntale a nuestro joyero IA cómo es el vestido, la mantilla, la peineta y el peinado." },
  },
  {
    slug: "pendientes-madrina-boda",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Pendientes para madrina de boda: cómo elegirlos según vestido y estilo",
    description: "Guía de pendientes para madrina de boda según vestido, peinado, tocado, horario, comodidad y equilibrio de accesorios.",
    intro: "Elegir pendientes para madrina de boda empieza por el conjunto: vestido, escote, peinado, tocado y el tiempo que vas a llevarlos. La mejor opción acompaña esos elementos sin convertir cada accesorio en el centro de atención.",
    sections: [
      { title: "Cómo elegir pendientes para madrina", paragraphs: ["Valora tamaño, longitud, peso visual y comodidad junto al vestido y el peinado. Un diseño con volumen, estampado o pedrería suele agradecer un pendiente más limpio; un vestido sencillo puede dejar espacio a una pieza con mayor presencia.", "No existe un único tipo de pendiente correcto para una madrina. El estilo personal y la seguridad al llevarlo importan tanto como el protocolo o la tendencia del momento."] },
      { title: "Pendientes largos o cortos para madrina", paragraphs: ["Los pendientes largos pueden aportar verticalidad y movimiento con recogidos o escotes despejados. Si el vestido, el tocado o el collar ya concentran la atención, los pendientes cortos o medianos ayudan a ordenar el conjunto.", "Comprueba el peso y el cierre antes de decidir. Un diseño muy visible no compensa si tira del lóbulo o incomoda durante la ceremonia y la celebración."] },
      { title: "Pendientes según el vestido de madrina", paragraphs: ["Mira el escote, el color, el volumen, los estampados y los detalles cercanos al rostro. Un vestido minimalista puede admitir contraste o brillo; uno con bordados, textura o pedrería suele funcionar mejor con una joya que no compita con esas zonas.", { parts: ["Si el escote condiciona el equilibrio de las joyas, consulta también la guía de ", { href: "/guias/collares-segun-escote", label: "collares según escote" }, "."] }] },
      { title: "Pendientes según el peinado", paragraphs: ["Un recogido deja visible el largo completo del pendiente; con pelo suelto puede convenir un diseño algo más reconocible; el semirrecogido suele admitir piezas intermedias. Con pelo corto, incluso un pendiente pequeño o geométrico puede tener mucho protagonismo."] },
      { title: "Pendientes dorados o plateados", paragraphs: ["El metal puede dialogar con los demás accesorios, el color del vestido y tus preferencias. El dorado puede dar una lectura más cálida y el plateado una más limpia o fría, pero ninguno es una regla universal: mira el conjunto completo antes de elegir."] },
      { title: "Pendientes para madrina de día o de noche", paragraphs: ["El horario puede orientar la intensidad del brillo, el color o la longitud, sin sustituir la comodidad y la coherencia con el vestido. La luz, el lugar y el tipo de celebración ayudan a poner cada pieza en contexto."] },
      { title: "Pendientes para madrina con mantilla", paragraphs: [{ parts: ["Si vas a llevar mantilla y peineta, la decisión requiere mirar esos elementos junto al pendiente. La guía de ", { href: "/guias/pendientes-madrina-mantilla", label: "pendientes para madrina con mantilla" }, " trata esa combinación específica sin repetirla aquí."] }] },
      { title: "Cómo combinar pendientes con tocado o pamela", paragraphs: ["Elige un foco principal. Cuando una pamela, un tocado o el peinado ya tienen volumen, reducir tamaño, brillo o movimiento en los pendientes suele facilitar un resultado más equilibrado. Prueba siempre el conjunto completo."] },
      { title: "Errores frecuentes al elegir pendientes de madrina", paragraphs: ["Sumar demasiados accesorios protagonistas, ignorar el peso, decidir sin probar con el peinado, olvidar el tocado o elegir una pieza solo por tendencia puede restar comodidad y coherencia al look."] },
      { title: "Cómo encontrar los pendientes que encajan con tu look", paragraphs: [{ parts: ["Describe el vestido, el escote, el peinado, el tocado y la ocasión en ", { href: "/#joyero-ia", label: "el recomendador IA de Joyas.ai" }, " para comparar opciones con criterios claros."] }] },
    ],
    related: [
      { href: "/guias/pendientes-madrina-mantilla", label: "Pendientes para madrina con mantilla" },
      { href: "/guias/pendientes-boda-invitada", label: "Pendientes para invitada de boda" },
      { href: "/guias/pendientes-vestido-rojo-boda", label: "Pendientes para vestido rojo de boda" },
      { href: "/guias/collares-invitada-boda", label: "Collares para invitada de boda" },
    ],
    advisorCta: { title: "Encuentra los pendientes para tu look de madrina", description: "Indica el vestido, el escote, el peinado, el tocado y la hora de la boda para recibir una orientación más ajustada." },
  },
  {
    slug: "pendientes-vestido-azul-marino",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Qué pendientes llevar con un vestido azul marino",
    description: "Descubre qué pendientes para vestido azul marino pueden encajar según metal, perlas, escote, peinado, accesorios y ocasión.",
    intro: "Con un vestido azul marino, los pendientes pueden aportar calidez, contraste o una lectura más discreta. Antes de decidir, mira el escote, el peinado, el bolso, los zapatos y cuánto protagonismo quieres que tengan las joyas.",
    sections: [
      { title: "Qué pendientes combinan con un vestido azul marino", paragraphs: ["Dorado, plateado, perlas, piedras claras, color contenido y diseños minimalistas pueden funcionar con azul marino. La elección depende del tono del vestido, el acabado de los accesorios y del efecto que buscas, no de una combinación única."] },
      { title: "Pendientes dorados con vestido azul marino", paragraphs: ["El dorado puede crear contraste y calidez, especialmente cuando quieres que los pendientes tengan presencia. Comprueba que dialogue con bolso, zapatos u otras joyas sin obligar a que todos los elementos sean idénticos."] },
      { title: "Pendientes plateados con vestido azul marino", paragraphs: ["El plateado puede dar un resultado más frío, limpio o minimalista. Es una opción útil cuando el vestido tiene detalles sobrios o cuando prefieres que los pendientes acompañen sin convertirse en el foco principal."] },
      { title: "Pendientes de perlas con vestido azul marino", paragraphs: [{ parts: ["Las perlas pueden encajar en looks clásicos, elegantes o contemporáneos según el tamaño y el diseño. Si quieres valorar tipos y cuidados, consulta la guía de ", { href: "/guias/tipos-de-perlas", label: "tipos de perlas" }, "."] }] },
      { title: "Pendientes largos o pequeños", paragraphs: ["Con recogido y escote despejado, un pendiente largo puede aportar movimiento. Si el vestido tiene detalles cerca del rostro, mucho volumen o un collar visible, los pendientes pequeños o medios pueden dar más descanso visual."] },
      { title: "Pendientes según el peinado", paragraphs: ["El recogido muestra el pendiente completo; el pelo suelto puede ocultar diseños pequeños; el semirrecogido admite proporciones intermedias; y el pelo corto hace más visibles incluso las piezas discretas. Prueba el peinado habitual junto al vestido."] },
      { title: "Cómo combinar pendientes y collar", paragraphs: [{ parts: ["Si los pendientes son protagonistas, elige un collar discreto o prescinde de él. Si el collar concentra la atención, reduce tamaño, brillo o movimiento en los pendientes. La zona del cuello también ayuda a decidir: consulta ", { href: "/guias/collares-segun-escote", label: "qué collar elegir según el escote" }, "."] }] },
      { title: "Vestido azul marino para boda", paragraphs: [{ parts: ["En una boda, añade el horario, el vestido y el nivel de formalidad a la decisión. Puedes ampliar criterios generales en ", { href: "/guias/pendientes-boda-invitada", label: "pendientes para invitada de boda" }, "."] }] },
      { title: "Errores frecuentes", paragraphs: ["Añadir demasiados colores sin relación, sumar varios accesorios protagonistas, ignorar bolso y zapatos, elegir pendientes incómodos o no probar el look completo son errores habituales."] },
      { title: "Cómo encontrar pendientes que encajen con tu vestido", paragraphs: [{ parts: ["Cuenta el tono azul marino, el escote, el peinado y los accesorios a ", { href: "/#joyero-ia", label: "el recomendador IA de Joyas.ai" }, " para ordenar tus opciones."] }] },
    ],
    related: [
      { href: "/guias/pendientes-boda-invitada", label: "Pendientes para invitada de boda" },
      { href: "/guias/pendientes-vestido-rojo-boda", label: "Pendientes para vestido rojo de boda" },
      { href: "/guias/collares-segun-escote", label: "Qué collar elegir según el escote" },
      { href: "/guias/tipos-de-perlas", label: "Tipos de perlas" },
    ],
    advisorCta: { title: "Encuentra los pendientes para tu vestido azul marino", description: "Indica el escote, el peinado, el tipo de evento y los accesorios para recibir una orientación útil." },
  },
  {
    slug: "pendientes-vestido-rojo-boda",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Qué pendientes llevar con un vestido rojo de boda",
    description: "Descubre qué pendientes para vestido rojo de boda pueden encajar según metal, accesorios, escote, peinado y momento del evento.",
    intro: "Un vestido rojo ya tiene presencia, así que los pendientes deben aportar equilibrio y no competir por defecto. El metal, el peinado y el resto de accesorios pesan más que una combinación universal.",
    sections: [
      { title: "Qué pendientes combinan con un vestido rojo", paragraphs: ["Los dorados, plateados, negros, las piedras claras, los tonos próximos y los diseños minimalistas pueden funcionar según el conjunto. Parte del subtono del vestido, el acabado de bolso y zapatos, y el tipo de joya que llevas habitualmente."] },
      { title: "Pendientes dorados o plateados con vestido rojo", paragraphs: ["El dorado puede aportar calidez y el plateado una lectura más fría o limpia, pero ambos dependen de los accesorios y del tono concreto del rojo. No hace falta coordinarlo todo de manera literal; busca coherencia entre los elementos principales."] },
      { title: "Pendientes largos o pequeños", paragraphs: ["Con un escote despejado y un peinado recogido, un pendiente largo puede sostener el look. Si el vestido tiene volumen, textura o detalles cerca del rostro, unos pendientes pequeños pueden dar más descanso visual."] },
      { title: "Cómo combinar pendientes con collar", paragraphs: ["Si los pendientes son protagonistas, prescindir de collar o elegir uno muy discreto suele ordenar el conjunto. Si el collar concentra la atención, reduce tamaño, brillo o movimiento en los pendientes."] },
      { title: "Vestido rojo para boda de día o de noche", paragraphs: ["En una boda de día y en una de noche pueden funcionar distintas intensidades, pero la comodidad y el equilibrio con el vestido siguen siendo los criterios centrales. Prueba los accesorios con luz parecida a la del evento si es posible."] },
      { title: "Errores frecuentes", paragraphs: ["Añadir demasiados elementos protagonistas, elegir el metal sin mirar los demás accesorios, usar pendientes pesados o decidir sin probar con el peinado y el escote reales."] },
      { title: "Encuentra unos pendientes que combinen con tu vestido", paragraphs: [{ parts: ["Si ya tienes el vestido, explícale el rojo, el escote, el peinado y los accesorios a ", { href: "/#joyero-ia", label: "nuestro recomendador IA" }, " para comparar opciones que encajen con tu look."] }] },
    ],
    related: [
      { href: "/guias/pendientes-boda-invitada", label: "Pendientes para invitada de boda" },
      { href: "/guias/collares-invitada-boda", label: "Collares para invitada de boda" },
      { href: "/guias/collares-segun-escote", label: "Collares según escote" },
    ],
    advisorCta: { title: "Encuentra pendientes para tu vestido rojo", description: "Indica el escote, el peinado y los accesorios para recibir una orientación más ajustada." },
  },
  {
    slug: "collares-invitada-boda",
    categorySlug: "collares",
    eyebrow: "Guías",
    title: "Collares para invitada de boda: cómo elegir según el vestido",
    description: "Guía de collares para boda invitada según escote, longitud, pendientes, metal, horario y equilibrio del look.",
    intro: "No todos los looks de invitada necesitan collar. Antes de añadir uno, mira el escote, los pendientes y el protagonismo del vestido: a veces dejar espacio es la decisión que mejor funciona.",
    sections: [
      { title: "¿Necesitas llevar collar a una boda?", paragraphs: ["No necesariamente. Un escote trabajado, un vestido con volumen cerca del cuello o unos pendientes protagonistas pueden hacer que un collar resulte innecesario. Elige uno cuando ayude a completar el conjunto, no solo por añadir una joya más."] },
      { title: "Collar según el escote", paragraphs: ["Un escote en V suele dialogar con líneas verticales; palabra de honor deja margen para un collar corto o protagonista; un escote redondo puede admitir una longitud media. Con cuello alto, asimétrico, espalda protagonista o mucho detalle, conviene valorar si el collar suma o distrae."] },
      { title: "Collar corto o largo", paragraphs: ["La longitud debe acompañar la zona del cuello sin cortar visualmente el vestido. Un collar corto puede concentrar luz cerca del rostro; uno largo funciona mejor cuando la silueta y el escote dejan espacio para ello."] },
      { title: "Cómo combinar collar y pendientes", paragraphs: [{ parts: ["Evita que ambos compitan por protagonismo. Si eliges un collar visible, reduce los pendientes; si los pendientes sostienen el look, un collar discreto o ninguno puede ser suficiente. Para decidir los pendientes, consulta también ", { href: "/guias/pendientes-boda-invitada", label: "pendientes para boda de invitada" }, "."] }] },
      { title: "Oro o plata según el look", paragraphs: ["Elige el metal según el vestido, los accesorios y lo que suelas llevar. No hay una equivalencia fija entre color de vestido y metal: el acabado, el subtono y el conjunto completo importan más."] },
      { title: "Collares para boda de día o de noche", paragraphs: ["El horario puede orientar el nivel de brillo o presencia, pero no reemplaza la comodidad ni el equilibrio. Prueba el collar con el vestido y el movimiento real antes de decidir."] },
      { title: "Errores frecuentes al elegir collar", paragraphs: ["Elegir una longitud que compite con el escote, sumar collar y pendientes protagonistas, ignorar el peso o el cierre, y no probarlo con el vestido antes del evento."] },
      { title: "Cómo encontrar el collar adecuado para tu vestido", paragraphs: [{ parts: ["Cuéntale a ", { href: "/#joyero-ia", label: "nuestro recomendador IA" }, " el escote, el color del vestido, los pendientes y la ocasión para recibir una orientación personalizada."] }] },
    ],
    related: [
      { href: "/guias/pendientes-boda-invitada", label: "Pendientes para invitada de boda" },
      { href: "/guias/collares-segun-escote", label: "Collares según escote" },
      { href: "/guias/tipos-de-collares", label: "Tipos de collares" },
    ],
    advisorCta: { title: "Encuentra el collar para tu look", description: "Describe el vestido, el escote, los pendientes y el horario de la boda para comparar opciones." },
  },
  {
    slug: "como-elegir-pendientes-novia",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Pendientes de novia: cómo elegirlos según vestido, peinado y estilo",
    description:
      "Guía de pendientes de novia para elegir según vestido, peinado, escote, estilo de boda y comodidad.",
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
          { title: "Coleta", paragraphs: ["Deja el rostro y el cuello despejados; prueba el largo real del pendiente para que acompañe el conjunto sin competir con el vestido."] },
          { title: "Pelo corto", paragraphs: ["Hace que pendientes pequeños, vintage o geométricos tengan más protagonismo del esperado."] },
        ],
      },
      {
        title: "Pendientes de novia según el estilo de boda",
        paragraphs: [
          "En una boda clásica suelen encajar diseños atemporales; en una moderna o minimalista, líneas limpias y proporciones cuidadas. Una boda romántica o boho puede admitir textura, perlas o movimiento; en una boda civil o de noche, manda el equilibrio con el vestido, el lugar y la comodidad. Son puntos de partida, no reglas.",
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
        title: "Pendientes de novia dorados o plateados",
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
        title: "Pendientes de novia con forma de lágrima",
        paragraphs: [
          "Su silueta puede aportar caída y movimiento, sobre todo con recogidos o escotes despejados. Revisa longitud y peso para que el diseño no compita con velo, tocado o vestido.",
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
      { href: "/guias/pulseras-de-novia", label: "Pulseras de novia" },
    ],
    advisorCta: {
      title: "Encuentra tus pendientes de novia ideales",
      description:
        "Cuéntale a nuestro joyero IA el estilo del vestido, el peinado, el escote y tu presupuesto.",
    },
  },
  {
    slug: "en-que-mano-va-anillo-compromiso",
    categorySlug: "anillos",
    eyebrow: "Guías",
    title: "¿En qué mano va el anillo de compromiso? Mano, dedo y tradición en España",
    description: "Descubre en qué mano y dedo se lleva el anillo de compromiso, qué costumbres existen en España y cómo combinarlo con la alianza.",
    intro: "No hay una única respuesta que sirva para todas las parejas. El anillo de compromiso suele llevarse en el dedo anular, pero la mano puede depender de la costumbre familiar, el país, la región y la decisión personal.",
    sections: [
      { title: "En qué mano se pone el anillo de compromiso", paragraphs: ["En España pueden verse anillos de compromiso tanto en la mano derecha como en la izquierda. Antes de seguir una tradición concreta, conviene hablarlo en pareja y tener en cuenta cómo se quiere llevar después de la boda.", "La mano elegida no cambia el significado del anillo. La comodidad, el trabajo diario y la convivencia con otras joyas también son razones prácticas para decidir."] },
      { title: "En qué dedo va el anillo de compromiso", paragraphs: ["Lo habitual es usar el dedo anular, aunque no es obligatorio. Es el dedo asociado por tradición a anillos de pareja en muchos contextos, pero algunas personas eligen otro dedo, otra mano o reservan el anillo para ocasiones especiales."] },
      { title: "Mano derecha o izquierda", paragraphs: ["Las costumbres cambian según país, región y familia. Por eso, la pregunta no tiene una respuesta universal: una pareja puede seguir la tradición que conoce, adaptarla o crear su propia forma de llevar el anillo."] },
      { title: "En qué mano se lleva en España", paragraphs: ["En España conviven usos distintos y no existe una norma social obligatoria. Si hay una tradición familiar o regional que os importa, puede servir como punto de partida; si no la hay, elegir la mano que resulte más cómoda y coherente con la alianza futura es una decisión totalmente válida."] },
      { title: "Qué pasa con el anillo de compromiso después de la boda", paragraphs: ["Algunas personas continúan llevándolo junto a la alianza, otras lo cambian de mano, lo colocan en otro dedo o lo reservan para momentos concretos. No hay una obligación de mantener el mismo orden o la misma mano que se eligió antes de casarse.", { parts: ["Si quieres entender el uso de la alianza tras la boda, consulta ", { href: "/guias/en-que-mano-anillo-casado", label: "en qué mano se pone el anillo de casado" }, "."] }] },
      { title: "Diferencia entre anillo de compromiso y alianza", paragraphs: ["El anillo de compromiso suele marcar la intención de casarse o formalizar una relación; la alianza se vincula a la ceremonia de matrimonio. Pueden tener estilos, materiales y usos diferentes, y cada pareja decide si los lleva juntos o por separado."] },
      { title: "Qué hacer si las tradiciones de la pareja son distintas", paragraphs: ["Hablad de qué significado queréis dar a cada anillo y de cómo os resulta cómodo llevarlo. Seguir una costumbre de una de las familias, combinar ambas o no seguir ninguna son opciones igual de legítimas."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Va antes o después de la alianza?", paragraphs: ["No hay un orden obligatorio. Algunas personas llevan ambos juntos y otras los alternan según comodidad, diseño y tradición personal."] },
        { title: "¿Se puede llevar en la mano derecha?", paragraphs: ["Sí. La mano derecha es una elección habitual para algunas parejas y no modifica el valor simbólico del anillo."] },
        { title: "¿Es obligatorio usar el anular?", paragraphs: ["No. El anular es la opción tradicional más común, pero el anillo puede llevarse donde resulte cómodo y significativo para quien lo usa."] },
      ] },
    ],
    related: [
      { href: "/guias/anillo-de-promesa", label: "Anillo de promesa: significado y cómo se lleva" },
      { href: "/guias/en-que-mano-anillo-casado", label: "En qué mano se pone el anillo de casado" },
      { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" },
    ],
    advisorCta: { title: "Descubre qué tipo de anillo encaja mejor contigo", description: "Cuéntale a nuestro joyero IA el estilo, el uso diario y el significado que buscáis para comparar opciones." },
  },
  {
    slug: "anillo-de-promesa",
    categorySlug: "anillos",
    eyebrow: "Guías",
    title: "Anillo de promesa: significado, cuándo regalarlo y en qué dedo se lleva",
    description: "Guía sobre el significado del anillo de promesa, cuándo regalarlo, en qué dedo llevarlo y sus diferencias frente al anillo de compromiso.",
    intro: "Un anillo de promesa puede expresar un vínculo, una intención de futuro o una promesa personal. Su significado no es universal: funciona mejor cuando ambas personas entienden qué representa para su relación.",
    sections: [
      { title: "Qué es un anillo de promesa", paragraphs: ["Es un anillo que una persona o una pareja utiliza para dar valor simbólico a un compromiso emocional, una etapa de la relación o una intención compartida. No exige que represente una boda futura ni tiene una forma o material obligatorio."] },
      { title: "Qué significa un anillo de promesa", paragraphs: ["Puede representar afecto, exclusividad, un proyecto común, una intención de futuro o una promesa personal. El significado nace de la conversación entre quienes lo dan y reciben, no de una regla externa."] },
      { title: "Cuándo se regala un anillo de promesa", paragraphs: ["Puede encajar en una relación estable, un aniversario, una etapa importante o un momento previo a un compromiso formal. Lo importante es que el gesto no cree expectativas distintas: conviene explicar qué queréis que simbolice."] },
      { title: "En qué dedo va el anillo de promesa", paragraphs: ["No existe un dedo universal para el anillo de promesa. Muchas personas eligen el anular por su carga simbólica, mientras que otras prefieren otra mano o dedo para diferenciarlo de un anillo de compromiso o de una alianza."] },
      { title: "En qué mano se lleva", paragraphs: ["La mano puede elegirse por costumbre, comodidad o decisión personal. Si el diseño se va a llevar a diario, también conviene pensar en talla, grosor, actividades habituales y combinación con otros anillos."] },
      { title: "Diferencia entre anillo de promesa y anillo de compromiso", paragraphs: [{ parts: ["El anillo de promesa puede tener significados diversos y no presupone necesariamente una boda. El de compromiso suele comunicar la intención de casarse. Si buscáis información sobre su uso tradicional, consulta ", { href: "/guias/en-que-mano-va-anillo-compromiso", label: "en qué mano va el anillo de compromiso" }, "."] }] },
      { title: "Cómo elegir un anillo de promesa", paragraphs: ["Prioriza un diseño que la persona pueda y quiera usar: estilo, material, comodidad, presupuesto y simbolismo cuentan más que el tamaño o la apariencia de compromiso. Si no conoces la talla, un diseño ajustable o una joya sin talla puede reducir el riesgo."] },
      { title: "Anillos de promesa para pareja", paragraphs: ["Los anillos de promesa para pareja no tienen que ser idénticos. Podéis compartir un metal, un grabado, una fecha o una forma, y adaptar el diseño al gusto y la comodidad de cada persona.", "Pueden regalarse en un aniversario, una etapa importante o como gesto de compromiso emocional. Antes de elegir, acordad el significado: un diseño de pareja debe expresar una intención compartida sin generar expectativas distintas sobre un compromiso formal."] },
      { title: "Qué evitar al regalar uno", paragraphs: ["Evita dar por supuesto el significado, elegir un diseño que pueda confundirse con un compromiso si no es la intención, asumir la talla o convertir el regalo en una presión. Una conversación clara suele hacer el gesto más valioso."] },
    ],
    related: [
      { href: "/guias/en-que-mano-va-anillo-compromiso", label: "En qué mano va el anillo de compromiso" },
      { href: "/guias/joyas-para-parejas", label: "Joyas para parejas" },
      { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" },
    ],
    advisorCta: { title: "Encuentra un anillo que represente vuestra relación", description: "Indica el estilo, el significado que buscáis y el uso diario para recibir ideas que encajen con ambos." },
  },
  {
    slug: "en-que-mano-anillo-casado",
    categorySlug: "anillos",
    eyebrow: "Guías",
    title: "¿En qué mano se pone el anillo de casado? Guía sobre la alianza",
    description: "Descubre en qué mano y dedo se lleva la alianza de boda, las variaciones de tradición y cómo combinarla con el anillo de compromiso.",
    intro: "La alianza o anillo de casado suele llevarse en el dedo anular, pero la mano puede variar por costumbre, país, región, familia y elección personal. No hay una única forma obligatoria de llevarla.",
    sections: [
      { title: "En qué mano se lleva el anillo de casado", paragraphs: ["La alianza puede llevarse en la mano derecha o izquierda según la tradición que siga cada pareja. También es normal elegir la mano que resulte más cómoda o que permita combinar mejor el anillo con otras joyas."] },
      { title: "En qué dedo se lleva la alianza", paragraphs: ["El dedo anular es la ubicación tradicional más habitual para la alianza. No obstante, una talla, una profesión, una lesión o la preferencia personal pueden llevar a escoger otro dedo o a usarla solo en determinadas ocasiones."] },
      { title: "Mano derecha o izquierda", paragraphs: ["Las dos manos se utilizan en diferentes costumbres. La tradición puede orientar, pero no obliga: el significado del matrimonio no depende de la mano elegida."] },
      { title: "Cómo se lleva en España", paragraphs: ["En España no todas las parejas siguen el mismo uso. Hay tradiciones familiares y regionales distintas, por lo que conviene evitar tratar una opción como norma para todo el país. Elegir una mano por costumbre o comodidad es igual de válido."] },
      { title: "Cómo combinar alianza y anillo de compromiso", paragraphs: [{ parts: ["Algunas personas los llevan juntos en el mismo anular; otras separan las piezas entre manos o alternan según el momento. El diseño, el grosor y la comodidad pueden influir. Para conocer las posibilidades del otro anillo, consulta ", { href: "/guias/en-que-mano-va-anillo-compromiso", label: "en qué mano va el anillo de compromiso" }, "."] }] },
      { title: "Qué anillo va primero", paragraphs: ["No hay un orden obligatorio. La tradición, la costumbre familiar, el diseño de las piezas y la comodidad son criterios razonables para decidir si llevarlos juntos y en qué posición."] },
      { title: "Anillo de casado en hombre y mujer", paragraphs: ["No hay una diferencia necesaria en la mano o el dedo según el género. Cada integrante de la pareja puede seguir una tradición compartida o elegir la opción que le resulte más cómoda y significativa."] },
      { title: "Qué pasa si prefieres llevarlo en otra mano", paragraphs: ["Puedes hacerlo. Una alianza es un símbolo personal y de pareja; cambiarla de mano, llevarla en otro dedo o reservarla para ciertos momentos no invalida su significado."] },
    ],
    related: [
      { href: "/guias/en-que-mano-va-anillo-compromiso", label: "En qué mano va el anillo de compromiso" },
      { href: "/guias/anillo-de-promesa", label: "Anillo de promesa: significado y cómo se lleva" },
      { href: "/guias/tipos-de-anillos", label: "Tipos de anillos" },
    ],
    advisorCta: { title: "Encuentra una alianza que encaje con vuestro día a día", description: "Cuéntale a nuestro joyero IA el estilo, el material, la comodidad y el uso que buscáis para comparar opciones." },
  },
  {
    slug: "pulseras-con-coordenadas",
    categorySlug: "pulseras",
    eyebrow: "Guías",
    title: "Pulseras con coordenadas: significado e ideas para regalar",
    description: "Guía para elegir pulseras con coordenadas, decidir qué lugar grabar, revisar el formato y acertar con un regalo personalizado.",
    intro: "Una pulsera con coordenadas funciona cuando el lugar grabado tiene un significado reconocible para quien la recibe. Antes de encargarla, conviene confirmar el punto exacto, el formato de latitud y longitud y el espacio disponible para el grabado.",
    sections: [
      { title: "Qué es una pulsera con coordenadas", paragraphs: ["Es una pulsera personalizada que graba las coordenadas de un lugar concreto. El valor del regalo está en la referencia compartida: el grabado no necesita explicarse a todo el mundo para tener sentido para quien lo lleva."] },
      { title: "Qué coordenadas se pueden grabar", paragraphs: ["Puede ser el lugar donde os conocisteis, una primera cita, una boda, un nacimiento, un viaje importante, una ciudad especial o un hogar familiar. No hay una coordenada mejor: elige una que siga siendo relevante con el tiempo."] },
      { title: "Pulseras con coordenadas para pareja", paragraphs: [{ parts: ["Pueden encajar en un aniversario, San Valentín, cumpleaños, regalo espontáneo o relación a distancia. Si buscáis un detalle compartido, compara también ideas de ", { href: "/guias/joyas-para-parejas", label: "joyas para parejas" }, "."] }] },
      { title: "Pulseras con coordenadas para amigas o madre", paragraphs: ["Una ciudad compartida, un viaje, una casa familiar o un lugar vinculado a los hijos puede dar sentido al grabado. Para una madre, elige el lugar solo si sabes que esa referencia es significativa para ella, no por cumplir una fórmula."] },
      { title: "Cómo obtener las coordenadas correctas", paragraphs: ["Comprueba el punto exacto antes de encargar el grabado y confirma el orden de latitud y longitud. Revisa signos, decimales, dirección y formato elegido; una vez personalizada, corregir una coordenada puede no ser sencillo."] },
      { title: "Qué texto acompañar a las coordenadas", paragraphs: ["Una fecha, unas iniciales, un nombre o una palabra breve pueden complementar el lugar. Prioriza legibilidad: un grabado demasiado largo puede perder claridad o no caber en la pieza elegida."] },
      { title: "Qué material elegir", paragraphs: ["Plata, acero, oro y distintos baños tienen aspecto, mantenimiento y precio diferentes. Revisa el material real, los cuidados y el acabado del modelo concreto en lugar de asumir una durabilidad universal."] },
      { title: "Qué revisar antes de comprar una pulsera personalizada", paragraphs: ["Confirma cierre, longitud, material, formato del grabado, ortografía, coordenadas, plazo de personalización y condiciones de cambio o devolución. Una personalización correcta suele importar más que añadir demasiados elementos al diseño."] },
      { title: "Cómo elegir una pulsera con coordenadas para regalar", paragraphs: [{ parts: ["Describe a quién va dirigida, el lugar que queréis recordar, su estilo y el material que suele llevar en ", { href: "/#joyero-ia", label: "el recomendador IA de Joyas.ai" }, " para ordenar opciones antes de comprar."] }] },
    ],
    related: [
      { href: "/guias/joyas-para-parejas", label: "Joyas para parejas" },
      { href: "/ocasiones/aniversario", label: "Joyas para aniversario" },
      { href: "/guias/pulseras-para-regalar", label: "Pulseras para regalar" },
    ],
    advisorCta: { title: "Encuentra una pulsera personalizada para regalar", description: "Indica para quién es, el significado del lugar y el estilo que buscas para comparar ideas." },
  },
  {
    slug: "pulseras-nombres-hijos",
    categorySlug: "pulseras",
    eyebrow: "Guías",
    title: "Pulseras con nombres de hijos: ideas para regalar a mamá",
    description: "Guía para elegir pulseras con nombres de hijos para mamá, revisar el grabado, materiales, longitud y detalles antes de encargar una joya personalizada.",
    intro: "Una pulsera con nombres de hijos tiene sentido cuando la personalización encaja con el estilo y el uso diario de quien la recibe. Antes de encargarla, confirma nombres, acentos, orden y espacio disponible para evitar errores difíciles de corregir.",
    sections: [
      { title: "Qué son las pulseras con nombres de hijos", paragraphs: ["Son pulseras personalizadas con uno o varios nombres, iniciales, fechas o pequeños símbolos. Pueden ser un regalo para una madre, abuela o una persona que quiera llevar una referencia familiar sin que la joya resulte demasiado llamativa."] },
      { title: "Pulsera con uno o varios nombres", paragraphs: ["Con un nombre puede funcionar un diseño muy limpio; con varios, conviene revisar cuántos caracteres y elementos admite cada formato. Si hay tres o más hijos, la legibilidad y el orden del grabado suelen ser más importantes que añadir adornos adicionales."] },
      { title: "Nombres, iniciales o fechas", paragraphs: ["El nombre completo es directo; las iniciales ocupan menos espacio; una fecha puede ser más discreta. Combinar nombre y fecha funciona si el tamaño del grabado lo permite sin perder claridad."] },
      { title: "Pulseras con nombres de hijos para mamá", paragraphs: [{ parts: ["Pueden encajar en cumpleaños, Día de la Madre, Navidad o tras un nacimiento, siempre que se adapten al estilo habitual de mamá. Esta guía se centra en la personalización con nombres; para una elección general, consulta ", { href: "/guias/pulseras-para-mama", label: "pulseras para mamá" }, "."] }] },
      { title: "Pulseras para madres primerizas", paragraphs: [{ parts: ["Si el regalo se relaciona con un nacimiento reciente, considera también los criterios de ", { href: "/guias/joya-regalo-madre-primeriza", label: "una joya para regalar a una madre primeriza" }, "."] }] },
      { title: "Pulseras con nombres de nietos para abuela", paragraphs: ["Puede ser una variante útil cuando la destinataria tiene una relación especial con los nietos. Mantén el diseño sencillo y comprueba que los nombres, el orden y el nivel de personalización sean los que ella apreciaría."] },
      { title: "Qué material y longitud elegir", paragraphs: ["Plata, acero, oro y baños requieren cuidados diferentes. Revisa el material real y mide la muñeca o elige un cierre ajustable cuando sea posible; la comodidad depende de la longitud, el peso y el tipo de cierre."] },
      { title: "Qué revisar antes de encargar una joya personalizada", paragraphs: ["Comprueba ortografía, acentos, orden de los nombres, límite de caracteres, símbolos, formato, política de cambios y plazo de personalización. Revisa el texto final antes de confirmar el pedido."] },
      { title: "Qué presupuesto tiene sentido", paragraphs: ["No hay una cifra que garantice un mejor regalo. Compara material, construcción, tipo de grabado, cierre y condiciones de personalización para decidir qué opción tiene sentido para el uso y el presupuesto disponibles."] },
      { title: "Cómo elegir una pulsera que realmente vaya a usar", paragraphs: [{ parts: ["Parte de su metal favorito, tamaño, estilo y frecuencia de uso. Puedes explicarle estas pistas a ", { href: "/#joyero-ia", label: "el recomendador IA de Joyas.ai" }, " para comparar una pulsera personalizada que encaje con ella."] }] },
    ],
    related: [
      { href: "/guias/pulseras-para-mama", label: "Pulseras para mamá" },
      { href: "/guias/joya-regalo-madre-primeriza", label: "Joya para regalar a una madre primeriza" },
      { href: "/guias/pulseras-para-regalar", label: "Pulseras para regalar" },
    ],
    advisorCta: { title: "Encuentra una pulsera personalizada para mamá", description: "Indica los nombres, su estilo, el material que suele llevar y la ocasión para comparar ideas." },
  },
  {
    slug: "pulseras-de-novia",
    categorySlug: "pulseras",
    eyebrow: "Guías",
    title: "Pulseras de novia: cómo elegirlas según vestido y otras joyas",
    description: "Guía para elegir una pulsera de novia según vestido, mangas, pendientes, collar, material, comodidad y equilibrio del look de boda.",
    intro: "Una pulsera de novia no siempre es necesaria. Puede completar un look con muñecas despejadas o vestido minimalista, pero también puede competir con mangas trabajadas, guantes, encaje o demasiadas joyas protagonistas.",
    sections: [
      { title: "¿Debe llevar pulsera una novia?", paragraphs: ["No necesariamente. Una pulsera suma cuando deja espacio al vestido y al resto de joyas; puede ser mejor prescindir de ella si hay guantes, mangas con bordados, mucho detalle en las muñecas o varios accesorios que ya atraen la atención."] },
      { title: "Cómo elegir una pulsera de novia", paragraphs: ["Mira vestido, mangas, escote, pendientes, collar, peinado, estilo de boda y comodidad. Revisa longitud, ajuste, peso y cierre: una pieza bonita debe permitir moverse con naturalidad durante todo el día."] },
      { title: "Pulseras de novia según el vestido", paragraphs: ["Un vestido sin mangas puede dejar una pulsera más visible; con manga corta, conviene mirar dónde termina; con manga larga o encaje, la pulsera puede quedar oculta o competir con el tejido. Un vestido minimalista suele admitir más presencia que uno con pedrería o bordados."] },
      { title: "Pulsera de novia con manga larga", paragraphs: ["Puede funcionar si el puño deja espacio y la pieza no se engancha ni queda oculta de forma incómoda. Con encaje, bordados o guantes, prueba el conjunto completo: a veces dejar la muñeca libre crea un resultado más limpio."] },
      { title: "Pulseras sencillas o protagonistas", paragraphs: ["Las pulseras finas y minimalistas suelen acompañar sin dominar el look. Los diseños con piedras o más volumen pueden encajar si los pendientes y el collar se mantienen contenidos. Elige un único foco principal, no una obligación de llevar varias piezas visibles."] },
      { title: "Cómo combinar pulsera y pendientes", paragraphs: [{ parts: ["Si los pendientes son protagonistas, una pulsera discreta suele equilibrar. Si los pendientes son pequeños, la pulsera puede tener algo más de presencia. Para decidir el conjunto, consulta ", { href: "/guias/como-elegir-pendientes-novia", label: "cómo elegir los pendientes de novia" }, "."] }] },
      { title: "Cómo combinar pulsera y collar", paragraphs: ["No es necesario llevar pulsera, collar y pendientes a la vez. Si el collar tiene protagonismo, reduce la pulsera; si la zona del cuello queda libre, los pendientes o la pulsera pueden aportar el acabado sin competir con el vestido."] },
      { title: "Oro, plata, perlas o piedras", paragraphs: ["Elige el material según otras joyas, detalles del vestido y preferencias personales, sin aplicar reglas rígidas. Las perlas pueden encajar en looks clásicos, románticos o minimalistas; las piedras claras o de color dependen del conjunto y del nivel de brillo que buscas."] },
      { title: "Pulseras personalizadas para novia", paragraphs: ["Unas iniciales, una fecha, un símbolo o un grabado breve pueden tener sentido si la novia quiere llevar esa referencia. Confirma ortografía, formato, tamaño y condiciones de personalización antes de encargarla."] },
      { title: "Errores frecuentes al elegir pulsera de novia", paragraphs: ["Comprar sin probar con el vestido, sumar demasiados accesorios protagonistas, ignorar mangas y guantes, elegir un cierre poco práctico o una pulsera incómoda son errores habituales. El estilo real y la comodidad pesan más que seguir una tendencia."] },
      { title: "Cómo elegir una pulsera que encaje con tu look", paragraphs: [{ parts: ["Cuenta el vestido, las mangas, el escote, el peinado y las otras joyas a ", { href: "/#joyero-ia", label: "el recomendador IA de Joyas.ai" }, " para comparar opciones que respeten el equilibrio del look."] }] },
    ],
    related: [
      { href: "/guias/como-elegir-pendientes-novia", label: "Cómo elegir los pendientes de novia" },
      { href: "/guias/collares-segun-escote", label: "Qué collar elegir según el escote" },
      { href: "/guias/pendientes-boda-invitada", label: "Pendientes para invitada de boda" },
    ],
    advisorCta: { title: "Encuentra la joya que mejor encaja con tu look de novia", description: "Indica el vestido, las mangas, el escote y el estilo de boda para recibir una orientación más ajustada." },
  },
  {
    slug: "pendientes-hipoalergenicos",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Pendientes hipoalergénicos: cuáles elegir para orejas sensibles",
    description: "Guía para elegir pendientes hipoalergénicos: materiales, postes, cierres y datos que conviene comprobar antes de comprar para orejas sensibles.",
    intro: "Los pendientes hipoalergénicos suelen buscarse cuando la tolerancia del material es un criterio de compra. La etiqueta por sí sola no basta: revisa la composición del poste y el cierre, los posibles recubrimientos y la información concreta del fabricante.",
    sections: [
      {
        title: "¿Qué significa que unos pendientes sean hipoalergénicos?",
        paragraphs: [
          "En joyería, hipoalergénico suele indicar que una pieza se ha planteado para reducir la probabilidad de sensibilidad frente a ciertos materiales. No significa que elimine por completo el riesgo de irritación o que vaya a resultar adecuada para todas las personas.",
          "La composición real, las aleaciones, los baños y las piezas que tocan la piel importan más que una etiqueta comercial. Si ya conoces una sensibilidad concreta, prioriza una ficha de producto detallada sobre una descripción genérica como “antialérgico”.",
        ],
      },
      {
        title: "Qué materiales buscar en unos pendientes para orejas sensibles",
        paragraphs: [
          "Titanio, niobio, platino, determinadas aleaciones de oro, acero inoxidable de composición identificada y plata de ley se consideran opciones habituales al comparar pendientes para piel sensible. Su conveniencia depende de la aleación y del acabado concretos.",
          "Para decidir entre dos pares, comprueba primero el material de postes y cierres. Después revisa si la pieza es maciza, tiene baño, qué metal hay debajo del recubrimiento y si el fabricante especifica la ausencia o presencia de níquel.",
        ],
        table: {
          columns: ["Material", "Ventajas prácticas", "Qué comprobar", "Uso habitual"],
          rows: [
            ["Titanio", "Ligero, resistente y de buena tolerancia habitual", "Composición, poste, cierre y si es completo o recubierto", "Uso diario y piercing"],
            ["Acero quirúrgico", "Resistente y asequible", "Aleación y posible níquel", "Pendientes de diario"],
            ["Oro", "Acabado duradero en pieza maciza", "Quilataje, aleación y color", "Botones, aros y piezas de regalo"],
            ["Platino", "Metal denso y resistente", "Pureza, peso y presupuesto", "Joyería de larga duración"],
            ["Plata 925", "Aspecto clásico y accesible", "Aleación, baño y cuidados", "Uso ocasional o diario según la pieza"],
          ],
        },
      },
      {
        title: "Pendientes de titanio para mujer: qué comprobar antes de elegirlos",
        paragraphs: [
          "Los pendientes de titanio para mujer suelen interesar a quien busca una pieza ligera y resistente para uso diario, especialmente cuando la tolerancia del material es importante. La búsqueda “pendientes titanio mujer” reúne modelos muy distintos: compara siempre la ficha concreta, no solo el aspecto o la etiqueta.",
          "El titanio suele elegirse para pendientes para orejas sensibles por su bajo peso y resistencia. En artículos de piercing y joyería puede aparecer como titanio comercialmente puro o con referencias a grados y normas; si esa precisión importa para ti, pide la especificación al vendedor.",
        ],
        subsections: [
          {
            title: "Qué mirar antes de comprar pendientes de titanio",
            paragraphs: [
              "No basta con que la parte visible parezca de titanio. Una pieza puede estar recubierta, combinar distintos metales o tener un poste y cierre de otra composición. Los pendientes de titanio hipoalergénicos se valoran mejor cuando el fabricante identifica las partes que entran en contacto con la oreja.",
            ],
            bullets: [
              "Material exacto de la pieza, el poste y la tuerca o cierre.",
              "Titanio completo o recubrimiento sobre otro metal.",
              "Presencia de otros metales y especificación del fabricante.",
              "Peso, tamaño y tipo de cierre para el uso previsto.",
              "Cuidados y política de devolución antes de comprar.",
            ],
          },
          {
            title: "¿Titanio o acero quirúrgico para orejas sensibles?",
            paragraphs: [
              "El titanio y el acero quirúrgico son opciones habituales, pero no son equivalentes por definición. “Acero quirúrgico” puede abarcar distintas aleaciones y algunas incluyen níquel; el titanio suele considerarse cuando se quiere priorizar la tolerancia del material, siempre revisando la composición concreta.",
              "Ninguna de las dos opciones garantiza que no haya reacción. Si comparas dos pares, revisa poste, cierre, acabados y cualquier información sobre otros metales antes de decidir.",
            ],
          },
          {
            title: "¿Titanio o plata 925?",
            paragraphs: [
              "El titanio suele destacar por su bajo peso y resistencia; la plata 925 ofrece un acabado clásico, pero contiene otros metales además de plata y requiere revisar su aleación y posibles baños. Para pendientes de uso diario, compara también mantenimiento, peso y el material real de las partes que tocan la piel.",
              {
                parts: [
                  "La guía sobre ",
                  { href: "/guias/plata-925", label: "plata 925" },
                  " explica su composición sin sustituir la información del fabricante del pendiente concreto.",
                ],
              },
            ],
          },
          {
            title: "Pendientes de titanio para uso diario",
            paragraphs: [
              "Para diario, busca un peso contenido, tamaño compatible con tu rutina y un cierre cómodo. Los botones y aros ligeros pueden ser prácticos, pero conviene valorar gafas, auriculares, descanso y facilidad de limpieza junto con el material.",
            ],
          },
        ],
      },
      {
        title: "Pendientes de acero quirúrgico: ¿son buena opción?",
        paragraphs: [
          "“Acero quirúrgico” es un término amplio, no una composición única. Puede ser una opción práctica por resistencia y mantenimiento, pero algunas aleaciones incluyen níquel y las personas con sensibilidad no reaccionan todas igual.",
          "Busca la aleación o una declaración clara del fabricante en vez de decidir solo por el nombre comercial. Si no se identifica el material de poste y cierre, hay menos información para comparar la pieza con criterio.",
        ],
      },
      {
        title: "Pendientes sin níquel",
        paragraphs: [
          "El níquel es relevante porque está presente en muchas joyas y accesorios y puede relacionarse con dermatitis de contacto en personas sensibilizadas. Una mención como “nickel free” o “sin níquel” puede ser útil, pero conviene comprobar a qué componentes se aplica y qué información ofrece la marca.",
          "No confundas “sin níquel” con una garantía universal. La tolerancia individual, otros metales de la aleación y los recubrimientos siguen siendo factores a considerar.",
        ],
      },
      {
        title: "Pendientes de oro para orejas sensibles",
        paragraphs: [
          "El oro no es una única composición: 14k y 18k incluyen proporciones distintas de oro y otros metales. El color también depende de la aleación; el oro blanco puede llevar un baño de rodio y no debe evaluarse igual que el oro amarillo o rosa.",
          {
            parts: [
              "Antes de comprar, revisa quilataje, aleación y si hay recubrimiento. Puedes ampliar la comparación en las guías sobre ",
              { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" },
              " y ",
              { href: "/guias/oro-blanco", label: "oro blanco" },
              ".",
            ],
          },
        ],
      },
      {
        title: "¿La plata 925 es hipoalergénica?",
        paragraphs: [
          "La plata 925 contiene un 92,5 % de plata y otros metales en el porcentaje restante. Por eso no es correcto asumir que toda pieza de plata de ley tendrá el mismo comportamiento para una persona sensible.",
          {
            parts: [
              "Revisa la aleación, el baño y el estado del acabado, especialmente en poste y cierre. Consulta nuestra guía sobre ",
              { href: "/guias/plata-925", label: "plata 925" },
              " para entender su composición y marcados.",
            ],
          },
        ],
      },
      {
        title: "Cuidado con pendientes bañados o chapados",
        paragraphs: [
          "Un baño o chapado puede cambiar el aspecto de la pieza, pero puede desgastarse con el uso. Cuando el recubrimiento se deteriora, el metal base puede quedar expuesto; para una persona sensible, ese dato puede ser relevante.",
          "No todos los baños son problemáticos. Comprueba el metal base, el tipo de recubrimiento, las instrucciones de cuidado y si el fabricante informa de la composición del poste.",
        ],
      },
      {
        title: "Qué comprobar antes de comprar pendientes hipoalergénicos",
        paragraphs: [
          "Una ficha útil permite comparar la pieza más allá de la palabra “hipoalergénico”. Prioriza información concreta y condiciones de devolución claras, especialmente si compras para uso diario.",
        ],
        bullets: [
          "Material exacto de la pieza, del poste y de la tuerca o cierre.",
          "Composición de la aleación y presencia de níquel cuando se indique.",
          "Tipo de recubrimiento, metal base y estado esperado del acabado.",
          "Cierre, peso, tamaño y comodidad para el uso previsto.",
          "Información del fabricante, cuidados y política de devolución.",
        ],
      },
      {
        title: "El poste y el cierre también importan",
        paragraphs: [
          "La parte decorativa puede tener una composición distinta de la que toca la oreja. Revisa el poste, la tuerca, el cierre de presión, la rosca o el gancho: son las piezas que mantienen contacto directo y pueden cambiar la experiencia de uso.",
          {
            parts: [
              "Para comparar comodidad y seguridad entre formatos, consulta la guía de ",
              { href: "/guias/tipos-cierre-pendientes", label: "tipos de cierre de pendientes" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Pendientes hipoalergénicos para uso diario",
        paragraphs: [
          "Para llevar a diario suelen resultar prácticos los pendientes ligeros, de tamaño contenido y con un cierre cómodo. Además del material, valora que sean fáciles de limpiar, que el cierre no apriete y que resistan bien la rutina real de quien los llevará.",
          "Los botones y los aros finos son formatos habituales, pero la elección depende del estilo, del descanso, de gafas o auriculares y de la preferencia personal. La mejor opción no es necesariamente la más llamativa ni la más cara.",
        ],
      },
      {
        title: "Cómo cuidar pendientes para orejas sensibles",
        paragraphs: [
          "Límpialos con suavidad siguiendo las indicaciones del fabricante, sécalos antes de guardarlos y evita productos abrasivos o químicos agresivos. Revisa de forma periódica el desgaste de baños, cierres y postes.",
          {
            parts: [
              "Para el cuidado general de metales y acabados, consulta ",
              { href: "/guias/como-cuidar-joyas", label: "cómo cuidar joyas" },
              ".",
            ],
          },
        ],
      },
      {
        title: "Qué evitar si tienes orejas sensibles",
        paragraphs: [
          "Evita decidir solo por el color del metal o por una descripción sin composición. La bisutería con material desconocido, los recubrimientos muy deteriorados, las piezas con corrosión o suciedad y los productos agresivos dificultan una compra informada.",
          "Si aparecen molestias persistentes, inflamación u otros síntomas al usar pendientes, esta guía no sustituye una valoración profesional. Suspende el uso de la pieza y consulta a un profesional sanitario para orientación individual.",
        ],
      },
    ],
    related: [
      { href: "/guias/como-elegir-pendientes", label: "Cómo elegir pendientes" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
      { href: "/guias/plata-925", label: "Plata 925" },
      { href: "/guias/oro-blanco", label: "Oro blanco" },
    ],
    advisorCta: {
      title: "Encuentra unos pendientes que encajen contigo",
      description: "Indica el material que buscas, tu estilo, el uso diario y tu presupuesto para comparar opciones con más criterio.",
    },
  },
  {
    slug: "pendientes-graduacion",
    categorySlug: "pendientes",
    eyebrow: "Guías",
    title: "Pendientes para graduación: cómo elegirlos según tu vestido y estilo",
    description: "Guía para elegir pendientes para graduación según vestido, escote, peinado, estilo, horario y comodidad.",
    intro: "Para elegir pendientes para una graduación, empieza por el vestido, el escote y el peinado. Después ajusta el tamaño, el brillo y el metal al estilo del conjunto y al tiempo que vas a llevarlos. No hay un único modelo correcto: la mejor elección acompaña el look sin restarle protagonismo.",
    sections: [
      {
        title: "Qué pendientes elegir para una graduación",
        paragraphs: ["Como regla práctica, deja que una parte del look lleve el foco. Si el vestido tiene volumen, lentejuelas o un estampado marcado, unos pendientes más contenidos suelen equilibrar. Con un vestido liso o minimalista puedes darles algo más de presencia.", "Prueba los pendientes con el vestido y el peinado previstos, no de forma aislada. Así resulta más fácil valorar proporción, movimiento y comodidad antes del evento."],
        bullets: ["Vestido sencillo: puedes optar por un pendiente largo, una piedra o un diseño con más presencia.", "Vestido elaborado o estampado: suele funcionar mejor un diseño pequeño, limpio o de brillo controlado.", "Escote protagonista: evita sumar demasiadas piezas en la zona del cuello.", "Evento largo: prioriza un peso y un cierre que puedas llevar con comodidad."],
      },
      {
        title: "Pendientes para graduación según el vestido",
        paragraphs: ["Un vestido recto y liso admite desde unos aros pulidos hasta pendientes largos si el resto del conjunto es sobrio. Con volantes, bordados, brillo o estampado, una pieza más simple evita que el resultado se vea recargado.", "También importa la silueta: un vestido largo y fluido suele admitir pendientes con caída, mientras que en un conjunto corto, un traje o un dos piezas pueden funcionar bien botones, aros medianos o diseños geométricos. Elige por equilibrio, no por una regla rígida."],
      },
      {
        title: "Qué pendientes llevar según el escote",
        paragraphs: [{ parts: ["El escote marca cuánto espacio queda alrededor del rostro y el cuello. Con palabra de honor, barco o cuadrado puedes valorar pendientes más visibles; con cuello alto o detalles cerca de la cara, suele ayudar reducir el volumen. Si también vas a llevar collar, consulta ", { href: "/guias/collares-segun-escote", label: "qué collar elegir según el escote" }, " para decidir el conjunto sin duplicar protagonismos."] }],
      },
      {
        title: "Pendientes para graduación según el peinado",
        paragraphs: ["El peinado cambia la visibilidad de los pendientes y la sensación de proporción. Tenlo en cuenta antes de elegir un tamaño o un acabado."],
        subsections: [
          { title: "Pelo recogido", paragraphs: ["Un recogido deja el rostro y el cuello más despejados, por lo que admite pendientes largos, con movimiento o con una piedra visible. Si el vestido ya tiene detalles fuertes, un diseño fino puede ser suficiente."] },
          { title: "Pelo suelto", paragraphs: ["Con el pelo suelto, los pendientes pequeños, los aros medianos o los diseños con un poco de brillo suelen seguir viéndose sin engancharse tanto. Prueba el movimiento real del cabello antes de decidirte."] },
          { title: "Semirrecogido", paragraphs: ["El semirrecogido permite enseñar parte de los pendientes sin dejar el conjunto completamente despejado. Los diseños de tamaño medio suelen aportar presencia manteniendo un acabado equilibrado."] },
        ],
      },
      { title: "¿Cuándo elegir pendientes largos para una graduación?", paragraphs: ["Los pendientes largos encajan cuando quieres llevar el foco hacia el rostro y el cuello, especialmente con vestidos lisos, recogidos o escotes despejados. Revisa su peso y que no rocen hombros, cuello o el tejido al moverte."] },
      { title: "¿Cuándo elegir pendientes pequeños o discretos?", paragraphs: ["Los botones, aros pequeños y piezas discretas son una buena opción si el vestido, el peinado o el maquillaje ya tienen mucha presencia. También resultan prácticos para quien no suele llevar pendientes grandes o busca olvidarse de ellos durante la celebración."] },
      { title: "¿Pendientes dorados o plateados para una graduación?", paragraphs: ["No existe una combinación obligatoria. Los dorados pueden acompañar detalles cálidos o un look más clásico; los plateados, el acero y los acabados blancos suelen encajar con tonos fríos o un estilo más limpio. Mira los zapatos, el bolso y las demás joyas para mantener una intención coherente, sin necesidad de igualarlo todo al milímetro."] },
      {
        title: "Cómo combinar los pendientes con el color del vestido",
        paragraphs: [{ parts: ["Con colores intensos, elige si quieres que el pendiente contraste o acompañe. Un acabado neutro puede dar descanso a un vestido llamativo; una piedra de color puede sumar carácter si el conjunto es sencillo. Puedes ver ideas específicas para un ", { href: "/guias/pendientes-vestido-rojo-boda", label: "vestido rojo" }, " o un ", { href: "/guias/pendientes-vestido-azul-marino", label: "vestido azul marino" }, "."] }],
      },
      { title: "Pendientes con collar o sin collar", paragraphs: ["No es necesario llevar collar y pendientes a la vez. Si eliges pendientes largos o brillantes, dejar el cuello libre suele crear un resultado más claro. Si el pendiente es pequeño, un collar delicado puede completar el look siempre que el escote y el vestido dejen espacio."] },
      {
        title: "Ideas de pendientes según tu estilo",
        paragraphs: ["El estilo personal ayuda a acotar la elección y a no comprar un modelo que solo usarías una vez."],
        subsections: [
          { title: "Elegante o clásico", paragraphs: ["Perlas, piedras claras, botones pulidos y diseños de líneas limpias suelen ser opciones versátiles."] },
          { title: "Minimalista", paragraphs: ["Aros finos, formas geométricas pequeñas y acabados lisos aportan presencia sin recargar el conjunto."] },
          { title: "Romántico o moderno", paragraphs: ["Las formas orgánicas, flores sutiles o piezas asimétricas pueden funcionar si encajan con el vestido y no compiten con sus detalles."] },
        ],
      },
      { title: "¿Cambian los pendientes si la graduación es de día o de noche?", paragraphs: ["En una graduación de día suelen resultar fáciles de llevar los acabados pulidos, las piedras de brillo moderado y los tamaños contenidos. Por la noche puedes aumentar algo el brillo o la caída, siempre que el vestido y el lugar acompañen. La formalidad del evento importa más que el reloj por sí solo."] },
      { title: "No olvides la comodidad", paragraphs: ["Vas a sentarte, moverte, abrazar, hacer fotos y quizá llevar los pendientes muchas horas. Comprueba el peso, el cierre, el roce con el pelo y la sensibilidad de tus orejas. Un diseño cómodo suele ser una decisión más acertada que uno llamativo que quieras quitarte a mitad de la celebración."] },
      { title: "Errores al elegir pendientes para una graduación", paragraphs: ["Elegirlos sin probarlos con el vestido, sumar collar, pendientes y otros accesorios protagonistas, ignorar el peinado o priorizar un tamaño incómodo son errores frecuentes. Antes de decidir, mira el conjunto en un espejo a cierta distancia: te ayudará a ver si hay un foco claro y si te reconoces en el resultado."] },
      {
        title: "Tabla rápida: pendientes según el look de graduación",
        paragraphs: ["Úsala como punto de partida y ajusta la decisión al vestido, al peinado y a tu comodidad."],
        table: {
          columns: ["Situación", "Tipo de pendiente que suele funcionar"],
          rows: [
            ["Vestido liso y recogido", "Pendiente largo o con una piedra visible, si resulta cómodo"],
            ["Vestido estampado o con mucho detalle", "Botón, aro fino o diseño pequeño de brillo controlado"],
            ["Escote despejado sin collar", "Aro mediano, pendiente con caída o pieza algo más protagonista"],
            ["Pelo suelto", "Aro mediano o pendiente visible que no se enganche con facilidad"],
            ["Look minimalista", "Formas geométricas, acabados lisos o perlas pequeñas"],
          ],
        },
      },
    ],
    related: [
      { href: "/guias/collares-segun-escote", label: "Qué collar elegir según el escote" },
      { href: "/guias/pendientes-vestido-rojo-boda", label: "Pendientes para vestido rojo" },
      { href: "/guias/pendientes-vestido-azul-marino", label: "Pendientes para vestido azul marino" },
      { href: "/guias/tipos-de-pendientes", label: "Tipos de pendientes" },
    ],
    advisorCta: {
      title: "Encuentra los pendientes ideales para tu graduación",
      description: "Describe tu vestido, escote, peinado, estilo y nivel de formalidad para comparar opciones que encajen con el evento.",
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
    seoTitle: "Guías sobre anillos: tallas, tipos y consejos | Joyas.ai",
    seoDescription:
      "Guías sobre anillos: talla, materiales, estilos y consejos para elegir una pieza adecuada sin tecnicismos innecesarios.",
    guideSlugs: [
      "como-saber-talla-anillo",
      "tipos-de-anillos",
      "en-que-mano-va-anillo-compromiso",
      "anillo-de-promesa",
      "en-que-mano-anillo-casado",
    ],
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
    seoTitle: "Guías sobre collares y colgantes | Joyas.ai",
    seoDescription:
      "Consejos para elegir collares y colgantes según longitud, escote, estilo, material y ocasión.",
    guideSlugs: ["como-elegir-collar", "collares-segun-escote", "tipos-de-cadenas", "tipos-de-collares", "collares-invitada-boda"],
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
    seoTitle: "Guías sobre pendientes: tipos, cierres y consejos | Joyas.ai",
    seoDescription:
      "Guías para elegir pendientes según tamaño, cierre, estilo, material, rostro y ocasión.",
    guideSlugs: [
      "como-elegir-pendientes",
      "pendientes-graduacion",
      "pendientes-hipoalergenicos",
      "tipos-cierre-pendientes",
      "tipos-de-pendientes",
      "pendientes-boda-invitada",
      "pendientes-madrina-boda",
      "pendientes-madrina-mantilla",
      "pendientes-vestido-rojo-boda",
      "pendientes-vestido-azul-marino",
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
    seoTitle: "Guías sobre pulseras: tipos, materiales y consejos | Joyas.ai",
    seoDescription:
      "Guías sobre tipos de pulseras, tallas, materiales, piedras y consejos para elegir una pieza cómoda y adecuada para cada ocasión.",
    guideSlugs: ["pulsera-tennis", "pulseras-con-coordenadas", "pulseras-nombres-hijos", "pulseras-de-novia"],
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
    seoTitle: "Guías sobre oro, plata y metales | Joyas.ai",
    seoDescription:
      "Guías sobre oro 14k, 18k y 24k, plata 925, platino, pureza, marcas y materiales de joyería.",
    guideSlugs: [
      "oro-14k-18k-24k",
      "como-saber-si-una-joya-es-de-oro",
      "como-saber-si-es-plata",
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
    seoTitle: "Guías sobre piedras preciosas y gemas | Joyas.ai",
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
    seoTitle: "Guías sobre perlas: tipos, autenticidad y valor | Joyas.ai",
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
    seoTitle: "Guías para cuidar joyas: limpieza y conservación | Joyas.ai",
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
    seoTitle: "Guías para regalar joyas: ideas y consejos | Joyas.ai",
    seoDescription:
      "Consejos para regalar joyas según persona, ocasión, presupuesto, estilo y significado.",
    guideSlugs: ["como-elegir-una-joya-para-regalar", "joyas-para-regalar-mujer", "joyas-para-regalar-novia", "pulseras-de-la-amistad", "pulseras-para-mama", "joya-regalo-madre-primeriza", "joyas-para-parejas", "pulseras-para-regalar"],
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
