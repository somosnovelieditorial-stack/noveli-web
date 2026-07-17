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
    <div className="service-detail-wrapper-outer">
      <div className="service-detail-container">
        
        {/* Back Link */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <Link to="/servicios" className="service-detail-back-link">
            ← Volver a servicios
          </Link>
        </div>

        {/* Header Block */}
        <header className="service-detail-header-compact">
          <span className="service-detail-category-tag">
            {service.category || 'SERVICIO EDITORIAL'}
          </span>
          <h1 className="service-detail-title-compact">
            {service.title}
          </h1>
          {service.short_description && (
            <p className="service-detail-subtitle-compact">
              {service.short_description}
            </p>
          )}
        </header>

        {/* Main Card */}
        <div className="service-detail-card">
          
          {/* Left Column: Visual + Description */}
          <div className="service-detail-card-left">
            {(service.image_url || service.background_url) && (
              <div className="service-detail-card-img-wrapper">
                <img 
                  src={service.image_url || service.background_url} 
                  alt={service.title} 
                />
              </div>
            )}

            {service.full_description && (
              <div className="service-detail-description-block">
                <h3>Descripción del servicio</h3>
                <p>{service.full_description}</p>
              </div>
            )}
          </div>

          {/* Right Column: Commercial Summary */}
          <div className="service-detail-card-right">
            
            {/* Price Box */}
            <div className="price-box-section">
              <span className="price-box-label">VALOR ESTIMADO</span>
              <div className="price-box-value">
                {priceVal}
              </div>
              <span className="price-box-sub">Precio base de referencia</span>
              
              {service.quote_note && (
                <p className="price-box-quote-note">
                  {service.quote_note}
                </p>
              )}
            </div>

            {/* Quote Action Button */}
            <div className="price-box-action-wrapper">
              <button 
                onClick={handleQuoteClick}
                className="btn-quote-submit-editorial"
              >
                Cotiza tu proyecto
              </button>
              <p className="price-box-info-text">
                {requiresManuscriptInfo 
                  ? "Para cotizar este servicio necesitaremos páginas o palabras aproximadas del manuscrito."
                  : "Puedes iniciar la cotización sin indicar páginas o palabras."
                }
              </p>
            </div>

            {/* Checklist lists under the price inside right column */}
            <div className="price-box-lists-wrapper">
              
              {includesList.length > 0 && (
                <div className="price-box-list-block">
                  <h4>¿Qué incluye?</h4>
                  <ul>
                    {includesList.map((item, idx) => (
                      <li key={idx}>
                        <span className="list-gold-bullet">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {processStepsList.length > 0 && (
                <div className="price-box-list-block">
                  <h4>Proceso de trabajo</h4>
                  <ul className="list-process-steps">
                    {processStepsList.map((step, idx) => (
                      <li key={idx}>
                        <span className="list-gold-step-num">{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {notIncludedList.length > 0 && (
                <div className="price-box-list-block">
                  <h4>No incluye</h4>
                  <ul>
                    {notIncludedList.map((item, idx) => (
                      <li key={idx}>
                        <span className="list-gold-bullet delete-cross">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.estimated_time && (
                <div className="price-box-time-estimated">
                  ⏳ <strong>Tiempo estimado:</strong> {service.estimated_time}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      <style>{`
        .service-detail-wrapper-outer {
          background-color: #FFFFFF;
          padding: 48px 0;
          min-height: 70vh;
          text-align: left;
        }
        .service-detail-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
          box-sizing: border-box;
        }
        
        .service-detail-back-link {
          font-size: 0.8rem; 
          font-family: var(--font-sans); 
          font-weight: 600; 
          letter-spacing: 0.05em; 
          color: #C7943A; 
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s ease;
        }
        .service-detail-back-link:hover {
          color: #050505;
        }

        .service-detail-header-compact {
          margin-bottom: 32px;
          text-align: left;
        }
        .service-detail-category-tag {
          font-size: 0.72rem;
          font-family: var(--font-sans);
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #C7943A;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
        }
        .service-detail-title-compact {
          font-family: var(--font-serif-title);
          font-size: 44px;
          line-height: 1.15;
          color: #050505;
          margin: 0 0 16px 0;
          font-weight: 400;
        }
        .service-detail-subtitle-compact {
          font-size: 1.05rem;
          font-family: var(--font-serif-body);
          color: #555555;
          line-height: 1.6;
          margin: 0;
          max-width: 720px;
        }

        /* Card container */
        .service-detail-card {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 36px;
          align-items: stretch;
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-top: 3px solid #C7943A;
          border-radius: 16px;
          box-shadow: 0 18px 45px rgba(0,0,0,0.06);
          overflow: hidden;
        }

        /* Left Column */
        .service-detail-card-left {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .service-detail-card-img-wrapper {
          width: 100%;
          max-height: 260px;
          height: 260px;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid #E5E5E5;
        }
        .service-detail-card-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .service-detail-description-block h3 {
          font-family: var(--font-serif-title);
          font-size: 24px;
          color: #050505;
          margin: 0 0 12px 0;
          font-weight: 400;
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 8px;
        }
        .service-detail-description-block p {
          font-family: var(--font-serif-body);
          font-size: 0.95rem;
          color: #555555;
          line-height: 1.65;
          margin: 0;
          white-space: pre-line;
        }

        /* Right Column */
        .service-detail-card-right {
          background-color: #FAFAF7;
          padding: 32px;
          border-left: 1px solid #E5E5E5;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .price-box-section {
          text-align: center;
        }
        .price-box-label {
          font-size: 0.68rem;
          font-family: var(--font-sans);
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #C7943A;
          display: block;
          margin-bottom: 8px;
        }
        .price-box-value {
          font-family: var(--font-serif-title);
          color: #050505;
          font-weight: 700;
          line-height: 1.1;
          font-size: 32px;
          white-space: nowrap;
        }
        .price-box-sub {
          font-size: 0.76rem;
          color: #555555;
          display: block;
          margin-top: 4px;
        }
        .price-box-quote-note {
          font-size: 0.78rem;
          color: #555555;
          line-height: 1.4;
          margin: 12px 0 0 0;
          font-style: italic;
        }

        .price-box-action-wrapper {
          text-align: center;
        }
        .btn-quote-submit-editorial {
          width: 100%;
          height: 48px;
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
        .btn-quote-submit-editorial:hover {
          background-color: #C7943A;
          border-color: #C7943A;
          color: #050505;
        }
        .price-box-info-text {
          font-size: 0.72rem;
          color: #555555;
          line-height: 1.4;
          margin: 12px 0 0 0;
        }

        .price-box-lists-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-top: 1px solid #E5E5E5;
          padding-top: 20px;
        }
        .price-box-list-block h4 {
          font-family: var(--font-serif-title);
          font-size: 1.1rem;
          color: #050505;
          margin: 0 0 10px 0;
          font-weight: 400;
        }
        .price-box-list-block ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .price-box-list-block li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-serif-body);
          font-size: 0.88rem;
          color: #555555;
          line-height: 1.4;
        }
        .list-gold-bullet {
          color: #C7943A;
          font-weight: bold;
          flex-shrink: 0;
        }
        .list-gold-step-num {
          background-color: rgba(199, 148, 58, 0.08);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.68rem;
          font-family: var(--font-sans);
          color: #C7943A;
          margin-top: 1px;
          flex-shrink: 0;
        }
        .delete-cross {
          color: #9B6A22;
        }
        .price-box-time-estimated {
          font-size: 0.82rem;
          color: #555555;
          border-top: 1px dashed #E5E5E5;
          padding-top: 12px;
          margin-top: 8px;
        }

        /* Layout móvil */
        @media (max-width: 992px) {
          .service-detail-card {
            grid-template-columns: 1fr;
          }
          .service-detail-card-right {
            border-left: none;
            background-color: #FAFAF7;
          }
        }
        @media (max-width: 768px) {
          .service-detail-container {
            padding: 0 18px;
          }
          .service-detail-wrapper-outer {
            padding: 28px 0;
          }
          .service-detail-title-compact {
            font-size: 34px;
          }
          .service-detail-card-img-wrapper {
            max-height: 200px;
            height: 200px;
          }
          .service-detail-card-left,
          .service-detail-card-right {
            padding: 20px;
          }
          .price-box-value {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
