import { useState, useEffect, useRef } from 'react'
import { HashRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { fetchWebsiteData, fallbackData, getBookCover } from './services/dataService'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import BooksPage from './pages/BooksPage'
import NosotrosPage from './pages/NosotrosPage'
import ContactPage from './pages/ContactPage'
import BookCover from './components/BookCover'
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

// Scroll to Top component to reset scroll position on page change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(fallbackData);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const loadData = async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      const result = await fetchWebsiteData();
      if (result) {
        setData(result);
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

  const handleReload = () => {
    loadData(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Cargando catálogo editorial...</p>
      </div>
    );
  }

  const { services, books, sections, links } = data;

  // Render header dynamically based on route (or always cream background #F6EFE3 to ensure legibility)
  const isHome = location.pathname === '/';
  const headerClass = `header header-cream-solid`;

  return (
    <div className="app-routing-wrapper">
      <ScrollToTop />
      
      {/* 1. Legible Solid Cream Header (#F6EFE3) */}
      <header className={headerClass}>
        <div className="container header-container">
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
            <div className="logo-text" style={{ color: 'var(--wine-dark)' }}>
              NOVELI
              <span className="logo-sub" style={{ color: 'var(--text-muted)' }}> — EDITORIAL</span>
              <svg className="logo-leaf" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px', display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M2 22C2 22 10 22 16 16C21 11 20 4 20 4C20 4 13 3 8 8C2 14 2 22 2 22Z" fill="var(--accent-gold)" />
                <path d="M12 12L2 22" />
              </svg>
            </div>
          </Link>
          
          <button 
            className="menu-toggle" 
            onClick={toggleMobileMenu} 
            aria-label="Abrir menú de navegación"
            id="btn-menu-toggle"
            style={{ color: 'var(--wine-dark)' }}
          >
            ☰
          </button>

          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu} style={{ color: 'var(--wine-dark)' }}>INICIO</NavLink>
            <NavLink to="/servicios" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu} style={{ color: 'var(--wine-dark)' }}>SERVICIOS</NavLink>
            <NavLink to="/libros" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu} style={{ color: 'var(--wine-dark)' }}>LIBROS</NavLink>
            <NavLink to="/nosotros" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu} style={{ color: 'var(--wine-dark)' }}>NOSOTROS</NavLink>
            <NavLink to="/contacto" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu} style={{ color: 'var(--wine-dark)' }}>CONTACTO</NavLink>
          </nav>

          <div className="header-cta-wrapper">
            <Link to="/contacto" className="btn btn-header-cta" onClick={closeMobileMenu}>
              SOLICITAR PROPUESTA
            </Link>
          </div>
        </div>
      </header>

      {/* Pages Content Container */}
      <main className="main-content-flow">
        <Routes>
          <Route path="/" element={<HomePage data={data} handleReload={handleReload} />} />
          <Route path="/servicios" element={<ServicesPage services={services} />} />
          <Route path="/libros" element={<BooksPage books={books} bookCategories={data.bookCategories} handleReload={handleReload} />} />
          <Route path="/nosotros" element={<NosotrosPage sections={sections} links={links} />} />
          <Route path="/contacto" element={<ContactPage services={services} links={links} />} />
        </Routes>
      </main>

      {/* 7. Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ gridColumn: 'span 2' }}>
              <div className="logo-text footer-logo" style={{ color: '#FFFFFF', marginBottom: '12px' }}>
                NOVELI
                <span className="logo-sub"> — EDITORIAL</span>
                <svg className="logo-leaf" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px', display: 'inline-block', verticalAlign: 'middle' }}>
                  <path d="M2 22C2 22 10 22 16 16C21 11 20 4 20 4C20 4 13 3 8 8C2 14 2 22 2 22Z" fill="var(--accent-gold)" />
                  <path d="M12 12L2 22" />
                </svg>
              </div>
              <p style={{ maxWidth: '280px', lineHeight: '1.6', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                Acompañamos a autores a convertir sus manuscritos en libros que perduran.
              </p>
              <div className="footer-socials-inline" style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="social-link-icon">
                  <InstagramIcon />
                </a>
                <a href={`mailto:${links.email}`} className="social-link-icon">
                  <EnvelopeIcon />
                </a>
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
              <h4>CONTACTO</h4>
              <ul className="footer-links">
                <li><a href={`mailto:${links.email}`} style={{ textTransform: 'lowercase' }}>{links.email}</a></li>
                <li><span>Chile</span></li>
                <li><span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>Atendemos autores de todo el mundo.</span></li>
              </ul>
            </div>

            <div className="footer-col" style={{ minWidth: '180px' }}>
              <h4>SÍGUENOS EN INSTAGRAM</h4>
              <div className="footer-instagram-grid">
                {(books && books.length >= 6 ? books.slice(0, 6) : [
                  { title: "Fragmentos", author: "A.M." },
                  { title: "Besos", author: "Vale" },
                  { title: "Cielo", author: "Daniela" },
                  { title: "Raíz", author: "Sofía" },
                  { title: "Cartas", author: "Javier" },
                  { title: "Eco", author: "Luna" }
                ]).map((book, idx) => (
                  <div key={idx} className="instagram-grid-item">
                    <BookCover 
                      title={book.title} 
                      author={book.author} 
                      coverUrl={getBookCover(book)} 
                      index={idx} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Noveli Editorial. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
