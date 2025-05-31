import React from "react";

function TermsAndConditions() {
  return (
    <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>Términos y Condiciones</h3>
      <p>
        Bienvenido(a) a nuestra tienda en línea de prendas personalizadas. Al registrarte y utilizar nuestros servicios, aceptas los siguientes términos y condiciones:
      </p>
      <ol>
        <li>
          <strong>Registro y Cuenta:</strong> El usuario se compromete a proporcionar información real, actual y completa al momento de registrarse. Es responsable de mantener la confidencialidad de su cuenta y contraseña.
        </li>
        <li>
          <strong>Uso del Servicio:</strong> Solo se permite el uso del sitio para fines personales y lícitos. Está prohibido utilizar la plataforma para actividades fraudulentas, suplantación de identidad o violación de derechos de terceros.
        </li>
        <li>
          <strong>Personalización de Prendas:</strong> Los diseños personalizados generados a través de nuestra herramienta de IA son responsabilidad del usuario. No se permite crear o solicitar prendas con contenido ofensivo, ilegal o que infrinja derechos de autor.
        </li>
        <li>
          <strong>Privacidad y Protección de Datos:</strong> Tus datos personales serán tratados conforme a nuestra política de privacidad, utilizados únicamente para gestionar tu cuenta, compras y mejorar tu experiencia en la tienda.
        </li>
        <li>
          <strong>Compras y Pagos:</strong> Toda compra realizada en el sitio está sujeta a disponibilidad, verificación de pago y cumplimiento de los requisitos establecidos.
        </li>
        <li>
          <strong>Propiedad Intelectual:</strong> El contenido, imágenes y herramientas de la plataforma pertenecen a la tienda. Los usuarios no pueden copiar, modificar o distribuir el contenido sin autorización.
        </li>
        <li>
          <strong>Modificación de Términos:</strong> La tienda se reserva el derecho de modificar estos términos en cualquier momento. Los cambios se publicarán en el sitio web y serán efectivos a partir de su publicación.
        </li>
        <li>
          <strong>Contacto:</strong> Para cualquier consulta o reclamo, puedes contactarnos a través del correo de soporte indicado en la plataforma.
        </li>
      </ol>
      <p>
        Al continuar con el registro, confirmas que has leído y aceptas estos términos y condiciones.
      </p>
    </div>
  );
}

export default TermsAndConditions;
