import Image from "next/image";
import Link from "next/link";
import albertoTejedor from "@/public/assets/images/alberto_tejedor_villamizar.png";
import chevroletC10 from "@/public/assets/images/chevrolet_c10.avif";
import { Users, History, Calendar, MapPin, Bus, Route, HardHat, ShieldCheck, Heart } from "lucide-react";

export const metadata = {
  title: "Sobre Nosotros | Autobuses de Colombia",
  description: "Conoce la historia de Alberto Tejedor Villamizar y cómo nació Autobuses de Colombia, la comunidad de busología más grande del país.",
};

export default function AboutUs() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#09090b] via-[#030303] to-[#09090b] text-zinc-100 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-zinc-400 tracking-wider uppercase">
            <Heart className="w-3.5 h-3.5 text-zinc-500" />
            Nuestra Historia
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Autobuses de Colombia
          </h1>
          <p className="text-zinc-400 text-base md:text-lg">
            La mayor comunidad de aficionados, conductores, carroceros y entusiastas de la busología y el transporte público en el país.
          </p>
        </header>

        {/* Founder & Core Story Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Founder Profile Card */}
          <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-800/40 backdrop-blur-md rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center text-center">
            {/* Ambient background glow */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl" />
            
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-800 mb-4 shadow-md group">
              <Image 
                src={albertoTejedor} 
                alt="Alberto Tejedor Villamizar" 
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h2 className="text-xl font-bold text-white tracking-tight">
              Alberto Tejedor V.
            </h2>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
              Fundador & Director
            </p>

            <div className="w-full border-t border-zinc-800/60 my-4" />

            <div className="space-y-3.5 w-full text-left text-sm text-zinc-400">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                <span>~40 años de afición busóloga</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                <span>Mandalay, Bogotá D.C.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Bus className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                <span>Ex-conductor en Cootras Kennedy</span>
              </div>
            </div>

            <div className="w-full border-t border-zinc-800/60 my-4" />

            {/* Quick history tags */}
            <div className="flex flex-wrap justify-center gap-1.5">
              <span className="text-[10px] bg-white/[0.03] border border-white/[0.06] text-zinc-400 font-semibold px-2 py-0.5 rounded-md">Bogotá Colectivos</span>
              <span className="text-[10px] bg-white/[0.03] border border-white/[0.06] text-zinc-400 font-semibold px-2 py-0.5 rounded-md">Luv 1600</span>
              <span className="text-[10px] bg-white/[0.03] border border-white/[0.06] text-zinc-400 font-semibold px-2 py-0.5 rounded-md">ATVBuses</span>
            </div>
          </div>

          {/* Right Column: Mission & Community Story */}
          <div className="lg:col-span-8 bg-zinc-900/10 border border-zinc-800/30 rounded-2xl p-6 md:p-8 space-y-6">
            <blockquote className="border-l-2 border-zinc-400 pl-4 py-1">
              <p className="text-white text-lg font-medium leading-relaxed italic">
                &ldquo;Autobuses de Colombia nace con el fin de ofrecer otra visión respecto al mundo del transporte en el país: un portal de fotografía, noticias, novedades e información para quienes comparten esta pasión.&rdquo;
              </p>
            </blockquote>

            <div className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed">
              <p>
                Hace <span className="text-white font-semibold">más de 20 años</span>, se sembraron las bases de una comunidad apasionada por la busología. A través de diferentes grupos y redes de aficionados, se unieron conductores, mecánicos, carroceros, propietarios, marcas nacionales e internacionales, y, principalmente, los usuarios del servicio de transporte.
              </p>
              <p>
                Este espacio funciona como un **nodo de encuentro y colaboración**: donde los carroceros promueven sus diseños, los concesionarios exhiben sus chasis, las empresas de transporte promocionan sus nuevas rutas, y los usuarios enriquecen el portal compartiendo fotografías, discusiones y aportes históricos que construyen día a día el archivo del transporte en Colombia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] space-y-1">
                <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-zinc-400" />
                  Punto de Encuentro
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  Un lugar digital donde interactúan mecánicos, conductores, marcas e ingenieros de chasis y carrocerías.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] space-y-1">
                <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                  <History className="w-4 h-4 text-zinc-400" />
                  Archivo Histórico
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  Rescatamos memorias fotográficas, buses clásicos y registros históricos de cooperativas que ya no existen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Timeline & Milestones */}
        <section className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Route className="w-5 h-5 text-zinc-500" />
              Nuestra Trayectoria Digital
            </h2>
            <p className="text-sm text-zinc-400">
              Las fases y proyectos previos creados por Alberto Tejedor que dieron vida al portal actual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 space-y-3 hover:border-zinc-700/60 transition-colors duration-200">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">01 • El Origen</div>
              <h3 className="text-lg font-bold text-white">ATVBuses (Terra)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Nuestra primera página fotográfica alojada en el antiguo portal Terra, dando inicio al registro fotográfico sistemático de autobuses en Bogotá.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 space-y-3 hover:border-zinc-700/60 transition-colors duration-200">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">02 • Expansión</div>
              <h3 className="text-lg font-bold text-white">Internationalbuscolombia</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Un paso clave para consolidar la comunidad. Agrupamos a los primeros entusiastas y comenzamos a publicar información técnica detallada del sector.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 space-y-3 hover:border-zinc-700/60 transition-colors duration-200">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">03 • Preservación</div>
              <h3 className="text-lg font-bold text-white">Museos y Recuerdos</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Creación de portales dedicados: busesantiguosdecolombia, museovirtualdeltransporte, taxisantiguosdecolombia y la recordada página Nuestros Recuerdos.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Vehicle Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-zinc-800/40 pt-16">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
              Vehículo Histórico
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Memorias al Volante
            </h2>
            <div className="space-y-3 text-zinc-300 text-sm md:text-base leading-relaxed">
              <p>
                Como conductor y propietario de transporte en Bogotá durante 40 años, Alberto Tejedor manejó diversos colectivos en la antigua cooperativa <span className="text-white font-semibold">Cootras Kennedy</span>.
              </p>
              <p>
                Los inicios se remontan a un busetón modelo &apos;77 en <span className="text-white">Rápido Pensilvania</span>, y posteriormente al volante de unidades memorables en Cootras Kennedy, incluyendo una camioneta **Chevrolet C10** y una Luv 1600.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="w-full flex flex-col justify-center items-center rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/80 bg-zinc-950 group hover:border-zinc-700 transition-all duration-300">
              <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-black">
                <Image
                  className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  src={chevroletC10}
                  alt="Chevrolet C10 tomada en el barrio Mandalay de Bogotá"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <figcaption className="p-4 text-xs md:text-sm text-center bg-zinc-900/90 w-full border-t border-zinc-800/80 flex items-center justify-between px-6 text-zinc-400">
                <span className="text-white font-semibold">Chevrolet C10</span>
                <span>Barrio Mandalay, Bogotá</span>
              </figcaption>
            </div>
          </div>
        </section>

        {/* Closing / Vision Callout */}
        <section className="bg-gradient-to-r from-zinc-950 via-zinc-900/40 to-zinc-950 border border-zinc-800/50 rounded-2xl p-8 md:p-12 text-center space-y-4 max-w-4xl w-full mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Un Nuevo Impulso
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Gracias a la pasión de amigos, fotógrafos y colaboradores afines, Autobuses de Colombia sigue enfrentando nuevos desafíos digitales. Con este renovado impulso tecnológico, seguimos siendo la alternativa abierta y participativa para resguardar la memoria del transporte colombiano.
          </p>
        </section>

      </div>
    </main>
  );
}