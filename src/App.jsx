import { useState, useEffect } from 'react'
import { fetchWebsiteData } from './services/dataService'
import './App.css'

// Inline SVG Icon Components for zero external dependencies and fast loads
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

const LinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

const BookOpenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// Dynamic Book Cover Component: Uses image, or generates elegant CSS fallback
function BookCover({ title, author, coverUrl, index }) {
  const [imageError, setImageError] = useState(false);
  const gradientClass = `cover-${index % 4}`;

  return (
    <div className="book-cover-container">
      {!imageError && coverUrl ? (
        <img
          src={coverUrl}
          alt={`Portada de ${title}`}
          className="book-cover-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`book-cover-fallback ${gradientClass}`}>
          <div className="book-cover-gold-detail"></div>
          <div style={{ padding: '0 5px' }}>
            <h4 className="book-cover-fallback-title">{title}</h4>
            <div className="book-cover-gold-detail" style={{ margin: '12px auto', opacity: 0.6 }}></div>
            <p className="book-cover-fallback-author">{author}</p>
          </div>
          <div className="book-cover-gold-detail"></div>
        </div>
      )}
    </div>
  );
}

// Contact Form Component
function ContactForm({ email }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', service: 'General' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API delay
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-form-card fade-in" style={{ textAlign: 'center', padding: '50px 30px' }}>
        <div className="contact-icon" style={{ margin: '0 auto 24px', width: '60px', height: '60px', fontSize: '1.8rem', backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold)' }}>
          <CheckIcon />
        </div>
        <h3 className="contact-intro-title" style={{ color: 'var(--accent-gold)' }}>¡Mensaje Recibido!</h3>
        <p className="contact-intro-p" style={{ margin: '16px 0 24px', lineHeight: '1.6' }}>
          Gracias por confiar en Somos Noveli Editorial, <strong>{formData.name}</strong>. Nos pondremos en contacto contigo en las próximas 24 horas a través de <strong>{formData.email}</strong> para asesorarte en tu obra.
        </p>
        <button 
          className="btn btn-primary" 
          onClick={() => { 
            setSubmitted(false); 
            setFormData({ name: '', email: '', message: '', service: 'General' }); 
          }}
          id="btn-send-another"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <h3 className="contact-intro-title">Cuéntanos tu proyecto</h3>
      <p className="contact-intro-p">Escríbenos y un editor experto te asesorará de forma gratuita en tu camino de publicación.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label htmlFor="form-name" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Nombre Completo</label>
          <input
            id="form-name"
            type="text"
            required
            placeholder="Tu nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '3px', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', backgroundColor: '#FCFAF8' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label htmlFor="form-email" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Correo Electrónico</label>
          <input
            id="form-email"
            type="email"
            required
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '3px', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', backgroundColor: '#FCFAF8' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label htmlFor="form-service" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Servicio de interés</label>
          <select
            id="form-service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '3px', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', backgroundColor: '#FCFAF8', color: 'var(--text-main)' }}
          >
            <option value="General">Asesoría Editorial General</option>
            <option value="Edicion">Edición y Corrección de Estilo</option>
            <option value="Portada">Diseño de Portada Exclusiva</option>
            <option value="Maquetacion">Maquetación Física y Digital</option>
            <option value="Publicacion">Publicación y Lanzamiento</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label htmlFor="form-message" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Sobre tu libro</label>
          <textarea
            id="form-message"
            required
            rows="4"
            placeholder="Indica el género (novela, poesía, etc.), estado del manuscrito y tus expectativas..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '3px', fontFamily: 'var(--font-serif-body)', fontSize: '0.85rem', backgroundColor: '#FCFAF8', resize: 'vertical' }}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-gold" id="btn-submit-proposal" style={{ marginTop: '10px' }}>
          Enviar Propuesta
        </button>
      </form>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchWebsiteData();
        setData(result);
      } catch (err) {
        console.error("Critical error loading data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Cargando catálogo editorial...</p>
      </div>
    );
  }

  // Header Navigation toggle helper
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const { settings, services, books, sections, links } = data;

  return (
    <div className="fade-in">
      {/* 1. Header with logo/nombre Noveli and navigation */}
      <header className="header">
        <div className="container header-container">
          <a href="#inicio" className="logo-link" onClick={closeMobileMenu}>
            <div className="logo-text">
              Noveli<span>.</span>
            </div>
          </a>
          
          <button 
            className="menu-toggle" 
            onClick={toggleMobileMenu} 
            aria-label="Abrir menú de navegación"
            id="btn-menu-toggle"
          >
            ☰
          </button>

          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#inicio" className="nav-link" onClick={closeMobileMenu}>Inicio</a>
            <a href="#servicios" className="nav-link" onClick={closeMobileMenu}>Servicios</a>
            <a href="#libros" className="nav-link" onClick={closeMobileMenu}>Libros</a>
            <a href="#nosotros" className="nav-link" onClick={closeMobileMenu}>Nosotros</a>
            <a href="#contacto" className="nav-link" onClick={closeMobileMenu}>Contacto</a>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="inicio" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Somos Noveli Editorial</span>
            <h1 className="hero-title">{settings.hero_title}</h1>
            <p className="hero-subtitle">{settings.hero_subtitle}</p>
            <div className="hero-btns">
              <a href="#servicios" className="btn btn-primary" id="btn-hero-services">Nuestros Servicios</a>
              <a href="#libros" className="btn btn-secondary" id="btn-hero-books">Ver Catálogo</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Servicios Section */}
      <section id="servicios" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Lo que hacemos</span>
            <h2 className="section-title">Servicios Editoriales</h2>
          </div>
          
          <div className="services-grid">
            {services && services.map((service) => (
              <article 
                key={service.id} 
                className={`service-card ${service.featured ? 'featured' : ''}`}
              >
                <span className="service-category">{service.category}</span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">
                  <span className="price-label">Precio aproximado</span>
                  <span className="price-value">
                    Desde {service.price_from} {service.currency}
                  </span>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <a 
                    href="#contacto" 
                    className={`btn ${service.featured ? 'btn-gold' : 'btn-secondary'}`} 
                    style={{ width: '100%' }}
                    id={`btn-service-req-${service.id}`}
                  >
                    Solicitar Info
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Libros Section */}
      <section id="libros" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Nuestras Obras</span>
            <h2 className="section-title">Libros Publicados</h2>
          </div>
          
          <div className="books-grid">
            {books && books.map((book, index) => (
              <article key={book.id} className="book-card">
                <div style={{ position: 'relative' }}>
                  {book.status && (
                    <span className="book-badge">{book.status}</span>
                  )}
                  <BookCover 
                    title={book.title} 
                    author={book.author} 
                    coverUrl={book.cover_url} 
                    index={index} 
                  />
                </div>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">por {book.author}</p>
                {book.sale_url ? (
                  <div className="book-action">
                    <a 
                      href={book.sale_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary book-btn"
                      id={`btn-buy-book-${book.id}`}
                    >
                      Comprar / Leer
                    </a>
                  </div>
                ) : (
                  <div className="book-action">
                    <button 
                      className="btn btn-secondary book-btn" 
                      disabled
                      id={`btn-soon-book-${book.id}`}
                      style={{ cursor: 'not-allowed', opacity: 0.6 }}
                    >
                      Próximamente
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Nosotros Section */}
      <section id="nosotros" className="section about-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Quiénes somos</span>
            <h2 className="section-title">{sections.nosotros.title}</h2>
          </div>
          
          <div className="about-content-wrapper">
            <div className="about-text">
              <p>{sections.nosotros.content}</p>
            </div>
            <div style={{ marginTop: '40px' }}>
              <BookOpenIcon />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contacto Section */}
      <section id="contacto" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Escríbenos</span>
            <h2 className="section-title">Hablemos de tu Libro</h2>
          </div>
          
          <div className="contact-container">
            <div className="contact-info">
              <h3 className="contact-intro-title">Canales de Contacto</h3>
              <p className="contact-intro-p" style={{ margin: 0 }}>
                Estamos disponibles para resolver tus dudas y acompañarte en todo el proceso. Utiliza cualquiera de nuestros canales oficiales:
              </p>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <EnvelopeIcon />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Correo Electrónico</span>
                  <span className="contact-value">
                    <a href={`mailto:${links.email}`} id="link-email-contact">{links.email}</a>
                  </span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <InstagramIcon />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">
                    <a href={links.instagram} target="_blank" rel="noopener noreferrer" id="link-instagram-contact">@somosnoveli</a>
                  </span>
                </div>
              </div>

              {links.contact && (
                <div className="contact-item">
                  <div className="contact-icon">
                    <LinkIcon />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Enlace de Contacto</span>
                    <span className="contact-value">
                      <a href={links.contact} target="_blank" rel="noopener noreferrer" id="link-custom-contact">Consultar vía Web / WhatsApp</a>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <ContactForm email={links.email} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ gridColumn: 'span 2' }}>
              <div className="logo-text" style={{ color: '#FFFFFF', marginBottom: '15px' }}>
                Noveli<span>.</span>
              </div>
              <p style={{ maxWidth: '350px', lineHeight: '1.6', fontSize: '0.85rem' }}>
                Transformamos manuscritos en libros extraordinarios con dedicación, maquetación artesanal y distribución global.
              </p>
            </div>
            
            <div className="footer-col">
              <h4>Secciones</h4>
              <ul className="footer-links">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#libros">Libros</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contacto</h4>
              <ul className="footer-links">
                <li><a href={`mailto:${links.email}`}>{links.email}</a></li>
                <li><a href={links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Somos Noveli Editorial. Todos los derechos reservados.</p>
            <div className="footer-socials">
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Síguenos en Instagram" id="btn-footer-instagram">
                <InstagramIcon />
              </a>
              <a href={`mailto:${links.email}`} className="footer-social-icon" aria-label="Escríbenos por correo" id="btn-footer-email">
                <EnvelopeIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
