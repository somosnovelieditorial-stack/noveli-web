import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { HashRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { fetchWebsiteData, getCachedWebsiteData, fallbackData, getBookCover, defaultWebsiteSettings, getLogoSrc } from './services/dataService'
import HomePage from './pages/HomePage'

// Lazy loaded page components
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const BooksPage = lazy(() => import('./pages/BooksPage'))
const NosotrosPage = lazy(() => import('./pages/NosotrosPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))

import BookCover from './components/BookCover'
import EditorialSkeleton from './components/EditorialSkeleton'
import SideNavigation from './components/SideNavigation'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

// Inline SVG Icon Components
const EnvelopeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

function AppContent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(() => {
    const cached = getCachedWebsiteData();
    return cached || fallbackData;
  });
  const [loaded, setLoaded] = useState(() => !!getCachedWebsiteData());
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const location = useLocation();

  const { services, books, sections, links, footerSettings, footerGallery, settings } = data || {};
  const websiteSettings = settings || defaultWebsiteSettings;

  // Shared getLogoSrc utility is imported from dataService.js
  const logoSrc = getLogoSrc(websiteSettings, 'dark');
  const logoLightSrc = getLogoSrc(websiteSettings, 'light');

  useEffect(() => {
    if (websiteSettings && websiteSettings.favicon_url) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = websiteSettings.favicon_url;
    }
  }, [websiteSettings]);

  if (import.meta.env.DEV) {
    console.log('Website settings cargados:', websiteSettings);
    console.log('Logo header:', logoSrc);
    console.log('Logo footer:', logoLightSrc);
  }

  const fs = footerSettings || {
    contact_title: "Contáctanos",
    contact_email: "hola@somosnoveli.cl",
    contact_location: "Santiago, Chile",
    contact_description: "Acompañamos tu proceso de escritura y autopublicación de principio a fin.",
    instagram_title: "Síguenos en Instagram",
    instagram_url: "https://instagram.com/somosnoveli",
    instagram_enabled: true
  };

  const loadData = async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      const result = await fetchWebsiteData();
      if (result) {
        setData(result);
        setLoaded(true);
      }
    } catch (err) {
      console.error("Critical error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update website metadata (Title and Favicon) dynamically when data resolves
  useEffect(() => {
    const brand = websiteSettings?.brand_name || defaultWebsiteSettings.brand_name;
    document.title = `${brand} | Editorial Independiente`;
    
    const favUrl = websiteSettings?.favicon_url;
    if (favUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = favUrl;
    }
  }, [websiteSettings]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleReload = () => {
    loadData(true);
  };

  // Render header dynamically based on route (or always cream background #F6EFE3 to ensure legibility)
  const isHome = location.pathname === '/';
  const headerClass = `header header-cream-solid`;

  // No full-screen blocking loader unless it's a critical error (data is null/undefined)
  if (!data) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Conectando con la editorial...</p>
      </div>
    );
  }

  return (
    <div className="app-routing-wrapper">
      
      {/* 1. Legible Solid Cream Header (#F6EFE3) */}
      <header className={headerClass} style={{ position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)', backdropFilter: 'blur(8px)', backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(199, 148, 58, 0.15)', height: '68px', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%', padding: '0 20px' }}>
          
          {/* Izquierda: Botón MENÚ */}
          <div style={{ justifySelf: 'start' }}>
            <button 
              onClick={() => setSideNavOpen(true)} 
              aria-label="Abrir menú"
              aria-expanded={sideNavOpen}
              id="btn-menu-toggle-editorial"
              className="btn-header-menu-toggle"
              style={{ 
                backgroundColor: 'transparent',
                color: 'var(--wine-dark)',
                border: '1px solid var(--wine-dark)',
                borderRadius: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              MENÚ ☰
            </button>
          </div>

          {/* Centro: Logo */}
          <div style={{ justifySelf: 'center' }}>
            <Link to="/" className="logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {logoSrc ? (
                <img 
                  src={logoSrc} 
                  alt={websiteSettings?.brand_name || 'Noveli Editorial'} 
                  className="site-logo-image brand-logo-dark"
                />
              ) : (
                <div className="logo-text" style={{ color: 'var(--wine-dark)', margin: 0 }}>
                  {websiteSettings?.brand_name || 'NOVELI'}
                  <span className="logo-sub" style={{ color: 'var(--text-muted)' }}>{websiteSettings?.brand_subtitle || ' — EDITORIAL'}</span>
                  <svg className="logo-leaf" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px', display: 'inline-block', verticalAlign: 'middle' }}>
                    <path d="M2 22C2 22 10 22 16 16C21 11 20 4 20 4C20 4 13 3 8 8C2 14 2 22 2 22Z" fill="var(--accent-gold)" />
                    <path d="M12 12L2 22" />
                  </svg>
                </div>
              )}
            </Link>
          </div>

          {/* Derecha: Botón SOLICITAR PROPUESTA */}
          <div style={{ justifySelf: 'end' }} className="header-cta-wrapper-dynamic">
            <Link 
              to="/contacto" 
              className="btn btn-header-cta-dynamic" 
              style={{
                backgroundColor: 'var(--accent-gold)',
                color: 'var(--wine-dark)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '8px 16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
            >
              SOLICITAR PROPUESTA
            </Link>
          </div>
          
        </div>
      </header>

      {/* Pages Content Container */}
      <main className="main-content-flow">
        <Suspense fallback={
          <div className="container" style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#555555' }}>
            <div className="spinner" style={{ margin: '0 auto 16px auto' }}></div>
            Cargando sección...
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage data={data} loaded={loaded} handleReload={handleReload} />} />
            <Route path="/servicios" element={<ServicesPage services={services} servicesError={data.servicesError} />} />
            <Route path="/servicios/:id" element={<ServiceDetailPage services={services} />} />
            <Route path="/libros" element={<BooksPage books={books} bookCategories={data.bookCategories} booksError={data.booksError} handleReload={handleReload} />} />
            <Route path="/nosotros" element={<NosotrosPage sections={sections} links={links} />} />
            <Route path="/contacto" element={<ContactPage services={services} links={links} />} />
          </Routes>
        </Suspense>
      </main>

      {/* 7. Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ gridColumn: 'span 2' }}>
              <div className="footer-logo-wrapper" style={{ marginBottom: '12px' }}>
                <Link to="/" className="logo-link" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  {logoLightSrc ? (
                    <img 
                      src={logoLightSrc} 
                      alt={websiteSettings?.brand_name || 'Noveli Editorial'} 
                      className="site-logo-image brand-logo-light"
                    />
                  ) : (
                    <div className="logo-text footer-logo" style={{ color: '#FFFFFF', margin: 0 }}>
                      {websiteSettings?.brand_name || 'NOVELI'}
                      <span className="logo-sub">{websiteSettings?.brand_subtitle || ' — EDITORIAL'}</span>
                      <svg className="logo-leaf" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px', display: 'inline-block', verticalAlign: 'middle' }}>
                        <path d="M2 22C2 22 10 22 16 16C21 11 20 4 20 4C20 4 13 3 8 8C2 14 2 22 2 22Z" fill="var(--accent-gold)" />
                        <path d="M12 12L2 22" />
                      </svg>
                    </div>
                  )}
                </Link>
              </div>
              <p style={{ maxWidth: '280px', lineHeight: '1.6', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                {fs.contact_description}
              </p>
              <div className="footer-socials-inline" style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                {fs.instagram_url && (
                  <a href={fs.instagram_url} target="_blank" rel="noopener noreferrer" className="social-link-icon">
                    <InstagramIcon />
                  </a>
                )}
                {fs.contact_email && (
                  <a href={`mailto:${fs.contact_email}`} className="social-link-icon">
                    <EnvelopeIcon />
                  </a>
                )}
              </div>
            </div>
            
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

            <div className="footer-col">
              <h4>SERVICIOS</h4>
              <ul className="footer-links">
                {services && services.slice(0, 5).map(s => (
                  <li key={s.id}><Link to="/servicios">{s.title}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>{fs.contact_title.toUpperCase()}</h4>
              <ul className="footer-links">
                {fs.contact_email && (
                  <li><a href={`mailto:${fs.contact_email}`} style={{ textTransform: 'lowercase' }}>{fs.contact_email}</a></li>
                )}
                {fs.contact_location && (
                  <li><span>{fs.contact_location}</span></li>
                )}
                <li><span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>Atendemos autores de todo el mundo.</span></li>
              </ul>
            </div>

            {fs.instagram_enabled !== false && (
              <div className="footer-col" style={{ minWidth: '180px' }}>
                <h4>
                  {fs.instagram_url ? (
                    <a href={fs.instagram_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      {fs.instagram_title.toUpperCase()}
                    </a>
                  ) : (
                    fs.instagram_title.toUpperCase()
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
                          {fs.instagram_url ? (
                            <a 
                              href={fs.instagram_url} 
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

      {/* Modern vertical side navigation drawer */}
      <SideNavigation 
        isOpen={sideNavOpen} 
        onClose={() => setSideNavOpen(false)} 
        links={links} 
        settings={websiteSettings}
      />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
