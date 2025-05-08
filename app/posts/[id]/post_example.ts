export interface Post {
  id: string;
  title: string;
  content: PostBlock[];
  createdAt: string; // ISO 8601: "2025-05-05T12:00:00Z"
  // Puedes agregar campos como slug, tags, etc.
}

export type PostBlock =
  | HeaderBlock
  | HeadingBlock
  | AuthorBlock
  | ImageBlock
  | ParagraphBlock
  | QuoteBlock
  | ListBlock
  | FactBlock;

type HeaderChild =
  | { type: "category"; text: string }
  | { type: "date"; text: string }
  | { type: "reading_time"; text: string };

interface HeaderBlock {
  type: "header";
  children: HeaderChild[];
}

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface AuthorBlock {
  type: "author";
  text: string;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt: string;
  overlay?: string;
  authorPhoto: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  level?: "primary";
  text: string;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  author?: string;
}

export interface ListBlock {
  type: "list";
  style: "unordered" | "ordered";
  items: string[];
}

export interface FactBlock {
  type: "fact";
  heading: string;
  text: string;
}

export const content: PostBlock[] = [
  {
    type: "header",
    children: [
      { type: "category", text: "Tecnología" },
      { type: "date", text: "2 Mayo, 2025" },
      { type: "reading_time", text: "5 min de lectura" },
    ],
  },
  {
    type: "heading",
    level: 1,
    text: "Avances en inteligencia artificial transforman el consumo de noticias",
  },
  {
    type: "author",
    text: "Dieghoatc",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dkj6yzrrk/image/upload/v1746257419/autobusesdecolombia/uxs9krxf23jywnn20d9a.webp",
    alt: "Foto de la empresa",
    authorPhoto: "Dieghoatc",
    overlay:
      "Inteligencia artificial generando noticias La IA está transformando cómo consumimos y procesamos la información diaria.",
  },
  {
    type: "paragraph",
    level: "primary",
    text: "Nuevas tecnologías basadas en inteligencia artificial están revolucionando la manera en que las personas consumen noticias, ofreciendo una experiencia personalizada y adaptada a las necesidades de cada usuario.",
  },
  {
    type: "heading",
    level: 2,
    text: "La personalización como nuevo estándar",
  },
  {
    type: "paragraph",
    text: "En la era digital actual, el volumen de información disponible puede resultar abrumador para los lectores. Sin embargo, las nuevas plataformas de noticias impulsadas por IA han encontrado una solución efectiva: la personalización del contenido. Estas tecnologías analizan los patrones de lectura, intereses y comportamiento de cada usuario para ofrecer una selección de noticias relevantes. “La personalización no se trata solo de mostrar contenido que le guste al usuario, sino de presentar la información de manera que sea más digerible y útil para cada persona”, explica Carlos Rodríguez, experto en tecnologías de medios digitales de la Universidad Complutense de Madrid.",
  },
  {
    type: "quote",
    text: "“Una buena estructura semántica mejora el SEO y la accesibilidad.” — Expert HTML",
    author: "Ana Torres, Directora de Innovación en MediaTech",
  },
  {
    type: "heading",
    level: 2,
    text: "Diseño centrado en la legibilidad",
  },
  {
    type: "paragraph",
    text: "El diseño de las plataformas de noticias también ha evolucionado para mejorar la legibilidad y reducir la fatiga visual. Los nuevos estándares incluyen:",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Tipografías optimizadas para pantalla con tamaños adecuados",
      "Contraste apropiado entre texto y fondo",
      "Longitud de línea controlada (entre 50-75 caracteres)",
      "Espaciado generoso entre párrafos y secciones",
      "Jerarquía visual clara para facilitar el escaneo del contenido",
    ],
  },
  {
    type: "fact",
    heading: "¿Sabías que?",
    text: "Estudios recientes muestran que los lectores retienen un 42% más de información cuando el contenido está presentado con una jerarquía visual clara y elementos que faciliten el escaneo rápido, como subtítulos, viñetas y destacados.",
  },
];

/////////////////////////////////////////////////////////////////////////////

