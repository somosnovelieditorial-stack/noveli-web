import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatServicePrice } from '../services/dataService';

export default function ServicesPage({ services = [], servicesError = null }) {
  const [selectedCat, setSelectedCat] = useState('Todos');
  const navigate = useNavigate();

  const categories = ['Todos', 'Editorial', 'Diseño', 'Producción', 'Marketing', 'Legal', 'Digitalización'];

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

    // Fallbacks based on index
    const defaultIcons = [icons.edit, icons.layout, icons.book, icons.globe, icons.publish];
    return defaultIcons[index % defaultIcons.length];
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

  const filteredServices = services ? services.filter(service => {
    if (String(selectedCat).toUpperCase() === 'TODOS') return true;
    return String(service.category || '').toLowerCase().trim() === String(selectedCat).toLowerCase().trim();
  }) : [];

  // Development logs
  if (import.meta.env.DEV) {
    const visibleServices = services ? services.filter(s => s.active !== false && s.visible_on_website !== false) : [];
    console.log('Servicios crudos desde Supabase:', services);
    console.log('Servicios visibles:', visibleServices);
    console.log('Categoría seleccionada:', selectedCat);
    console.log('Servicios filtrados:', filteredServices);
  }

  const handleRequestService = (title) => {
    navigate(`/contacto?servicio=${encodeURIComponent(title)}`, { state: { selectedService: title } });
  };

  return (
    <div className="section services-page-wrapper fade-in" style={{ backgroundColor: 'var(--crema-papel-light)', minHeight: '80vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '32px' }}>
          <span className="section-subtitle">— NUESTRA OFERTA —</span>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Servicios editoriales</h1>
          <p className="contact-manifesto-p" style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.95rem' }}>
            Acompañamos tu libro desde la revisión ortotipográfica hasta su preparación final para publicación física o digital en plataformas globales.
          </p>
        </div>

        {servicesError && (
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
            <strong>Error cargando servicios:</strong> {servicesError}
          </div>
        )}

        {/* Category Filters */}
        <div className="book-filters" style={{ marginBottom: '36px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Premium Detailed Services Card Grid */}
        {filteredServices.length === 0 ? (
          <p className="empty-services-message" style={{ textAlign: 'center', padding: '60px 0', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            No hay servicios disponibles en esta categoría.
          </p>
        ) : (
          <div className="services-card-grid">
            {filteredServices.map((service, index) => {
              const icon = getServiceIcon(service.icon_name, index);
              const iconColors = ['circle-wine', 'circle-green', 'circle-gold', 'circle-blue', 'circle-purple'];
              const iconColorClass = iconColors[index % iconColors.length];

              return (
                <article key={service.id} className="service-card-visual">
                  {/* Recommended badge */}
                  {service.featured && (
                    <span className="service-recommended-badge">RECOMENDADO</span>
                  )}
                  
                  {/* Decorative Header Background */}
                  {renderCardHeader(service)}

                  {/* Superposed Icon Circle */}
                  <div className={`service-icon-circle-superposed ${iconColorClass}`}>
                    {icon}
                  </div>

                  {/* Content Body */}
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

                    {/* Price block */}
                    <div className="service-card-price-block">
                      <span className="service-card-price-label">Inversión</span>
                      <span className="service-card-price-value">
                        {formatServicePrice(service.price_from, service.currency)}
                      </span>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={() => handleRequestService(service.title)}
                      className="btn btn-service-card-action"
                    >
                      SOLICITAR PROPUESTA
                    </button>
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
