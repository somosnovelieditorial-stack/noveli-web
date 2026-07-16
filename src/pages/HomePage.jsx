import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookCover from '../components/BookCover';
import BookDetailModal from '../components/BookDetailModal';
import ServiceCard from '../components/ServiceCard';
import BookFilterDropdown from '../components/BookFilterDropdown';
import { getBookCover, formatServicePrice, getBookAction } from '../services/dataService';

const getDecorClass = (category = '') => {
  const cat = category.toLowerCase().trim();
  if (cat.includes('digital') || cat.includes('amazon') || cat.includes('epub')) return { className: 'decor-digitalizacion', symbol: '💻' };
  if (cat.includes('edición') || cat.includes('editorial') || cat.includes('corrección')) return { className: 'decor-editorial', symbol: '✍️' };
  if (cat.includes('diseño') || cat.includes('arte') || cat.includes('portadas') || cat.includes('maquetación')) return { className: 'decor-diseno', symbol: '🎨' };
  if (cat.includes('impresión') || cat.includes('producción') || cat.includes('físico')) return { className: 'decor-produccion', symbol: '📖' };
  if (cat.includes('marketing') || cat.includes('difusión') || cat.includes('redes')) return { className: 'decor-marketing', symbol: '📢' };
  if (cat.includes('legal') || cat.includes('derechos') || cat.includes('propiedad')) return { className: 'decor-legal', symbol: '📜' };
  return { className: 'decor-default', symbol: '✨' };
};

const getServiceIcon = (iconName, index) => {
  const icons = {
    edit: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" /></svg>,
    layout: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
    book: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
    globe: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20" /><path d="m17 5-5-3-5 3" /><path d="m17 19-5 3-5-3" /><path d="M2 12h20" /></svg>,
    publish: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6 6h10" /><path d="M6 10h10" /></svg>
  };

  const key = String(iconName || '').toLowerCase().trim();
  if (icons[key]) return icons[key];

  const defaultIcons = [icons.edit, icons.layout, icons.book, icons.globe, icons.publish];
  return defaultIcons[index % defaultIcons.length];
};

const getQuickServiceIcon = (iconName) => {
  const icons = {
    feather: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
    book: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    layout: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    upload: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    pen: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    file: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    megaphone: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  };
  
  const key = String(iconName || 'feather').toLowerCase().trim();
  return icons[key] || icons.feather;
};

