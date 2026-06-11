import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Autobuses de Colombia",
  description: "Consulta la política de privacidad de Autobuses de Colombia. Conoce cómo protegemos y tratamos tus datos personales en nuestra plataforma.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-zinc-900/10 border border-zinc-850/40 backdrop-blur-md rounded-2xl p-6 sm:p-12 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500 mb-2">
          Política de Privacidad
        </h1>
        
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-10">
          Última actualización: Octubre 2025
        </p>

        <div className="space-y-10 text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              1. Introducción
            </h2>
            <p className="mb-4">
              Bienvenido a Autobuses de Colombia. Nos comprometemos a proteger tu privacidad y 
              tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, 
              compartimos y protegemos tu información cuando utilizas nuestro sitio web.
            </p>
            <p>
              Autobuses de Colombia es una plataforma dedicada a proporcionar información completa 
              sobre el transporte terrestre en Colombia, incluyendo galerías fotográficas, noticias, 
              información de empresas, rutas, destinos, marcas de autobuses y futuros servicios de 
              consulta de precios y tarifas de pasajes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              2. Información que Recopilamos
            </h2>
            
            <h3 className="text-base font-bold text-zinc-200 mb-2 mt-4">
              2.1 Información proporcionada voluntariamente
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-2">
              <li>Datos de registro: nombre, correo electrónico, nombre de usuario</li>
              <li>Fotografías y contenido multimedia que subas a la plataforma</li>
              <li>Comentarios, opiniones y reseñas sobre empresas y servicios</li>
              <li>Información de contacto cuando nos escribes</li>
              <li>Créditos de fotografía y datos del autor</li>
            </ul>

            <h3 className="text-base font-bold text-zinc-200 mb-2">
              2.2 Información recopilada automáticamente
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Dirección IP y ubicación geográfica general</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas y tiempo de navegación</li>
              <li>Cookies y tecnologías similares</li>
              <li>Datos de análisis de uso del sitio web</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              3. Cómo Usamos tu Información
            </h2>
            <p className="mb-4">
              Utilizamos la información recopilada para los siguientes propósitos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Proporcionar y mejorar nuestros servicios de información de transporte</li>
              <li>Publicar galerías fotográficas con los créditos correspondientes</li>
              <li>Mantener y actualizar la base de datos de empresas, rutas y destinos</li>
              <li>Enviar notificaciones sobre noticias y actualizaciones del sector</li>
              <li>Responder a tus consultas y solicitudes</li>
              <li>Analizar el uso del sitio para mejorar la experiencia del usuario</li>
              <li>Prevenir actividades fraudulentas o ilegales</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              4. Derechos de Autor y Fotografías
            </h2>
            <p className="mb-4">
              Respetamos los derechos de autor de todos los fotógrafos y colaboradores:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Todas las fotografías publicadas incluyen créditos al autor original</li>
              <li>Los fotógrafos mantienen los derechos de autor de sus imágenes</li>
              <li>Al subir contenido, otorgas una licencia no exclusiva para publicarlo en la plataforma</li>
              <li>Puedes solicitar la eliminación de tu contenido en cualquier momento</li>
              <li>No compartimos ni vendemos fotografías sin el consentimiento del autor</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              5. Compartir Información
            </h2>
            <p className="mb-4">
              No vendemos tu información personal. Podemos compartir información en las siguientes circunstancias:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
              <li>Cuando sea requerido por ley o autoridades competentes</li>
              <li>Para proteger los derechos, propiedad y seguridad de Autobuses de Colombia</li>
              <li>Con tu consentimiento explícito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              6. Cookies y Tecnologías de Seguimiento
            </h2>
            <p className="mb-4">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Puedes 
              controlar el uso de cookies a través de la configuración de tu navegador. Las 
              cookies nos ayudan a:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Recordar tus preferencias y configuraciones</li>
              <li>Analizar el tráfico y comportamiento en el sitio</li>
              <li>Personalizar contenido y publicidad</li>
              <li>Mejorar la seguridad de la plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              7. Seguridad de los Datos
            </h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu 
              información contra acceso no autorizado, alteración, divulgación o destrucción. 
              Sin embargo, ningún método de transmisión por Internet es 100% seguro, por lo que 
              no podemos garantizar la seguridad absoluta.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              8. Tus Derechos
            </h2>
            <p className="mb-4">
              Conforme a la legislación colombiana sobre protección de datos, tienes derecho a:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar información inexacta o incompleta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Solicitar la portabilidad de tus datos</li>
              <li>Revocar el consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              9. Información de Precios y Tarifas (Futuro)
            </h2>
            <p>
              En el futuro, nuestra plataforma incluirá información sobre precios y tarifas de 
              pasajes. Esta información será recopilada de fuentes públicas y empresas de transporte. 
              Los precios mostrados son referenciales y pueden variar. Te recomendamos confirmar 
              los precios directamente con las empresas de transporte.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              10. Menores de Edad
            </h2>
            <p>
              Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos 
              intencionalmente información de menores de edad. Si descubrimos que hemos recopilado 
              datos de un menor, eliminaremos esa información de inmediato.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              11. Enlaces a Terceros
            </h2>
            <p>
              Nuestro sitio puede contener enlaces a sitios web de empresas de transporte y otros 
              terceros. No somos responsables de las prácticas de privacidad de estos sitios externos. 
              Te recomendamos revisar sus políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              12. Cambios a esta Política
            </h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos sobre 
              cambios significativos publicando la nueva política en nuestro sitio web con una fecha 
              de actualización revisada. Te recomendamos revisar esta página regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              13. Contacto
            </h2>
            <p className="mb-4">
              Si tienes preguntas, inquietudes o deseas ejercer tus derechos sobre tus datos 
              personales, puedes contactarnos a través de:
            </p>
            <div className="bg-zinc-950/60 border border-zinc-850/60 p-6 rounded-xl space-y-2.5">
              <p className="text-zinc-300">
                <strong className="text-white">Email:</strong> autobusesdecolombiaoficial@gmail.com
              </p>
              <p className="text-zinc-300">
                <strong className="text-white">Sitio web:</strong> www.autobusesdecolombia.com
              </p>
              <p className="text-zinc-300">
                <strong className="text-white">Tiempo de respuesta:</strong> 15 días hábiles
              </p>
            </div>
          </section>

          <section className="border-t border-zinc-850/60 pt-8 mt-8">
            <p className="text-zinc-500 text-sm leading-relaxed">
              Al utilizar Autobuses de Colombia, aceptas los términos de esta Política de Privacidad. 
              Si no estás de acuerdo con estos términos, por favor no utilices nuestros servicios.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}