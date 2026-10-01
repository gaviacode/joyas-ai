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
    description: "Guía de pendientes para madrina de boda sin mantilla: cómo elegirlos según vestido, peinado, tocado, horario, comodidad y equilibrio de accesorios.",
    intro: "Esta guía se centra en pendientes para madrina de boda sin mantilla, con tocado, pamela o sin complemento de cabeza. Empieza por el conjunto: vestido, escote, peinado y el tiempo que vas a llevarlos. Si vas a llevar mantilla y peineta, consulta la guía específica para ese caso.",
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
  {
    slug: "esclavas-bebes-oro",
    categorySlug: "pulseras",
    eyebrow: "Guías",
    title: "Esclavas para bebés de oro: cómo elegir la adecuada",
    description: "Descubre cómo elegir esclavas para bebés de oro: tamaño, quilates, cierre, grabado y consejos para acertar con una pulsera para bebé.",
    intro: "Una esclava para bebé es una pulsera, normalmente con una placa central que puede grabarse. Al elegirla conviene mirar la medida, el cierre, el peso y la información del metal antes que decidir solo por el dibujo o el grabado.",
    sections: [
      { title: "Qué es una esclava para bebé", paragraphs: ["La esclava infantil suele combinar una cadena o malla con una placa lisa donde pueden aparecer un nombre, unas iniciales o una fecha. Es un formato habitual para nacimiento, bautizo o primer cumpleaños, aunque su significado depende de cada familia.", "Hay modelos rígidos, de cadena y ajustables. La construcción, el acabado y el sistema de ajuste cambian de una pieza a otra, por lo que conviene revisar la ficha concreta."] },
      { title: "Por qué se regalan esclavas de oro a un bebé", paragraphs: ["Puede ser un detalle vinculado a una fecha o un recuerdo familiar. Si se compra para regalar, intenta confirmar si la familia prefiere una pieza clásica, un diseño infantil o una joya que pueda seguir utilizando cuando crezca.", { parts: ["Para valorar el regalo dentro del conjunto de joyas posibles, consulta ", { href: "/guias/como-elegir-una-joya-para-regalar", label: "cómo elegir una joya para regalar" }, "."] }] },
      { title: "Oro de 18K, 9K y otras opciones", paragraphs: ["El quilataje indica la proporción de oro de la aleación, no una calidad universal para todos los casos. El oro de 18K contiene más oro que el de 9K; la elección también depende del presupuesto, del uso previsto, del diseño y de la información que ofrezca el vendedor.", { parts: ["Revisa el contraste y la descripción completa de la pieza. Puedes comparar composiciones en la guía de ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, "."] }] },
      { title: "Cómo elegir la medida de una esclava para bebé", paragraphs: ["No existe una longitud válida para todos los bebés: el contorno de la muñeca, el diseño y el margen de ajuste importan. Una pulsera no debe quedar tan apretada que incomode ni tan suelta que se mueva sin control.", "Comprueba la longitud interior indicada por la joyería, si admite regulación y cómo recomienda medir. Para un regalo sorpresa, una opción ajustable puede dar más margen, pero no sustituye comprobar el ajuste real con un adulto responsable."] },
      { title: "El cierre y los modelos ajustables", paragraphs: ["El cierre merece la misma atención que la placa. Revisa cómo abre, si queda bien acabado, si la cadena tiene puntos de ajuste y si la pieza puede engancharse con facilidad en el uso previsto. Una esclava ajustable puede ser práctica durante el crecimiento, siempre que el mecanismo se revise y se use de forma adecuada."] },
      { title: "Grabado: nombre, iniciales y fecha", paragraphs: ["El nombre del bebé es una elección directa; las iniciales o una fecha ocupan menos espacio. Antes de encargar un grabado, confirma ortografía, acentos, orden, límite de caracteres y política de devolución, porque una personalización suele dificultar cambios posteriores.", { parts: ["Si buscas una pieza con un dato personal, también puede inspirarte la guía sobre ", { href: "/guias/pulseras-con-coordenadas", label: "pulseras con coordenadas" }, "."] }] },
      { title: "Oro amarillo, blanco o rosa", paragraphs: ["El oro amarillo mantiene un aspecto tradicional; el blanco y el rosa ofrecen alternativas de color según la aleación y el acabado. No hay un tono obligatorio para una pulsera de bebé: compara el aspecto, la composición declarada y el resto de joyas que la familia pueda querer conservar junto a ella.", { parts: ["Puedes ampliar la diferencia de acabados en las guías sobre ", { href: "/guias/oro-blanco", label: "oro blanco" }, " y ", { href: "/guias/oro-rosa", label: "oro rosa" }, "."] }] },
      { title: "Esclava para bautizo: cómo elegirla", paragraphs: ["Para un bautizo suele funcionar un diseño legible, de peso contenido y con una placa que deje espacio para el grabado si se desea. La decisión puede ser más sencilla si se prioriza que la familia la guarde como recuerdo o que pueda utilizarse en ocasiones puntuales cuando el bebé crezca."] },
      { title: "Diseños clásicos o infantiles", paragraphs: ["Los diseños clásicos suelen ser más fáciles de conservar con el paso del tiempo. Los motivos infantiles pueden tener sentido si reflejan el gusto de la familia, pero revisa que no añadan volumen, aristas o elementos que compliquen el uso previsto."] },
      { title: "Qué determina el precio de una esclava de oro", paragraphs: ["El precio puede variar por quilataje, cantidad de metal, longitud, grosor, tipo de cierre, fabricación, grabado y acabado. Compara piezas de características parecidas y revisa siempre si el peso se informa, qué incluye el precio y las condiciones de personalización."] },
      { title: "Uso prudente de una joya en bebés", paragraphs: ["Una joya infantil debe utilizarse con supervisión adulta. Conviene retirarla cuando pueda existir riesgo de enganche, durante el descanso o en actividades en las que llevar una pulsera no sea adecuado. Revisa de forma periódica el cierre, el ajuste y cualquier signo de desgaste."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué quilates son mejores para una esclava de bebé?", paragraphs: ["No hay una respuesta única. Compara el quilataje, el diseño, el presupuesto y la información de la pieza; elige una opción cuyo cierre, tamaño y acabado resulten apropiados para el uso previsto."] },
        { title: "¿Se puede grabar el nombre del bebé?", paragraphs: ["Sí, si la placa y el servicio de grabado lo permiten. Confirma antes los caracteres, acentos y condiciones de devolución."] },
        { title: "¿Qué medida debe tener una esclava para bebé?", paragraphs: ["Debe basarse en la medida indicada por la joyería y en la muñeca concreta del bebé. Un modelo ajustable puede aportar margen, pero hay que comprobar su ajuste real."] },
        { title: "¿Es buena idea una esclava ajustable?", paragraphs: ["Puede serlo si el mecanismo es adecuado y se revisa el ajuste. No sustituye la supervisión adulta ni una comprobación periódica del cierre."] },
        { title: "¿Qué se suele grabar en una esclava de bautizo?", paragraphs: ["Nombre, iniciales o una fecha son opciones habituales. La elección depende del espacio disponible y del significado que quiera darle la familia."] },
      ] },
    ],
    related: [
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "Cómo saber si una joya es de oro" },
      { href: "/guias/pulseras-con-coordenadas", label: "Pulseras con coordenadas" },
      { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" },
    ],
    advisorCta: { title: "Encuentra una pulsera de oro para bebé", description: "Indica la ocasión, si quieres grabado, el tipo de ajuste y el presupuesto para comparar ideas con más criterio." },
  },
  {
    slug: "cadenas-oro-mujer",
    categorySlug: "collares",
    eyebrow: "Guías",
    title: "Cadenas de oro para mujer: tipos, medidas y cómo elegir",
    description: "Guía para elegir cadenas de oro para mujer: tipos de eslabones, largos, grosores, quilates y consejos para encontrar la cadena adecuada.",
    intro: "Al elegir una cadena de oro para mujer, la longitud, el grosor y el tipo de eslabón suelen importar tanto como el color. Piensa primero si se llevará sola o con colgante, y después compara construcción, quilataje, cierre y peso cuando esa información esté disponible.",
    sections: [
      { title: "Cómo elegir una cadena de oro para mujer", paragraphs: ["Una cadena fina puede acompañar un colgante ligero o un look discreto; una más gruesa puede funcionar como pieza protagonista. No hay una opción mejor para todas las personas: el cuello, el estilo habitual, el uso y el presupuesto cambian la decisión.", "Antes de comprar, define si buscas una cadena de oro para llevar a diario, para una ocasión concreta o para regalar. Eso ayuda a decidir cuánto protagonismo, longitud y resistencia práctica necesitas."] },
      { title: "Medidas de cadenas: 40, 45, 50, 60 cm y más", paragraphs: ["Como orientación, una cadena de 40 cm suele quedar cerca de la base del cuello; 45 y 50 cm aportan algo más de caída; 60 cm o más pueden quedar sobre el pecho. La posición exacta depende de la altura, el contorno del cuello, el grosor de la cadena y la prenda.", "Si va a llevar un colgante, pruébala o compárala con una cadena que ya use. La longitud debe dar espacio al conjunto sin que el colgante quede oculto o choque con el escote."] },
      { title: "Tipos de eslabón en cadenas de oro", paragraphs: ["El eslabón cambia el movimiento, el brillo y la presencia de la cadena. No todos los nombres describen la misma construcción en cada fabricante, por lo que conviene mirar fotografías, grosor y ficha de producto además del nombre comercial.", { parts: ["La guía de ", { href: "/guias/tipos-de-cadenas", label: "tipos de cadenas" }, " explica con más detalle formatos habituales y criterios para compararlos."] }], subsections: [
        { title: "Forzada y veneciana", paragraphs: ["La forzada suele tener un aspecto clásico y flexible; la veneciana muestra eslabones más geométricos y un acabado limpio. Ambas pueden llevarse solas o con colgante según su grosor y construcción."] },
        { title: "Singapur, barbada, rolo y cordón", paragraphs: ["La Singapur suele aportar torsión y brillo; la barbada tiene una presencia más marcada; la rolo usa eslabones redondeados; y el cordón ofrece textura. Elige por el efecto visual que buscas, no solo por la tendencia del momento."] },
      ] },
      { title: "Cadena fina o gruesa", paragraphs: ["Una cadena fina puede resultar versátil y ligera, pero no todos los modelos admiten el mismo uso o peso de colgante. Una cadena gruesa gana presencia y puede cambiar por completo el look. Revisa el grosor, las uniones y el cierre, especialmente si quieres usarla todos los días."] },
      { title: "Cadena sola o cadena para colgante", paragraphs: ["Para un colgante, comprueba el tamaño de la anilla, el peso aproximado y la forma en que se mueve sobre la cadena. Una anilla demasiado pequeña puede no pasar por el cierre; una cadena muy fina o un colgante desproporcionado pueden no dar el resultado esperado.", { parts: ["Si buscas un conjunto para el cuello, también puede ayudarte la guía de ", { href: "/guias/como-elegir-collar", label: "cómo elegir un collar o colgante" }, "."] }] },
      { title: "Oro de 18K, 14K y 9K", paragraphs: ["Los quilates expresan la proporción de oro en la aleación. El oro de 18K, 14K y 9K puede diferir en color, presupuesto y comportamiento según el diseño; no hay una elección universalmente mejor sin considerar el uso y la pieza concreta.", { parts: ["Consulta las diferencias de composición en ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, "."] }] },
      { title: "Oro amarillo, blanco y rosa", paragraphs: ["El amarillo ofrece un resultado tradicional; el blanco y el rosa permiten matices distintos. Considera las joyas que ya lleva, el tono que prefiere y el acabado declarado por el vendedor. Mezclar metales también puede ser una elección deliberada si se mantiene una proporción clara."] },
      { title: "Cómo combinar varias cadenas", paragraphs: ["El layering consiste en usar dos o más cadenas con longitudes diferentes. Una fórmula sencilla es elegir una cadena corta y fina, otra ligeramente más larga y dejar una sola pieza como foco. Cambia longitudes o texturas antes de sumar muchos colgantes para que el conjunto se lea con claridad.", { parts: ["Si quieres mezclar tonos, consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, "."] }] },
      { title: "Qué revisar antes de comprar", paragraphs: ["Comprueba longitud, grosor, quilataje, tipo de cierre, peso si se informa, acabado, compatibilidad con colgante y condiciones de devolución. En una cadena para regalar, también ayuda observar las longitudes y metales que la persona ya utiliza."] },
      { title: "Qué influye en el precio", paragraphs: ["El precio depende del metal y su cantidad, el quilataje, el peso, el grosor, el tipo de eslabón, la fabricación y el cierre. Compara fichas equivalentes y evita asumir que dos cadenas con la misma longitud tienen el mismo contenido de oro o la misma construcción."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué medida de cadena de oro es más habitual para mujer?", paragraphs: ["45 o 50 cm son longitudes frecuentes, pero la caída exacta depende de la persona y de la prenda. La mejor longitud es la que encaja con el uso y el colgante, si lo hay."] },
        { title: "¿Qué cadena es mejor para poner un colgante?", paragraphs: ["La que sea compatible con la anilla y el peso del colgante, con un grosor y cierre adecuados para el uso previsto."] },
        { title: "¿Qué oro es mejor para una cadena?", paragraphs: ["Depende del quilataje, presupuesto, color y uso. Compara la aleación y la construcción antes de decidir."] },
        { title: "¿Se pueden llevar varias cadenas de oro a la vez?", paragraphs: ["Sí. Combinar longitudes y una pieza protagonista suele ayudar a que el conjunto no se vea recargado."] },
        { title: "¿Cómo elegir el grosor de una cadena?", paragraphs: ["Relaciona el grosor con el estilo, el uso y el colgante. Revisa además cierre, peso y construcción, no solo la apariencia."] },
      ] },
    ],
    related: [
      { href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas" },
      { href: "/guias/como-elegir-collar", label: "Cómo elegir un collar o colgante" },
      { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" },
      { href: "/guias/combinar-joyas-oro-plata", label: "Cómo combinar joyas de oro y plata" },
    ],
    advisorCta: { title: "Encuentra una cadena de oro que encaje contigo", description: "Cuenta si la quieres sola o con colgante, la longitud, el estilo y el presupuesto para comparar opciones con más criterio." },
  },
  {
    slug: "combinar-joyas-oro-plata",
    categorySlug: "metales",
    eyebrow: "Guías",
    title: "Cómo combinar joyas de oro y plata",
    description: "Aprende cómo combinar joyas de oro y plata: proporciones, capas, relojes, anillos y trucos para mezclar ambos metales con equilibrio.",
    intro: "Sí, puedes combinar joyas de oro y plata. La clave no es igualar todos los metales, sino decidir qué pieza tiene más presencia y repetir algún color, textura o proporción para que el conjunto se vea intencional.",
    sections: [
      { title: "¿Se pueden combinar joyas de oro y plata?", paragraphs: ["Sí. Usar un único tono de metal ya no es una obligación de estilo. Puedes mezclar dorado y plateado si el conjunto mantiene un foco claro y si te resulta coherente con tu ropa y tus joyas habituales.", "No existe una fórmula única: algunas personas prefieren que domine un metal y otras usan una mezcla equilibrada. Empieza con pocas piezas y ajusta según el resultado que busques."] },
      { title: "Empieza con un metal dominante", paragraphs: ["Una forma sencilla de combinar oro y plata es elegir uno como base y añadir el otro como contraste. Por ejemplo, dos piezas doradas y una plateada, o un reloj bicolor que una ambos tonos. Esto evita que la mezcla parezca accidental cuando estás empezando."] },
      { title: "Usa una joya bicolor como puente", paragraphs: ["Una pieza que incluya detalles dorados y plateados puede conectar el resto del conjunto. Puede ser un reloj, un anillo, una pulsera o un colgante; no hace falta que todas las joyas sean bicolor para crear continuidad."] },
      { title: "Collares de oro y plata", paragraphs: ["Para llevar collares de oro y plata juntos, combina longitudes distintas: uno corto y otro algo más largo suelen separarse mejor que dos cadenas idénticas. También puedes variar la textura y dejar un solo colgante como protagonista.", { parts: ["Consulta los formatos en ", { href: "/guias/tipos-de-cadenas", label: "tipos de cadenas" }, " y elige la longitud según el escote con la guía de ", { href: "/guias/collares-segun-escote", label: "collares según escote" }, "."] }] },
      { title: "Anillos, pulseras y reloj", paragraphs: ["En las manos, alternar anillos finos dorados y plateados puede dar un resultado ligero. En las muñecas, prueba una pulsera de cada tono o usa un reloj como pieza de transición. Si añades varias piezas, deja una zona más despejada para que el conjunto respire."] },
      { title: "Pendientes de un metal y collar de otro", paragraphs: ["Los pendientes no tienen que ser del mismo color que el collar. Puede funcionar si repites el tono de los pendientes en un anillo, una pulsera o un detalle del reloj. Cuando el collar es muy llamativo, unos pendientes más discretos ayudan a mantener el equilibrio."] },
      { title: "Oro amarillo, oro blanco, oro rosa y plata", paragraphs: ["El oro blanco y la plata pueden verse cercanos a simple vista, aunque no son el mismo material. El oro rosa puede aportar un contraste cálido junto a plata; el oro amarillo crea una diferencia más clara. Mira el acabado real de cada pieza, porque las aleaciones y los baños pueden cambiar el tono.", { parts: ["Puedes ampliar la comparación en las guías de ", { href: "/guias/oro-blanco", label: "oro blanco" }, ", ", { href: "/guias/oro-rosa", label: "oro rosa" }, " y ", { href: "/guias/plata-925", label: "plata 925" }, "."] }] },
      { title: "Texturas, ropa y pieza protagonista", paragraphs: ["Una textura lisa puede equilibrar una cadena más trabajada. Los tonos neutros de ropa suelen dejar más espacio a la mezcla; con estampados o muchos detalles, reduce el número de joyas protagonistas. Decide qué quieres que se vea primero —un collar, unos anillos o un reloj— y construye el resto alrededor."] },
      { title: "Errores habituales al mezclar metales", paragraphs: ["No hay combinaciones prohibidas, pero puede resultar confuso sumar demasiadas piezas grandes, usar varias cadenas de la misma longitud o mezclar muchos acabados sin un elemento de unión. Si dudas, retira una pieza antes de cambiar todo el conjunto."] },
      { title: "Una fórmula sencilla para empezar", paragraphs: ["Prueba una cadena dorada fina, una pulsera o reloj plateado y un anillo que repita uno de los dos tonos. Después ajusta longitudes y texturas. Esta fórmula es solo un punto de partida: si prefieres más contraste o una mezcla más sutil, puedes adaptarla a tu estilo."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Se pueden combinar joyas de oro y plata?", paragraphs: ["Sí. Elegir una proporción y una pieza de unión puede ayudar a que el conjunto se vea coherente."] },
        { title: "¿Está de moda mezclar oro y plata?", paragraphs: ["Es una combinación presente en estilos actuales y también una elección personal. No depende de seguir una regla única."] },
        { title: "¿Puedo usar una cadena de oro y otra de plata juntas?", paragraphs: ["Sí. Diferenciar las longitudes y dejar una sola pieza como foco suele facilitar el resultado."] },
        { title: "¿Los pendientes deben ser del mismo color que el collar?", paragraphs: ["No necesariamente. Repetir uno de los tonos en otra joya puede dar continuidad sin igualarlos por completo."] },
        { title: "¿Se puede combinar oro rosa con plata?", paragraphs: ["Sí. El contraste cálido del oro rosa puede acompañar a la plata si el conjunto mantiene una proporción que te resulte equilibrada."] },
        { title: "¿Hay que llevar la misma cantidad de oro y plata?", paragraphs: ["No. Puedes elegir un metal dominante o repartirlos de forma más equilibrada según tu estilo."] },
      ] },
    ],
    related: [
      { href: "/guias/oro-blanco", label: "Oro blanco" },
      { href: "/guias/oro-rosa", label: "Oro rosa" },
      { href: "/guias/plata-925", label: "Plata 925" },
      { href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas" },
    ],
    advisorCta: { title: "Combina tus joyas con más intención", description: "Describe las joyas, metales y estilo que ya usas para recibir ideas que respeten tus preferencias." },
  },
  {
    slug: "collar-con-inicial", categorySlug: "collares", eyebrow: "Guías", title: "Collar con inicial: cómo elegir el adecuado", description: "Descubre cómo elegir un collar con inicial según material, tamaño, cadena y estilo, y qué tener en cuenta antes de comprarlo o regalarlo.", intro: "Un collar con inicial convierte una letra en un detalle personal. Para elegirlo, decide qué representa la inicial, cuánto protagonismo tendrá y cómo encajará la cadena con el uso diario.",
    sections: [
      { title: "Qué es un collar con inicial", paragraphs: ["Es un collar con una letra como colgante o integrada en la cadena. Puede representar a quien lo lleva, a una pareja, hijos u otra persona; no existe una inicial obligatoria."] },
      { title: "Una o varias iniciales", paragraphs: ["Una letra ofrece un resultado limpio; varias iniciales permiten una referencia más personal. Revisa el espacio, el peso y el movimiento de los colgantes para que sigan siendo cómodos."] },
      { title: "Tamaño, metal y cadena", paragraphs: ["Una inicial pequeña suele encajar con uso diario y layering; una grande puede ser la pieza protagonista. Oro amarillo, blanco, rosa y plata ofrecen acabados distintos. La longitud cambia cómo cae sobre el escote y depende de cada persona.", { parts: ["Compara longitudes y grosor en la guía de ", { href: "/guias/cadenas-oro-mujer", label: "cadenas de oro para mujer" }, ", y materiales en ", { href: "/guias/plata-925", label: "plata 925" }, "."] }] },
      { title: "Iniciales con piedras y varios collares", paragraphs: ["Las circonitas o piedras pueden añadir brillo; revisa engaste y cuidados. Para combinar varios collares, separa longitudes y deja una letra como foco para evitar que todas las piezas compitan."] },
      { title: "Qué revisar antes de comprar o regalar", paragraphs: ["Comprueba material, cierre, longitud, tamaño del colgante, acabado y condiciones de personalización. Como regalo, observa los tonos y largos que ya usa la persona."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué inicial se pone en un collar?", paragraphs: ["La propia o la de una persona significativa, según el sentido que quieras darle."] }, { title: "¿Qué longitud elegir?", paragraphs: ["Depende del efecto buscado y del escote; compara con cadenas que ya uses."] }, { title: "¿Oro o plata?", paragraphs: ["Depende de estilo, presupuesto y joyas habituales."] }, { title: "¿Se pueden llevar varias iniciales?", paragraphs: ["Sí, si el diseño mantiene espacio y proporción."] }, { title: "¿Es buen regalo?", paragraphs: ["Puede serlo si la personalización encaja con el estilo de quien lo recibe."] },
      ] },
    ], related: [{ href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas" }, { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" }], advisorCta: { title: "Encuentra un collar personalizado", description: "Indica inicial, metal, longitud y estilo para comparar ideas." },
  },
  {
    slug: "pulsera-con-nombre", categorySlug: "pulseras", eyebrow: "Guías", title: "Pulsera con nombre: materiales, estilos y cómo elegir", description: "Guía para elegir una pulsera con nombre: materiales, tipos de grabado, medidas, estilos y consejos para acertar con una joya personalizada.", intro: "Una pulsera con nombre puede llevar una placa grabada, letras integradas o un mensaje breve. Elige primero la referencia que quieres incluir y después el ajuste, material y formato.",
    sections: [
      { title: "Tipos de pulseras con nombre", paragraphs: ["Las placas grabadas, letras enlazadas, cadenas y esclavas son formatos habituales. Elige el que mantenga el texto legible y encaje con el uso previsto."] },
      { title: "Nombre, iniciales, fecha y tipografía", paragraphs: ["El nombre completo es directo; las iniciales ocupan menos espacio; una fecha o mensaje corto puede ser más discreto. Confirma ortografía, acentos, caracteres y condiciones de devolución antes de personalizar."] },
      { title: "Materiales, medida y ajuste", paragraphs: ["Oro, plata y acero pueden ofrecer resultados distintos. Una cadena fina suele ser discreta; una rígida o tipo esclava tiene más presencia. Mide la muñeca o compara una pulsera que quede bien; un modelo ajustable aporta margen, pero debe resultar cómodo."] },
      { title: "Para regalar", paragraphs: ["Puede encajar para pareja, madre, hijos, cumpleaños o aniversario si la referencia es significativa y la persona suele llevar pulseras. Revisa estilo, metal y talla aproximada antes de decidir.", { parts: ["Para otras referencias personales, consulta ", { href: "/guias/pulseras-con-coordenadas", label: "pulseras con coordenadas" }, "; si el detalle son varios hijos, la guía de ", { href: "/guias/pulseras-nombres-hijos", label: "pulseras con nombres de hijos" }, " resuelve ese caso concreto. Para una personalización más amplia que un nombre, consulta ", { href: "/guias/pulsera-grabada-mujer", label: "pulseras grabadas para mujer" }, "."] }] },
      { title: "Qué revisar antes de comprar", paragraphs: ["Comprueba material, longitud, cierre, texto final, tipografía, plazo y cambios. Una personalización no compensa un diseño que no vaya a usar."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué se puede grabar?", paragraphs: ["Nombres, iniciales, fechas o mensajes breves, según el espacio disponible."] }, { title: "¿Cómo elegir la medida?", paragraphs: ["Mide la muñeca y consulta el ajuste del modelo concreto."] }, { title: "¿Oro o plata?", paragraphs: ["Depende de preferencias, uso y composición declarada."] }, { title: "¿Se puede poner más de un nombre?", paragraphs: ["Sí, si el diseño conserva legibilidad."] }, { title: "¿Qué pulsera personalizada regalar?", paragraphs: ["Una que combine una referencia significativa y un formato que vaya a utilizar."] },
      ] },
    ], related: [{ href: "/guias/pulseras-con-coordenadas", label: "Pulseras con coordenadas" }, { href: "/guias/pulseras-oro-mujer", label: "Pulseras de oro para mujer" }, { href: "/guias/pulseras-plata-mujer", label: "Pulseras de plata para mujer" }], advisorCta: { title: "Encuentra una pulsera personalizada", description: "Cuenta el nombre, material, medida y ocasión para comparar ideas." },
  },
  {
    slug: "pulseras-plata-mujer", categorySlug: "pulseras", eyebrow: "Guías", title: "Pulseras de plata para mujer: tipos y cómo elegir", description: "Descubre los tipos de pulseras de plata para mujer, medidas, estilos, plata 925 y consejos para elegir una pulsera según tu estilo y ocasión.", intro: "Una pulsera de plata para mujer puede ser fina, rígida, de eslabones o con charms. Para acertar, compara tipo, medida, cierre y si buscas una pieza para diario, para combinar o para regalar.",
    sections: [
      { title: "Tipos de pulseras de plata", paragraphs: ["Cadenas y eslabones son versátiles; brazaletes y rígidas tienen más presencia; los charms permiten añadir referencias personales. Elige por comodidad, movimiento y estilo."] },
      { title: "Plata 925, medida y cierre", paragraphs: [{ parts: ["La plata 925 es una aleación habitual. El tono puede parecerse a otros metales blancos, pero composición y mantenimiento no son iguales. Consulta ", { href: "/guias/plata-925", label: "plata 925" }, " y ", { href: "/guias/como-saber-si-es-plata", label: "cómo saber si es plata" }, "."] }, "Mide la muñeca o compara una pulsera que ya uses. Revisa cierre y puntos de ajuste, especialmente en cadenas de eslabones."] },
      { title: "Fina, ancha, con reloj o combinada", paragraphs: ["Una pulsera fina puede acompañar un reloj; un brazalete o cadena ancha puede ser el foco. Puedes combinar plata con oro si mantienes una proporción clara y una pieza de unión."] },
      { title: "Uso, regalo y cuidado", paragraphs: ["Para diario, prioriza comodidad y cierre; para una ocasión puedes buscar más volumen. Como regalo, observa estilo y talla. La plata puede oscurecerse: consulta ", { parts: ["cómo ", { href: "/guias/como-limpiar-plata", label: "limpiar plata" }, " antes de aplicarle un método."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [{ title: "¿Qué significa plata 925?", paragraphs: ["Indica una aleación con 92,5 % de plata."] }, { title: "¿Cómo elegir medida?", paragraphs: ["Mide la muñeca y revisa el ajuste indicado." ] }, { title: "¿Se puede combinar con oro?", paragraphs: ["Sí, con una proporción clara." ] }, { title: "¿Cómo mantener el brillo?", paragraphs: ["Sigue cuidados adecuados al acabado." ] }, { title: "¿Qué regalar?", paragraphs: ["Una pulsera acorde al estilo y uso de quien la recibe." ] }] },
    ], related: [{ href: "/guias/plata-925", label: "Plata 925" }, { href: "/guias/como-limpiar-plata", label: "Cómo limpiar plata" }, { href: "/guias/pulseras-oro-mujer", label: "Pulseras de oro para mujer" }, { href: "/guias/combinar-joyas-oro-plata", label: "Cómo combinar oro y plata" }], advisorCta: { title: "Encuentra una pulsera de plata", description: "Indica estilo, medida, uso y presupuesto para comparar opciones." },
  },
  {
    slug: "pulseras-oro-mujer", categorySlug: "pulseras", eyebrow: "Guías", title: "Pulseras de oro para mujer: tipos y cómo elegir", description: "Guía para elegir pulseras de oro para mujer: 18K, tipos, medidas, grosores, estilos y consejos para acertar al comprar o regalar.", intro: "Las pulseras de oro para mujer pueden ser de cadena, eslabones, rígidas, finas o protagonistas. Compara ajuste, quilataje, grosor, cierre y peso cuando esté disponible.",
    sections: [
      { title: "Tipos y estilo", paragraphs: [{ parts: ["Cadenas finas acompañan con discreción; eslabones y brazaletes aportan presencia; las rígidas mantienen una forma definida y los charms permiten personalizar. Elige por uso y comodidad. Si buscas específicamente una pieza rígida o semirrígida, consulta la guía de ", { href: "/guias/brazalete-oro-mujer", label: "brazaletes de oro para mujer" }, "."] }] },
      { title: "18K, 14K, 9K y color", paragraphs: [{ parts: ["Los quilates expresan proporción de oro, no una respuesta única para todos los casos. Compara uso, presupuesto y composición en la guía de ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, "."] }, "El amarillo, blanco y rosa dan resultados diferentes; revisa el acabado real de la pieza."] },
      { title: "Medida, grosor y cierre", paragraphs: ["Mide la muñeca, confirma el margen de movimiento y revisa el cierre. El grosor y el peso, si se indican, ayudan a comparar piezas de longitud similar."] },
      { title: "Oro y plata juntos", paragraphs: [{ parts: ["Puedes combinar metales si eliges una proporción o pieza de transición. Consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, "."] }] },
      { title: "Compra o regalo", paragraphs: ["Comprueba quilataje, medida, cierre, composición, grosor, peso y devolución. Para regalar, las joyas que ya usa la persona ofrecen mejores pistas que una regla general."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [{ title: "¿Qué oro es mejor?", paragraphs: ["Depende de uso, presupuesto y composición." ] }, { title: "¿Qué medida elegir?", paragraphs: ["Mide la muñeca y consulta el modelo." ] }, { title: "¿Fina o gruesa?", paragraphs: ["La fina es discreta y la gruesa tiene más presencia." ] }, { title: "¿Varias pulseras?", paragraphs: ["Sí, alternando volumen." ] }, { title: "¿Oro y plata juntos?", paragraphs: ["Sí, con una proporción clara." ] }] },
    ], related: [{ href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" }, { href: "/guias/oro-blanco", label: "Oro blanco" }, { href: "/guias/oro-rosa", label: "Oro rosa" }, { href: "/guias/pulseras-plata-mujer", label: "Pulseras de plata para mujer" }], advisorCta: { title: "Encuentra una pulsera de oro", description: "Indica estilo, medida, uso y presupuesto para comparar ideas." },
  },
  {
    slug: "cadenas-plata-mujer", categorySlug: "collares", eyebrow: "Guías", title: "Cadenas de plata para mujer: tipos, medidas y cómo elegir", description: "Guía para elegir cadenas de plata para mujer: tipos de eslabón, largos, grosores, plata 925 y consejos para llevarlas solas o con colgante.", intro: "Una cadena de plata para mujer puede llevarse sola, con colgante o en capas. Aquí el foco está en la plata, su composición y mantenimiento, además de longitud, eslabón y grosor.",
    sections: [
      { title: "Cadena, collar y plata 925", paragraphs: ["Una cadena puede ser una joya en sí misma o base para colgante. La plata 925 es una aleación habitual; revisa contraste y ficha de producto.", { parts: ["Amplía la información en ", { href: "/guias/plata-925", label: "plata 925" }, "."] }] },
      { title: "Eslabones y longitudes", paragraphs: ["Forzada, veneciana, rolo, barbada, Singapur y cordón dan movimientos y brillos distintos. Como orientación, 40 cm queda cerca del cuello y 45, 50 o 60 cm dan más caída, pero varía según persona y prenda.", { parts: ["Consulta ", { href: "/guias/tipos-de-cadenas", label: "tipos de cadenas" }, "."] }] },
      { title: "Fina, gruesa, sola o con colgante", paragraphs: ["Una cadena fina puede acompañar un colgante ligero; una gruesa tiene presencia por sí misma. Comprueba que la anilla sea compatible y que peso, longitud y cierre estén proporcionados."] },
      { title: "Capas, oro y cuidado", paragraphs: ["Diferencia longitudes al combinar capas. Puedes mezclar plata y oro con una intención clara. Para el cuidado, consulta ", { parts: ["cómo ", { href: "/guias/como-limpiar-plata", label: "limpiar plata" }, "."] }] },
      { title: "Qué revisar antes de comprar", paragraphs: ["Mira composición, longitud, grosor, cierre, acabado, compatibilidad con colgante y devolución. Como regalo, compara con cadenas que la persona ya use."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [{ title: "¿Qué significa plata 925?", paragraphs: ["Una aleación con 92,5 % de plata." ] }, { title: "¿Qué longitud elegir?", paragraphs: ["Depende del efecto y la prenda." ] }, { title: "¿Cadena para colgante?", paragraphs: ["Debe ser compatible con anilla y peso." ] }, { title: "¿Plata y oro?", paragraphs: ["Sí, diferenciando longitudes y proporción." ] }, { title: "¿Cómo limpiarla?", paragraphs: ["Con cuidados adecuados a su acabado." ] }] },
    ], related: [{ href: "/guias/plata-925", label: "Plata 925" }, { href: "/guias/como-limpiar-plata", label: "Cómo limpiar plata" }, { href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas" }], advisorCta: { title: "Encuentra una cadena de plata", description: "Indica si la quieres sola o con colgante, longitud, estilo y presupuesto." },
  },
  {
    slug: "anillos-plata-mujer", categorySlug: "anillos", eyebrow: "Guías", title: "Anillos de plata para mujer: tipos y cómo elegir", description: "Descubre cómo elegir anillos de plata para mujer: plata 925, tallas, estilos, piedras y consejos para encontrar el anillo adecuado.", intro: "Para elegir anillos de plata para mujer, empieza por talla y estilo de uso. Después compara plata 925, grosor, acabado, piedras y si buscas una pieza minimalista, un sello o varios anillos.",
    sections: [
      { title: "Plata 925 y tipos de anillo", paragraphs: [{ parts: ["La plata 925 es habitual en joyería. Puedes elegir anillos finos, anchos, minimalistas, tipo sello, ajustables o apilables. Consulta ", { href: "/guias/plata-925", label: "plata 925" }, "."] }] },
      { title: "Talla y anillos ajustables", paragraphs: ["La talla cambia entre dedos y manos. Un ajustable puede aportar margen, pero debe quedar cómodo y tiene límites de diseño. Para regalo, intenta confirmar talla o revisa cambios.", { parts: ["Consulta ", { href: "/guias/como-saber-talla-anillo", label: "cómo saber la talla de un anillo" }, "."] }] },
      { title: "Acabados, piedras y combinación", paragraphs: ["Un pulido refleja más luz; un mate o envejecido da otro efecto. Las piedras requieren revisar engaste y cuidados. Puedes apilar anillos finos o mezclar plata y oro con una proporción clara."] },
      { title: "Uso y cuidado", paragraphs: ["Para diario, prioriza talla y comodidad; para eventos puedes buscar más volumen. Comprueba composición, talla, acabado, piedras y devolución. La plata puede cambiar con el uso; consulta ", { parts: ["cómo ", { href: "/guias/como-limpiar-plata", label: "limpiar plata" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [{ title: "¿Qué significa plata 925?", paragraphs: ["Una aleación con 92,5 % de plata." ] }, { title: "¿Cómo saber mi talla?", paragraphs: ["Mide un anillo existente del dedo correcto o usa una guía fiable." ] }, { title: "¿Anillo ajustable?", paragraphs: ["Puede ser útil si queda cómodo y el diseño lo permite." ] }, { title: "¿Plata y oro?", paragraphs: ["Sí, con proporción clara." ] }, { title: "¿Cómo limpiar plata?", paragraphs: ["Con un método adecuado al acabado y piedras." ] }] },
    ], related: [{ href: "/guias/plata-925", label: "Plata 925" }, { href: "/guias/como-saber-talla-anillo", label: "Talla de anillo" }, { href: "/guias/como-limpiar-plata", label: "Cómo limpiar plata" }, { href: "/guias/combinar-joyas-oro-plata", label: "Cómo combinar oro y plata" }], advisorCta: { title: "Encuentra un anillo de plata", description: "Indica talla, estilo, piedras, uso y presupuesto para comparar opciones." },
  },
  {
    slug: "pendientes-oro-18k", categorySlug: "pendientes", eyebrow: "Guías", title: "Pendientes de oro 18k: cómo elegirlos y acertar", description: "Guía para elegir pendientes de oro 18k según diseño, cierre, tamaño, color de oro y ocasión, con consejos para comprar o regalar.", intro: "Los pendientes de oro 18k pueden ser pequeños para diario, aros con presencia o piezas con piedra para una ocasión. Para acertar, compara composición, cierre, tamaño y el estilo que realmente usará la persona.",
    sections: [
      { title: "Qué significa oro de 18k", paragraphs: [{ parts: ["El oro de 18k indica una aleación con una proporción concreta de oro. No determina por sí solo el diseño, el peso ni la comodidad: revisa también la ficha de la pieza. Consulta las diferencias en ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, "."] }] },
      { title: "Diseños: botón, aro, colgante y con piedras", paragraphs: ["Los botones suelen ser discretos y cómodos; los aros cambian mucho según diámetro y grosor; los colgantes aportan movimiento; y las piedras hacen que el engaste y el peso sean especialmente importantes. Elige primero cuánto protagonismo quieres que tengan."] },
      { title: "Cierres, tamaño y comodidad", paragraphs: [{ parts: ["Presión, rosca, criolla, catalán o pala son cierres con usos distintos. Revisa su manejo, el diámetro del pendiente y el peso cuando esté indicado. La guía de ", { href: "/guias/tipos-cierre-pendientes", label: "tipos de cierre de pendientes" }, " ayuda a comparar formatos."] }] },
      { title: "Oro amarillo, blanco y rosa", paragraphs: [{ parts: ["El amarillo, blanco y rosa cambian el tono final del conjunto. Conviene compararlos con las joyas que ya se llevan habitualmente; puedes ampliar en ", { href: "/guias/oro-blanco", label: "oro blanco" }, " y ", { href: "/guias/oro-rosa", label: "oro rosa" }, "."] }] },
      { title: "Comprar o regalar pendientes de 18k", paragraphs: ["Comprueba contraste, cierre, diámetro, peso, composición, piedras y condiciones de devolución. Para regalar, unos pendientes pequeños o aros ligeros pueden reducir la incertidumbre, pero el estilo de la persona sigue siendo la mejor referencia."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué significa oro 18k?", paragraphs: ["Es una aleación de oro de 18 quilates; revisa siempre la composición declarada de la pieza."] },
        { title: "¿Qué cierre elegir?", paragraphs: ["Depende del diseño, la facilidad de uso y la sensación de seguridad que busques."] },
        { title: "¿Aros o pendientes pequeños para diario?", paragraphs: ["Ambos pueden funcionar; compara diámetro, peso y si interfieren con tu rutina."] },
        { title: "¿Oro amarillo, blanco o rosa?", paragraphs: ["Elige el tono que mejor encaje con las joyas que ya utilizas y tu preferencia personal."] },
        { title: "¿Son un buen regalo?", paragraphs: ["Pueden serlo si conoces el estilo y la preferencia de color de oro de quien los recibe."] },
      ] },
    ], related: [{ href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" }, { href: "/guias/tipos-cierre-pendientes", label: "Tipos de cierre de pendientes" }, { href: "/guias/oro-blanco", label: "Oro blanco" }, { href: "/guias/oro-rosa", label: "Oro rosa" }], advisorCta: { title: "Encuentra pendientes de oro", description: "Indica cierre, tamaño, tono de oro, uso y presupuesto para recibir ideas ajustadas." },
  },
  {
    slug: "gargantillas-oro", categorySlug: "collares", eyebrow: "Guías", title: "Gargantillas de oro: tipos, medidas y cómo elegir", description: "Descubre cómo elegir gargantillas de oro según medida, grosor, estilo, capas y escote, y en qué se diferencian de un collar o una cadena.", intro: "Una gargantilla de oro queda cerca del cuello y puede llevarse sola, con un detalle pequeño o como primera capa. La longitud real, el grosor y el escote cambian más el resultado que una etiqueta genérica.",
    sections: [
      { title: "Gargantilla, collar y cadena: en qué se diferencian", paragraphs: ["Una gargantilla describe sobre todo la posición corta cerca del cuello. Un collar puede tener distintas longitudes y una cadena puede llevarse sola o sostener un colgante. El formato comercial no sustituye revisar los centímetros indicados."] },
      { title: "Medidas y ajuste", paragraphs: ["Las gargantillas suelen estar entre los largos más cortos, pero el efecto cambia según cuello, constitución y cierre. Mide una pieza que ya te quede bien y deja un margen cómodo. Un extensor aporta flexibilidad, si forma parte del diseño."] },
      { title: "Grosor, estilos y oro", paragraphs: [{ parts: ["Una cadena fina da un resultado ligero; un eslabón más ancho es más visible; un colgante pequeño añade foco. Compara composición y quilataje en la guía de ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, "."] }] },
      { title: "Capas y escotes", paragraphs: [{ parts: ["Para combinar capas, separa las longitudes y evita que los cierres queden tensos. Una gargantilla puede acompañar escotes abiertos, pero conviene comprobar la caída con la prenda. Consulta ", { href: "/guias/collares-segun-escote", label: "qué collar elegir según el escote" }, " y ", { href: "/guias/cadenas-oro-mujer", label: "cadenas de oro para mujer" }, "."] }] },
      { title: "Qué revisar antes de comprar o regalar", paragraphs: ["Comprueba longitud, extensor, grosor, cierre, composición, peso y compatibilidad con colgante. Para regalo, las cadenas cortas que ya use la persona son una pista más fiable que asumir una medida."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué medida tiene una gargantilla?", paragraphs: ["Es un formato corto, pero debes consultar los centímetros del modelo concreto."] },
        { title: "¿Se puede llevar una gargantilla con colgante?", paragraphs: ["Sí, si la anilla, el peso y la longitud son compatibles."] },
        { title: "¿Cómo combinarla en capas?", paragraphs: ["Diferencia las longitudes y deja un elemento como punto de atención."] },
        { title: "¿Qué grosor elegir?", paragraphs: ["Uno fino resulta más discreto; uno mayor gana presencia y puede funcionar solo."] },
        { title: "¿Es buena para regalar?", paragraphs: ["Puede serlo si puedes aproximar la longitud y el estilo que suele llevar la persona."] },
      ] },
    ], related: [{ href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas" }, { href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/collares-segun-escote", label: "Collares según escote" }, { href: "/guias/collar-con-inicial", label: "Collar con inicial" }], advisorCta: { title: "Encuentra una gargantilla de oro", description: "Cuenta qué longitud, grosor, escote y estilo buscas para comparar opciones." },
  },
  {
    slug: "cruz-oro", categorySlug: "collares", eyebrow: "Guías", title: "Cruz de oro: cómo elegir una para regalo o para llevar", description: "Guía para elegir una cruz de oro con o sin cadena según tamaño, estilo, oro de 18k y ocasión, con criterios útiles para regalo.", intro: "Una cruz de oro puede ser un colgante discreto para diario o una pieza de regalo con una ocasión concreta en mente. Antes de elegirla, revisa tamaño, cadena, composición y el estilo de quien la llevará.",
    sections: [
      { title: "Cruz con cadena o colgante por separado", paragraphs: ["Algunas piezas se venden con cadena y otras solo como colgante. Si eliges ambas por separado, confirma que la anilla admita el grosor de la cadena y que el peso quede proporcionado."] },
      { title: "Tamaño y estilo", paragraphs: ["Una cruz pequeña suele dar un resultado discreto; una más grande gana presencia. Los acabados lisos, con textura o con piedras responden a estilos distintos. La elección es estética y personal; no presupone un significado concreto para quien la lleva."] },
      { title: "Oro de 18k y color", paragraphs: [{ parts: ["El oro de 18k es una composición habitual en joyería. Revisa el contraste y el acabado, y compara alternativas en ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, ". El amarillo, blanco y rosa cambian el tono del colgante y de la cadena."] }] },
      { title: "Bautizo, comunión o regalo para adulto", paragraphs: ["Para un bautizo o una comunión, el tamaño, el cierre y la cadena deben ser adecuados a quien la recibirá y a las indicaciones de la familia. Para un adulto, observa si suele llevar colgantes cortos, largos, discretos o con más presencia. No hay un formato universal para cada ocasión."] },
      { title: "Qué revisar antes de comprar", paragraphs: [{ parts: ["Comprueba composición, contraste, alto y ancho del colgante, largo y grosor de cadena, cierre y devolución. La guía de ", { href: "/guias/tipos-de-cadenas", label: "tipos de cadenas" }, " puede ayudarte a elegir el soporte."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Mejor cruz con cadena o sin cadena?", paragraphs: ["Con cadena simplifica la elección; por separado permite ajustar longitud y grosor."] },
        { title: "¿Qué tamaño elegir?", paragraphs: ["Depende de si buscas discreción o una pieza más visible y de la proporción con la cadena."] },
        { title: "¿Qué oro elegir?", paragraphs: ["Compara composición, tono, uso y presupuesto en la ficha del modelo."] },
        { title: "¿Puede ser un regalo para bautizo o comunión?", paragraphs: ["Sí, si encaja con las preferencias de la familia y se revisan tamaño y cadena."] },
        { title: "¿Cómo elegir la cadena?", paragraphs: ["Debe ser compatible con la anilla, el peso del colgante y la longitud deseada."] },
      ] },
    ], related: [{ href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas" }, { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" }, { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" }], advisorCta: { title: "Encuentra una cruz de oro", description: "Indica ocasión, tamaño, cadena, tono de oro y presupuesto para comparar alternativas." },
  },
  {
    slug: "anillos-oro-mujer", categorySlug: "anillos", eyebrow: "Guías", title: "Anillos de oro para mujer: tipos, estilos y cómo elegir", description: "Descubre cómo elegir anillos de oro para mujer según estilo, talla, piedras, color de oro y ocasión, con criterios útiles para comprar o regalar.", intro: "Los anillos de oro para mujer pueden ser minimalistas, de sello, solitarios o llevar piedras. Elegir bien requiere empezar por talla y uso, y después comparar diseño, color de oro y comodidad.",
    sections: [
      { title: "Anillos minimalistas, sello, solitario y con piedras", paragraphs: ["Un anillo fino y minimalista suele combinar con facilidad; un sello tiene más volumen; un solitario concentra el foco en una piedra; y los diseños con varias piedras requieren mirar el engaste. Elige por el uso real, no solo por la imagen de producto."] },
      { title: "Talla y ajuste", paragraphs: [{ parts: ["La talla varía entre dedos y puede cambiar con el ancho del aro. Para regalar, intenta confirmar una pieza que ya use o elige solo un modelo ajustable diseñado para ello. Consulta ", { href: "/guias/como-saber-talla-anillo", label: "cómo saber la talla de un anillo" }, "."] }] },
      { title: "Oro amarillo, blanco y rosa", paragraphs: [{ parts: ["El amarillo aporta un tono cálido; el blanco y el rosa ofrecen alternativas visuales distintas. Compara la composición en ", { href: "/guias/oro-blanco", label: "oro blanco" }, ", ", { href: "/guias/oro-rosa", label: "oro rosa" }, " y ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, "."] }] },
      { title: "Piedras, uso diario y combinación", paragraphs: [{ parts: ["Revisa el engaste, la altura y los cuidados si el anillo lleva piedras. Para diario, prima comodidad y que no se enganche; para combinar, alterna anchos o deja una pieza protagonista. Como contraste de material, consulta los ", { href: "/guias/anillos-plata-mujer", label: "anillos de plata para mujer" }, "."] }] },
      { title: "Criterios para regalar", paragraphs: ["Confirma talla, estilo, color de oro y si la persona prefiere diseños finos o visibles. Comprueba también composición, peso cuando se indique, piedras, devolución y si el modelo es ajustable antes de tomar la decisión."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué tipo de anillo de oro elegir?", paragraphs: ["Depende de si buscas un diseño discreto, sello, solitario o una pieza con piedras."] },
        { title: "¿Cómo acertar con la talla?", paragraphs: ["Mide un anillo que ya quede bien en el mismo dedo o consulta una guía fiable."] },
        { title: "¿Oro amarillo, blanco o rosa?", paragraphs: ["Elige según preferencias y las joyas que ya use habitualmente."] },
        { title: "¿Un anillo con piedras sirve para diario?", paragraphs: ["Puede servir si el diseño y el engaste resultan cómodos para tu rutina."] },
        { title: "¿Qué anillo regalar?", paragraphs: ["Uno cuya talla, estilo y color de oro puedas confirmar razonablemente."] },
      ] },
    ], related: [{ href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" }, { href: "/guias/anillos-plata-mujer", label: "Anillos de plata para mujer" }, { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" }, { href: "/guias/combinar-joyas-oro-plata", label: "Cómo combinar oro y plata" }], advisorCta: { title: "Encuentra un anillo de oro", description: "Indica talla, estilo, piedras, tono de oro y presupuesto para recibir ideas personalizadas." },
  },
  {
    slug: "aros-plata-mujer", categorySlug: "pendientes", eyebrow: "Guías", title: "Aros de plata para mujer: tamaños, estilos y cómo elegir", description: "Descubre cómo elegir aros de plata para mujer según tamaño, grosor, cierre y estilo, y qué debes saber sobre la plata 925 antes de comprar.", intro: "Los aros de plata para mujer cambian mucho según diámetro, grosor y peso. Para elegirlos bien, empieza por el efecto que buscas —discreto, equilibrado o protagonista— y comprueba la composición y el cierre antes de decidir.",
    sections: [
      { title: "Qué son los pendientes de aro", paragraphs: ["Los aros son pendientes con una silueta circular o casi circular. Pueden ser completos, abiertos, con un pequeño detalle o incorporar piedras. El formato no define por sí solo el tamaño ni la comodidad: conviene revisar el diámetro, el grosor y el cierre del modelo concreto."] },
      { title: "Plata 925, plata maciza y acabado plateado", paragraphs: [{ parts: ["La plata 925 o plata de primera ley es una aleación habitual en joyería. No es lo mismo que una pieza simplemente plateada: revisa siempre la composición y los contrastes declarados. Puedes ampliar la información en ", { href: "/guias/plata-925", label: "plata 925" }, " y ", { href: "/guias/como-saber-si-es-plata", label: "cómo saber si una joya es de plata" }, "."] }] },
      { title: "Aros pequeños, medianos y grandes", paragraphs: ["Los aros pequeños suelen quedar más cerca del lóbulo y resultar fáciles de llevar a diario. Los medianos equilibran presencia y movimiento. Los grandes llaman más la atención y pueden funcionar para una ocasión o cuando quieres que el pendiente sea protagonista. No hay una medida que favorezca universalmente: elige la que encaje con tu estilo y con el resultado visual que prefieras."] },
      { title: "Grosor, acabado y detalles", paragraphs: ["Un aro fino ofrece un resultado más ligero; uno grueso se percibe con más volumen. Los aros lisos son versátiles, mientras que las piedras, texturas o relieves añaden brillo y detalle. Si llevan piedras, revisa el engaste y los cuidados recomendados."] },
      { title: "Cierre, peso y comodidad", paragraphs: [{ parts: ["El cierre de presión, criolla, bisagra u otros sistemas pueden variar entre modelos. Comprueba que te resulte sencillo de manejar y que el peso indicado sea razonable para el tiempo de uso previsto. La guía de ", { href: "/guias/tipos-cierre-pendientes", label: "tipos de cierre de pendientes" }, " explica los formatos más habituales."] }] },
      { title: "Combinar aros de plata", paragraphs: [{ parts: ["Puedes combinarlos con otros pendientes si dejas una pieza como foco y separas tamaños. Para el cuello, una cadena fina o un collar de longitud distinta puede mantener el conjunto equilibrado; consulta las ", { href: "/guias/cadenas-plata-mujer", label: "cadenas de plata para mujer" }, ". También es posible mezclar plata y oro con una proporción clara, como explicamos en ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, "."] }] },
      { title: "Uso diario, regalo y mantenimiento", paragraphs: [{ parts: ["Para diario, prioriza cierre, peso y un tamaño que no interfiera con tu rutina; para ocasiones especiales, quizá prefieras más diámetro o detalles. Como regalo, observa los pendientes que ya usa la persona. Para conservar la plata, consulta ", { href: "/guias/como-limpiar-plata", label: "cómo limpiar joyas de plata" }, " antes de aplicar cualquier método."] }] },
      { title: "Qué revisar antes de comprar", paragraphs: ["Comprueba material real, contraste, diámetro, grosor, cierre, peso cuando esté disponible, acabado, piedras y condiciones de devolución. Así podrás comparar pares con una base más útil que la fotografía."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué significa plata 925 en unos aros?", paragraphs: ["Indica una aleación de plata de primera ley; revisa siempre los datos del modelo concreto."] },
        { title: "¿Qué tamaño de aro elegir?", paragraphs: ["Elige según la presencia y el movimiento que quieras: pequeño para discreción, mediano para equilibrio o grande para más protagonismo."] },
        { title: "¿Son mejores los aros finos o gruesos?", paragraphs: ["No hay una opción mejor en general: los finos son más ligeros visualmente y los gruesos tienen más volumen."] },
        { title: "¿Se pueden combinar aros de plata con joyas de oro?", paragraphs: ["Sí. Mantener un metal dominante o repetir uno de los tonos en otra pieza ayuda a dar continuidad."] },
        { title: "¿Cómo limpiar unos aros de plata?", paragraphs: ["Usa un método adecuado para plata y para el acabado o las piedras que lleven."] },
      ] },
    ], related: [{ href: "/guias/plata-925", label: "Plata 925" }, { href: "/guias/como-limpiar-plata", label: "Cómo limpiar plata" }, { href: "/guias/cadenas-plata-mujer", label: "Cadenas de plata para mujer" }, { href: "/guias/aros-oro-mujer", label: "Aros de oro para mujer" }], advisorCta: { title: "Encuentra aros de plata", description: "Indica tamaño, grosor, cierre, estilo y presupuesto para recibir ideas ajustadas." },
  },
  {
    slug: "aros-oro-mujer", categorySlug: "pendientes", eyebrow: "Guías", title: "Aros de oro para mujer: tamaños, quilates y cómo elegir", description: "Guía para elegir aros de oro para mujer: tamaños, grosores, 18K, 14K y 9K, tipos de cierre y consejos para comprar el par adecuado.", intro: "Los aros de oro para mujer se eligen sobre todo por su formato: diámetro, grosor, peso y cierre. Los quilates y el color de oro importan, pero esta guía se centra en decidir qué aro encaja mejor con tu uso y estilo.",
    sections: [
      { title: "Qué caracteriza a unos aros de oro", paragraphs: ["Los pendientes de aro forman una silueta circular o casi circular y pueden ser pequeños, medianos, grandes, lisos o con detalles. En este formato, el diámetro, el grosor y el peso cambian de forma directa la presencia y la comodidad."] },
      { title: "Oro macizo, bañado y chapado", paragraphs: [{ parts: ["Revisa el material real y la composición declarada: una pieza de oro no es equivalente a una bañada o chapada. Los quilates describen la proporción de oro de una aleación; consulta ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, " y ", { href: "/guias/como-saber-si-una-joya-es-de-oro", label: "cómo saber si una joya es de oro" }, " para comparar criterios."] }] },
      { title: "18K, 14K y 9K", paragraphs: ["18K, 14K y 9K corresponden a aleaciones con distinta proporción de oro. Compara la información declarada, el uso que tendrá la pieza y el presupuesto. Ningún quilataje sustituye comprobar diámetro, grosor o cierre cuando buscas específicamente unos aros."] },
      { title: "Tamaño, diámetro y grosor", paragraphs: ["Los aros pequeños suelen ser más discretos; los medianos aportan movimiento sin dominar el conjunto; los grandes tienen mayor presencia. El grosor también importa: un aro fino se ve más ligero y uno grueso concentra más volumen. Observa el diámetro en milímetros o centímetros, no solo la foto."] },
      { title: "Oro amarillo, blanco y rosa", paragraphs: [{ parts: ["El oro amarillo, blanco y rosa producen tonos distintos. Elige según las joyas que ya uses y el efecto que prefieras; puedes ampliar en ", { href: "/guias/oro-blanco", label: "oro blanco" }, " y ", { href: "/guias/oro-rosa", label: "oro rosa" }, "."] }] },
      { title: "Cierres, peso y uso", paragraphs: [{ parts: ["Los sistemas criolla, bisagra, presión y otros pueden afectar al manejo y la seguridad percibida. Comprueba el peso cuando esté disponible y prioriza comodidad para diario. La guía de ", { href: "/guias/tipos-cierre-pendientes", label: "tipos de cierre de pendientes" }, " ayuda a identificar los formatos."] }] },
      { title: "Combinar aros de oro y elegir para regalo", paragraphs: [{ parts: ["Los aros lisos pueden combinarse con una cadena fina, un anillo o una pulsera sin recargar el conjunto. También puedes mezclar oro y plata con una intención clara; consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, ". Para regalar, las piezas que la persona ya lleva ofrecen mejores pistas que asumir un tamaño o color."] }] },
      { title: "Qué revisar antes de comprar", paragraphs: ["Comprueba quilates, material real, diámetro, grosor, cierre, peso cuando esté disponible, acabado, piedras y devolución. Esta lista diferencia la elección de aros de una guía general sobre pendientes de oro de 18k."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué quilates elegir en unos aros de oro?", paragraphs: ["Compara 18K, 14K o 9K según la composición declarada, el uso y el presupuesto."] },
        { title: "¿Cómo saber si unos aros son de oro macizo?", paragraphs: ["Revisa la composición, contraste y la información del vendedor; no te bases solo en el color."] },
        { title: "¿Qué tamaño de aro elegir?", paragraphs: ["El diámetro determina gran parte del efecto: pequeño para discreción, mediano para equilibrio y grande para más presencia."] },
        { title: "¿Son cómodos los aros grandes?", paragraphs: ["Depende de su peso, grosor, cierre y de cuánto tiempo quieras llevarlos."] },
        { title: "¿Se pueden combinar aros de oro y plata?", paragraphs: ["Sí, si eliges una proporción clara o repites uno de los tonos en otra joya."] },
      ] },
    ], related: [{ href: "/guias/pendientes-oro-18k", label: "Pendientes de oro 18k" }, { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" }, { href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/aros-plata-mujer", label: "Aros de plata para mujer" }], advisorCta: { title: "Encuentra aros de oro", description: "Indica diámetro, grosor, quilataje, cierre y presupuesto para recibir ideas personalizadas." },
  },
  {
    slug: "collar-estrella", categorySlug: "collares", eyebrow: "Guías", title: "Collar de estrella: significado, materiales y cómo elegir", description: "Descubre cómo elegir un collar de estrella según material, tamaño, cadena y estilo, qué significa este símbolo y cómo combinarlo o regalarlo.", intro: "Un collar de estrella puede ser un detalle pequeño para diario o un colgante más visible. Antes de elegirlo, compara el material, el tamaño del motivo y la longitud de cadena con el estilo y el uso que buscas.",
    sections: [
      { title: "Qué es un collar de estrella", paragraphs: ["Puede ser una estrella integrada en la cadena, un charm pequeño o un colgante protagonista. El collar incluye la cadena y el conjunto; el colgante es el motivo que puede llevarse en distintas cadenas. Los diseños minimalistas suelen dar un resultado discreto, mientras que una estrella grande o con brillo concentra más atención."] },
      { title: "Significado de la estrella en joyería", paragraphs: ["Las estrellas pueden asociarse simbólicamente con orientación, esperanza, inspiración, sueños o el recuerdo de una persona. Estas lecturas no son universales: el significado depende de quien lleva la pieza o de la intención de quien la regala."] },
      { title: "Materiales y acabados", paragraphs: [{ parts: ["Oro amarillo, blanco, rosa, plata 925, acero y otros materiales producen resultados distintos. Si eliges oro, revisa los quilates y si es una pieza de oro o un acabado bañado o chapado. Puedes comparar opciones en ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, ", ", { href: "/guias/oro-blanco", label: "oro blanco" }, ", ", { href: "/guias/oro-rosa", label: "oro rosa" }, " y ", { href: "/guias/plata-925", label: "plata 925" }, "."] }] },
      { title: "Tamaño de la estrella y longitud de cadena", paragraphs: [{ parts: ["Una estrella pequeña suele ser más discreta; una mediana aporta más presencia y una grande puede convertirse en el foco del conjunto. El grosor de la cadena debe guardar proporción con el colgante. La longitud cambia cómo se percibe sobre la ropa y el cuerpo, por lo que no hay una medida que caiga igual en todas las personas. Consulta ", { href: "/guias/cadenas-oro-mujer", label: "cadenas de oro para mujer" }, " y ", { href: "/guias/cadenas-plata-mujer", label: "cadenas de plata para mujer" }, "."] }] },
      { title: "Estrellas lisas, con circonitas o piedras", paragraphs: ["Una estrella lisa ofrece un acabado limpio; las circonitas u otras piedras añaden brillo. Si el diseño lleva piedras, revisa el engaste, el mantenimiento y el uso previsto. El brillo no determina por sí solo la calidad o el valor de una pieza."] },
      { title: "Cómo combinar un collar de estrella", paragraphs: [{ parts: ["Para llevarlo con otros collares, diferencia las longitudes y deja un motivo como punto de atención. Una cadena sencilla puede acompañarlo sin competir visualmente. Para combinarlo con el escote, consulta ", { href: "/guias/collares-segun-escote", label: "qué collar elegir según el escote" }, ". También puedes mezclar oro y plata de forma intencionada; amplía en ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, "."] }] },
      { title: "Elegirlo para regalar", paragraphs: [{ parts: ["Puede encajar para pareja, madre, hija, amiga, cumpleaños o aniversario si el motivo y el estilo resultan significativos para esa persona. Antes de comprar, revisa material, quilates o plata 925 cuando corresponda, medidas, longitud, cierre, tamaño del colgante, peso disponible, piedras y posibilidad de ajuste. Para orientar la elección, consulta ", { href: "/guias/como-elegir-una-joya-para-regalar", label: "cómo elegir una joya para regalar" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué significa regalar un collar de estrella?", paragraphs: ["Puede tener un sentido personal de orientación, esperanza, inspiración o recuerdo, según quien lo regala y quien lo recibe."] },
        { title: "¿Qué material elegir para un collar de estrella?", paragraphs: ["Depende de las joyas que ya se usen, el acabado deseado y la composición declarada del modelo."] },
        { title: "¿Qué longitud de cadena queda mejor con una estrella?", paragraphs: ["La adecuada depende del tamaño del motivo, el escote y el efecto que prefieras; compara siempre las medidas indicadas."] },
        { title: "¿Se puede combinar un collar de estrella con otros collares?", paragraphs: ["Sí, separando longitudes y evitando que varios colgantes grandes compitan entre sí."] },
        { title: "¿Es un collar de estrella un buen regalo?", paragraphs: ["Puede serlo si encaja con el estilo y la interpretación personal de quien lo recibe."] },
        { title: "¿Se pueden combinar collares dorados y plateados?", paragraphs: ["Sí, si eliges una proporción clara o repites uno de los tonos en otra joya."] },
      ] },
    ], related: [{ href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/cadenas-plata-mujer", label: "Cadenas de plata para mujer" }, { href: "/guias/collar-con-inicial", label: "Collar con inicial" }, { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" }], advisorCta: { title: "Encuentra un collar de estrella", description: "Indica material, tamaño, longitud, estilo y ocasión para recibir ideas personalizadas." },
  },
  {
    slug: "pulsera-infinito", categorySlug: "pulseras", eyebrow: "Guías", title: "Pulsera infinito: significado, materiales y cómo elegir", description: "Descubre qué significa una pulsera infinito, qué materiales y estilos existen y cómo elegir una para ti o como regalo especial.", intro: "Una pulsera infinito puede integrar el símbolo en la cadena o usarlo como pieza central. Para escogerla, combina el significado que le quieras dar con criterios prácticos: material, ajuste, tamaño del motivo y comodidad.",
    sections: [
      { title: "Qué es una pulsera infinito", paragraphs: ["El símbolo puede formar parte de una cadena fina, ocupar el centro de la pulsera o aparecer en diseños rígidos y más visibles. Los modelos minimalistas suelen resultar discretos; los que incorporan relieve, piedras o una pieza mayor tienen más presencia."] },
      { title: "Significado del símbolo del infinito", paragraphs: ["Puede asociarse con continuidad, vínculo, amistad, amor, familia o recuerdo. No existe un significado único: su interpretación depende de la persona que la lleva o de quien decide regalarla."] },
      { title: "Materiales y acabados", paragraphs: [{ parts: ["Oro amarillo, blanco y rosa, plata 925, acero u otros materiales ofrecen tonos y cuidados diferentes. Distingue una pieza de oro de un acabado dorado o bañado revisando la composición. Puedes consultar ", { href: "/guias/pulseras-oro-mujer", label: "pulseras de oro para mujer" }, ", ", { href: "/guias/pulseras-plata-mujer", label: "pulseras de plata para mujer" }, " y ", { href: "/guias/plata-925", label: "plata 925" }, "."] }] },
      { title: "Piedras, tamaño y personalización", paragraphs: [{ parts: ["Una pulsera lisa deja que el símbolo sea el centro; las circonitas u otras piedras aportan brillo y requieren revisar el engaste. Elige un tamaño pequeño si buscas discreción o uno mayor si quieres más presencia. Algunos modelos permiten iniciales, placas, grabados o piedras, pero depende de su diseño. Para alternativas personalizadas, consulta ", { href: "/guias/pulsera-con-nombre", label: "pulseras con nombre" }, "."] }] },
      { title: "Longitud, holgura y cierre", paragraphs: ["Mide la muñeca o compara una pulsera que ya quede cómoda. Deja la holgura que prefieras y revisa si el modelo cuenta con ajuste o extensor. El cierre debe resultar fácil de usar y adecuado al uso diario; no hay una medida universal para todas las personas."] },
      { title: "Cómo combinar una pulsera infinito", paragraphs: [{ parts: ["Puede llevarse sola, junto a un reloj o con pulseras finas de distintos grosores. Para mezclar oro y plata, decide cuál será el tono dominante o repite ambos en más de una pieza. Consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, "."] }] },
      { title: "Elegir una pulsera infinito para regalar", paragraphs: [{ parts: ["Puede ser una opción para pareja, madre, hija, hermana, amiga, aniversario o cumpleaños, pero el motivo no sustituye confirmar estilo, talla y material. Antes de comprar, comprueba material real, quilates, plata 925 si procede, longitud, sistema de ajuste, cierre, tamaño del símbolo, piedras y peso disponible. Para más criterios, consulta ", { href: "/guias/como-elegir-una-joya-para-regalar", label: "cómo elegir una joya para regalar" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué significa una pulsera con el símbolo del infinito?", paragraphs: ["Puede representar continuidad o vínculo, pero cada persona puede darle una interpretación diferente."] },
        { title: "¿Qué significa regalar una pulsera infinito?", paragraphs: ["Puede ser un detalle simbólico de amistad, amor, familia o recuerdo si ese sentido encaja con la relación."] },
        { title: "¿Es mejor una pulsera infinito de oro o de plata?", paragraphs: ["Depende de preferencias, composición declarada, joyas habituales y presupuesto."] },
        { title: "¿Cómo elegir la medida de una pulsera?", paragraphs: ["Mide la muñeca o compara una pulsera cómoda, revisando el margen de ajuste del modelo."] },
        { title: "¿Se puede combinar una pulsera infinito con un reloj?", paragraphs: ["Sí, si ajustas grosores y dejas suficiente espacio para que resulte cómodo."] },
        { title: "¿Se pueden llevar pulseras de oro y plata juntas?", paragraphs: ["Sí, manteniendo una proporción que te resulte coherente y cómoda."] },
      ] },
    ], related: [{ href: "/guias/pulseras-oro-mujer", label: "Pulseras de oro para mujer" }, { href: "/guias/pulseras-plata-mujer", label: "Pulseras de plata para mujer" }, { href: "/guias/pulsera-con-nombre", label: "Pulsera con nombre" }, { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" }], advisorCta: { title: "Encuentra una pulsera infinito", description: "Indica material, ajuste, tamaño del símbolo, estilo y ocasión para recibir ideas personalizadas." },
  },
  {
    slug: "collar-sol", categorySlug: "collares", eyebrow: "Guías", title: "Collar de sol: significado, materiales y cómo elegir", description: "Descubre qué significa un collar de sol, qué materiales y estilos existen y cómo elegir uno según tamaño, cadena, acabado y ocasión.", intro: "Un collar de sol puede ser un detalle discreto o un colgante protagonista. Para elegirlo, compara el material, el tamaño del motivo, la cadena y la ocasión en que quieres llevarlo.",
    sections: [
      { title: "Qué es un collar de sol", paragraphs: ["El motivo solar puede aparecer como colgante, integrado en la cadena o acompañado de otros detalles. Un sol pequeño y minimalista suele ser discreto; uno grande u ornamentado concentra más atención. El collar incluye cadena y motivo, mientras que el colgante puede llevarse en distintas cadenas compatibles."] },
      { title: "Significado del sol en joyería", paragraphs: ["El sol puede asociarse con energía, vitalidad, luz, optimismo, nuevos comienzos o un vínculo personal. Estas interpretaciones no son universales: el sentido depende de quien lleva la pieza o de quien la regala."] },
      { title: "Materiales, acabado y piedras", paragraphs: [{ parts: ["Oro amarillo, blanco y rosa, plata 925, acero u otros materiales dan resultados distintos. Revisa si se trata de oro, baño o chapado y consulta ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, ", ", { href: "/guias/oro-blanco", label: "oro blanco" }, ", ", { href: "/guias/oro-rosa", label: "oro rosa" }, " y ", { href: "/guias/plata-925", label: "plata 925" }, ". Las circonitas u otras piedras aportan brillo; revisa el engaste y sus cuidados."] }] },
      { title: "Tamaño y longitud de cadena", paragraphs: [{ parts: ["Un motivo pequeño puede acompañar el uso diario; uno mediano o grande gana presencia. El grosor de cadena debe guardar proporción con el colgante. La longitud cambia el efecto visual y no cae igual en todas las personas. Consulta ", { href: "/guias/cadenas-oro-mujer", label: "cadenas de oro para mujer" }, " y ", { href: "/guias/cadenas-plata-mujer", label: "cadenas de plata para mujer" }, "."] }] },
      { title: "Cómo combinarlo y regalarlo", paragraphs: [{ parts: ["Puedes llevarlo solo o en capas con longitudes distintas. Si el sol es grande, deja que las demás piezas sean más discretas. También puedes mezclar oro y plata de forma intencionada; consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, ". Como regalo para pareja, madre, hija o amiga, confirma estilo, material, tamaño, cierre y ajuste. Consulta ", { href: "/guias/como-elegir-una-joya-para-regalar", label: "cómo elegir una joya para regalar" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué significa un collar de sol?", paragraphs: ["Puede asociarse a energía, luz, optimismo o un vínculo personal, según quien le dé significado."] },
        { title: "¿Es un collar de sol un buen regalo?", paragraphs: ["Puede serlo si encaja con el estilo y el sentido personal de quien lo recibe."] },
        { title: "¿Qué material elegir?", paragraphs: ["Compara la composición, el tono y las joyas que ya usa la persona."] },
        { title: "¿Qué longitud de cadena funciona con un colgante de sol?", paragraphs: ["Depende del tamaño del motivo, el escote y el efecto deseado; revisa siempre los centímetros del modelo."] },
        { title: "¿Se puede combinar un collar de sol con otros collares?", paragraphs: ["Sí, separando longitudes y dejando un motivo como foco."] },
        { title: "¿Se pueden mezclar collares dorados y plateados?", paragraphs: ["Sí, manteniendo una proporción intencionada entre tonos."] },
      ] },
    ], related: [{ href: "/guias/collar-estrella", label: "Collar de estrella" }, { href: "/guias/collar-luna", label: "Collar de luna" }, { href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/cadenas-plata-mujer", label: "Cadenas de plata para mujer" }], advisorCta: { title: "Encuentra un collar de sol", description: "Indica material, tamaño, longitud, estilo y ocasión para recibir ideas personalizadas." },
  },
  {
    slug: "collar-luna", categorySlug: "collares", eyebrow: "Guías", title: "Collar de luna: significado, materiales y cómo elegir", description: "Descubre qué significa un collar de luna, qué materiales y diseños existen y cómo elegirlo según tamaño, cadena, estilo y ocasión.", intro: "Un collar de luna puede ser una media luna sencilla, una luna creciente con estrella o un colgante con piedras. Para elegirlo, compara diseño, material, tamaño y longitud de cadena.",
    sections: [
      { title: "Tipos de collar de luna", paragraphs: ["La media luna, la luna creciente, los diseños con estrella y las versiones con piedras son formatos habituales. Un motivo pequeño y minimalista suele ser fácil de combinar; uno grande o con detalles tiene más presencia."] },
      { title: "Significado de la luna", paragraphs: ["La luna puede asociarse simbólicamente con cambio, ciclos, intuición, calma, protección simbólica o un vínculo personal. No existe una interpretación universal: cada persona puede darle un sentido distinto."] },
      { title: "Materiales, tamaño y piedras", paragraphs: [{ parts: ["Oro amarillo, blanco, rosa, plata 925 y acero cambian el tono y los cuidados. Revisa si es oro o baño o chapado, y consulta ", { href: "/guias/oro-blanco", label: "oro blanco" }, ", ", { href: "/guias/oro-rosa", label: "oro rosa" }, " y ", { href: "/guias/plata-925", label: "plata 925" }, ". Las circonitas, el nácar u otras piedras cambian el brillo visual, pero no aportan propiedades especiales. Elige el tamaño según la presencia que quieras conseguir."] }] },
      { title: "Cadena, layering y combinación", paragraphs: [{ parts: ["La longitud puede elegirse para llevar el collar solo o en capas; separa longitudes y evita acumular varios colgantes grandes. Puedes combinarlo con una estrella u otros motivos celestes y mezclar metales de forma intencionada. Consulta ", { href: "/guias/cadenas-oro-mujer", label: "cadenas de oro para mujer" }, ", ", { href: "/guias/cadenas-plata-mujer", label: "cadenas de plata para mujer" }, " y ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, "."] }] },
      { title: "Elegirlo para regalo", paragraphs: [{ parts: ["Puede ser un detalle para pareja, madre, hija o amiga en cumpleaños o aniversarios si el diseño encaja con esa persona. Comprueba material, quilates o plata 925, tamaño, longitud, cierre, peso, piedras y ajuste. Consulta ", { href: "/guias/como-elegir-una-joya-para-regalar", label: "cómo elegir una joya para regalar" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué significa un collar de luna?", paragraphs: ["Puede asociarse a ciclos, cambio, calma o un vínculo personal, según la interpretación de quien lo lleva."] },
        { title: "¿Qué diferencia hay entre luna creciente y media luna?", paragraphs: ["Son formas visuales distintas; elige la que prefieras por diseño, no por una regla fija de significado."] },
        { title: "¿Qué material elegir?", paragraphs: ["Depende del tono, la composición declarada y las joyas que suelas llevar."] },
        { title: "¿Se puede combinar un collar de luna y uno de estrella?", paragraphs: ["Sí, diferenciando longitudes y dejando uno de los motivos como foco."] },
        { title: "¿Es buena idea regalar un collar de luna?", paragraphs: ["Puede serlo si el diseño y el sentido personal encajan con quien lo recibe."] },
        { title: "¿Cómo combinar varios collares?", paragraphs: ["Varía las longitudes y limita los colgantes protagonistas."] },
      ] },
    ], related: [{ href: "/guias/collar-estrella", label: "Collar de estrella" }, { href: "/guias/collar-sol", label: "Collar de sol" }, { href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/cadenas-plata-mujer", label: "Cadenas de plata para mujer" }], advisorCta: { title: "Encuentra un collar de luna", description: "Indica material, tamaño, longitud, estilo y ocasión para recibir ideas personalizadas." },
  },
  {
    slug: "anillo-sello-mujer", categorySlug: "anillos", eyebrow: "Guías", title: "Anillo sello para mujer: tipos, tamaños y cómo elegir", description: "Guía para elegir un anillo sello para mujer: materiales, formas, tallas, grabados y estilos para acertar al comprarlo o regalarlo.", intro: "Un anillo sello para mujer se distingue por su superficie frontal, que puede ser discreta, amplia, lisa, grabada o llevar una piedra. Para elegirlo, combina forma, talla, material y presencia.",
    sections: [
      { title: "Qué es un anillo sello", paragraphs: ["Es un anillo con una parte frontal definida, apta para un acabado liso, grabado, motivo o piedra. Puede tener un diseño clásico o moderno, ser fino y discreto o más ancho y protagonista. El formato no obliga a llevar un símbolo concreto."] },
      { title: "Formas, ancho y presencia", paragraphs: ["Ovalado, redondo, cuadrado y rectangular son formas habituales, además de versiones orgánicas. Una superficie mayor se percibe más en la mano; una menor resulta más sutil. Valora comodidad, ancho del aro y uso previsto antes de seguir una regla estética."] },
      { title: "Materiales, grabado y piedras", paragraphs: [{ parts: ["Oro amarillo, blanco, rosa, plata 925 y acero dan resultados distintos. Distingue oro y acabados dorados revisando la composición. Consulta ", { href: "/guias/anillos-oro-mujer", label: "anillos de oro para mujer" }, ", ", { href: "/guias/anillos-plata-mujer", label: "anillos de plata para mujer" }, ", ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, " y ", { href: "/guias/plata-925", label: "plata 925" }, ". Según el modelo y joyero, puede admitir inicial, monograma, símbolo, fecha o piedra; confirma dimensiones, técnica y condiciones antes de personalizar."] }] },
      { title: "Talla, dedo y combinación", paragraphs: [{ parts: ["La talla varía entre dedos y también con el ancho del anillo. Si es un regalo, intenta confirmar una pieza que ya quede bien o revisa condiciones de ajuste. Para medir con criterio, consulta ", { href: "/guias/como-saber-talla-anillo", label: "cómo saber la talla de un anillo" }, ". No existe un dedo obligatorio: puedes llevarlo solo, con anillos finos o mezclar metales en línea con ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, "."] }] },
      { title: "Elegir un anillo sello para regalo", paragraphs: ["Un grabado puede aportar un detalle personal en cumpleaños, aniversarios o regalos familiares, pero conviene asegurar talla, estilo y material. Revisa quilates, plata 925 cuando corresponda, dimensiones de la parte frontal, peso disponible, piedras, grabado y condiciones de cambio."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué es un anillo sello?", paragraphs: ["Es un anillo con una superficie frontal definida que puede ser lisa, grabada o llevar un motivo o piedra."] },
        { title: "¿En qué dedo se lleva un anillo sello?", paragraphs: ["No hay una regla obligatoria; elige el dedo que resulte cómodo y encaje con tu estilo."] },
        { title: "¿Qué forma de sello elegir?", paragraphs: ["Depende de si prefieres una forma ovalada, redonda, cuadrada, rectangular u orgánica y de la presencia buscada."] },
        { title: "¿Se puede grabar un anillo sello?", paragraphs: ["Sí, en algunos modelos; la posibilidad depende de la pieza y del joyero."] },
        { title: "¿Cómo saber la talla correcta?", paragraphs: ["Mide una pieza que ya quede bien en el mismo dedo o consulta una guía fiable."] },
        { title: "¿Es mejor un sello de oro o de plata?", paragraphs: ["Depende de composición, tono preferido, joyas habituales y presupuesto."] },
      ] },
    ], related: [{ href: "/guias/anillos-oro-mujer", label: "Anillos de oro para mujer" }, { href: "/guias/anillos-plata-mujer", label: "Anillos de plata para mujer" }, { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" }, { href: "/guias/combinar-joyas-oro-plata", label: "Cómo combinar oro y plata" }], advisorCta: { title: "Encuentra un anillo sello", description: "Indica material, talla, forma, grabado y estilo para recibir ideas personalizadas." },
  },
  {
    slug: "pendientes-estrella-plata", categorySlug: "pendientes", eyebrow: "Guías", title: "Pendientes de estrella de plata: tipos y cómo elegir", description: "Descubre cómo elegir pendientes de estrella de plata según tamaño, cierre, diseño y plata 925, y qué tener en cuenta antes de comprarlos o regalarlos.", intro: "Los pendientes de estrella de plata pueden ser pequeños para diario, de botón, aros con charm o diseños colgantes. Para acertar, compara la plata declarada, el tamaño del motivo, el cierre y el peso.",
    sections: [
      { title: "Plata 925 y material real", paragraphs: [{ parts: ["La plata 925 o plata de ley es una aleación habitual en joyería. No equivale a una pieza simplemente plateada: consulta la composición, contraste y ficha del producto. Amplía en ", { href: "/guias/plata-925", label: "plata 925" }, " y ", { href: "/guias/como-saber-si-es-plata", label: "cómo saber si una joya es de plata" }, "."] }] },
      { title: "Tipos de pendientes de estrella", paragraphs: ["Los pequeños y de botón son opciones discretas; los aros con estrella y los colgantes aportan más movimiento. Una estrella única da un resultado limpio, mientras que varias estrellas, texturas o circonitas añaden detalle. Elige el diseño por uso y presencia, no solo por la imagen."] },
      { title: "Tamaño, cierre y comodidad", paragraphs: [{ parts: ["Una estrella pequeña suele ser más discreta; una mediana o grande gana protagonismo. Presión, rosca, aro y algunos cierres catalanes pueden aparecer según el modelo; revisa que sean relevantes para el diseño, fáciles de manejar y cómodos. Consulta ", { href: "/guias/tipos-cierre-pendientes", label: "tipos de cierre de pendientes" }, "."] }] },
      { title: "Uso diario y combinación", paragraphs: [{ parts: ["Para diario, comprueba peso, acabado y cierre además del tamaño. Puedes combinarlos con otros pendientes si separas tamaños en varios agujeros. Con el cuello, un motivo estrella puede acompañar a un ", { href: "/guias/collar-estrella", label: "collar de estrella" }, ", un ", { href: "/guias/collar-luna", label: "collar de luna" }, " o un ", { href: "/guias/collar-sol", label: "collar de sol" }, ". Para mezclar plata y oro, consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, "."] }] },
      { title: "Elegirlos para regalar", paragraphs: [{ parts: ["Para cumpleaños, pareja, hija, madre o amiga, observa si la persona usa plata, pendientes pequeños o motivos simbólicos. Revisa plata 925, medidas, cierre, peso, piedras, acabado y devolución. Para limpiar la pieza, consulta ", { href: "/guias/como-limpiar-plata", label: "cómo limpiar joyas de plata" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué significa plata 925 en unos pendientes?", paragraphs: ["Indica una aleación de plata de ley; confirma siempre la información declarada del modelo."] },
        { title: "¿Qué tamaño elegir en unos pendientes de estrella?", paragraphs: ["Elige según la presencia que busques: pequeño para discreción, mediano para equilibrio o mayor para protagonismo."] },
        { title: "¿Son mejores los pendientes de estrella pequeños para diario?", paragraphs: ["Pueden ser prácticos, pero la comodidad también depende de peso, cierre y persona."] },
        { title: "¿Se pueden combinar pendientes de plata con joyas de oro?", paragraphs: ["Sí, si mantienes una proporción intencionada entre los metales."] },
        { title: "¿Cómo limpiar unos pendientes de plata?", paragraphs: ["Usa un método adecuado al acabado y a las piedras que puedan llevar."] },
        { title: "¿Son una buena idea para regalar?", paragraphs: ["Pueden serlo si el motivo y el estilo encajan con quien los recibe."] },
      ] },
    ], related: [{ href: "/guias/pendientes-pequenos-plata", label: "Pendientes pequeños de plata" }, { href: "/guias/plata-925", label: "Plata 925" }, { href: "/guias/collar-estrella", label: "Collar de estrella" }, { href: "/guias/como-limpiar-plata", label: "Cómo limpiar plata" }], advisorCta: { title: "Encuentra pendientes de estrella", description: "Indica tamaño, cierre, plata 925, estilo y presupuesto para recibir ideas personalizadas." },
  },
  {
    slug: "pendientes-pequenos-plata", categorySlug: "pendientes", eyebrow: "Guías", title: "Pendientes pequeños de plata: tipos, cierres y cómo elegir", description: "Guía para elegir pendientes pequeños de plata: plata 925, tamaños, cierres, estilos y consejos para encontrar unos pendientes cómodos y versátiles.", intro: "Los pendientes pequeños de plata son una opción versátil para diario o para llevar varios a la vez. Elige mirando medidas reales, material, cierre, peso y el diseño que mejor encaje con tu estilo.",
    sections: [
      { title: "Por qué elegir pendientes pequeños", paragraphs: ["Pueden dar un resultado discreto, combinarse con facilidad y funcionar en varios agujeros. No son siempre más cómodos: el peso, el cierre, el material y cada persona influyen tanto como el tamaño."] },
      { title: "Plata 925 y medidas reales", paragraphs: [{ parts: ["La plata 925 es una aleación habitual; no es lo mismo que un acabado plateado. Comprueba composición y contraste en la ficha, y consulta ", { href: "/guias/plata-925", label: "plata 925" }, ". “Pequeño” no es una medida fija: revisa milímetros y no te bases solo en fotografías de producto."] }] },
      { title: "Botón, miniaro, estrella y otros diseños", paragraphs: ["Botones, miniaros, estrellas, corazones, bolitas, formas geométricas y piedras pequeñas ofrecen resultados distintos. Los lisos suelen ser fáciles de combinar; circonitas o piedras de color aportan brillo. Esta guía trata el tamaño y la versatilidad, mientras que un motivo concreto se desarrolla en los pendientes de estrella."] },
      { title: "Cierres y uso diario", paragraphs: [{ parts: ["Presión, rosca, miniaro y otros cierres pueden encajar según el diseño. Revisa facilidad de uso, peso y si se venden por unidad o pareja cuando corresponda. La guía de ", { href: "/guias/tipos-cierre-pendientes", label: "tipos de cierre de pendientes" }, " explica los formatos habituales."] }] },
      { title: "Varios agujeros, mezcla y regalo", paragraphs: [{ parts: ["Para varios agujeros, alterna tamaños y deja un diseño como foco. Puedes repetir plata o mezclar oro con una proporción clara; consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, ". Para regalar, los diseños sencillos ayudan, pero confirma metal, medidas y tipo de cierre. Como ejemplo de motivo específico, consulta ", { href: "/guias/pendientes-estrella-plata", label: "pendientes de estrella de plata" }, "."] }] },
      { title: "Qué revisar antes de comprar", paragraphs: [{ parts: ["Comprueba plata 925, medidas reales, peso, cierre, piedras, acabado y si se venden por unidad o pareja. Para el mantenimiento, consulta ", { href: "/guias/como-limpiar-plata", label: "cómo limpiar joyas de plata" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué tamaño se considera pequeño en unos pendientes?", paragraphs: ["Depende del diseño; consulta siempre las medidas en milímetros del modelo."] },
        { title: "¿Qué significa plata 925?", paragraphs: ["Es una aleación de plata de ley habitual en joyería."] },
        { title: "¿Qué cierre elegir para unos pendientes pequeños?", paragraphs: ["Depende del diseño, la facilidad de uso y la comodidad que busques."] },
        { title: "¿Son buenos los pendientes pequeños para diario?", paragraphs: ["Pueden serlo si peso, cierre y material encajan con tu rutina."] },
        { title: "¿Se pueden combinar varios pendientes de plata?", paragraphs: ["Sí, alternando tamaños y dejando una pieza como protagonista."] },
        { title: "¿Cómo limpiar unos pendientes pequeños de plata?", paragraphs: ["Usa un método adecuado al acabado y las piedras del modelo."] },
      ] },
    ], related: [{ href: "/guias/pendientes-estrella-plata", label: "Pendientes de estrella de plata" }, { href: "/guias/plata-925", label: "Plata 925" }, { href: "/guias/como-saber-si-es-plata", label: "Cómo saber si es plata" }, { href: "/guias/como-limpiar-plata", label: "Cómo limpiar plata" }], advisorCta: { title: "Encuentra pendientes pequeños de plata", description: "Indica tamaño, cierre, uso diario, estilo y presupuesto para recibir ideas personalizadas." },
  },
  {
    slug: "anillos-tungsteno", categorySlug: "anillos", eyebrow: "Guías", title: "Anillos de tungsteno: ventajas, tipos y cómo elegir", description: "Descubre cómo elegir anillos de tungsteno: acabados, anchuras, tallas, grabados, ventajas y diferencias frente a otros materiales.", intro: "Los anillos de tungsteno suelen venderse con composiciones basadas en carburo de tungsteno u otras fórmulas comerciales según el fabricante. Antes de comprar, revisa composición, talla, anchura, acabado y condiciones de cambio.",
    sections: [
      { title: "Qué es un anillo de tungsteno", paragraphs: ["En joyería se comercializan con frecuencia anillos basados en carburo de tungsteno u otras composiciones según el fabricante. No conviene asumir que todos sean tungsteno puro: comprueba siempre la descripción específica de la pieza."] },
      { title: "Características y limitaciones", paragraphs: ["Suelen asociarse a elevada dureza superficial y resistencia al rayado frente a metales más blandos, además de un peso perceptible y una construcción rígida. Eso no significa que no puedan marcarse o dañarse, ni que todos se comporten igual: composición, acabado y uso importan."] },
      { title: "Tungsteno frente a oro, plata, titanio y acero", paragraphs: [{ parts: ["Oro, plata, titanio, acero y tungsteno tienen aspecto, peso, rigidez y mantenimiento diferentes. Ninguno es universalmente mejor: depende de estilo, uso y necesidad de ajuste. Para comparar los metales tradicionales, consulta ", { href: "/guias/anillos-oro-mujer", label: "anillos de oro para mujer" }, " y ", { href: "/guias/anillos-plata-mujer", label: "anillos de plata para mujer" }, "."] }] },
      { title: "Colores, acabados y anchura", paragraphs: ["El gris metálico, negro, dorado, pulido, mate, cepillado o combinaciones de acabado pueden cambiar el resultado visual. Algunos colores dependen de recubrimientos o tratamientos superficiales. Un aro estrecho, medio o ancho también cambia la presencia y comodidad; no existe una anchura correcta para todas las personas."] },
      { title: "Talla, interior comfort fit y grabados", paragraphs: [{ parts: ["Mide correctamente antes de comprar: muchos anillos de tungsteno no se redimensionan con facilidad, por lo que debes consultar las condiciones del vendedor. Algunos modelos usan un interior ligeramente redondeado, conocido como comfort fit, que puede cambiar la sensación al llevarlo. El grabado de nombres, iniciales, fechas o mensajes depende del modelo y fabricante. Consulta ", { href: "/guias/como-saber-talla-anillo", label: "cómo saber la talla de un anillo" }, "."] }] },
      { title: "Compra, regalo y uso", paragraphs: ["Puede considerarse para pareja o boda, además de uso personal, sin que eso defina todo el producto. Revisa composición declarada, talla, anchura, grosor, peso, acabado, recubrimientos, grabado y condiciones de cambio por talla antes de decidir."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué es un anillo de tungsteno?", paragraphs: ["Es un anillo comercializado con una composición basada en tungsteno, a menudo carburo de tungsteno; revisa la ficha del fabricante."] },
        { title: "¿Se raya un anillo de tungsteno?", paragraphs: ["Puede resistir bien el rayado frente a metales más blandos, pero no es invulnerable y depende de composición, acabado y uso."] },
        { title: "¿Se puede cambiar la talla de un anillo de tungsteno?", paragraphs: ["Muchos no se redimensionan con facilidad; confirma las condiciones del vendedor antes de comprar."] },
        { title: "¿Qué diferencia hay entre tungsteno y titanio?", paragraphs: ["Pueden diferir en peso, rigidez, acabado y composición; compara la ficha del modelo concreto."] },
        { title: "¿Son pesados los anillos de tungsteno?", paragraphs: ["Su peso puede sentirse más que en otros materiales, pero varía con anchura, grosor y composición."] },
        { title: "¿Se pueden grabar?", paragraphs: ["Algunos modelos sí; depende del diseño y del fabricante."] },
        { title: "¿Qué anchura elegir?", paragraphs: ["Elige según la presencia y la comodidad que busques, revisando las medidas declaradas."] },
      ] },
    ], related: [{ href: "/guias/anillos-oro-mujer", label: "Anillos de oro para mujer" }, { href: "/guias/anillos-plata-mujer", label: "Anillos de plata para mujer" }, { href: "/guias/como-saber-talla-anillo", label: "Cómo saber la talla de un anillo" }, { href: "/guias/tipos-de-anillos", label: "Tipos de anillos" }], advisorCta: { title: "Encuentra un anillo según tu estilo", description: "Indica material, talla, anchura, acabado y ocasión para recibir ideas personalizadas." },
  },
  {
    slug: "collares-conchas", categorySlug: "collares", eyebrow: "Guías", title: "Collares de conchas: tipos, materiales y cómo elegir", description: "Descubre los tipos de collares de conchas, materiales, estilos y acabados, cómo combinarlos y qué revisar antes de elegir uno.", intro: "Los collares de conchas pueden usar conchas naturales, materiales que las imitan o motivos de concha fabricados en metal. Para elegirlos, confirma el material real, el tamaño, la longitud y el tipo de unión.",
    sections: [
      { title: "Qué es un collar de conchas", paragraphs: ["Puede llevar conchas como elemento principal, pequeñas piezas intercaladas, un colgante con forma de concha o un diseño inspirado en ellas. Una concha natural, una imitación y un motivo metálico no son materiales equivalentes; no des por hecha la autenticidad solo por una fotografía."] },
      { title: "Tipos, tamaños y materiales", paragraphs: ["Hay collares cortos, largos, gargantillas, colgantes, diseños minimalistas y piezas protagonistas con cuentas, perlas, cordón, acero, plata u oro. Un detalle pequeño da un resultado sutil; una concha central o varias piezas grandes atraen más la atención. Elige según el efecto visual y el uso que buscas."] },
      { title: "Longitud y combinación", paragraphs: [{ parts: ["La longitud cambia cómo se percibe el collar y no cae igual en todas las personas. Puedes llevarlo con ropa neutra, looks informales, vestidos u otros collares de distinta altura. Si el collar es protagonista, unos pendientes discretos pueden equilibrar el conjunto. Para mezclar metales, consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, " y revisa las longitudes en ", { href: "/guias/collares-segun-escote", label: "qué collar elegir según el escote" }, "."] }] },
      { title: "Regalo, cuidado y compra", paragraphs: [{ parts: ["Puede encajar como regalo de cumpleaños, verano, viaje o para una persona a la que le guste el mar, sin que tenga un significado universal. Revisa material real, dimensiones, longitud, cierre, cadena o cordón, acabado, peso, resistencia de la unión y devolución. Evita golpes, productos químicos agresivos y humedad prolongada cuando el material lo requiera; guarda la pieza separada. Para más criterios de regalo, consulta ", { href: "/guias/como-elegir-una-joya-para-regalar", label: "cómo elegir una joya para regalar" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué tipos de collares de conchas existen?", paragraphs: ["Pueden ser gargantillas, colgantes, cadenas con pequeñas conchas, piezas con cuentas o diseños inspirados en conchas."] },
        { title: "¿Cómo saber de qué material está hecha una concha?", paragraphs: ["Consulta la descripción del vendedor; una fotografía no confirma por sí sola si es natural, imitación o metal."] },
        { title: "¿Cómo combinar un collar de conchas?", paragraphs: ["Prueba con ropa neutra y piezas más discretas si el collar tiene mucho volumen."] },
        { title: "¿Qué longitud elegir?", paragraphs: ["Depende del efecto buscado, la prenda y las medidas del modelo; no hay una caída universal."] },
        { title: "¿Cómo cuidar un collar de conchas?", paragraphs: ["Adapta el cuidado al material, evitando golpes y productos agresivos."] },
        { title: "¿Es buena idea regalar un collar de conchas?", paragraphs: ["Puede serlo si encaja con el estilo y las preferencias de quien lo recibe."] },
      ] },
    ], related: [{ href: "/guias/tipos-de-collares", label: "Tipos de collares" }, { href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas" }, { href: "/guias/combinar-joyas-oro-plata", label: "Cómo combinar oro y plata" }, { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" }], advisorCta: { title: "Encuentra un collar según tu estilo", description: "Indica material, longitud, tipo de concha y ocasión para recibir ideas personalizadas." },
  },
  {
    slug: "pulsera-grabada-mujer", categorySlug: "pulseras", eyebrow: "Guías", title: "Pulseras grabadas para mujer: ideas y cómo elegir", description: "Descubre qué grabar en una pulsera para mujer, qué materiales y estilos elegir y qué revisar antes de comprar una joya personalizada.", intro: "Una pulsera grabada permite personalizar una placa, esclava, medalla, charm o pieza rígida con iniciales, fechas, coordenadas o mensajes. Para acertar, compara espacio, legibilidad, material, medida y condiciones de personalización.",
    sections: [
      { title: "Qué puede grabarse", paragraphs: ["Puede incluir un nombre, iniciales, fecha, coordenadas, palabra, frase corta, símbolo o una combinación de elementos. Los nombres son solo una opción: esta guía se centra en el grabado y en qué formato permite expresar mejor cada idea."] },
      { title: "Pulseras aptas para grabado", paragraphs: ["Placas, esclavas, medallas, charms, pulseras rígidas y pequeñas piezas grabables ofrecen superficies diferentes. Oro, plata, acero y otros materiales pueden admitir opciones distintas según el modelo y el joyero."] },
      { title: "Texto, tipografía y personalización", paragraphs: ["Una o dos caras, tipografías, símbolos y tamaño de texto dependen de la pieza. En superficies pequeñas, un grabado más corto suele leerse mejor, pero no existe una cifra universal de caracteres. Comprueba si hay vista previa, mayúsculas, caracteres especiales y ortografía antes de confirmar."] },
      { title: "Medida y regalo", paragraphs: [{ parts: ["Mide la muñeca o compara una pulsera cómoda, dejando la holgura preferida y revisando extensores o ajuste. Puede ser un regalo para pareja, madre, hija o amiga en cumpleaños o aniversarios si el detalle encaja con la persona. Para una opción centrada específicamente en nombres, consulta ", { href: "/guias/pulsera-con-nombre", label: "pulsera con nombre" }, "."] }] },
      { title: "Qué revisar antes de pedirla", paragraphs: [{ parts: ["Comprueba material, dimensiones, cierre, longitud, peso, tipo de grabado, legibilidad y acabado. Las devoluciones de productos personalizados dependen de las condiciones del vendedor. Puedes comparar materiales en ", { href: "/guias/pulseras-oro-mujer", label: "pulseras de oro para mujer" }, " y ", { href: "/guias/pulseras-plata-mujer", label: "pulseras de plata para mujer" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué se puede grabar en una pulsera?", paragraphs: ["Nombres, iniciales, fechas, coordenadas, símbolos o mensajes breves, según el espacio y modelo."] },
        { title: "¿Cuántos caracteres caben?", paragraphs: ["Depende de la superficie, la tipografía y el tamaño del texto del modelo concreto."] },
        { title: "¿Qué material elegir para una pulsera grabada?", paragraphs: ["Compara composición, acabado, uso y las joyas que ya suele llevar la persona."] },
        { title: "¿Cómo elegir la talla?", paragraphs: ["Mide la muñeca o compara una pulsera cómoda y revisa el ajuste disponible."] },
        { title: "¿Se pueden grabar ambas caras?", paragraphs: ["Algunos modelos lo permiten; depende del diseño y del proveedor."] },
        { title: "¿Se puede devolver una pulsera personalizada?", paragraphs: ["Depende de las condiciones del vendedor; revísalas antes de confirmar el grabado."] },
      ] },
    ], related: [{ href: "/guias/pulsera-con-nombre", label: "Pulsera con nombre" }, { href: "/guias/pulseras-oro-mujer", label: "Pulseras de oro para mujer" }, { href: "/guias/pulseras-plata-mujer", label: "Pulseras de plata para mujer" }, { href: "/guias/como-elegir-una-joya-para-regalar", label: "Cómo elegir una joya para regalar" }], advisorCta: { title: "Encuentra una pulsera personalizada", description: "Indica grabado, material, medida y ocasión para recibir ideas personalizadas." },
  },
  {
    slug: "collares-finos-mujer", categorySlug: "collares", eyebrow: "Guías", title: "Collares finos para mujer: tipos y cómo elegir", description: "Descubre cómo elegir collares finos para mujer según longitud, material, cadena y estilo, y cómo combinarlos solos o en varias capas.", intro: "Un collar fino puede ser una cadena delicada, un motivo pequeño o un conjunto visual minimalista. Para elegirlo, compara longitud, grosor, material, cierre y la resistencia necesaria para el uso que le darás.",
    sections: [
      { title: "Qué se considera un collar fino", paragraphs: ["Puede referirse a una cadena fina, un colgante pequeño o una estética delicada. No hay un grosor universal: el equilibrio entre aspecto ligero y resistencia depende del diseño, material y uso previsto."] },
      { title: "Cadena sola o con colgante", paragraphs: [{ parts: ["Una cadena fina puede llevarse sola o con una inicial, piedra, estrella, corazón u otro motivo discreto. Comprueba que el peso y la anilla sean compatibles si alternarás colgantes. Consulta ", { href: "/guias/collar-con-inicial", label: "collar con inicial" }, " y ", { href: "/guias/collar-estrella", label: "collar de estrella" }, "."] }] },
      { title: "Materiales y longitud", paragraphs: [{ parts: ["Oro amarillo, blanco, rosa, plata 925 y otros materiales ofrecen tonos y cuidados distintos. La longitud cambia cómo cae con cada prenda y anatomía, así que revisa las medidas del modelo. Compara ", { href: "/guias/cadenas-oro-mujer", label: "cadenas de oro para mujer" }, ", ", { href: "/guias/cadenas-plata-mujer", label: "cadenas de plata para mujer" }, " y, si buscas específicamente una pieza delicada de oro, una ", { href: "/guias/cadena-fina-oro", label: "cadena fina de oro" }, "."] }] },
      { title: "Uso diario y layering", paragraphs: ["Para diario, revisa cierre, resistencia, posibles enganches y mantenimiento. En capas, combina dos o tres longitudes y deja uno de los collares como foco; evita que todos queden a la misma altura. Puedes unir un collar fino a otro más visible sin imponer reglas rígidas."] },
      { title: "Oro, plata, escote y regalo", paragraphs: [{ parts: ["Oro y plata pueden combinarse deliberadamente; consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, ". El efecto también cambia con el escote, como explica la guía de ", { href: "/guias/collares-segun-escote", label: "collares según escote" }, ". Para regalo, un diseño discreto puede ser versátil, pero confirma estilo, longitud y material."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué se considera un collar fino?", paragraphs: ["Una cadena delicada, un motivo pequeño o un conjunto visual ligero; el grosor depende del modelo."] },
        { title: "¿Qué longitud elegir?", paragraphs: ["Depende de la prenda, el efecto buscado y las medidas del collar."] },
        { title: "¿Se puede llevar un collar fino todos los días?", paragraphs: ["Puede ser adecuado si cierre, resistencia y uso encajan con tu rutina."] },
        { title: "¿Cómo combinar varios collares finos?", paragraphs: ["Diferencia dos o tres longitudes y evita que todos los motivos compitan."] },
        { title: "¿Es mejor oro o plata para un collar fino?", paragraphs: ["Depende de preferencias, composición y las joyas que ya uses."] },
        { title: "¿Cómo elegir un collar fino para regalar?", paragraphs: ["Confirma estilo, longitud y material antes de elegir un diseño discreto."] },
      ] },
    ], related: [{ href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/cadenas-plata-mujer", label: "Cadenas de plata para mujer" }, { href: "/guias/collar-con-inicial", label: "Collar con inicial" }, { href: "/guias/collares-segun-escote", label: "Collares según escote" }], advisorCta: { title: "Encuentra un collar fino", description: "Indica material, longitud, colgante y estilo para recibir ideas personalizadas." },
  },
  {
    slug: "cadena-fina-oro", categorySlug: "collares", eyebrow: "Guías", title: "Cadena fina de oro: grosores, medidas y cómo elegir", description: "Descubre cómo elegir una cadena fina de oro según grosor, longitud, quilates y colgante, y qué revisar antes de comprar una cadena delicada.", intro: "Una cadena fina de oro se elige por el equilibrio entre un aspecto delicado y el uso que soportará. Compara grosor, eslabón, longitud, quilates, cierre y el peso del colgante si vas a llevar uno.",
    sections: [
      { title: "Qué se considera una cadena fina", paragraphs: ["Puede ser una cadena de poco grosor, un eslabón ligero o un conjunto visual delicado. No hay una medida universal: la resistencia depende del material, diseño, eslabón y uso, no solo de que se perciba fina."] },
      { title: "Quilates, color y eslabones", paragraphs: [{ parts: ["El oro de 18K, 14K y 9K ofrece composiciones distintas; amarillo, blanco y rosa cambian el tono. Consulta ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, ", ", { href: "/guias/oro-blanco", label: "oro blanco" }, " y ", { href: "/guias/oro-rosa", label: "oro rosa" }, ". Los eslabones influyen en flexibilidad, brillo y aspecto; amplía en ", { href: "/guias/tipos-de-cadenas", label: "tipos de cadenas" }, "."] }] },
      { title: "Grosor, longitud y colgantes", paragraphs: ["Una cadena corta, media o larga produce efectos distintos y no cae igual en todas las personas. Si llevará colgante, revisa que la anilla admita la cadena y que el peso y tamaño del motivo sean proporcionados. Una cadena fina no tiene por qué ser inadecuada, pero debe encajar con el uso real."] },
      { title: "Uso diario, capas y regalo", paragraphs: [{ parts: ["Para diario, comprueba cierre, posibles enganches y resistencia indicada. En capas, combina longitudes distintas y deja una pieza como foco. Puedes mezclar oro y plata de forma intencionada; consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, ". Para regalar, compara con cadenas que la persona ya use. La guía de ", { href: "/guias/cadenas-oro-mujer", label: "cadenas de oro para mujer" }, " ofrece contexto para estilos más amplios."] }] },
      { title: "Qué revisar antes de comprar", paragraphs: ["Comprueba quilates, grosor, longitud, peso cuando esté disponible, eslabón, cierre y compatibilidad con colgantes. Si buscas una estética delicada en cualquier material, consulta también los collares finos."] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué grosor debe tener una cadena fina de oro?", paragraphs: ["Depende del diseño, el uso y el colgante; revisa las medidas declaradas del modelo."] },
        { title: "¿Es resistente una cadena fina de oro?", paragraphs: ["Puede serlo para su uso previsto, pero la resistencia varía con eslabón, grosor, composición y trato."] },
        { title: "¿Qué cadena fina elegir para un colgante?", paragraphs: ["Comprueba anilla, peso y tamaño del colgante para que sean compatibles."] },
        { title: "¿Qué longitud elegir?", paragraphs: ["Elige según el efecto buscado, la prenda y las medidas del modelo."] },
        { title: "¿Es mejor oro de 18K, 14K o 9K?", paragraphs: ["Depende de composición, uso, tono y presupuesto."] },
        { title: "¿Se pueden combinar varias cadenas finas?", paragraphs: ["Sí, diferenciando longitudes y evitando que todos los motivos compitan."] },
      ] },
    ], related: [{ href: "/guias/cadenas-oro-mujer", label: "Cadenas de oro para mujer" }, { href: "/guias/collares-finos-mujer", label: "Collares finos para mujer" }, { href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas" }, { href: "/guias/combinar-joyas-oro-plata", label: "Cómo combinar oro y plata" }], advisorCta: { title: "Encuentra una cadena fina de oro", description: "Indica longitud, grosor, colgante, quilates y uso para recibir ideas personalizadas." },
  },
  {
    slug: "brazalete-oro-mujer", categorySlug: "pulseras", eyebrow: "Guías", title: "Brazaletes de oro para mujer: tipos y cómo elegir", description: "Descubre cómo elegir un brazalete de oro para mujer según tamaño, anchura, quilates y estilo, y en qué se diferencia de una pulsera.", intro: "Un brazalete de oro para mujer se distingue por su estructura rígida o semirrígida, su diámetro y su anchura. Para elegirlo, compara el ajuste, el formato abierto o cerrado, el peso y el acabado.",
    sections: [
      { title: "Diferencia entre brazalete y pulsera", paragraphs: ["Una pulsera flexible de cadena se adapta y se mueve de forma distinta a un brazalete rígido o semirrígido. Los brazaletes pueden ser abiertos, cerrados, finos, anchos, minimalistas o llevar detalles; su diámetro y forma son decisivos para el ajuste."] },
      { title: "Formato, anchura y diámetro", paragraphs: ["Un brazalete abierto puede ofrecer cierto margen de puesta; uno cerrado requiere confirmar mejor el diámetro. Los modelos finos se ven más ligeros y los anchos ganan presencia. No existe un tamaño correcto para todas las muñecas: comprueba medidas, flexibilidad y comodidad del modelo."] },
      { title: "Quilates, color y acabados", paragraphs: [{ parts: ["Oro 18K, 14K y 9K corresponden a composiciones distintas; amarillo, blanco y rosa dan efectos visuales diferentes. Consulta ", { href: "/guias/oro-14k-18k-24k", label: "oro 14k, 18k y 24k" }, ", ", { href: "/guias/oro-blanco", label: "oro blanco" }, " y ", { href: "/guias/oro-rosa", label: "oro rosa" }, ". Un acabado liso, texturizado o con piedras cambia el protagonismo de la pieza."] }] },
      { title: "Uso, reloj y combinación", paragraphs: [{ parts: ["Puedes llevarlo solo, junto a un reloj o con otras pulseras si ajustas grosores y dejas espacio suficiente. También se puede mezclar oro y plata de forma intencionada; consulta ", { href: "/guias/combinar-joyas-oro-plata", label: "cómo combinar joyas de oro y plata" }, ". Frente a una pulsera de cadena, el brazalete concentra más estructura y requiere mirar más el diámetro."] }] },
      { title: "Regalo y compra", paragraphs: [{ parts: ["Para regalar, observa si la persona usa piezas rígidas, el tono de oro y su preferencia por diseños finos o protagonistas. Revisa quilates, diámetro, anchura, peso, cierre si existe, flexibilidad y acabado. Para formatos flexibles o más generales, consulta ", { href: "/guias/pulseras-oro-mujer", label: "pulseras de oro para mujer" }, " y ", { href: "/guias/pulseras-plata-mujer", label: "pulseras de plata para mujer" }, "."] }] },
      { title: "Preguntas frecuentes", paragraphs: [], subsections: [
        { title: "¿Qué diferencia hay entre una pulsera y un brazalete?", paragraphs: ["El brazalete suele ser rígido o semirrígido; una pulsera de cadena es más flexible."] },
        { title: "¿Cómo saber qué tamaño de brazalete necesito?", paragraphs: ["Consulta diámetro, abertura y medidas del fabricante, comparándolos con tu muñeca y comodidad."] },
        { title: "¿Qué quilates elegir?", paragraphs: ["Depende de composición, uso, tono y presupuesto."] },
        { title: "¿Es mejor un brazalete abierto o cerrado?", paragraphs: ["Depende del ajuste que busques, el diseño y la facilidad de puesta."] },
        { title: "¿Se puede combinar un brazalete de oro con un reloj?", paragraphs: ["Sí, si el conjunto deja espacio y resulta cómodo."] },
        { title: "¿Se puede combinar oro y plata?", paragraphs: ["Sí, con una proporción visual intencionada."] },
      ] },
    ], related: [{ href: "/guias/pulseras-oro-mujer", label: "Pulseras de oro para mujer" }, { href: "/guias/pulseras-plata-mujer", label: "Pulseras de plata para mujer" }, { href: "/guias/oro-14k-18k-24k", label: "Oro 14k, 18k y 24k" }, { href: "/guias/combinar-joyas-oro-plata", label: "Cómo combinar oro y plata" }], advisorCta: { title: "Encuentra un brazalete de oro", description: "Indica diámetro, anchura, quilataje, estilo y uso para recibir ideas personalizadas." },
  },
  {
    slug: "como-desenredar-una-cadena",
    categorySlug: "cuidados",
    eyebrow: "Guías",
    title: "Cómo desenredar una cadena sin dañarla",
    description: "Aprende cómo desenredar una cadena o collar sin forzar los eslabones, qué hacer con un nudo pequeño y cómo evitar que vuelva a enredarse.",
    intro: "Una cadena enredada suele requerir tiempo, buena luz y movimientos cortos. Tirar de los extremos o usar objetos puntiagudos puede deformar eslabones, abrir cierres o dañar un baño, una piedra o un colgante.",
    sections: [
      {
        title: "Antes de empezar: prepara la cadena",
        paragraphs: [
          "Coloca la cadena sobre una superficie lisa, limpia y bien iluminada. Extiéndela sin estirarla y retira colgantes sueltos si el diseño lo permite. Trabajar sobre una bandeja o un paño claro ayuda a ver el nudo y evita que la pieza se deslice.",
          "Lávate y seca bien las manos antes de tocarla. Si la cadena tiene piedras, perlas, esmalte, baño o un cierre delicado, evita productos o métodos que no estén indicados para esos materiales.",
        ],
      },
      {
        title: "Cómo desenredar una cadena paso a paso",
        paragraphs: [
          "Busca el centro del nudo y afloja primero los bucles más abiertos con las yemas de los dedos. En lugar de tirar de los extremos, mueve cada eslabón o vuelta con un gesto pequeño hacia fuera para crear espacio.",
          "Cuando el nudo empiece a ceder, deja que la cadena se apoye sobre la superficie y continúa separando los bucles uno a uno. Alterna entre ambos lados del nudo; forzar siempre desde el mismo punto puede apretarlo más.",
          "Si el nudo es muy pequeño, detente cuando notes resistencia. Un joyero puede liberarlo sin doblar piezas frágiles, especialmente si se trata de una cadena muy fina, una pieza antigua o una joya con piedras engastadas.",
        ],
      },
      {
        title: "Qué evitar para no dañar los eslabones",
        paragraphs: [
          "No tires con fuerza de los extremos, no abras eslabones y no uses agujas, alfileres, pinzas ni cuchillas sobre la cadena. Estas herramientas pueden rayar el metal, enganchar un baño o marcar un eslabón aunque el nudo parezca resolverse.",
          "Evita lubricantes, aceites, alcoholes, cremas o productos de limpieza improvisados. Pueden dejar residuos, afectar a algunos acabados o introducir suciedad en zonas de difícil acceso. Si la cadena está sucia además de enredada, revisa primero cómo limpiar el material concreto.",
        ],
      },
      {
        title: "Cuándo conviene acudir a un joyero",
        paragraphs: [
          "Busca ayuda profesional si el nudo está junto al cierre, hay eslabones deformados, la cadena se ha pellizcado alrededor de una piedra o el metal parece muy fino. También es prudente hacerlo si has intentado aflojarla sin éxito y el nudo se ha compactado.",
          "Una revisión profesional puede detectar un cierre abierto, un eslabón debilitado o una anilla que necesite reparación. Resolver el nudo sin comprobar estos puntos puede hacer que la cadena vuelva a engancharse o se rompa al usarla.",
        ],
      },
      {
        title: "Cómo evitar que una cadena vuelva a enredarse",
        paragraphs: [
          "Guarda cada cadena por separado, cerrada y extendida siempre que sea posible. Un estuche con compartimentos, una bolsa individual suave o un soporte que mantenga la cadena colgada reduce los roces con otras piezas.",
          "Para llevar varias cadenas, elige longitudes distintas y comprueba los cierres antes de salir. Si se enredan con frecuencia, reduce el número de piezas o revisa si un colgante pesado, un eslabón muy fino o un cierre suelto está favoreciendo el movimiento.",
        ],
      },
      {
        title: "Preguntas frecuentes",
        paragraphs: [],
        subsections: [
          { title: "¿Se puede desenredar una cadena sin herramientas?", paragraphs: ["Sí. Lo más prudente suele ser trabajar despacio con los dedos sobre una superficie lisa, sin tirar de los extremos ni forzar el nudo."] },
          { title: "¿Qué hago si el nudo no se mueve?", paragraphs: ["Detente si notas resistencia. Un nudo compacto en una cadena fina o delicada puede requerir revisión profesional para evitar deformar los eslabones."] },
          { title: "¿Puedo usar aceite para desenredar una cadena?", paragraphs: ["No es una opción general recomendable: puede dejar residuos y no es adecuada para todos los metales, baños, piedras o acabados. Consulta el cuidado del material concreto o acude a un profesional."] },
          { title: "¿Cómo guardo cadenas para que no se enreden?", paragraphs: ["Guárdalas secas, separadas y cerradas en compartimentos, bolsas individuales suaves o un soporte que las mantenga extendidas."] },
          { title: "¿Se puede dañar una cadena al desenredarla?", paragraphs: ["Sí, si se tira de ella, se usan objetos puntiagudos o el nudo está junto a una zona frágil. Trabajar despacio y parar ante la resistencia reduce ese riesgo."] },
        ],
      },
    ],
    related: [
      { href: "/guias/como-cuidar-joyas", label: "Cómo cuidar joyas" },
      { href: "/guias/tipos-de-cadenas", label: "Tipos de cadenas para collares" },
      { href: "/guias/como-limpiar-oro", label: "Cómo limpiar oro" },
      { href: "/guias/como-limpiar-plata", label: "Cómo limpiar plata" },
    ],
    advisorCta: { title: "Encuentra una cadena adecuada para tu uso", description: "Indica si la llevarás sola o con colgante, el material, el grosor y el uso para comparar opciones con más criterio." },
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
      "anillos-plata-mujer",
      "anillos-oro-mujer",
      "anillo-sello-mujer",
      "anillos-tungsteno",
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
    guideSlugs: ["como-elegir-collar", "collares-segun-escote", "tipos-de-cadenas", "tipos-de-collares", "collares-invitada-boda", "cadenas-oro-mujer", "collar-con-inicial", "cadenas-plata-mujer", "gargantillas-oro", "cruz-oro", "collar-estrella", "collar-sol", "collar-luna", "collares-conchas", "collares-finos-mujer", "cadena-fina-oro"],
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
      "pendientes-estrella-plata",
      "pendientes-pequenos-plata",
      "aros-plata-mujer",
      "aros-oro-mujer",
      "pendientes-oro-18k",
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
    guideSlugs: ["pulsera-tennis", "pulseras-con-coordenadas", "pulseras-nombres-hijos", "pulseras-de-novia", "esclavas-bebes-oro", "pulsera-con-nombre", "pulseras-plata-mujer", "pulseras-oro-mujer", "pulsera-infinito", "pulsera-grabada-mujer", "brazalete-oro-mujer"],
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
      "combinar-joyas-oro-plata",
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
    guideSlugs: ["como-cuidar-joyas", "como-limpiar-plata", "como-limpiar-oro", "como-desenredar-una-cadena"],
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
