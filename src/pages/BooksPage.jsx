import { useState } from 'react';
import BookCover from '../components/BookCover';
import { getBookCover } from '../services/dataService';

export default function BooksPage({ books = [], bookCategories = [], handleReload }) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Build the catalog filter options dynamically and in UPPERCASE
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

  return (
    <div className="section books-page-wrapper fade-in" style={{ backgroundColor: 'var(--crema-papel-light)', minHeight: '80vh', paddingTop: '100px' }}>
      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '32px' }}>
          <span className="section-subtitle">— CATÁLOGO —</span>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Historias que inspiran</h1>
          <p className="contact-manifesto-p" style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.95rem' }}>
            Explora nuestra colección de obras seleccionadas, publicadas en formato físico y digital con la máxima dedicación editorial.
          </p>
        </div>

        {/* Filters/Tabs */}
        <div className="book-filters" style={{ marginBottom: '36px' }}>
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

        {/* Complete Catalog Grid */}
        {(!books || books.length === 0) ? (
          <p className="empty-catalog-message" style={{ textAlign: 'center', padding: '60px 0', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            Aún no hay libros publicados en el catálogo.
          </p>
        ) : filteredBooks.length === 0 ? (
          <p className="empty-catalog-message" style={{ textAlign: 'center', padding: '60px 0', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            No se encontraron libros en esta categoría.
          </p>
        ) : (
          <div className="books-full-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '30px 24px' }}>
            {filteredBooks.map((book, index) => {
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

              let buyButton = null;
              if (book.noveli_purchase_url) {
                buyButton = (
                  <a 
                    href={book.noveli_purchase_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary book-btn"
                    style={{ width: '100%', padding: '8px 12px' }}
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
                    style={{ width: '100%', padding: '8px 12px' }}
                  >
                    Comprar con el autor
                  </a>
                );
              } else {
                buyButton = (
                  <a 
                    href="#/contacto" 
                    className="btn btn-secondary book-btn"
                    style={{ width: '100%', padding: '8px 12px' }}
                  >
                    Ver detalles
                  </a>
                );
              }

              return (
                <article key={book.id} className="book-card" style={{ width: '100%' }}>
                  <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
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
                  
                  {/* Action Button visible on complete page */}
                  <div style={{ width: '100%', marginTop: 'auto' }}>
                    {buyButton}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