const renderCardHeader = (service) => {
  const { className: decorClass, symbol } = getDecorClass(service.category);
  
  let headerStyle = {};
  if (service.image_url) {
    headerStyle = {
      backgroundImage: `url(${service.image_url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  } else if (service.background_url) {
    headerStyle = {
      backgroundImage: `url(${service.background_url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  }

  if (service.color_theme && !service.image_url && !service.background_url) {
    headerStyle = {
      background: service.color_theme
    };
  }

  const hasImage = !!(service.image_url || service.background_url);

  return (
    <div 
      className={`service-header-decor ${!hasImage ? decorClass : ''}`} 
      style={headerStyle}
    >
      {!hasImage && (
        <span style={{ fontSize: '4.5rem', opacity: 0.12, transform: 'scale(1.5)', userSelect: 'none' }}>
          {symbol}
        </span>
      )}
    </div>
  );
};

export default function HomePage({ data, handleReload }) {
  const { services, books, sections, links, bookCategories = [], heroSettings, heroQuickServices } = data;
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);
  const booksGridRef = useRef(null);
  const servicesCarouselRef = useRef(null);

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

  const scrollServicesLeft = () => {
    if (servicesCarouselRef.current) {
      servicesCarouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollServicesRight = () => {
    if (servicesCarouselRef.current) {
      servicesCarouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

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

  if (import.meta.env.DEV) {
    console.log('Libros reales desde Supabase:', books);
    console.log('Libros visibles renderizados:', homeBooks);
  }

  // HomePage services selection logic:
  // 1. Get all active & visible services
  const visibleServices = services ? services.filter(s => s.active !== false && s.visible_on_website !== false) : [];
  
  // 2. Separate featured vs normal
  const featuredServices = visibleServices.filter(s => s.featured === true);
  const normalServices = visibleServices.filter(s => s.featured !== true);
  
  // 3. Merge: featured first, then fill with normal services by display_order
  const combinedServices = [...featuredServices];
  
  // Sort normal services by display_order
  const sortedNormal = [...normalServices].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  
  for (const s of sortedNormal) {
    if (combinedServices.length >= 6) break;
    if (!combinedServices.some(existing => existing.id === s.id)) {
      combinedServices.push(s);
    }
  }
  
  // Max 6 services
  const homeServices = combinedServices.slice(0, 6);

    return (
    <div className="fade-in">
      {/* 2. Hero Section */}
      {(!heroSettings || heroSettings.active !== false) && (() => {
        // Setup background image style for right visual if background_image_url exists
        const rightVisualStyle = {};
        if (heroSettings?.background_image_url) {
          rightVisualStyle.backgroundImage = `url(${heroSettings.background_image_url})`;
        }

        const renderButton = (text, url, className, id) => {
          if (!text || !url) return null;
          const isHash = url.startsWith('#') || url.startsWith('http');
          if (isHash) {
            return <a href={url} className={className} id={id}>{text}</a>;
          }
          return <Link to={url} className={className} id={id}>{text}</Link>;
        };

        // Determine the target book to show
        let targetBook = null;
        if (heroSettings?.featured_book_id) {
          targetBook = books?.find(b => b.id === heroSettings.featured_book_id);
        }
        
        if (!targetBook) {
          // Find first featured book
          targetBook = books?.find(b => b.active !== false && b.visible !== false && (b.is_featured === true || b.featured === true));
        }

        const featuredBookCover = targetBook ? getBookCover(targetBook) : null;
        const sideImageUrl = heroSettings?.side_image_url || '';
        const backgroundImage = heroSettings?.background_image_url || '';

        // Validations for same images
        const isSideSameAsBackground = sideImageUrl && backgroundImage && sideImageUrl === backgroundImage;
        const isSideSameAsCover = sideImageUrl && featuredBookCover && sideImageUrl === featuredBookCover;

        return (
          <section id="inicio" className="hero-section">
            <div className="hero-grid-container">
              <div className="hero-left-content">
                <span className="hero-badge">{heroSettings?.eyebrow || "Somos Noveli Editorial"}</span>
                
                <h1 className="hero-title">
                  {heroSettings?.title || "Tu libro merece una edición a la altura de su"}{' '}
                  <span className="highlight-gold">{heroSettings?.highlighted_word || "historia."}</span>
                </h1>
                
                <div className="hero-divider-line"></div>
                
                <p className="hero-subtitle">
                  {heroSettings?.subtitle || "En Noveli acompañamos a autores en el proceso editorial, desde la revisión del manuscrito hasta la preparación final para publicación digital o impresa."}
                </p>
                
                <div className="hero-quick-services">
                  {heroQuickServices && heroQuickServices.length > 0 ? (
                    heroQuickServices.map((qs, idx) => {
                      const content = (
                        <>
                          {getQuickServiceIcon(qs.icon_name)}
                          <span>{qs.label.toUpperCase()}</span>
                        </>
                      );
                      if (qs.link_url) {
                        const isHash = qs.link_url.startsWith('#') || qs.link_url.startsWith('http');
                        if (isHash) {
                          return (
                            <a key={idx} href={qs.link_url} className="quick-service-item hover:opacity-80" style={{ textDecoration: 'none', color: 'inherit' }}>
                              {content}
                            </a>
                          );
                        }
                        return (
                          <Link key={idx} to={qs.link_url} className="quick-service-item hover:opacity-80" style={{ textDecoration: 'none', color: 'inherit' }}>
                            {content}
                          </Link>
                        );
                      }
                      return (
                        <div key={idx} className="quick-service-item">
                          {content}
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <div className="quick-service-item">
                        {getQuickServiceIcon('pen')}
                        <span>CORRECCIÓN EDITORIAL</span>
                      </div>
                      <div className="quick-service-item">
                        {getQuickServiceIcon('layout')}
                        <span>MAQUETACIÓN PROFESIONAL</span>
                      </div>
                      <div className="quick-service-item">
                        {getQuickServiceIcon('book')}
                        <span>DISEÑO DE PORTADAS</span>
                      </div>
                      <div className="quick-service-item">
                        {getQuickServiceIcon('upload')}
                        <span>AUTOPUBLICACIÓN EN AMAZON</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="hero-btns">
                  {renderButton(heroSettings?.primary_button_text || "SOLICITAR PROPUESTA EDITORIAL", heroSettings?.primary_button_url || "/contacto", "btn btn-hero-primary", "btn-hero-contact")}
                  {renderButton(heroSettings?.secondary_button_text || "VER SERVICIOS", heroSettings?.secondary_button_url || "/servicios", "btn btn-hero-secondary", "btn-hero-services")}
                </div>
              </div>
              
              <div className="hero-right-visual" style={rightVisualStyle}>
                <div className="hero-books-showcase" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {(() => {
                    const hasExplicitBook = !!heroSettings?.featured_book_id;
                    const isDifferentBook = hasExplicitBook && !isSideSameAsCover;
                    
                    if (sideImageUrl && !isSideSameAsBackground && !isDifferentBook) {
                      // Show side image as the main protagonist
                      return (
                        <div className="hero-side-custom-image" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img 
                            src={sideImageUrl} 
                            style={{ maxWidth: '90%', maxHeight: '420px', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', objectFit: 'cover' }} 
                            alt="Visual Editorial" 
                          />
                        </div>
                      );
                    } else if (targetBook) {
                      // Show book cover as the main protagonist
                      return (
                        <div 
                          className="hero-showcase-book book-0 cursor-pointer" 
                          style={{ transform: 'scale(1.15)', margin: '0 auto', position: 'relative' }} 
                          onClick={() => setSelectedBook(targetBook)}
                        >
                          <BookCover 
                            title={targetBook.title} 
                            author={targetBook.author} 
                            coverUrl={featuredBookCover} 
                            index={0} 
                          />
                        </div>
                      );
                    } else {
                      // Fallback: show generic cover
                      return (
                        <div 
                          className="hero-showcase-book book-0 cursor-pointer" 
                          style={{ transform: 'scale(1.15)', margin: '0 auto', position: 'relative' }} 
                          onClick={() => setSelectedBook({ 
                            title: "Letras y Voces", 
                            author: "Noveli Editorial", 
                            short_description: "Una portada decorativa para dar la bienvenida al mundo de la edición." 
                          })}
                        >
                          <BookCover 
                            title="Letras y Voces" 
                            author="Noveli Editorial" 
                            coverUrl="" 
                            index={0} 
                          />
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

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
          
          <div className="catalog-carousel-container" style={{ position: 'relative' }}>
            <button 
              className="carousel-arrow arrow-left" 
              onClick={scrollServicesLeft} 
              aria-label="Desplazar a la izquierda"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              ‹
            </button>

            <div className="services-carousel" ref={servicesCarouselRef}>
              {(!services || services.length === 0) ? (
                <p className="empty-services-message" style={{ textAlign: 'center', width: '100%', padding: '40px 0', fontStyle: 'italic', color: 'var(--text-muted)', fontFamily: 'var(--font-serif-body)' }}>
                  Aún no hay servicios visibles.
                </p>
              ) : (
                homeServices.map((service, index) => (
                  <ServiceCard 
                    key={service.id}
                    service={service}
                    index={index}
                    variant="compact"
                  />
                ))
              )}
            </div>

            <button 
              className="carousel-arrow arrow-right" 
              onClick={scrollServicesRight} 
              aria-label="Desplazar a la derecha"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              ›
            </button>
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
          
          {/* Dynamic grouped filter dropdown */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <BookFilterDropdown 
              activeFilter={activeFilter} 
              onChange={setActiveFilter} 
              bookCategories={bookCategories} 
            />
            {import.meta.env.DEV && (
              <button 
                className="filter-btn reload-btn" 
                onClick={handleReload}
                style={{ 
                  height: '42px', 
                  border: '1px solid var(--accent-gold)', 
                  borderRadius: '4px', 
                  color: 'var(--accent-gold)', 
                  background: 'none', 
                  padding: '0 16px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  zIndex: 100, 
                  fontSize: '0.8rem', 
                  letterSpacing: '0.05em' 
                }}
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

            <div 
              className="books-grid" 
              ref={booksGridRef}
              style={{
                justifyContent: (homeBooks && homeBooks.length === 1) ? 'center' : 'flex-start'
              }}
            >
              {(!books || books.length === 0) ? (
                <p className="empty-catalog-message" style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px 0', fontStyle: 'italic', color: 'var(--text-muted)', width: '100%', fontFamily: 'var(--font-serif-body)' }}>
                  Aún no hay libros publicados en el catálogo.
                </p>
              ) : (
                homeBooks && homeBooks.map((book, index) => {
                  const originText = book.book_origin === 'published_by_noveli' 
                    ? 'Publicado por Noveli' 
                    : 'Compra con el autor';

                  let highlightText = '';
                  if (book.is_featured) highlightText = 'DESTACADO';
                  else if (book.is_new || book.status?.toUpperCase() === 'NOVEDAD' || book.status?.toUpperCase() === 'DESTACADO') highlightText = book.status?.toUpperCase() || 'NOVEDAD';
                  else if (book.is_coming_soon || book.status?.toLowerCase() === 'próximamente' || book.status?.toLowerCase() === 'proximamente') highlightText = 'PRÓXIMAMENTE';

                  const action = getBookAction(book);

                  let actionButton = null;
                  if (action.action === 'link') {
                    actionButton = (
                      <a 
                        href={action.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`btn book-btn ${book.book_origin === 'published_by_noveli' ? 'btn-primary' : 'btn-dark'}`}
                        style={{ width: '100%', padding: '6px 12px', fontSize: '0.72rem', marginTop: '10px' }}
                      >
                        {action.label}
                      </a>
                    );
                  } else {
                    actionButton = (
                      <button 
                        onClick={() => setSelectedBook(book)}
                        className="btn btn-secondary book-btn"
                        style={{ width: '100%', padding: '6px 12px', fontSize: '0.72rem', marginTop: '10px' }}
                        disabled={action.disabled}
                      >
                        {action.label}
                      </button>
                    );
                  }

                  return (
                    <article key={book.id} className="book-card" style={{ display: 'flex', flexDirection: 'column' }}>
                      <div 
                        onClick={() => setSelectedBook(book)}
                        style={{ position: 'relative', cursor: 'pointer' }}
                        title="Click para ver sinopsis/resumen"
                      >
                        {/* Origin Badge */}
                        <span className="book-origin-badge" style={{ bottom: '18px' }}>{originText}</span>
                        
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
                      <h3 className="book-title" style={{ marginTop: '12px' }}>{book.title}</h3>
                      <p className="book-author" style={{ marginBottom: '12px' }}>{book.author}</p>

                      <div style={{ width: '100%', marginTop: 'auto' }}>
                        {actionButton}
                      </div>
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

      {/* Book details floating modal */}
      {selectedBook && (
        <BookDetailModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}
    </div>
  );
}
