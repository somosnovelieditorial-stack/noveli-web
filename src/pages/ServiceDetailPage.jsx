import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatServicePrice } from '../services/dataService';

export default function ServiceDetailPage({ services = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find service by ID (from Supabase DB results)
  const service = services ? services.find(s => String(s.id) === String(id)) : null;

  if (!service) {
    return (
      <div className="section" style={{ backgroundColor: 'var(--crema-papel-light)', minHeight: '80vh', paddingTop: '120px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif-title)', color: 'var(--black-primary)', marginBottom: '16px' }}>Servicio no encontrado</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>El servicio que buscas no existe o ha sido desactivado.</p>
          <Link to="/servicios" className="btn btn-dark">VOLVER A SERVICIOS</Link>
        </div>
      </div>
    );
  }

  const handleQuoteClick = () => {
    navigate(`/contacto?servicio=${encodeURIComponent(service.title)}&service_id=${service.id}`);
  };

  // Safe helper to convert line breaks to bullet point array
  const formatListText = (textVal) => {
    if (!textVal) return [];
    return textVal
      .split('\n')
      .map(line => line.replace(/^[-*•\s]+/, '').trim())
      .filter(line => line.length > 0);
  };

  const includesList = formatListText(service.includes);
  const notIncludedList = formatListText(service.not_included);
  const processStepsList = formatListText(service.process_steps);

  const priceLabel = service.price_from ? formatServicePrice(service.price_from, service.currency) : null;

  return (
    <div className="section service-detail-page fade-in" style={{ backgroundColor: 'var(--white-primary)', minHeight: '85vh', paddingTop: '110px', paddingBottom: '70px' }}>
      <div className="container">
        
        {/* Back Link */}
        <div style={{ marginBottom: '28px', textAlign: 'left' }}>
          <Link to="/servicios" style={{ fontSize: '0.72rem', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--gold-primary)', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            ➔ VOLVER A SERVICIOS
          </Link>
        </div>

        {/* 2 Column Layout */}
        <div className="service-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '48px', alignItems: 'start' }}>
          
          {/* Left Column: Details */}
          <div className="service-detail-content" style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              {service.category || 'SERVICIO EDITORIAL'}
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '2.6rem', color: 'var(--black-primary)', marginBottom: '16px', lineHeight: 1.15 }}>
              {service.title}
            </h1>
            
            {service.short_description && (
              <p style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif-body)', color: 'var(--black-editorial)', lineHeight: '1.6', marginBottom: '24px', fontStyle: 'italic' }}>
                {service.short_description}
              </p>
            )}

            {/* Service Banner Image */}
            {(service.image_url || service.background_url) && (
              <div style={{ width: '100%', height: '280px', borderRadius: '4px', overflow: 'hidden', marginBottom: '32px', border: '1px solid var(--gray-border)', boxShadow: 'var(--shadow-sm)' }}>
                <img 
                  src={service.image_url || service.background_url} 
                  alt={service.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            )}

            {service.full_description && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.35rem', color: 'var(--black-primary)', marginBottom: '12px', borderBottom: '1px solid var(--gray-border)', paddingBottom: '8px' }}>Descripción del Servicio</h3>
                <p style={{ fontSize: '0.92rem', fontFamily: 'var(--font-serif-body)', color: 'var(--gray-text)', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {service.full_description}
                </p>
              </div>
            )}

            {/* Includes / Not Included */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '32px' }} className="detail-lists-row">
              {includesList.length > 0 && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.15rem', color: 'var(--black-primary)', marginBottom: '12px' }}>¿Qué incluye?</h4>
                  <ul style={{ paddingLeft: '16px', margin: 0 }}>
                    {includesList.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--gray-text)', marginBottom: '6px', listStyleType: 'square' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {notIncludedList.length > 0 && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.15rem', color: 'var(--black-primary)', marginBottom: '12px' }}>No incluye</h4>
                  <ul style={{ paddingLeft: '16px', margin: 0 }}>
                    {notIncludedList.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--gray-text)', marginBottom: '6px', listStyleType: 'circle' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Process Steps */}
            {processStepsList.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.35rem', color: 'var(--black-primary)', marginBottom: '16px', borderBottom: '1px solid var(--gray-border)', paddingBottom: '8px' }}>Proceso de Trabajo</h3>
                <ol style={{ paddingLeft: '18px', margin: 0 }}>
                  {processStepsList.map((step, idx) => (
                    <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--gray-text)', marginBottom: '10px', lineHeight: '1.5' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Action Box */}
          <div className="service-detail-sidebar" style={{ position: 'sticky', top: '100px' }}>
            <div style={{
              backgroundColor: 'var(--white-primary)',
              border: '1px solid var(--accent-gold)',
              padding: '30px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
              borderRadius: '4px'
            }}>
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                VALOR ESTIMADO
              </span>
              
              {priceLabel ? (
                <>
                  <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif-title)', color: 'var(--black-primary)', fontWeight: 700, marginBottom: '4px' }}>
                    {priceLabel}
                  </div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'block', marginBottom: '24px' }}>
                    Precio base de referencia
                  </span>
                </>
              ) : (
                <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif-title)', color: 'var(--black-primary)', fontWeight: 700, marginBottom: '24px' }}>
                  A cotizar
                </div>
              )}

              {/* Estimate times */}
              {(service.estimated_time || service.quote_note) && (
                <div style={{ textAlign: 'left', marginBottom: '24px', backgroundColor: 'var(--white-warm)', padding: '16px', border: '1px solid var(--gray-border)', borderRadius: '4px' }}>
                  {service.estimated_time && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--gray-text)', marginBottom: service.quote_note ? '8px' : '0', lineHeight: '1.4' }}>
                      ⏳ <strong>Tiempo estimado:</strong> {service.estimated_time}
                    </p>
                  )}
                  {service.quote_note && (
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '0', lineHeight: '1.4', fontStyle: 'italic' }}>
                      📋 <strong>Nota:</strong> {service.quote_note}
                    </p>
                  )}
                </div>
              )}

              <button 
                onClick={handleQuoteClick}
                className="btn btn-dark"
                style={{ width: '100%', padding: '12px', fontSize: '0.78rem', letterSpacing: '0.08em', fontWeight: 700 }}
              >
                COTIZA TU PROYECTO
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Inline styles for media queries */}
      <style>{`
        @media (max-width: 992px) {
          .service-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .service-detail-sidebar {
            position: static !important;
            margin-top: 16px;
          }
        }
        @media (max-width: 640px) {
          .detail-lists-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .service-detail-content h1 {
            font-size: 2.0rem !important;
          }
        }
      `}</style>
    </div>
  );
}