export const content2: PostBlock[] = [
  {
    type: "header",
    children: [
      { type: "category", text: "Ambiente" },
      { type: "date", text: "2 Enero, 2025" },
      { type: "reading_time", text: "7 min de lectura" },
    ],
  },
  {
    type: "heading",
    level: 1,
    text: "La transición energética en el transporte: avances, desafíos y oportunidades para Colombia",
  },
  {
    type: "author",
    text: "Autobuses de Colombia",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dkj6yzrrk/image/upload/v1746699423/post/ChatGPT_ocea8o.webp",
    alt: "Autobus represntando la transición energética",
    authorPhoto: "IA",
  },
  {
    type: "paragraph",
    level: "primary",
    text: "El cuidado del medio ambiente es una prioridad a nivel mundial, y diversos gobiernos han intensificado esfuerzos para reducir las emisiones de gases contaminantes en la atmósfera. Más allá de las normativas europeas NEC (Normativa sobre Emisiones Contaminantes), que han contribuido significativamente a la disminución de emisiones, los motores de combustión interna siguen siendo contaminantes debido a que requieren la quema de combustibles derivados del petróleo para su funcionamiento.",
  },
  {
    type: "paragraph",
    text: "Uno de los temas centrales del 2º Congreso Colombia Transporta 2025, celebrado el 29 y 30 de abril, fue la transición hacia energías limpias en el sector transporte. En esta charla se abordaron tres temas clave relacionados con la descarbonización: el gas natural, los biocombustibles y el hidrógeno",
  },
  {
    type: "heading",
    level: 2,
    text: "Gas natural: una tecnología de transición",
  },
  {
    type: "paragraph",
    text: "El gas natural ha sido un paso fundamental en la transición energética. Gracias a su bajo costo y facilidad de implementación, se proyecta como una tecnología clave para el transporte urbano, de carga y público. Aunque menos contaminante que la gasolina o el diésel, su uso sigue generando emisiones, en especial si se producen fugas de metano, un gas de efecto invernadero muy potente.",
  },
  {
    type: "heading",
    level: 2,
    text: "El transporte eléctrico: la tendencia global",
  },
  {
    type: "paragraph",
    text: "El transporte eléctrico es sin duda la tendencia mundial y el futuro de la movilidad. Varios países han tenido éxito notable en la transformación hacia el transporte eléctrico, especialmente en vehículos eléctricos (EVs), transporte público electrificado y políticas de descarbonización.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Líderes mundiales: Noruega, China, Alemania, Países Bajos y Estados Unidos.",
      "Líderes en Latinoamérica: Colombia y Chile, especialmente en buses eléctricos y proyectos piloto.",
    ],
  },
  {
    type: "heading",
    level: 2,
    text: "Biocombustibles: una alternativa sostenible y nacional",
  },
  {
    type: "paragraph",
    text: "Biodiésel: Combustible de origen natural, resultado de la reacción de aceites vegetales con alcoholes de baja masa molecular. En Colombia, su principal fuente es el aceite de palma, cuya biomasa se somete a un proceso de alcoholólisis (mezcla con metanol o etanol) y luego se combina con diésel."
  },
  {
    type: "fact",
    heading: "“La transición energética debe ser justa, progresiva y realista en Colombia.”",
    text: "Carolina Rojas Hayes, Presidente de Fedebiocombustibles.",
  }, 
  {
    type: "paragraph",
    text: "Durante el congreso, Carolina Rojas Hayes, Presidente de Fedebiocombustibles expuso los beneficios de los biocombustibles en Colombia: Colombia cuenta con más de 20 años de marco normativo en biocombustibles. Gracias a estas políticas y la colaboración del sector transporte, en 2024 se evitaron aproximadamente 2 millones de toneladas de emisiones de gases de efecto invernadero y 400 toneladas de material particulado.",
  },
  {
    type: "fact",
    heading: "“Soy fan de los biocombustibles. Es un mito que presenten fallas. Nuestros tractores funcionan con aceite reciclado, huelen a papa frita, pero funcionan muy bien.”",
    text: "Mauricio Rodríguez, Presidente Grupo ECOLOGIC y CO2CERO.",
  },  
  {
    type: "quote",
    text: "“Soy fan de los biocombustibles. Es un mito que presenten fallas. Nuestros tractores funcionan con aceite reciclado, huelen a papa frita, pero funcionan muy bien.”",
    author: "Mauricio Rodríguez, Presidente Grupo ECOLOGIC y CO2CERO.",
  },
  {
    type: "heading",
    level: 2,
    text: "Hidrógeno: el futuro aún en desarrollo",
  },
  {
    type: "paragraph", 
    text: "El hidrógeno es un combustible limpio que produce cero emisiones directas. Su principal ventaja es que al consumirse solo genera vapor de agua. Puede usarse para generar electricidad o como combustible en motores, incluso en naves espaciales."
  },
  {
    type: "paragraph", 
    text: "El hidrógeno puede producirse a partir de gas natural, energía nuclear, biomasa y fuentes renovables como la solar o eólica. Uno de los métodos más comunes es la electrólisis, que separa el hidrógeno del agua."
  },
  {
    type: "paragraph", 
    text: "Aunque es prometedor, enfrenta varios retos:"
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Infraestructura: Se requieren estaciones de recarga (hidrogeneras) que aún no existen a gran escala.",
      "Costo: Su producción es costosa y carece de financiación adecuada.",
      "Conocimiento: Falta información en el país sobre su uso, seguridad y viabilidad.",
      "Seguridad: Es un gas inflamable, lo que representa un riesgo en aplicaciones móviles (como vehículos).",
    ],
  },
  {
    type: "quote",
    text: "“Es clave diversificar la generación de energía para evitar crisis como el apagón de España. Ahí debe enfocarse la transición.”",
    author: "Karen Peralta, Directora Cámara de Hidrógeno ANDI",
  },
  {
    type: "fact",
    heading: "“Una encuesta reciente identificó 36 proyectos de hidrógeno en Colombia, de los cuales un 30% están orientados a la descarbonización del transporte. Sin embargo, la mayoría se encuentra en fases iniciales por falta de financiación.”",
    text: "Karen Peralta, Directora Cámara de Hidrógeno ANDI - NATURGAS.",
  },
];
