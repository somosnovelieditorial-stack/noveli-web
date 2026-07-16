import BookCover from './BookCover';
import { 
  getBookCover, 
  getBookAction, 
  getBookSummary, 
  getSalePlatform, 
  getBookPurchaseUrl 
} from '../services/dataService';

export default function BookDetailModal({ book, onClose }) {
  if (!book) return null;

  // Development logs
  if (import.meta.env.DEV) {
    console.log('Libro cargado:', book);
    console.log('Resumen:', getBookSummary(book));
    console.log('Link compra:', getBookPurchaseUrl(book));
    console.log('Acción:', getBookAction(book));
  }

  const action = getBookAction(book);

  const getOriginLabel = (origin) => {
    if (book.is_coming_soon) return 'Próximamente';
    if (origin === 'published_by_noveli' || book.purchase_type === 'noveli') return 'Publicado por Noveli';
    if (origin === 'author_purchase' || book.purchase_type === 'external_author') return 'Compra con el autor';
    return 'Obra Selecta';
  };

  const originClass = book.is_coming_soon 
    ? 'badge-proximamente' 
    : (book.book_origin === 'published_by_noveli' || book.purchase_type === 'noveli')
      ? 'badge-publicados'
      : 'badge-compra';

  return (
    <div className="book-modal-overlay" onClick={onClose}>
      <div className="book-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="book-modal-close" onClick={onClose} aria-label="Cerrar modal">
          &times;
        </button>

        <div className="book-modal-grid">
          {/* Cover Left */}
          <div className="book-modal-cover-col">
            <BookCover 
              title={book.title} 
              author={book.author} 
              coverUrl={book.is_generic_hero ? '' : getBookCover(book)} 
              index={0} 
            />
          </div>

          {/* Info Right */}
          <div className="book-modal-info-col">
            <span className={`book-modal-badge ${originClass}`}>
              {getOriginLabel(book.book_origin).toUpperCase()}
            </span>
            
            <h2 className="book-modal-title">{book.title}</h2>
            <p className="book-modal-author">de {book.author}</p>

            {book.genre && (
              <p className="book-modal-genre" style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700, margin: '-10px 0 16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Género: {book.genre}
              </p>
            )}

            <div className="book-modal-divider"></div>

            <div className="book-modal-summary-container">
              <h4 className="book-modal-summary-title">SINOPSIS / RESUMEN</h4>
              <p className="book-modal-summary-text">
                {getBookSummary(book)}
              </p>
            </div>

            {getSalePlatform(book) && (
              <p className="book-modal-platform" style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '16px', marginBottom: '0' }}>
                Disponible en: <strong>{getSalePlatform(book)}</strong>
              </p>
            )}

            {/* Action Button */}
            <div className="book-modal-action-wrapper">
              {action.action === 'link' ? (
                <a 
                  href={action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary book-modal-btn"
                >
                  {action.label.toUpperCase()}
                </a>
              ) : (
                <button 
                  className="btn btn-primary book-modal-btn"
                  disabled={action.disabled}
                  onClick={action.action === 'modal' ? onClose : undefined}
                >
                  {action.label.toUpperCase()}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
