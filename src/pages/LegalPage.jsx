import { Link } from 'react-router-dom';

const CONTACT_EMAIL = 'somosnovelieditorial@gmail.com';

const legalPages = {
  terms: {
    eyebrow: 'Condiciones de servicio',
    title: 'Términos y Condiciones de Servicios Editoriales',
    intro: [
      'Estos Términos y Condiciones regulan la contratación de servicios ofrecidos por Noveli Editorial a través de su sitio web, redes sociales, correo electrónico, propuestas comerciales o cualquier otro canal oficial de contacto.',
      'Noveli Editorial presta servicios editoriales, creativos, técnicos y de acompañamiento para autores, incluyendo, entre otros, corrección, revisión, maquetación, diseño de portada, preparación de archivos digitales o impresos, asesoría de autopublicación, difusión editorial y gestión de registros cuando corresponda.',
      'La solicitud enviada desde la web no constituye contratación automática. Todo servicio queda sujeto a revisión del material, confirmación del alcance, emisión de propuesta comercial y aceptación expresa por parte del autor o cliente.'
    ],
    sections: [
      {
        title: 'Naturaleza de los servicios',
        body: 'Noveli Editorial ofrece servicios personalizados de apoyo editorial. La intervención puede ser creativa, técnica, gráfica, administrativa o de acompañamiento, según el alcance aprobado para cada proyecto.'
      },
      {
        title: 'Solicitudes y cotizaciones',
        body: 'Toda solicitud recibida por el sitio web, redes sociales, correo electrónico u otro canal oficial será revisada antes de emitir una propuesta. El envío de una solicitud no implica contratación automática ni reserva de cupo editorial.'
      },
      {
        title: 'Alcance de los servicios',
        body: 'El alcance definitivo se establece en la propuesta comercial aceptada por el cliente. Cualquier actividad no incluida expresamente en esa propuesta se entenderá excluida y podrá cotizarse por separado.'
      },
      {
        title: 'Obligaciones del cliente',
        body: 'El cliente debe entregar información veraz, responder las solicitudes editoriales necesarias y aprobar oportunamente avances, cambios o entregas. También declara que el material entregado es propio o cuenta con las autorizaciones correspondientes.'
      },
      {
        title: 'Entrega de manuscritos y materiales',
        body: 'Los manuscritos, imágenes, referencias, textos, datos de autor y demás materiales deben entregarse en formatos adecuados para el servicio contratado. Noveli puede solicitar antecedentes adicionales para cotizar o ejecutar correctamente el trabajo.'
      },
      {
        title: 'Plazos estimados',
        body: 'Los plazos dependen de la extensión, complejidad, respuesta del autor y disponibilidad editorial. Las fechas finales se definen en la propuesta comercial y pueden ajustarse si el cliente demora entregas, revisiones o aprobaciones.'
      },
      {
        title: 'Pagos y condiciones comerciales',
        body: 'Los valores, formas de pago, anticipos, cuotas y condiciones comerciales se indican en cada propuesta. El inicio del trabajo puede quedar sujeto al pago inicial o a la condición acordada por escrito.'
      },
      {
        title: 'Cambios, revisiones y aprobaciones',
        body: 'Cada servicio incluye las rondas de revisión indicadas en la propuesta. Todo cambio fuera del alcance aprobado, nuevas versiones, rediseños, ampliaciones o ajustes posteriores pueden cotizarse aparte.'
      },
      {
        title: 'Servicios no incluidos',
        body: 'La impresión, publicidad pagada, ISBN, derechos de autor, depósito legal o distribución pueden ser servicios separados si no están incluidos expresamente en la propuesta.'
      },
      {
        title: 'Propiedad intelectual',
        body: 'Los derechos de autor pertenecen al autor, salvo pacto escrito distinto. Noveli no adquiere titularidad sobre la obra por prestar servicios editoriales. No se aceptan obras que vulneren derechos de terceros, plagio, contenido ilegal o uso no autorizado de material protegido.'
      },
      {
        title: 'Publicación y distribución',
        body: 'La publicación, aprobación, visibilidad, ranking, disponibilidad o permanencia de una obra en plataformas externas depende de las políticas de cada plataforma, imprenta, distribuidor o registro.'
      },
      {
        title: 'Limitación de responsabilidad',
        body: 'Noveli no garantiza ventas, posicionamiento, ranking, viralización, recuperación de inversión ni aceptación por plataformas externas. El autor es responsable por la veracidad, originalidad y legalidad del contenido entregado.'
      },
      {
        title: 'Comunicaciones oficiales',
        body: 'Las comunicaciones vinculadas a cotizaciones, aprobaciones, cambios, entregas y cancelaciones deberán realizarse por canales oficiales, especialmente correo electrónico o los medios expresamente acordados.'
      },
      {
        title: 'Modificaciones de condiciones',
        body: 'Noveli Editorial puede actualizar estas condiciones para reflejar cambios operativos, legales o comerciales. La versión publicada en el sitio web será la referencia general aplicable a nuevas solicitudes.'
      },
      {
        title: 'Legislación aplicable',
        body: 'Estas condiciones se interpretarán conforme a la normativa aplicable al servicio contratado y al país o jurisdicción que corresponda según la relación comercial acordada.'
      }
    ]
  },
  privacy: {
    eyebrow: 'Datos personales',
    title: 'Política de Privacidad',
    intro: [
      'Noveli Editorial recopila datos personales entregados voluntariamente por los usuarios a través de formularios de contacto, solicitudes editoriales, correos electrónicos o mensajes en redes sociales.'
    ],
    sections: [
      {
        title: 'Datos que pueden recopilarse',
        list: ['nombre', 'correo electrónico', 'teléfono', 'Instagram', 'país o ciudad', 'información del proyecto editorial', 'datos del manuscrito', 'servicio de interés']
      },
      {
        title: 'Finalidades del tratamiento',
        list: ['responder solicitudes', 'preparar cotizaciones', 'contactar al autor', 'gestionar propuestas comerciales', 'registrar solicitudes en el CRM', 'dar seguimiento editorial o comercial', 'mejorar la atención']
      },
      {
        title: 'Uso y resguardo de datos',
        body: 'Noveli Editorial utiliza los datos únicamente para fines vinculados a la atención, evaluación y gestión de solicitudes editoriales o comerciales.'
      },
      {
        title: 'No venta de datos',
        body: 'Noveli Editorial no vende datos personales de usuarios, autores o clientes.'
      },
      {
        title: 'Terceros necesarios',
        body: 'Los datos no se comparten con terceros salvo proveedores necesarios para prestar el servicio o cuando exista obligación legal. El sitio puede usar herramientas externas como Supabase, Vercel, Resend u otras plataformas técnicas necesarias para operar.'
      },
      {
        title: 'Corrección o eliminación',
        body: 'El usuario puede solicitar corrección o eliminación de sus datos escribiendo al correo oficial de contacto legal.'
      }
    ]
  },
  limits: {
    eyebrow: 'Responsabilidad editorial',
    title: 'Límites Legales y Responsabilidad Editorial',
    intro: [
      'Noveli Editorial no actúa como representante legal, agente literario, abogado, contador, imprenta propia ni plataforma de venta, salvo que se indique expresamente por escrito.'
    ],
    sections: [
      {
        title: 'Resultados comerciales',
        body: 'Noveli no garantiza resultados comerciales, ventas, recuperación de inversión, posicionamiento, ranking, viralización ni recepción pública de una obra.'
      },
      {
        title: 'Plataformas externas',
        body: 'Noveli no garantiza aprobación en Amazon, plataformas de distribución, imprentas o registros externos. Cada proveedor externo aplica sus propias reglas, tiempos y criterios.'
      },
      {
        title: 'Responsabilidad del autor',
        body: 'El autor es responsable de la veracidad, originalidad y legalidad de su obra. Noveli no se responsabiliza por contenido entregado por el autor que infrinja derechos de terceros.'
      },
      {
        title: 'Servicios legales y registros',
        body: 'Los servicios legales como derechos de autor, ISBN o depósito legal se gestionan según disponibilidad y alcance contratado. El depósito legal, cuando corresponda, depende de la normativa vigente y del tipo de publicación. La Biblioteca Nacional señala que el Depósito Legal obliga a enviar ejemplares al momento de publicación según la normativa aplicable.'
      },
      {
        title: 'Rechazo de proyectos',
        body: 'Noveli puede rechazar proyectos con plagio, contenido ilegal, ofensivo, discriminatorio, engañoso o que exponga legalmente a la editorial.'
      }
    ]
  },
  workflow: {
    eyebrow: 'Proceso editorial',
    title: 'Cómo Trabajamos',
    intro: [
      'Cada proyecto se trabaja según su alcance, extensión, estado del manuscrito y necesidades editoriales. Algunos servicios requieren conocer el número aproximado de páginas o palabras para entregar una cotización más precisa.'
    ],
    sections: [
      {
        title: 'Flujo de trabajo',
        ordered: ['Recepción de solicitud', 'Revisión inicial del proyecto', 'Solicitud de información adicional', 'Cotización o propuesta comercial', 'Aceptación del servicio', 'Pago inicial o condición acordada', 'Recepción de materiales', 'Inicio del trabajo editorial', 'Rondas de revisión según el servicio', 'Aprobación del autor', 'Entrega final', 'Cierre del proyecto o servicios adicionales']
      },
      {
        title: 'Información necesaria',
        body: 'Para corrección, maquetación y packs editoriales se solicita extensión del manuscrito. Para portada, difusión o registros legales puede no requerirse manuscrito completo.'
      },
      {
        title: 'Tiempos de respuesta',
        body: 'La respuesta inicial puede tardar hasta 3 días hábiles. Los plazos finales se definen en la propuesta comercial.'
      }
    ]
  },
  refunds: {
    eyebrow: 'Condiciones comerciales',
    title: 'Política de Reembolsos, Cambios y Cancelaciones',
    intro: [
      'Debido a la naturaleza personalizada de los servicios editoriales, cada solicitud se evalúa según el avance del trabajo, el tipo de servicio contratado y las condiciones pactadas en la propuesta comercial.'
    ],
    sections: [
      {
        title: 'Trabajo no iniciado',
        body: 'Si el trabajo no ha iniciado, puede evaluarse devolución total o parcial según costos administrativos, comisiones, reservas de agenda u otros costos ya comprometidos.'
      },
      {
        title: 'Trabajo iniciado',
        body: 'Si el trabajo ya inició, los pagos asociados a horas de trabajo, revisión, diseño, gestión o planificación pueden no ser reembolsables.'
      },
      {
        title: 'Materiales pendientes',
        body: 'Si el cliente no entrega materiales necesarios, los plazos pueden pausarse hasta recibir la información o archivos requeridos.'
      },
      {
        title: 'Cambios fuera de alcance',
        body: 'Los cambios fuera del alcance aprobado se cotizan aparte y pueden modificar plazos de entrega.'
      },
      {
        title: 'Cancelaciones',
        body: 'La cancelación debe solicitarse por escrito a través de un canal oficial de Noveli Editorial.'
      },
      {
        title: 'Servicios de terceros',
        body: 'Servicios de terceros, registros, impresiones, campañas o plataformas externas pueden estar sujetos a políticas propias y no depender directamente de Noveli Editorial.'
      }
    ]
  }
};

