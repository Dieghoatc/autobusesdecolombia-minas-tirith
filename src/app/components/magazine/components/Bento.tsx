import Link from "next/link";
import { BentoItem } from "./BentoItem";
import "./bento.css";

const articles = [
  {
    id_article: "1",
    image_url:
      "https://brasildotrecho.com.br/wp-content/uploads/2021/07/NOVO-MICHELIN-295-80-R22.5-X-MULTI-ENERGY-Z.jpg",
    slug: "michelin-x-multi-energy-z",
    title: "Michelin X® MULTI™ ENERGY™ Z",
    subtitle: "Neumatico utilizado para la fabricacion de autobuses.",
    content: `<p>
          El neumático Michelin X® MULTI™ ENERGY™ Z en la medida 295/80 R22.5
          está diseñado para vehículos de carga que operan en rutas regionales y
          de larga distancia. Este neumático se destaca por su capacidad para
          ofrecer un equilibrio entre eficiencia en el consumo de combustible y
          durabilidad.
        </p>
        <br />
        <h3>
          <strong>Características principales:</strong>
        </h3>
        <br />
        <ul>
          <li>
            <b>Ahorro de combustible:</b> Gracias a su menor resistencia al
            rodaje, este neumático puede ahorrar hasta 1,2 litros de combustible
            por cada 100 kilómetros recorridos, lo que también contribuye a una
            reducción de emisiones de CO₂.
          </li>
          <li>
            <b>Durabilidad:</b> Ofrece una vida útil equivalente a otras gamas
            regionales de Michelin, asegurando un rendimiento kilométrico
            óptimo.
          </li>
          <li>
            <b>Versatilidad:</b> Adecuado para diversas condiciones de
            conducción, ya sea en rutas regionales o de larga distancia,
            proporcionando estabilidad y seguridad en diferentes entornos.
          </li>
          <li>
            <b>Desempeño en todas las estaciones:</b> Cuenta con la
            certificación 3PMSF, lo que garantiza su rendimiento en condiciones
            climáticas adversas, incluyendo nieve y lluvia, asegurando la
            movilidad durante todo el año
          </li>
        </ul>
        <br />
        <h3>
          <strong>Tecnologías incorporadas:</strong>
        </h3>
        <br />
        <ul>
          <li>
            <b>REGENION: </b>Incorpora un alto porcentaje de sílice en la banda
            de rodadura, lo que reduce la resistencia al rodaje sin comprometer
            la durabilidad del neumático.
          </li>
          <li>
            <b>INFINICOIL: </b>Un hilo de acero continuo de hasta 400 metros
            envuelve la circunferencia del neumático, proporcionando mayor
            estabilidad, resistencia y una forma de desgaste más uniforme.
          </li>
        </ul>
        <br />
        <h3>
          <strong>Especificaciones técnicas:</strong>
        </h3>
        <br />
        <ul>
          <li>
            <b>Dimensiones: </b>295/80 R22.5
          </li>
          <li>
            <b>Índice de carga:</b> 154 (capacidad máxima de 7,500 kg por
            neumático)
          </li>
          <li>
            <b>Índice de velocidad:</b> L (velocidad máxima de 120 km/h)
          </li>
          <li>
            <b>Presión recomendada:</b> 8.5 bar
          </li>
          <li>
            <b>Diámetro total:</b> 1,037 mm
          </li>
        </ul>
        <p>
          Este neumático es ideal para flotas que buscan optimizar sus costos
          operativos mediante la reducción del consumo de combustible sin
          sacrificar la durabilidad y el rendimiento en diversas condiciones de
          conducción.
        </p>`,
    date: "01/30/2023",
  },
];

export function Bento() {
  return (
    <section className="bento">
      {articles.map((article) => {
        return (
          <div key={article.id_article} className="bento-primary">
            <Link href={`/pages/posts/${article.slug}`}>
              <BentoItem articles={article} />
            </Link>
          </div>
        );
      })}
    </section>
  );
}
