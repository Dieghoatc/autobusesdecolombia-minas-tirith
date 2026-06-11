import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Autobuses de Colombia",
  description: "Consulta los términos y condiciones de uso de Autobuses de Colombia, nuestro portal informativo sobre transporte terrestre en el país.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-zinc-900/10 border border-zinc-850/40 backdrop-blur-md rounded-2xl p-6 sm:p-12 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500 mb-2">
          Términos y Condiciones
        </h1>
        
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-10">
          Última actualización: Octubre 2025
        </p>

        <div className="space-y-10 text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              1. Aceptación de los Términos
            </h2>
            <p className="mb-4">
              Bienvenido a Autobuses de Colombia. Al acceder y utilizar este sitio web, aceptas 
              cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguno de estos 
              términos, por favor no utilices nuestros servicios.
            </p>
            <p>
              Autobuses de Colombia se reserva el derecho de modificar estos términos en cualquier 
              momento. Es tu responsabilidad revisar periódicamente estos términos para estar al 
              tanto de cualquier cambio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              2. Descripción del Servicio
            </h2>
            <p className="mb-4">
              Autobuses de Colombia es una plataforma informativa que proporciona:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Galerías fotográficas de autobuses y transporte terrestre en Colombia</li>
              <li>Noticias y actualidad del sector de transporte</li>
              <li>Información sobre empresas de transporte, rutas y destinos</li>
              <li>Base de datos de marcas, modelos y fabricantes de autobuses</li>
              <li>Información sobre carrocerías, plataformas y chasis</li>
              <li>Futuros servicios de consulta de precios y tarifas de pasajes</li>
              <li>Comunidad de fotógrafos y entusiastas del transporte</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              3. Registro y Cuenta de Usuario
            </h2>
            
            <h3 className="text-base font-bold text-zinc-200 mb-2 mt-4">
              3.1 Creación de cuenta
            </h3>
            <p className="mb-4">
              Para acceder a ciertas funciones, como subir fotografías o comentar, debes crear una 
              cuenta. Al registrarte, te comprometes a:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-2">
              <li>Proporcionar información veraz, precisa y actualizada</li>
              <li>Mantener la confidencialidad de tu contraseña</li>
              <li>Ser responsable de todas las actividades realizadas con tu cuenta</li>
              <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
              <li>Tener al menos 18 años de edad</li>
            </ul>

            <h3 className="text-base font-bold text-zinc-200 mb-2">
              3.2 Suspensión y terminación
            </h3>
            <p>
              Nos reservamos el derecho de suspender o cancelar tu cuenta si violas estos términos, 
              sin previo aviso y sin responsabilidad alguna.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              4. Contenido Generado por Usuarios
            </h2>
            
            <h3 className="text-base font-bold text-zinc-200 mb-2 mt-4">
              4.1 Fotografías y material visual
            </h3>
            <p className="mb-4">
              Al subir fotografías u otro contenido visual a nuestra plataforma:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-2">
              <li>Declaras que eres el propietario de los derechos de autor o tienes autorización</li>
              <li>Otorgas a Autobuses de Colombia una licencia no exclusiva, mundial y libre de regalías para usar, reproducir, modificar y mostrar tu contenido</li>
              <li>Mantienes todos los derechos de autor sobre tu contenido</li>
              <li>Te comprometes a que el contenido no infringe derechos de terceros</li>
              <li>Aceptas que tu nombre aparezca como crédito en las publicaciones</li>
            </ul>

            <h3 className="text-base font-bold text-zinc-200 mb-2">
              4.2 Comentarios y opiniones
            </h3>
            <p className="mb-4">
              Al publicar comentarios, reseñas u opiniones, te comprometes a:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-2">
              <li>Ser respetuoso y no publicar contenido ofensivo, difamatorio o ilegal</li>
              <li>No publicar spam, publicidad no autorizada o enlaces maliciosos</li>
              <li>Basar tus opiniones en experiencias reales y honestas</li>
              <li>No suplantar la identidad de otras personas o entidades</li>
            </ul>

            <h3 className="text-base font-bold text-zinc-200 mb-2">
              4.3 Moderación de contenido
            </h3>
            <p>
              Nos reservamos el derecho de revisar, editar o eliminar cualquier contenido que 
              viole estos términos o que consideremos inapropiado, sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              5. Propiedad Intelectual
            </h2>
            
            <h3 className="text-base font-bold text-zinc-200 mb-2 mt-4">
              5.1 Contenido de la plataforma
            </h3>
            <p className="mb-4">
              Todo el contenido de Autobuses de Colombia, incluyendo pero no limitado a:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 ml-2">
              <li>Diseño, estructura y organización del sitio web</li>
              <li>Logotipos, marcas y elementos gráficos</li>
              <li>Textos, artículos y noticias creadas por nuestro equipo</li>
              <li>Base de datos de empresas, rutas y destinos</li>
              <li>Software y código fuente</li>
            </ul>
            <p className="mb-6">
              Está protegido por derechos de autor y otras leyes de propiedad intelectual. 
              No puedes copiar, reproducir, distribuir o crear trabajos derivados sin autorización expresa.
            </p>

            <h3 className="text-base font-bold text-zinc-200 mb-2">
              5.2 Fotografías de usuarios
            </h3>
            <p className="mb-6">
              Las fotografías subidas por usuarios permanecen como propiedad de sus autores originales. 
              Todos los créditos fotográficos se otorgan adecuadamente según lo proporcionado por el autor.
            </p>

            <h3 className="text-base font-bold text-zinc-200 mb-2">
              5.3 Uso de marcas comerciales
            </h3>
            <p>
              Los nombres, logotipos y marcas de empresas de transporte mencionadas en el sitio 
              son propiedad de sus respectivos dueños y se utilizan únicamente con fines informativos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              6. Uso Aceptable
            </h2>
            <p className="mb-4">
              Al utilizar Autobuses de Colombia, te comprometes a NO:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Utilizar el sitio para actividades ilegales o fraudulentas</li>
              <li>Intentar acceder a áreas restringidas o datos de otros usuarios</li>
              <li>Transmitir virus, malware o código malicioso</li>
              <li>Realizar scraping, minería de datos o extracción automatizada de contenido</li>
              <li>Interferir con el funcionamiento normal del sitio</li>
              <li>Publicar contenido que viole derechos de terceros</li>
              <li>Acosar, amenazar o difamar a otros usuarios</li>
              <li>Suplantar la identidad de personas o entidades</li>
              <li>Usar el sitio para enviar spam o publicidad no autorizada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              7. Información de Precios y Tarifas
            </h2>
            <p className="mb-4">
              En relación con la información de precios y tarifas de pasajes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Los precios mostrados son referenciales y pueden variar</li>
              <li>La información se obtiene de fuentes públicas y empresas de transporte</li>
              <li>No garantizamos la disponibilidad de pasajes a los precios indicados</li>
              <li>No somos una agencia de viajes ni vendemos pasajes directamente</li>
              <li>Debes confirmar precios y disponibilidad con las empresas de transporte</li>
              <li>No somos responsables por cambios en tarifas o condiciones de viaje</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              8. Limitación de Responsabilidad
            </h2>
            
            <h3 className="text-base font-bold text-zinc-200 mb-2 mt-4">
              8.1 Información proporcionada
            </h3>
            <p className="mb-6">
              Autobuses de Colombia proporciona información con fines educativos e informativos. 
              Hacemos nuestro mejor esfuerzo para mantener la información actualizada y precisa, 
              pero no garantizamos la exactitud, integridad o actualidad de la información.
            </p>

            <h3 className="text-base font-bold text-zinc-200 mb-2">
              8.2 Enlaces externos
            </h3>
            <p className="mb-6">
              Nuestro sitio puede contener enlaces a sitios web de terceros (empresas de transporte, 
              terminales, etc.). No somos responsables del contenido o prácticas de estos sitios externos.
            </p>

            <h3 className="text-base font-bold text-zinc-200 mb-2">
              8.3 Disponibilidad del servicio
            </h3>
            <p className="mb-6">
              No garantizamos que el sitio esté disponible de forma ininterrumpida o libre de errores. 
              Podemos suspender o modificar el servicio temporalmente para mantenimiento o mejoras.
            </p>

            <h3 className="text-base font-bold text-zinc-200 mb-2">
              8.4 Exclusión de garantías
            </h3>
            <p>
              El sitio se proporciona &quot;tal cual&quot; y &quot;según disponibilidad&quot;, sin garantías de ningún 
              tipo, expresas o implícitas. No garantizamos que el servicio satisfaga tus necesidades 
              o expectativas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              9. Indemnización
            </h2>
            <p className="mb-4">
              Aceptas indemnizar y mantener indemne a Autobuses de Colombia, sus directores, 
              empleados y colaboradores de cualquier reclamación, daño, pérdida o gasto (incluyendo 
              honorarios legales) que surja de:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Tu uso del sitio web</li>
              <li>Tu violación de estos Términos y Condiciones</li>
              <li>Tu violación de derechos de terceros</li>
              <li>Contenido que publiques en la plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              10. Reclamaciones por Infracción de Derechos de Autor
            </h2>
            <p className="mb-4">
              Si crees que tu contenido ha sido copiado de una manera que constituye una infracción 
              de derechos de autor, proporciona la siguiente información:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Identificación del trabajo con derechos de autor infringido</li>
              <li>Identificación del material que se reclama como infractor</li>
              <li>Tu información de contacto</li>
              <li>Una declaración de buena fe</li>
              <li>Una declaración bajo pena de perjurio de que la información es precisa</li>
              <li>Firma física o electrónica del propietario de los derechos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              11. Política de Privacidad
            </h2>
            <p>
              El uso de información personal está regido por nuestra Política de Privacidad. 
              Al utilizar nuestros servicios, aceptas la recopilación y uso de información según 
              se describe en dicha política.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              12. Ley Aplicable y Jurisdicción
            </h2>
            <p>
              Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. 
              Cualquier disputa que surja en relación con estos términos estará sujeta a la 
              jurisdicción exclusiva de los tribunales competentes de Colombia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              13. Modificaciones de los Términos
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier 
              momento. Los cambios entrarán en vigor inmediatamente después de su publicación en 
              el sitio web. Tu uso continuado del sitio después de la publicación de cambios 
              constituye tu aceptación de dichos cambios.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              14. Divisibilidad
            </h2>
            <p>
              Si alguna disposición de estos términos se considera inválida o inaplicable, las 
              disposiciones restantes continuarán en pleno vigor y efecto.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-zinc-800/60 pb-2 uppercase tracking-wide">
              15. Contacto
            </h2>
            <p className="mb-4">
              Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos:
            </p>
            <div className="bg-zinc-950/60 border border-zinc-850/60 p-6 rounded-xl space-y-2.5 mb-6">
              <p className="text-zinc-300">
                <strong className="text-white">Email:</strong> autobusesdecolombiaoficial@gmail.com
              </p>
              <p className="text-zinc-300">
                <strong className="text-white">Sitio web:</strong> www.autobusesdecolombia.com
              </p>
              <p className="text-zinc-300">
                <strong className="text-white">Sección:</strong> Contacto
              </p>
            </div>
          </section>

          <section className="border-t border-zinc-850/60 pt-8 mt-8">
            <div className="bg-amber-500/5 border-l-4 border-amber-500/85 p-6 rounded-r-xl">
              <p className="text-white font-bold mb-2">
                Aceptación de los Términos
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Al hacer clic en &quot;Acepto&quot;, al registrarte, o al utilizar cualquier parte de 
                Autobuses de Colombia, reconoces que has leído, entendido y aceptado estar 
                legalmente vinculado por estos Términos y Condiciones y nuestra Política de Privacidad.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}