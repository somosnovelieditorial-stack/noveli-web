import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

export default function ServicesPage({ services = [], servicesError = null }) {
  const [selectedCat, setSelectedCat] = useState('Todos');
  const navigate = useNavigate();

  const categories = ['Todos', 'Editorial', 'Diseño', 'Producción', 'Marketing', 'Legal', 'Digitalización'];

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
            {filteredServices.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
                variant="large" 
                onRequestService={handleRequestService} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
