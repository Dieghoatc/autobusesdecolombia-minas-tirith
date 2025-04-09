
import { FormContact } from "./components/FormContact";
import "./contact.css";

export default function ContactPage() { 

  return (
    <div className="contact">
      <div className="contact-content">
        <div className="contact-content__text">
          <h2>Contáctanos</h2>
          <blockquote>
            En Autobuses de Colombia, nuestra visión es ser el portal líder en
            contenido sobre transporte en el país para el 2025. Nuestra misión
            es construir una comunidad sólida y referente para empresas, marcas
            y emprendimientos del sector. Si quieres ser parte de este proyecto
            en crecimiento, contáctanos para explorar <strong>alianzas</strong>,{" "}
            <strong>patrocinios</strong> y{" "}
            <strong>oportunidades de negocio.</strong>
          </blockquote>
          <p>Autobuses de Colombia ¡Mucho más para ver!</p>
        </div>
        <div className="contact-form">
          <FormContact />
        </div>
      </div>
    </div>
  );
}
