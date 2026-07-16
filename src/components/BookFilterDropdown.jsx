import { useState, useEffect, useRef } from 'react';

export default function BookFilterDropdown({ activeFilter, onChange, bookCategories = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Define static groups & options
  const group1 = [{ id: 'all', label: 'General' }];
  const group2 = [
    { id: 'published_by_noveli', label: 'Publicados por Noveli' },
    { id: 'author_purchase', label: 'Compra con el autor' }
  ];

  // Group 3: Genres (dynamic + default fallbacks if empty)
  const defaultGenres = [
    { id: 'poesia', label: 'Poesía' },
    { id: 'novela', label: 'Novela' },
    { id: 'romance', label: 'Romance' },
    { id: 'fantasia', label: 'Fantasía' },
    { id: 'ensayo', label: 'Ensayo' }
  ];
  
  const dynamicGenres = (bookCategories || [])
    .filter(cat => cat.type === 'genre')
    .map(cat => ({ id: cat.id || cat.slug, label: cat.name }));

  // Combine dynamic genres and defaults, avoiding duplicates by label/id
  const genreList = [...dynamicGenres];
  defaultGenres.forEach(dg => {
    if (!genreList.some(g => String(g.label).toLowerCase() === String(dg.label).toLowerCase() || String(g.id).toLowerCase() === String(dg.id).toLowerCase())) {
      genreList.push(dg);
    }
  });

  // Group 4: Collections
  const defaultCollections = [
    { id: 'featured', label: 'Destacados' },
    { id: 'new', label: 'Novedades' },
    { id: 'coming_soon', label: 'Próximamente' }
  ];

  const dynamicCollections = (bookCategories || [])
    .filter(cat => cat.type === 'collection')
    .map(cat => ({ id: cat.id || cat.slug, label: cat.name }));

  const collectionList = [...defaultCollections];
  dynamicCollections.forEach(dc => {
    if (!collectionList.some(c => String(c.label).toLowerCase() === String(dc.label).toLowerCase() || String(c.id).toLowerCase() === String(dc.id).toLowerCase())) {
      collectionList.push(dc);
    }
  });

  // Find currently active option label
  const allOptions = [...group1, ...group2, ...genreList, ...collectionList];
  const activeOption = allOptions.find(opt => opt.id === activeFilter) || { label: 'General' };

  const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div className="book-filter-dropdown" ref={dropdownRef} style={{ position: 'relative', width: '280px', margin: '0 auto 36px', zIndex: 100 }}>
      {/* Dropdown Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`filter-dropdown-btn ${isOpen ? 'open' : ''}`}
        style={{
          width: '100%',
          height: '42px',
          backgroundColor: isOpen ? 'var(--wine-dark)' : '#FFFDF9',
          color: isOpen ? '#FFFDF9' : 'var(--wine-dark)',
          border: '1px solid var(--accent-gold)',
          borderRadius: '4px',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(42,15,20,0.06)',
          transition: 'all 0.3s ease'
        }}
      >
        <span>FILTRAR: {activeOption.label.toUpperCase()}</span>
        <svg 
          width="12" 
          height="8" 
          viewBox="0 0 12 8" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.3s ease',
            color: 'var(--accent-gold)'
          }}
        >
          <polyline points="2 2 6 6 10 2" />
        </svg>
      </button>

      {/* Floating Menu List */}
      {isOpen && (
        <div 
          className="filter-dropdown-menu"
          style={{
            position: 'absolute',
            top: '46px',
            left: 0,
            width: '100%',
            backgroundColor: '#FFFDF9',
            border: '1px solid var(--accent-gold)',
            borderRadius: '4px',
            boxShadow: '0 8px 30px rgba(42,15,20,0.18)',
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '12px 0',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Group 1: General */}
          <div className="filter-group">
            {group1.map(opt => (
              <button 
                key={opt.id} 
                className={`filter-item ${activeFilter === opt.id ? 'active' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="filter-dropdown-divider"></div>

          {/* Group 2: Origen */}
          <div className="filter-group">
            <span className="filter-group-title">ORIGEN</span>
            {group2.map(opt => (
              <button 
                key={opt.id} 
                className={`filter-item ${activeFilter === opt.id ? 'active' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="filter-dropdown-divider"></div>

          {/* Group 3: Géneros */}
          <div className="filter-group">
            <span className="filter-group-title">GÉNEROS</span>
            {genreList.map(opt => (
              <button 
                key={opt.id} 
                className={`filter-item ${activeFilter === opt.id ? 'active' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="filter-dropdown-divider"></div>

          {/* Group 4: Colecciones */}
          <div className="filter-group">
            <span className="filter-group-title">COLECCIONES</span>
            {collectionList.map(opt => (
              <button 
                key={opt.id} 
                className={`filter-item ${activeFilter === opt.id ? 'active' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
