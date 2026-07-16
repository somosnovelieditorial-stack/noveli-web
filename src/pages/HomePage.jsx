import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookCover from '../components/BookCover';
import { getBookCover, formatServicePrice } from '../services/dataService';

export default function HomePage({ data, handleReload }) {
  const { services, books, sections, links, bookCategories = [] } = data;
  const [activeFilter, setActiveFilter] = useState('all');
  const booksGridRef = useRef(null);

  const scrollCatalogLeft = () => {
    if (booksGridRef.current) {
      booksGridRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollCatalogRight = () => {
    if (booksGridRef.current) {
      booksGridRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  // Build the catalog filter options dynamically and in UPPERCASE to match the mockup
  const filterOptions = [
    { id: 'all', label: 'GENERAL' },
    { id: 'published_by_noveli', label: 'PUBLICADOS POR NOVELI' },
    { id: 'author_purchase', label: 'COMPRA CON EL AUTOR' },
  ];

  if (bookCategories && bookCategories.length > 0) {
    const genres = bookCategories.filter(cat => cat.type === 'genre');
    genres.forEach(genre => {
      filterOptions.push({ id: genre.id, label: genre.name.toUpperCase() });
    });
  }

  filterOptions.push({ id: 'featured', label: 'DESTACADOS' });
  filterOptions.push({ id: 'new', label: 'NOVEDADES' });
  filterOptions.push({ id: 'coming_soon', label: 'PRÓXIMAMENTE' });

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

  // Limit to maximum 6 books for Home Page summary
  const homeBooks = filteredBooks.slice(0, 6);

  // Limit to maximum 5 services for Home Page summary
  const allServices = [...(services || [])];
  if (allServices.length === 4) {
    allServices.push({
      id: 'custom-service-consulting',
      title: 'Libro físico bajo demanda',
      category: 'Impresión',
      description: 'Impresión profesional bajo demanda con la mejor calidad.',
      price_from: 90000,
      currency: 'CLP',
      featured: false
    });
  }
  const homeServices = allServices.slice(0, 5);

  return (
    <div className="fade-in">
      {/* 2. Hero Section */}
      <section id="inicio" className="hero-section">
        <div className="hero-grid-container">
          <div className="hero-left-content">
            <span className="hero-badge">Somos Noveli Editorial</span>
            
            <h1 className="hero-title">
              Tu libro merece una edición a la altura de su <span className="highlight-gold">historia.</span>
            </h1>
            
            <div className="hero-divider-line"></div>
            
            <p className="hero-subtitle">
              En Noveli acompañamos a autores en el proceso editorial, desde la revisión del manuscrito hasta la preparación final para publicación digital o impresa.
            </p>
            
            <div className="hero-quick-services">
              <div className="quick-service-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                <span>CORRECCIÓN EDITORIAL</span>
              </div>
              <div className="quick-service-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                <span>MAQUETACIÓN PROFESIONAL</span>
              </div>
              <div className="quick-service-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>DISEÑO DE PORTADAS</span>
              </div>
              <div className="quick-service-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v20" />
                  <path d="m17 5-5-3-5 3" />
                  <path d="m17 19-5 3-5-3" />
                  <path d="M2 12h20" />
                </svg>
                <span>AUTOPUBLICACIÓN EN AMAZON</span>
              </div>
            </div>

            <div className="hero-btns">
              <Link to="/contacto" className="btn btn-hero-primary" id="btn-hero-contact">SOLICITAR PROPUESTA EDITORIAL</Link>
              <Link to="/servicios" className="btn btn-hero-secondary" id="btn-hero-services">VER SERVICIOS</Link>
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
                      coverUrl={getBookCover(book)} 
                      index={index} 
                    />
                  </div>
                ))
              ) : (
                [
                  { title: "Fragmentos de lo que fuimos", author: "A.M." },
                  { title: "Besos con sabor a sal", author: "Vale Barrios" },
                  { title: "Bajo el cielo que callamos", author: "Daniela Torres" }
                ].map((book, index) => (
                  <div key={index} className={`hero-showcase-book book-${index}`}>
                    <BookCover 
                      title={book.title} 
                      author={book.author} 
                      coverUrl="" 
                      index={index} 
                    />
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
            <span className="section-subtitle">— LO QUE HACEMOS —</span>
            <h2 className="section-title">
              Servicios editoriales
              <svg className="title-leaf" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M2 22C2 22 10 22 16 16C21 11 20 4 20 4C20 4 13 3 8 8C2 14 2 22 2 22Z" fill="var(--accent-gold)" />
              </svg>
            </h2>
          </div>
          
          <div className="services-grid" style={{ display: (!services || services.length === 0) ? 'block' : 'grid' }}>
            {(!services || services.length === 0) ? (
              <p className="empty-services-message" style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px 0', fontStyle: 'italic', color: 'var(--text-muted)', fontFamily: 'var(--font-serif-body)' }}>
                Aún no hay servicios visibles.
              </p>
            ) : (
              homeServices.map((service, index) => {
                // Circular linear icons mapped directly to mockup
                const icons = [
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" /></svg>,
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20" /><path d="m17 5-5-3-5 3" /><path d="m17 19-5 3-5-3" /><path d="M2 12h20" /></svg>,
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6 6h10" /><path d="M6 10h10" /></svg>
                ];
                const iconColors = ['circle-wine', 'circle-green', 'circle-gold', 'circle-blue', 'circle-purple'];
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
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                    <div className="service-price">
                      <span className="price-value">
                        {formatServicePrice(service.price_from, service.currency)}
                      </span>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <div style={{ marginTop: '28px', textAlign: 'center' }}>
            <Link to="/servicios" className="services-more-link" id="btn-all-services">
              VER TODOS LOS SERVICIOS ➔
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Libros Section */}
      <section id="libros" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">— CATÁLOGO —</span>
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
            {import.meta.env.DEV && (
              <button 
                className="filter-btn reload-btn" 
                onClick={handleReload}
                style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)', fontWeight: 'bold' }}
              >
                🔄 RECARGAR
              </button>
            )}
          </div>
          
          {/* Slider with wine side arrows */}
          <div className="catalog-carousel-container">
            <button 
              className="carousel-arrow arrow-left" 
              onClick={scrollCatalogLeft} 
              aria-label="Desplazar a la izquierda"
            >
              ‹
            </button>

            <div className="books-grid" ref={booksGridRef}>
              {(!books || books.length === 0) ? (
                <p className="empty-catalog-message" style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px 0', fontStyle: 'italic', color: 'var(--text-muted)', width: '100%', fontFamily: 'var(--font-serif-body)' }}>
                  Aún no hay libros publicados en el catálogo.
                </p>
              ) : (
                homeBooks && homeBooks.map((book, index) => {
                  const genreText = book.categories && book.categories.length > 0 
                    ? book.categories.filter(c => c.type === 'genre').map(c => c.name).join(', ') 
                    : 'Literatura';

                  const originText = book.book_origin === 'published_by_noveli' 
                    ? 'Publicado por Noveli' 
                    : 'Compra con el autor';

                  let highlightText = '';
                  if (book.is_featured) highlightText = 'DESTACADO';
                  else if (book.is_new || book.status?.toUpperCase() === 'NOVEDAD' || book.status?.toUpperCase() === 'DESTACADO') highlightText = book.status?.toUpperCase() || 'NOVEDAD';
                  else if (book.is_coming_soon || book.status?.toLowerCase() === 'próximamente' || book.status?.toLowerCase() === 'proximamente') highlightText = 'PRÓXIMAMENTE';

                  return (
                    <article key={book.id} className="book-card">
                      <div style={{ position: 'relative' }}>
                        {/* Origin Badge */}
                        <span className="book-origin-badge">{originText}</span>
                        
                        {/* Highlight Badge */}
                        {highlightText && (
                          <span className={`book-status-badge badge-${highlightText.toLowerCase().replace(/á/g, 'a').replace(/ó/g, 'o')}`}>{highlightText}</span>
                        )}

                        <BookCover 
                          title={book.title} 
                          author={book.author} 
                          coverUrl={getBookCover(book)} 
                          index={index} 
                        />
                      </div>
                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-author">{book.author}</p>
                    </article>
                  );
                })
              )}
            </div>

            <button 
              className="carousel-arrow arrow-right" 
              onClick={scrollCatalogRight} 
              aria-label="Desplazar a la derecha"
            >
              ›
            </button>
          </div>

          <div style={{ marginTop: '28px', textAlign: 'center' }}>
            <Link to="/libros" className="services-more-link" id="btn-all-books">
              VER TODOS LOS LIBROS ➔
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Bloque Manifiesto / Nosotros Section */}
      <section id="nosotros" className="manifesto-section">
        <div className="manifesto-grid-container">
          <div 
            className="manifesto-left-visual" 
            style={{ 
              backgroundImage: 'url(/manifesto_still_life.jpg)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(23, 53, 47, 0) 60%, rgba(23, 53, 47, 0.15) 100%)' }}></div>
          </div>
          
          <div className="manifesto-right-content">
            <div className="manifesto-wrapper">
              <h2 className="manifesto-big-text">
                Creemos que cada libro merece ser tratado con respeto, belleza y cuidado editorial.
              </h2>
              
              <p className="manifesto-small-text">
                No publicamos historias, las acompañamos.
              </p>
              
              <div className="manifesto-signature">
                Noveli <span>EDITORIAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contacto Block resumen */}
      <section id="contacto" className="section contact-section-wrapper">
        <div className="container">
          <div className="contact-grid-container">
            <div className="contact-left-details">
              <span className="section-subtitle">CUÉNTANOS SOBRE TU LIBRO</span>
              <h2 className="contact-main-title">Inicia tu proyecto editorial con nosotros</h2>
            </div>
            
            <div className="contact-center-benefits">
              <div className="contact-benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon-round">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <span className="benefit-label-simple">Respuesta en máx. 3 días hábiles</span>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon-round">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className="benefit-label-simple">Atención personalizada para autores</span>
                </div>
              </div>
            </div>

            <div className="contact-right-form-toggle">
              <Link 
                to="/contacto"
                className="btn btn-primary btn-contact-submit"
                style={{ textDecoration: 'none' }}
              >
                SOLICITAR PROPUESTA
              </Link>
              <p className="contact-mail-alternative">o escríbenos a <strong>{links.email}</strong></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
