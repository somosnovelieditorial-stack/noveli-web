import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatServicePrice } from '../services/dataService';

export default function ServicesPage({ services = [] }) {
  const [selectedCat, setSelectedCat] = useState('Todos');
  const navigate = useNavigate();

  const categories = ['Todos', 'Editorial', 'Diseño', 'Producción', 'Marketing', 'Legal', 'Digitalización'];

  // Handle category standardizations
  const getNormalizedCategory = (cat = '') => {
    const c = cat.toLowerCase();
    if (c.includes('edición') || c.includes('editorial') || c.includes('corrección')) return 'editorial';
    if (c.includes('diseño') || c.includes('arte') || c.includes('portadas') || c.includes('maquetación')) return 'diseño';
    if (c.includes('impresión') || c.includes('producción') || c.includes('físico')) return 'producción';
    if (c.includes('marketing') || c.includes('difusión') || c.includes('redes')) return 'marketing';
    if (c.includes('legal') || c.includes('derechos') || c.includes('propiedad')) return 'legal';
    if (c.includes('digital') || c.includes('epub') || c.includes('amazon') || c.includes('distribución')) return 'digitalización';
    return c;
  };

  const filteredServices = services ? services.filter(service => {
    if (selectedCat === 'Todos') return true;
    const normServiceCat = getNormalizedCategory(service.category);
    const normSelectedCat = selectedCat.toLowerCase();
    return normServiceCat === normSelectedCat;
  }) : [];

  const handleRequestService = (title) => {
    navigate('/contacto', { state: { selectedService: title } });
  };

  return (
    <div className="section services-page-wrapper fade-in" style={{ backgroundColor: 'var(--crema-papel-light)', minHeight: '80vh', paddingTop: '100px' }}>
      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '32px' }}>
          <span className="section-subtitle">— NUESTRA OFERTA —</span>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Servicios editoriales</h1>
          <p className="contact-manifesto-p" style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.95rem' }}>
            Acompañamos tu libro desde la revisión ortotipográfica hasta su preparación final para publicación física o digital en plataformas globales.
          </p>
        </div>

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

        {/* Detailed Services Grid */}
        {filteredServices.length === 0 ? (
          <p className="empty-services-message" style={{ textAlign: 'center', padding: '60px 0', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            No hay servicios disponibles en esta categoría.
          </p>
        ) : (
          <div className="services-detailed-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredServices.map((service, index) => {
              // Circular linear icons mapped directly to mockup
              const icons = [
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4Z" /></svg>,
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20" /><path d="m17 5-5-3-5 3" /><path d="m17 19-5 3-5-3" /><path d="M2 12h20" /></svg>,
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6 6h10" /><path d="M6 10h10" /></svg>
              ];
              const iconColors = ['circle-wine', 'circle-green', 'circle-gold', 'circle-blue', 'circle-purple'];
              const icon = icons[index % icons.length];
              const iconColorClass = iconColors[index % iconColors.length];

              return (
                <article 
                  key={service.id} 
                  className={`service-card-detailed ${service.featured ? 'featured-card' : ''}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    padding: '30px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: '24px',
                    alignItems: 'center',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div className={`service-icon-circle ${iconColorClass}`} style={{ width: '56px', height: '56px', marginBottom: 0 }}>
                    {icon}
                  </div>
                  
                  <div className="service-details-left" style={{ textAlign: 'left' }}>
                    <span className="service-category" style={{ fontSize: '0.65rem' }}>{service.category.toUpperCase()}</span>
                    <h3 className="service-title" style={{ fontSize: '1.3rem', margin: '4px 0 8px' }}>{service.title}</h3>
                    <p className="service-description-short" style={{ color: 'var(--text-main)', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
                      {service.short_description || service.description}
                    </p>
                    {service.full_description && (
                      <p className="service-description-full" style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '10px', lineHeight: '1.45' }}>
                        {service.full_description}
                      </p>
                    )}
                  </div>

                  <div className="service-details-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px', minWidth: '180px' }}>
                    <div className="service-price-block" style={{ textAlign: 'right' }}>
                      <span className="price-value" style={{ fontSize: '0.85rem', color: 'var(--wine-dark)', display: 'block', fontWeight: 'bold' }}>
                        {formatServicePrice(service.price_from, service.currency)}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleRequestService(service.title)}
                      className="btn btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.58rem' }}
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
