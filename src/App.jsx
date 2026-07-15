import { useState, useEffect } from 'react'
import { fetchWebsiteData, fallbackData } from './services/dataService'
import { supabase } from './lib/supabaseClient'
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
function ContactForm({ email: _email, services = [] }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    service_interest: 'General',
    manuscript_info: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate name and email
    if (!formData.name || formData.name.trim().length === 0) {
      setErrorMsg('Por favor, ingresa tu nombre completo.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMsg('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!formData.manuscript_info || formData.manuscript_info.trim().length === 0) {
      setErrorMsg('Por favor, describe la información de tu manuscrito.');
      return;
    }

    setLoading(true);

    const leadData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone ? formData.phone.trim() : null,
      instagram: formData.instagram ? formData.instagram.trim() : null,
      service_interest: formData.service_interest,
      manuscript_info: formData.manuscript_info.trim(),
      message: null,
      source: 'website',
      status: 'nuevo',
      organization_id: '11111111-1111-1111-1111-111111111111'
    };

    if (!supabase) {
      console.warn('Supabase not configured. Using fallback simulated submission.');
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1000);
      return;
    }

    try {
      const { error } = await supabase
        .from('website_leads')
        .insert([leadData]);

      if (error) throw error;

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting lead to Supabase:', err);
      setErrorMsg(err.message || 'Hubo un error al enviar tu propuesta. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-form-card fade-in" style={{ textAlign: 'center', padding: '50px 30px' }}>
        <div className="contact-icon" style={{ margin: '0 auto 24px', width: '60px', height: '60px', fontSize: '1.8rem', backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold)' }}>
          <CheckIcon />
        </div>
        <h3 className="contact-intro-title" style={{ color: 'var(--accent-gold)' }}>¡Solicitud Recibida!</h3>
        <p className="contact-intro-p" style={{ margin: '16px 0 24px', lineHeight: '1.6' }}>
          Gracias por escribirnos. Recibimos tu solicitud y la revisaremos para orientarte en el siguiente paso editorial.
        </p>
        <button 
          className="btn btn-primary" 
          onClick={() => { 
            setSubmitted(false); 
            setFormData({
              name: '',
              email: '',
              phone: '',
              instagram: '',
              service_interest: 'General',
              manuscript_info: ''
            }); 
            setErrorMsg(null);
          }}
          id="btn-send-another"
          style={{ width: '100%' }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <h3 className="contact-intro-title">Cuéntanos sobre tu libro</h3>
      <p className="contact-intro-p">Compártenos una breve descripción de tu obra y el servicio que necesitas. Revisaremos tu solicitud y podremos prepararte una propuesta editorial.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
            <label htmlFor="form-name">Nombre Completo *</label>
            <input
              id="form-name"
              type="text"
              required
              disabled={loading}
              placeholder="Tu nombre completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
            <label htmlFor="form-email">Correo Electrónico *</label>
            <input
              id="form-email"
              type="email"
              required
              disabled={loading}
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
            <label htmlFor="form-phone">Teléfono (Opcional)</label>
            <input
              id="form-phone"
              type="tel"
              disabled={loading}
              placeholder="+34 600 000 000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
            <label htmlFor="form-instagram">Instagram (Opcional)</label>
            <input
              id="form-instagram"
              type="text"
              disabled={loading}
              placeholder="@usuario"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label htmlFor="form-service">Servicio de interés *</label>
          <select
            id="form-service"
            disabled={loading}
            value={formData.service_interest}
            onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
          >
            <option value="General">Asesoría Editorial General</option>
            {services && services.map(service => (
              <option key={service.id} value={service.title}>{service.title}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label htmlFor="form-manuscript">Mensaje / Información del manuscrito *</label>
          <textarea
            id="form-manuscript"
            required
            disabled={loading}
            rows="4"
            placeholder="Indica el género, estado de tu manuscrito, páginas aproximadas y el servicio que requieres..."
            value={formData.manuscript_info}
            onChange={(e) => setFormData({ ...formData, manuscript_info: e.target.value })}
          ></textarea>
        </div>

        {errorMsg && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#FDF2F2',
            borderLeft: '4px solid #F05252',
            color: '#9B1C1C',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-sans)',
            borderRadius: '4px',
            textAlign: 'left',
            lineHeight: '1.5'
          }}>
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary" 
          id="btn-submit-proposal" 
          disabled={loading}
          style={{ marginTop: '10px', width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? (
            <>
              <span className="spinner-mini" style={{ marginRight: '8px' }}></span>
              Enviando...
            </>
          ) : 'Enviar solicitud editorial'}
        </button>
      </form>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(fallbackData);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function loadData() {
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const { settings, services, books, sections, links, bookCategories = [] } = data;

  // Build the catalog filter options dynamically
  const filterOptions = [
    { id: 'all', label: 'General' },
    { id: 'published_by_noveli', label: 'Publicados por Noveli' },
    { id: 'author_purchase', label: 'Compra con el autor' },
  ];

  // Add active genre categories
  if (bookCategories && bookCategories.length > 0) {
    const genres = bookCategories.filter(cat => cat.type === 'genre');
    genres.forEach(genre => {
      filterOptions.push({ id: genre.id, label: genre.name });
    });
  }

  // Add collection filters
  filterOptions.push({ id: 'featured', label: 'Destacados' });
  filterOptions.push({ id: 'new', label: 'Novedades' });
  filterOptions.push({ id: 'coming_soon', label: 'Próximamente' });

  // Add any custom collection categories
  if (bookCategories && bookCategories.length > 0) {
    const collections = bookCategories.filter(cat => cat.type === 'collection');
    collections.forEach(col => {
      if (!filterOptions.some(opt => opt.label.toLowerCase() === col.name.toLowerCase())) {
        filterOptions.push({ id: col.id, label: col.name });
      }
    });
  }

  const filteredBooks = books ? books.filter(book => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'published_by_noveli') return book.book_origin === 'published_by_noveli';
    if (activeFilter === 'author_purchase') return book.book_origin === 'author_purchase';
    if (activeFilter === 'featured') {
      return book.is_featured || (book.categories && book.categories.some(cat => cat.slug === 'destacados' || cat.slug === 'destacado'));
    }
    if (activeFilter === 'new') {
      return book.is_new || book.status?.toLowerCase() === 'novedad' || (book.categories && book.categories.some(cat => cat.slug === 'novedades' || cat.slug === 'novedad'));
    }
    if (activeFilter === 'coming_soon') {
      return book.is_coming_soon || book.status?.toLowerCase() === 'próximamente' || book.status?.toLowerCase() === 'proximamente' || (book.categories && book.categories.some(cat => cat.slug === 'proximamente' || cat.slug === 'proximas-novedades'));
    }
    return book.categories && book.categories.some(cat => cat.id === activeFilter || cat.slug === activeFilter);
  }) : [];

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

          <div className="header-cta-wrapper">
            <a href="#contacto" className="btn btn-header-cta" onClick={closeMobileMenu}>
              Solicitar propuesta
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="inicio" className="hero-section">
        <div className="hero-grid-container">
          <div className="hero-left-content">
            <span className="hero-badge">Somos Noveli Editorial</span>
            
            <h1 className="hero-title">
              Tu libro merece una edición a la altura de su <span className="highlight-gold">historia</span>.
            </h1>
            
            <p className="hero-subtitle">
              En Noveli acompañamos a autores en el proceso editorial, desde la revisión del manuscrito hasta la preparación final para publicación digital o impresa.
            </p>
            
            <div className="hero-quick-services">
              <div className="quick-service-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                <span>Corrección editorial</span>
              </div>
              <div className="quick-service-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                <span>Maquetación profesional</span>
              </div>
              <div className="quick-service-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>Diseño de portadas</span>
              </div>
              <div className="quick-service-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20" />
                  <path d="m17 5-5-3-5 3" />
                  <path d="m17 19-5 3-5-3" />
                  <path d="M2 12h20" />
                </svg>
                <span>Autopublicación en Amazon</span>
              </div>
            </div>

            <div className="hero-btns">
              <a href="#contacto" className="btn btn-hero-primary" id="btn-hero-contact">Solicitar propuesta editorial</a>
              <a href="#servicios" className="btn btn-hero-secondary" id="btn-hero-services">Ver servicios</a>
            </div>
          </div>
          
          <div className="hero-right-visual">
            <div className="hero-books-showcase">
              {books && books.slice(0, 3).length > 0 ? (
                books.slice(0, 3).map((book, index) => (
                  <div key={book.id} className={`hero-showcase-book book-${index}`}>
                    <BookCover 
                      title={book.title} 
                      author={book.author} 
                      coverUrl={book.cover_url} 
                      index={index} 
                    />
                  </div>
                ))
              ) : (
                [
                  { title: "El Eco de los Girasoles", author: "Elena Rostova", class: "cover-0" },
                  { title: "Bajo las Cenizas del Invierno", author: "Carlos Mendoza", class: "cover-1" },
                  { title: "Crónicas del Mañana", author: "Sofía Varela", class: "cover-2" }
                ].map((book, index) => (
                  <div key={index} className={`hero-showcase-book book-${index}`}>
                    <div className={`book-cover-fallback ${book.class}`}>
                      <div className="book-cover-gold-detail"></div>
                      <div style={{ padding: '0 5px' }}>
                        <h4 className="book-cover-fallback-title">{book.title}</h4>
                        <div className="book-cover-gold-detail" style={{ margin: '12px auto', opacity: 0.6 }}></div>
                        <p className="book-cover-fallback-author">{book.author}</p>
                      </div>
                      <div className="book-cover-gold-detail"></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Servicios Section */}
      <section id="servicios" className="section services-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Lo que hacemos</span>
            <h2 className="section-title">Servicios editoriales</h2>
          </div>
          
          <div className="services-grid">
            {services && services.map((service, index) => {
              // Circular linear icons
              const icons = [
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" /></svg>,
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20" /><path d="m17 5-5-3-5 3" /><path d="m17 19-5 3-5-3" /><path d="M2 12h20" /></svg>
              ];
              const iconColors = ['circle-wine', 'circle-gold', 'circle-green', 'circle-charcoal'];
              const icon = icons[index % icons.length];
              const iconColorClass = iconColors[index % iconColors.length];

              return (
                <article 
                  key={service.id} 
                  className={`service-card ${service.featured ? 'featured' : ''}`}
                >
                  <div className={`service-icon-circle ${iconColorClass}`}>
                    {icon}
                  </div>
                  <span className="service-category">{service.category}</span>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  {service.price_from !== undefined && (
                    <div className="service-price">
                      <span className="price-label">Precio aproximado</span>
                      <span className="price-value">
                        Desde {service.price_from} {service.currency || '€'}
                      </span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <a href="#contacto" className="btn btn-primary" id="btn-all-services">
              Ver todos los servicios
            </a>
          </div>
        </div>
      </section>

      {/* 4. Libros Section */}
      <section id="libros" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Nuestras Obras</span>
            <h2 className="section-title">Historias que inspiran</h2>
          </div>
          
          {/* Filters/Tabs */}
          <div className="book-filters">
            {filterOptions.map(opt => (
              <button 
                key={opt.id} 
                className={`filter-btn ${activeFilter === opt.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          
          <div className="books-grid">
            {filteredBooks && filteredBooks.map((book, index) => {
              const genreText = book.categories && book.categories.length > 0 
                ? book.categories.filter(c => c.type === 'genre').map(c => c.name).join(', ') 
                : 'Literatura';

              const originText = book.book_origin === 'published_by_noveli' 
                ? 'Publicado por Noveli' 
                : 'Compra con el autor';

              let highlightText = '';
              if (book.is_featured) highlightText = 'Destacado';
              else if (book.is_new || book.status?.toLowerCase() === 'novedad') highlightText = 'Novedad';
              else if (book.is_coming_soon || book.status?.toLowerCase() === 'próximamente' || book.status?.toLowerCase() === 'proximamente') highlightText = 'Próximamente';

              let buyButton = null;
              if (book.noveli_purchase_url) {
                buyButton = (
                  <a 
                    href={book.noveli_purchase_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary book-btn"
                    id={`btn-buy-noveli-${book.id}`}
                  >
                    Comprar en Noveli
                  </a>
                );
              } else if (book.author_purchase_url) {
                buyButton = (
                  <a 
                    href={book.author_purchase_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary book-btn"
                    id={`btn-buy-author-${book.id}`}
                  >
                    Comprar con el autor
                  </a>
                );
              } else {
                buyButton = (
                  <a 
                    href="#contacto" 
                    className="btn btn-secondary book-btn"
                    id={`btn-details-${book.id}`}
                  >
                    Ver detalles
                  </a>
                );
              }

              return (
                <article key={book.id} className="book-card">
                  <div style={{ position: 'relative' }}>
                    {/* Origin Badge */}
                    <span className="book-origin-badge">{originText}</span>
                    
                    {/* Highlight Badge */}
                    {highlightText && (
                      <span className="book-status-badge">{highlightText}</span>
                    )}

                    <BookCover 
                      title={book.title} 
                      author={book.author} 
                      coverUrl={book.cover_url} 
                      index={index} 
                    />
                  </div>
                  <span className="book-card-category">{genreText}</span>
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">por {book.author}</p>
                  <div className="book-action">
                    {buyButton}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Bloque Manifiesto / Nosotros Section */}
      <section id="nosotros" className="manifesto-section">
        <div className="manifesto-grid-container">
          <div className="manifesto-left-visual">
            <div className="manifesto-books-stack">
              {books && books.slice(0, 2).length > 0 ? (
                books.slice(0, 2).map((book, idx) => (
                  <div key={book.id} className={`manifesto-stacked-book stack-${idx}`}>
                    <BookCover 
                      title={book.title} 
                      author={book.author} 
                      coverUrl={book.cover_url} 
                      index={idx + 4} 
                    />
                  </div>
                ))
              ) : (
                <>
                  <div className="manifesto-stacked-book stack-0">
                    <div className="book-cover-fallback cover-0">
                      <div className="book-cover-gold-detail"></div>
                      <h4 className="book-cover-fallback-title">El Eco de los Girasoles</h4>
                      <p className="book-cover-fallback-author">Elena Rostova</p>
                    </div>
                  </div>
                  <div className="manifesto-stacked-book stack-1">
                    <div className="book-cover-fallback cover-2">
                      <div className="book-cover-gold-detail"></div>
                      <h4 className="book-cover-fallback-title">Bajo las Cenizas del Invierno</h4>
                      <p className="book-cover-fallback-author">Carlos Mendoza</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="manifesto-right-content">
            <div className="manifesto-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="quill-icon">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" />
                <path d="M16 8 2 22" />
                <path d="M17.5 15H9" />
              </svg>
              
              <h2 className="manifesto-big-text">
                Creemos que cada libro merece ser tratado con respeto, belleza y cuidado editorial.
              </h2>
              
              <p className="manifesto-small-text">
                No publicamos historias, las acompañamos.
              </p>
              
              <div className="manifesto-signature">
                <span>Noveli Editorial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contacto Section */}
      <section id="contacto" className="section contact-section-wrapper">
        <div className="container">
          <div className="contact-grid-container">
            <div className="contact-left-details">
              <span className="section-subtitle">Contacto</span>
              <h2 className="contact-main-title">Inicia tu proyecto editorial</h2>
              <p className="contact-manifesto-p">
                Completa el formulario para enviarnos la información de tu manuscrito y recibir asesoría experta.
              </p>
            </div>
            
            <div className="contact-center-benefits">
              <div className="contact-benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">✦</div>
                  <div className="benefit-text">
                    <h4>Respuesta en 3 días</h4>
                    <p>Recibirás un diagnóstico rápido y profesional de tu obra.</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">✦</div>
                  <div className="benefit-text">
                    <h4>Atención personalizada</h4>
                    <p>Tu libro será asignado a un editor especialista en tu género.</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">✦</div>
                  <div className="benefit-text">
                    <h4>Acompañamiento total</h4>
                    <p>Desde el primer borrador hasta la publicación digital e impresa.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-right-form">
              <ContactForm email={links.email} services={services} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ gridColumn: 'span 2' }}>
              <div className="logo-text footer-logo" style={{ color: '#FFFFFF', marginBottom: '15px' }}>
                Noveli<span>.</span>
              </div>
              <p style={{ maxWidth: '350px', lineHeight: '1.6', fontSize: '0.85rem' }}>
                Transformamos manuscritos en libros extraordinarios con dedicación, maquetación artesanal y distribución global.
              </p>
            </div>
            
            <div className="footer-col">
              <h4>Navegación</h4>
              <ul className="footer-links">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#libros">Libros</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Servicios</h4>
              <ul className="footer-links">
                {services && services.slice(0, 4).map(s => (
                  <li key={s.id}><a href="#servicios">{s.title}</a></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contacto</h4>
              <ul className="footer-links">
                <li><a href={`mailto:${links.email}`}>{links.email}</a></li>
                <li><a href={links.instagram} target="_blank" rel="noopener noreferrer">@somosnoveli</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Noveli Editorial. Todos los derechos reservados.</p>
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
