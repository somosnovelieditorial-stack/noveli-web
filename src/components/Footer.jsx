import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import EditorialSkeleton from './EditorialSkeleton';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function Footer({ brandSettings, fs, services, footerGallery, loaded }) {
  const defaultFs = fs || {
    contact_title: "Contáctanos",
    contact_email: "hola@somosnoveli.cl",
    contact_location: "Santiago, Chile",
    contact_description: "Acompañamos tu proceso de escritura y autopublicación de principio a fin.",
    instagram_title: "Síguenos en Instagram",
    instagram_url: "https://instagram.com/somosnoveli",
    instagram_enabled: true
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Columna Logo e Info */}
          <div className="footer-col" style={{ gridColumn: 'span 2' }}>
            <div className="footer-logo-wrapper" style={{ marginBottom: '12px' }}>
              <a href="/" className="logo-link" style={{ textDecoration: 'none', display: 'inline-block' }}>
                <BrandLogo variant="light" brandSettings={brandSettings} />
              </a>
            </div>
            <p style={{ maxWidth: '280px', lineHeight: '1.6', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
              {defaultFs.contact_description}
            </p>
            <p style={{ marginTop: '8px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
              Atendemos autores de todo el mundo.
            </p>
            <div className="footer-socials-inline" style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              {defaultFs.instagram_url && (
                <a href={defaultFs.instagram_url} target="_blank" rel="noopener noreferrer" className="social-link-icon">
                  <InstagramIcon />
                </a>
              )}
              {defaultFs.contact_email && (
                <a href={`mailto:${defaultFs.contact_email}`} className="social-link-icon">
                  <EnvelopeIcon />
                </a>
              )}
            </div>
          </div>
          
          {/* Navegación */}
          <div className="footer-col">
            <h4>NAVEGACIÓN</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li><Link to="/libros">Libros</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div className="footer-col">
            <h4>SERVICIOS</h4>
            <ul className="footer-links">
              {services && services.slice(0, 5).map(s => (
                <li key={s.id}><Link to="/servicios">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-col">
            <h4>{(defaultFs.contact_title || 'CONTÁCTANOS').toUpperCase()}</h4>
            <ul className="footer-links">
              {defaultFs.contact_email && (
                <li><a href={`mailto:${defaultFs.contact_email}`} style={{ textTransform: 'lowercase' }}>{defaultFs.contact_email}</a></li>
              )}
              {defaultFs.contact_location && (
                <li><span>{defaultFs.contact_location}</span></li>
              )}
            </ul>
          </div>

          {/* Instagram */}
          {defaultFs.instagram_enabled !== false && (
            <div className="footer-col" style={{ minWidth: '180px' }}>
              <h4>
                {defaultFs.instagram_url ? (
                  <a href={defaultFs.instagram_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {(defaultFs.instagram_title || 'INSTAGRAM').toUpperCase()}
                  </a>
                ) : (
                  (defaultFs.instagram_title || 'INSTAGRAM').toUpperCase()
                )}
              </h4>
              
              <div className="footer-instagram-grid">
                {(() => {
                  if (!loaded) {
                    return <EditorialSkeleton type="gallery" count={6} />;
                  }
                  const activeGallery = (footerGallery || []).filter(item => item.active !== false);
                  if (activeGallery.length > 0) {
                    return activeGallery.slice(0, 6).map((item, idx) => {
                      const content = (
                        <div className="instagram-grid-item-inner" style={{ width: '56px', height: '84px', overflow: 'hidden', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <img 
                            src={item.image_url} 
                            alt={item.title || ""} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      );
                      return (
                        <div key={item.id || idx} className="instagram-grid-item" title={item.title}>
                          {item.link_url ? (
                            <a href={item.link_url} target="_blank" rel="noopener noreferrer">
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </div>
                      );
                    });
                  } else {
                    return (
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', gridColumn: 'span 3', padding: '10px 0' }}>
                        {defaultFs.instagram_url ? (
                          <a 
                            href={defaultFs.instagram_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-ver-instagram"
                            style={{
                              display: 'inline-block',
                              padding: '6px 12px',
                              backgroundColor: 'rgba(255,255,255,0.1)',
                              borderRadius: '4px',
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              fontWeight: 'bold',
                              fontSize: '0.7rem',
                              letterSpacing: '0.05em',
                              transition: 'background 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                          >
                            VER INSTAGRAM
                          </a>
                        ) : (
                          <span>Pronto compartiremos novedades editoriales.</span>
                        )}
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Noveli Editorial. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
