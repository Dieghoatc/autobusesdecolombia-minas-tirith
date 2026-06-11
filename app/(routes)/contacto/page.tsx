
import type { Metadata } from "next";
import { FormContact } from "./components/FormContact";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contáctanos | Autobuses de Colombia",
  description: "Ponte en contacto con Autobuses de Colombia para explorar alianzas, patrocinios, oportunidades de negocio o enviarnos sugerencias.",
};

export default function ContactPage() { 

  return (
    <div className="contact">
      <div className="contact-content">
        <div className="contact-content__text">
          <h1>Contáctanos</h1>
          <blockquote>
            En Autobuses de Colombia, nuestra visión es ser el portal líder en
            contenido sobre transporte en el país para el 2025. Nuestra misión
            es construir una comunidad sólida y referente para empresas, marcas
            y emprendimientos del sector. Si quieres ser parte de este proyecto
            en crecimiento, contáctanos para explorar <strong>alianzas</strong>,{" "}
            <strong>patrocinios</strong> y{" "}
            <strong>oportunidades de negocio.</strong>
          </blockquote>
          <p>Si tienes alguna sugerencia o comentario, no dudes en contactarnos. <span className="text-white font-semibold">autobusesdecolombiaoficial@gmail.com</span> o por el formulario de contacto.</p>
          <p>Autobuses de Colombia ¡Mucho más para ver!</p>
        </div>
        <div className="contact-form">
          <FormContact />
        </div>
      </div>
    </div>
  );
}
