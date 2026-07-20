import { useState } from 'react';

export default function BookCover({ title, author, coverUrl, index, loading = 'lazy', fetchpriority = 'auto' }) {
  const [imageError, setImageError] = useState(false);
  const gradientClass = `cover-${index % 4}`;

  return (
    <div className="book-cover-container">
      {!imageError && coverUrl ? (
        <img
          src={coverUrl}
          alt={`Portada de ${title}`}
          className="book-cover-image"
          loading={loading}
          decoding={loading === 'eager' ? 'async' : 'auto'}
          {...(fetchpriority !== 'auto' ? { fetchpriority } : {})}
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
