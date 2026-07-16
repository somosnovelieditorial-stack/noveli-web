import { useState } from 'react';
import BookCover from '../components/BookCover';
import BookDetailModal from '../components/BookDetailModal';
import BookFilterDropdown from '../components/BookFilterDropdown';
import { getBookCover, getBookAction } from '../services/dataService';

export default function BooksPage({ books = [], bookCategories = [], booksError = null, handleReload }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = books ? books.filter(book => {
    // Client-side active and visible enforcement
    if (book.active === false || book.visible === false) return false;

    if (activeFilter === 'all' || String(activeFilter).toLowerCase() === 'general') return true;
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

  if (import.meta.env.DEV) {
    console.log('Error libros:', booksError);
    console.log('Libros crudos desde Supabase:', books);
    console.log('Libros visibles:', books ? books.filter(b => b.active !== false && b.visible !== false) : []);
    console.log('Filtro activo libros:', activeFilter);
    console.log('Libros filtrados:', filteredBooks);
  }

  return (
    <div className="section books-page-wrapper fade-in" style={{ backgroundColor: 'var(--crema-papel-light)', minHeight: '80vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '32px' }}>
          <span className="section-subtitle">— CATÁLOGO —</span>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Historias que inspiran</h1>
          <p className="contact-manifesto-p" style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.95rem' }}>
            Explora nuestra colección de obras seleccionadas, publicadas en formato físico y digital con la máxima dedicación editorial.
          </p>
        </div>

        {booksError && (
          <div style={{
            padding: '12px 18px',
            backgroundColor: '#FDF2F2',
            borderLeft: '4px solid #F05252',
            color: '#9B1C1C',
            fontSize: '0.88rem',
            fontFamily: 'var(--font-sans)',
            marginBottom: '24px',
            borderRadius: '4px',
            textAlign: 'left'
          }}>
            <strong>Error cargando libros:</strong> {booksError}
          </div>
        )}

        {/* Dynamic grouped filter dropdown */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
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
                    className={`btn book-btn ${book.book_origin === 'published_by_noveli' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: '100%', padding: '8px 12px' }}
                  >
                    {action.label}
                  </a>
                );
              } else {
                actionButton = (
                  <button 
                    onClick={() => setSelectedBook(book)}
                    className="btn btn-secondary book-btn"
                    style={{ width: '100%', padding: '8px 12px' }}
                    disabled={action.disabled}
                  >
                    {action.label}
                  </button>
                );
              }

              return (
                <article key={book.id} className="book-card" style={{ width: '100%' }}>
                  <div 
                    onClick={() => setSelectedBook(book)}
                    style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
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
                  
                  {/* Action Button */}
                  <div style={{ width: '100%', marginTop: 'auto' }}>
                    {actionButton}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

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
