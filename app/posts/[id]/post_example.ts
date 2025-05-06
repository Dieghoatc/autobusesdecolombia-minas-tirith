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

export const content2: PostBlock[] = [
  {
    type: "header",
    children: [
      { type: "category", text: "Tecnología y componentes" },
      { type: "date", text: "2 Enero, 2025" },
      { type: "reading_time", text: "5 min de lectura" },
    ],
  },
  {
    type: "heading",
    level: 1,
    text: "Michelin X® MULTI™ ENERGY™ Z Neumatico utilizado para la fabricación de autobuses",
  },
  {
    type: "author",
    text: "Autobuses de Colombia",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dkj6yzrrk/image/upload/v1745887185/post/vezdnkvhkdvbiw08bven.webp",
    alt: "Neumatico utilizado para la fabricación de autobuses",
    authorPhoto: "Michelin Store",
  },
  {
    type: "paragraph",
    level: "primary",
    text: "El neumático Michelin X® MULTI™ ENERGY™ Z en la medida 295/80 R22.5 está diseñado para vehículos de carga que operan en rutas regionales y de larga distancia. Este neumático se destaca por su capacidad para ofrecer un equilibrio entre eficiencia en el consumo de combustible y durabilidad.",
  },
  {
    type: "heading",
    level: 2,
    text: "Características principales:",
  },
  {
    type: "paragraph",
    text: "Ahorro de combustible: Gracias a su menor resistencia al rodaje, este neumático puede ahorrar hasta 1,2 litros de combustible por cada 100 kilómetros recorridos, lo que también contribuye a una reducción de emisiones de CO₂.",
  },
  {
    type: "paragraph",
    text: "Durabilidad: Ofrece una vida útil equivalente a otras gamas regionales de Michelin, asegurando un rendimiento kilométrico óptimo.",
  },

  {
    type: "paragraph",
    text: "Versatilidad: Adecuado para diversas condiciones de conducción, ya sea en rutas regionales o de larga distancia, proporcionando estabilidad y seguridad en diferentes entornos.",
  },
  {
    type: "paragraph",
    text: "Desempeño en todas las estaciones: Cuenta con la certificación 3PMSF, lo que garantiza su rendimiento en condiciones climáticas adversas, incluyendo nieve y lluvia, asegurando la movilidad durante todo el año.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "REGENION: Incorpora un alto porcentaje de sílice en la banda de rodadura, lo que reduce la resistencia al rodaje sin comprometer la durabilidad del neumático.",
      "INFINICOIL: Un hilo de acero continuo de hasta 400 metros envuelve la circunferencia del neumático, proporcionando mayor estabilidad, resistencia y una forma de desgaste más uniforme.",
      "Longitud de línea controlada (entre 50-75 caracteres)",
      "Espaciado generoso entre párrafos y secciones",
      "Jerarquía visual clara para facilitar el escaneo del contenido",
    ],
  },
  {
    type: "fact",
    heading: "Especificaciones técnicas:",
    text: "Dimensiones: 295/80 R22.5. Índice de carga: 154 (capacidad máxima de 7,500 kg por neumático) Índice de velocidad: L (velocidad máxima de 120 km/h). Presión recomendada: 8.5 bar. Diámetro total: 1,037 mm"
  }
];
