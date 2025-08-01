import React from "react";
import Image from "next/image";
import Head from "next/head";

import ImageMedellin from "@/assets/destinations/downtown-medellin-colombia.avif";
import ExpresoBrasilia from "@/assets/companies/expreso_brasilia.png";
import RapidoTolima from "@/assets/companies/rapido_tolima.png";
import EmpresaArauca from "@/assets/companies/empresa_arauca.png";
import RapidoOchoa from "@/assets/companies/rapido_ochoa.png";
import ExpresoBolivariano from "@/assets/companies/expreso_bolivariano.png";
import FlotaMagdalena from "@/assets/companies/flota_magdalena.png";

interface TransportCompany {
  id: number;
  name: string;
  logo: string;
  schedule: string;
  price: string;
  duration: string;
  services: string[];
}

const transportCompanies: TransportCompany[] = [
  {
    id: 1,
    name: "Expreso Brasilia",
    logo: ExpresoBrasilia.src,
    schedule: "Salidas cada hora desde 4:00 AM hasta 10:00 PM",
    price: "Desde $75.000",
    duration: "8 horas",
    services: ["WiFi", "Aire acondicionado", "Baño"],
  },
  {
    id: 2,
    name: "Rápido Tolima",
    logo: RapidoTolima.src,
    schedule: "Salidas cada hora desde 4:00 AM hasta 10:00 PM",
    price: "Desde $75.000",
    duration: "8 horas",
    services: ["WiFi", "Aire acondicionado", "Baño"],
  },
  {
    id: 3,
    name: "Empresa Arauca",
    logo: EmpresaArauca.src,
    schedule: "Salidas cada hora desde 4:00 AM hasta 10:00 PM",
    price: "Desde $75.000",
    duration: "8 horas",
    services: ["WiFi", "Aire acondicionado", "Baño"],
  },
  {
    id: 4,
    name: "Rapido Ochoa",
    logo: RapidoOchoa.src,
    schedule: "Salidas cada hora desde 4:00 AM hasta 10:00 PM",
    price: "Desde $75.000",
    duration: "8 horas",
    services: ["WiFi", "Aire acondicionado", "Baño"],
  },
  {
    id: 5,
    name: "Expreso Bolivariano",
    logo: ExpresoBolivariano.src,
    schedule: "Salidas cada hora desde 4:00 AM hasta 10:00 PM",
    price: "Desde $75.000",
    duration: "8 horas",
    services: ["WiFi", "Aire acondicionado", "Baño"],
  },
  {
    id: 6,
    name: "Flota Magdalena",
    logo: FlotaMagdalena.src,
    schedule: "Salidas cada hora desde 4:00 AM hasta 10:00 PM",
    price: "Desde $75.000",
    duration: "8 horas",
    services: ["WiFi", "Aire acondicionado", "Baño"],
  },
  // Agrega más empresas aquí
];

export default function MedellinPage() {
  return (
    <>
      <Head>
        <title>Turismo en Medellín | Qué ver, clima, historia y eventos</title>
        <meta
          name="description"
          content="Descubre Medellín, la ciudad de la eterna primavera. Conoce su historia, clima, lugares turísticos, eventos y por qué es un destino imperdible en Colombia."
        />
        <meta
          name="keywords"
          content="turismo en Medellín, qué hacer en Medellín, Medellín Colombia, lugares turísticos Medellín, clima Medellín, eventos Medellín"
        />
      </Head>
      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <Image
            src={ImageMedellin}
            alt="Medellín"
            fill
            className="object-cover brightness-50"
          />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Viaja a Medellín</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Descubre la ciudad de la eterna primavera con los servicios de
              transporte terrestre.
            </p>
          </div>
        </section>
        <section className="py-12 px-6 max-w-4xl mx-auto bg-neutral-50">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Turismo en Medellín: Qué ver y hacer en la ciudad de la eterna
            primavera
          </h1>

          <p className="mb-6 text-lg">
            <strong>Medellín</strong> es uno de los destinos más populares de
            Colombia gracias a su clima agradable, cultura vibrante e impactante
            transformación urbana. Conocida como la
            <em>ciudad de la eterna primavera</em>, Medellín ofrece una
            combinación única de modernidad, historia, arte y naturaleza.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            Historia y transformación de Medellín
          </h2>
          <p className="mb-6">
            En las últimas décadas, Medellín pasó de ser un lugar marcado por la
            violencia a convertirse en un modelo de innovación social y urbana a
            nivel mundial. La ciudad ha sido reconocida internacionalmente por
            su sistema de transporte integrado, proyectos sociales y espacios
            públicos que conectan a las comunidades.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            Lugares turísticos y atracciones principales
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Plaza Botero</strong>: Esculturas monumentales del maestro
              Fernando Botero.
            </li>
            <li>
              <strong>Comuna 13</strong>: Murales, escaleras eléctricas y
              cultura urbana.
            </li>
            <li>
              <strong>Jardín Botánico</strong>: Flora tropical, mariposario y
              eventos culturales.
            </li>
            <li>
              <strong>Parque Arví</strong>: Reserva ecológica para caminatas y
              ecoturismo.
            </li>
            <li>
              <strong>Pueblito Paisa</strong>: Pueblo tradicional con vistas del
              valle.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            Eventos destacados en Medellín
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Feria de las Flores (agosto)</strong>: Desfiles, música, y
              silleteros.
            </li>
            <li>
              <strong>Festival Internacional de Tango</strong>: Cultura tanguera
              y shows en vivo.
            </li>
            <li>
              <strong>Alumbrados Navideños</strong>: Luces y figuras decorativas
              en diciembre.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            Clima de Medellín
          </h2>
          <p className="mb-6">
            Medellín goza de un <strong>clima primaveral todo el año</strong>,
            con temperaturas entre 22 °C y 28 °C. Las lluvias son más comunes en
            abril-mayo y septiembre-noviembre, pero no impiden disfrutar de la
            ciudad.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            ¿Por qué visitar Medellín?
          </h2>
          <p>
            Medellín es ideal para quienes buscan
            <strong>
              experiencias culturales, naturaleza urbana, eventos vibrantes y
              hospitalidad
            </strong>
            . Es perfecta para viajeros solitarios, parejas o familias que
            quieren descubrir una ciudad moderna con alma tradicional.
          </p>
        </section>
        {/* Info Section */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-8">Información de Transporte</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-black rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                Terminales Medellín
              </h3>
              <p>Carrera 64c No. 78 - 580 Local 265n</p>
              <p className="text-gray-600">Medellín, Antioquia</p>
            </div>
          </div>
        </section>
        {/* Companies Section */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-8">Empresas de Transporte</h2>
          <div className="space-y-6">
            {transportCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-neutral-50 rounded-lg shadow-md p-6 flex gap-6 items-center"
              >
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-black">
                    {company.name}
                  </h3>
                  {/* <p className="text-gray-600 mb-2">{company.schedule}</p>
                  <div className="flex gap-4">
                    <span className="text-green-600 font-medium">
                      {company.price}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{company.duration}</span> 
                  </div>*/}
                  {/* <div className="mt-2 flex gap-2">
                    {company.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