const slugify = (value) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

export default function LegalPage({ type }) {
  const page = legalPages[type] || legalPages.terms;
  const showIndex = page.sections.length >= 5;

  return (
    <section className="legal-page fade-in">
      <div className="legal-container">
        <div className="legal-header">
          <span className="section-subtitle">— {page.eyebrow} —</span>
          <h1>{page.title}</h1>
          {page.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {showIndex && (
          <nav className="legal-index" aria-label="Índice de contenidos">
            <h2>Índice</h2>
            <ol>
              {page.sections.map((section) => (
                <li key={section.title}>
                  <a href={`#${slugify(section.title)}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="legal-content">
          {page.sections.map((section) => (
            <article key={section.title} id={slugify(section.title)} className="legal-section">
              <h2>{section.title}</h2>
              {section.body && <p>{section.body}</p>}
              {section.list && (
                <ul>
                  {section.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {section.ordered && (
                <ol>
                  {section.ordered.map((item) => <li key={item}>{item}</li>)}
                </ol>
              )}
            </article>
          ))}
        </div>

        <div className="legal-contact">
          <h2>Contacto legal</h2>
          <p>
            Para consultas sobre estos términos, privacidad o condiciones de servicio, puedes escribir a:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>

        <div className="legal-back">
          <Link to="/contacto" className="btn btn-outline">Contactar a Noveli</Link>
        </div>
      </div>
    </section>
  );
}
