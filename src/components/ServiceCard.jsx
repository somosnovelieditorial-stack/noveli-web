import { Link } from 'react-router-dom';
import { formatServicePrice } from '../services/dataService';

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

export default function ServiceCard({ service, index, variant = 'large', onRequestService }) {
  const { className: decorClass, symbol } = getDecorClass(service.category);
  const icon = getServiceIcon(service.icon_name, index);
  
  const iconColors = ['circle-wine', 'circle-green', 'circle-gold', 'circle-blue', 'circle-purple'];
  const iconColorClass = iconColors[index % iconColors.length];

  const imageUrl = service.image_url || service.background_url || '';
  const hasImage = !!imageUrl;

  const headerStyle = {};
  if (hasImage) {
    headerStyle.backgroundImage = `url(${imageUrl})`;
    headerStyle.backgroundSize = 'cover';
    headerStyle.backgroundPosition = 'center';
  } else if (service.color_theme) {
    headerStyle.background = service.color_theme;
  }

  if (variant === 'compact') {
    return (
      <article 
        className="service-card-compact"
        style={{ 
          width: '280px', 
          height: '320px', 
          display: 'flex', 
          flexDirection: 'column', 
          backgroundColor: '#FFFDF9', 
          border: '1px solid rgba(199, 148, 58, 0.15)', 
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(42, 15, 20, 0.05)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          flexShrink: 0
        }}
      >
        {/* Recommended Badge */}
        {service.featured && (
          <span 
            className="service-recommended-badge" 
            style={{ 
              position: 'absolute', 
              top: '8px', 
              right: '8px', 
              fontSize: '0.5rem', 
              padding: '2px 6px',
              zIndex: 10
            }}
          >
            RECOMENDADO
          </span>
        )}

        {/* Compact Header Visual (90px - 110px) */}
        <div 
          className={`service-header-decor ${!hasImage ? decorClass : ''}`}
          style={{ 
            height: '100px', 
            width: '100%', 
            position: 'relative',
            ...headerStyle
          }}
        >
          {!hasImage && (
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '3rem', opacity: 0.1, userSelect: 'none' }}>
              {symbol}
            </span>
          )}
        </div>

        {/* Superposed Small Icon Circle */}
        <div 
          className={`service-icon-circle-superposed ${iconColorClass}`}
          style={{ 
            position: 'absolute', 
            top: '84px', 
            left: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            zIndex: 10
          }}
        >
          <div style={{ transform: 'scale(0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>
        </div>

        {/* Body content */}
        <div 
          className="service-card-body"
          style={{ 
            padding: '20px 16px 14px', 
            display: 'flex', 
            flexDirection: 'column', 
            flexGrow: 1, 
            textAlign: 'left',
            marginTop: '10px'
          }}
        >
          <span 
            className="service-category"
            style={{ 
              fontSize: '0.55rem', 
              letterSpacing: '0.08em', 
              color: 'var(--accent-gold)', 
              fontWeight: 700, 
              marginBottom: '4px', 
              textTransform: 'uppercase' 
            }}
          >
            {service.category}
          </span>
          
          <h3 
            className="service-card-title"
            style={{ 
              fontSize: '0.98rem', 
              margin: '0 0 6px 0', 
              fontFamily: 'var(--font-serif-title)', 
              color: 'var(--wine-dark)',
              lineHeight: '1.2',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {service.title}
          </h3>

          <p 
            className="service-card-desc"
            style={{ 
              fontSize: '0.74rem', 
              lineHeight: '1.4', 
              color: 'var(--text-main)', 
              margin: '0 0 10px 0',
              opacity: 0.85,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              height: '34px'
            }}
          >
            {service.short_description || service.description}
          </p>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Inversión</span>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--wine-dark)' }}>
                {formatServicePrice(service.price_from, service.currency)}
              </span>
            </div>

            <Link 
              to={`/contacto?servicio=${encodeURIComponent(service.title)}`}
              className="service-action-link"
              style={{ 
                fontSize: '0.72rem', 
                fontWeight: 700, 
                color: 'var(--accent-gold)', 
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.2s ease'
              }}
            >
              Ver servicio →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Large Variant (Default for /servicios)
  return (
    <article className="service-card-visual">
      {service.featured && (
        <span className="service-recommended-badge">RECOMENDADO</span>
      )}
      
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

      <div className={`service-icon-circle-superposed ${iconColorClass}`}>
        {icon}
      </div>

      <div className="service-card-body">
        <span className="service-category" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
          {service.category}
        </span>
        <h3 className="service-card-title">{service.title}</h3>
        
        <p className="service-card-desc">
          {service.short_description || service.description}
        </p>
        
        {service.full_description && (
          <p className="service-card-full-desc">
            {service.full_description}
          </p>
        )}

        <div className="service-card-price-block">
          <span className="service-card-price-label">Inversión</span>
          <span className="service-card-price-value">
            {formatServicePrice(service.price_from, service.currency)}
          </span>
        </div>

        <button 
          onClick={() => onRequestService && onRequestService(service.title)}
          className="btn btn-service-card-action"
        >
          SOLICITAR PROPUESTA
        </button>
      </div>
    </article>
  );
}
