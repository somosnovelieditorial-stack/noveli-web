import { useLocation } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

export default function ContactPage({ services = [], links = {} }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedServiceFromQuery = queryParams.get('servicio');
  const selectedService = selectedServiceFromQuery || location.state?.selectedService || 'General';

  return (
    <div className="section contact-page-wrapper fade-in" style={{ backgroundColor: 'var(--crema-papel-light)', minHeight: '85vh', paddingTop: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-title-wrapper" style={{ marginBottom: '32px' }}>
          <span className="section-subtitle">— PROPUESTA EDITORIAL —</span>
          <h1 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '12px' }}>Inicia tu proyecto editorial</h1>
          <p className="contact-manifesto-p" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
            Envíanos detalles sobre tu manuscrito y tus datos de contacto. Un editor revisará tu propuesta en un plazo máximo de 3 días hábiles.
          </p>
        </div>

        {/* Dynamic Service selection prefill banner */}
        {(selectedServiceFromQuery || location.state?.selectedService) && (
          <div style={{
            padding: '12px 18px',
            backgroundColor: 'rgba(199, 148, 58, 0.08)',
            borderLeft: '4px solid var(--accent-gold)',
            color: 'var(--wine-dark)',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            borderRadius: '0 4px 4px 0',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            Servicio seleccionado para propuesta: <strong>{selectedService}</strong>
          </div>
        )}

        {/* Contact Form Wrapper */}
        <ContactForm email={links.email} services={services} initialService={selectedService} />

        <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <p>¿Prefieres escribirnos directamente? Envíanos un correo a <a href={`mailto:${links.email}`} style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{links.email}</a></p>
        </div>
      </div>
    </div>
  );
}
