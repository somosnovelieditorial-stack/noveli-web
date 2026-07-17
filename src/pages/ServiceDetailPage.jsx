import { useParams, Link, useNavigate } from 'react-router-dom';

export default function ServiceDetailPage({ services = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find service by ID
  const service = services ? services.find(s => String(s.id) === String(id)) : null;

  if (!service) {
    return (
      <div className="section" style={{ backgroundColor: '#FFFFFF', minHeight: '80vh', paddingTop: '120px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif-title)', color: '#050505', marginBottom: '16px' }}>Servicio no encontrado</h2>
          <p style={{ color: '#555555', marginBottom: '24px' }}>El servicio que buscas no existe o ha sido desactivado.</p>
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

  // Exact price formatting helper matching user requirements
  const getPriceVal = (svc) => {
    if (svc.price_from && Number(svc.price_from) > 0) {
      const formatted = Number(svc.price_from).toLocaleString('es-CL');
      const currency = svc.currency || 'CLP';
      return `Desde $${formatted} ${currency}`;
    }
    return 'Cotización personalizada';
  };

  const priceVal = getPriceVal(service);
  const requiresManuscriptInfo = service.requires_manuscript_info === true;

  return (
    <div className="section service-detail-page fade-in" style={{ backgroundColor: '#FFFFFF', minHeight: '85vh', paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '1120px', padding: '0 20px', margin: '0 auto' }}>
        
        {/* Back Link */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <Link to="/servicios" className="service-detail-back-link" style={{ 
            fontSize: '0.8rem', 
            fontFamily: 'var(--font-sans)', 
            fontWeight: 600, 
            letterSpacing: '0.05em', 
            color: '#C7943A', 
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.2s ease'
          }}>
            ← Volver a servicios
          </Link>
        </div>

        {/* Header Block */}
        <header style={{ textAlign: 'left', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.12em', color: '#C7943A', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            {service.category || 'SERVICIO EDITORIAL'}
          </span>
          <h1 className="service-detail-title" style={{ 
            fontFamily: 'var(--font-serif-title)', 
            color: '#050505', 
            marginBottom: '16px', 
            lineHeight: 1.15,
            fontWeight: 400
          }}>
            {service.title}
          </h1>
          {service.short_description && (
            <p style={{ 
              fontSize: '1.05rem', 
              fontFamily: 'var(--font-serif-body)', 
              color: '#555555', 
              lineHeight: '1.6', 
              margin: 0,
              maxWidth: '680px'
            }}>
              {service.short_description}
            </p>
          )}
        </header>

        {/* 2 Column Layout */}
        <div className="service-detail-grid">
          
          {/* Left Column: Details */}
          <div className="service-detail-left">
            
            {/* Service Banner Image */}
            {(service.image_url || service.background_url) && (
              <div className="service-detail-img-container">
                <img 
                  src={service.image_url || service.background_url} 
                  alt={service.title} 
                />
              </div>
            )}

            {/* Description */}
            {service.full_description && (
              <section className="detail-section">
                <h2 className="detail-section-title">Descripción del servicio</h2>
                <p className="detail-section-text">
                  {service.full_description}
                </p>
              </section>
            )}

            {/* What's Included */}
            {includesList.length > 0 && (
              <section className="detail-section">
                <h2 className="detail-section-title">Qué incluye</h2>
                <ul className="detail-list-bullets">
                  {includesList.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-indicator">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Process Steps */}
            {processStepsList.length > 0 && (
              <section className="detail-section">
                <h2 className="detail-section-title">Proceso de trabajo</h2>
                <ul className="detail-list-bullets process-list">
                  {processStepsList.map((step, idx) => (
                    <li key={idx}>
                      <span className="bullet-indicator number-bullet">{idx + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* What's Not Included */}
            {notIncludedList.length > 0 && (
              <section className="detail-section">
                <h2 className="detail-section-title">Qué no incluye</h2>
                <ul className="detail-list-bullets no-include-list">
                  {notIncludedList.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-indicator delete-bullet">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Estimated Time (Alternative block) */}
            {service.estimated_time && (
              <section className="detail-section">
                <h2 className="detail-section-title">Tiempo estimado</h2>
                <p className="detail-section-text" style={{ fontSize: '0.92rem' }}>
                  ⏳ {service.estimated_time}
                </p>
              </section>
            )}
          </div>

          {/* Right Column: Pricing & Action Box */}
          <aside className="service-detail-right">
            <div className="service-price-card">
              <span className="price-card-label">VALOR ESTIMADO</span>
              <div className="price-card-value">
                {priceVal}
              </div>
              
              {service.quote_note && (
                <p className="price-card-note">
                  {service.quote_note}
                </p>
              )}

              <button 
                onClick={handleQuoteClick}
                className="btn-price-card-action"
              >
                Cotiza tu proyecto
              </button>

              <p className="price-card-footer-text">
                {requiresManuscriptInfo 
                  ? "Para cotizar este servicio necesitaremos páginas o palabras aproximadas del manuscrito."
                  : "No necesitas indicar páginas o palabras para iniciar esta cotización."
                }
              </p>
            </div>
          </aside>

        </div>
      </div>

      {/* Styled components CSS layer for clean layout and responsive media queries */}
      <style>{`
        .service-detail-grid {
          display: grid;
          grid-template-columns: 65% 35%;
          gap: 44px;
          align-items: start;
          text-align: left;
        }
        .service-detail-title {
          font-size: 48px;
        }
        .service-detail-img-container {
          width: 100%;
          max-height: 320px;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid #E5E5E5;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          margin-bottom: 32px;
        }
        .service-detail-img-container img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          display: block;
        }
        .detail-section {
          margin-bottom: 32px;
          text-align: left;
        }
        .detail-section-title {
          font-family: var(--font-serif-title);
          font-size: 24px;
          color: #050505;
          margin-bottom: 14px;
          font-weight: 400;
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 8px;
          max-width: 760px;
        }
        .detail-section-text {
          font-family: var(--font-serif-body);
          font-size: 0.95rem;
          color: #555555;
          line-height: 1.7;
          white-space: pre-line;
          max-width: 760px;
        }
        .detail-list-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          max-width: 760px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .detail-list-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-family: var(--font-serif-body);
          font-size: 0.95rem;
          color: #555555;
          line-height: 1.5;
        }
        .bullet-indicator {
          color: #C7943A;
          font-weight: bold;
          flex-shrink: 0;
        }
        .number-bullet {
          background-color: rgba(199, 148, 58, 0.08);
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-family: var(--font-sans);
          color: #C7943A;
          margin-top: 1px;
        }
        .delete-bullet {
          color: #9B6A22;
        }
        
        /* Sidebar Pricing Card */
        .service-price-card {
          background-color: #FFFFFF;
          border: 1px solid rgba(199, 148, 58, 0.25);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
          max-width: 320px;
          position: sticky;
          top: 96px;
          margin-left: auto;
          text-align: center;
        }
        .price-card-label {
          font-size: 0.68rem;
          font-family: var(--font-sans);
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #C7943A;
          display: block;
          margin-bottom: 8px;
        }
        .price-card-value {
          font-family: var(--font-serif-title);
          color: #050505;
          font-weight: 700;
          margin-bottom: 12px;
          white-space: nowrap;
          line-height: 1.1;
          font-size: 32px;
        }
        .price-card-note {
          font-size: 0.78rem;
          color: #555555;
          line-height: 1.4;
          margin: 0 0 16px 0;
          font-style: italic;
        }
        .btn-price-card-action {
          width: 100%;
          height: 46px;
          background-color: #050505;
          color: #FFFFFF;
          border: 1px solid #050505;
          border-radius: 0;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-price-card-action:hover {
          background-color: #C7943A;
          border-color: #C7943A;
          color: #050505;
        }
        .price-card-footer-text {
          font-size: 0.72rem;
          color: #555555;
          line-height: 1.4;
          margin: 12px 0 0 0;
        }

        /* Responsive Media Queries */
        @media (max-width: 992px) {
          .service-detail-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .service-price-card {
            position: static;
            margin: 20px auto 0;
            width: 100%;
            max-width: 100%;
          }
        }
        @media (max-width: 768px) {
          .service-detail-page {
            padding-top: 80px !important;
            padding-bottom: 40px !important;
          }
          .service-detail-title {
            font-size: 34px;
          }
          .service-detail-img-container {
            max-height: 220px;
            margin-bottom: 24px;
          }
          .service-detail-img-container img {
            height: 220px;
          }
          .detail-section-title {
            font-size: 20px;
          }
          .price-card-value {
            font-size: 30px;
          }
        }
      `}</style>
    </div>
  );
}
