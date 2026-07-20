import { Link } from 'react-router-dom';

export default function NosotrosPage({ sections = {}, links = {} }) {
  const nosotrosData = sections.nosotros || {
    title: "Sobre Noveli Editorial",
    content: "Creemos que cada libro merece ser tratado con respeto, belleza y cuidado editorial. No publicamos historias, las acompañamos."
  };

  return (
    <div className="section nosotros-page-wrapper fade-in" style={{ backgroundColor: 'var(--crema-papel-light)', minHeight: '80vh', paddingTop: '100px' }}>
      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '32px' }}>
          <span className="section-subtitle">— NUESTRA FILOSOFÍA —</span>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Sobre nosotros</h1>
        </div>

        <div className="nosotros-grid" style={{ display: 'grid', gridTemplateColumns: '40fr 60fr', gap: '40px', alignItems: 'center' }}>
          <div 
            style={{ 
              backgroundImage: 'url(/manifesto_still_life.jpg)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              height: '420px',
              borderRadius: '0',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(21, 36, 55, 0) 60%, rgba(21, 36, 55, 0.1) 100%)' }}></div>
          </div>

          <div style={{ textAlign: 'left', padding: '10px 0' }}>
            <h2 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.8rem', color: 'var(--wine-dark)', marginBottom: '18px', lineHeight: '1.3' }}>
              {nosotrosData.title}
            </h2>
            
            <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '20px' }}>
              En Noveli Editorial entendemos la escritura como un acto de valentía y dedicación. Por eso, no vemos los manuscritos como meros productos comerciales, sino como obras de arte únicas que requieren un trato artesanal y profesionalismo riguroso.
            </p>
            
            <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '24px' }}>
              {nosotrosData.content}
            </p>

            <blockquote style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '20px', margin: '20px 0', fontFamily: 'var(--font-serif-body)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--wine-medium)' }}>
              "El proceso editorial es un diálogo constante entre el autor y su obra, facilitado por el editor. Cuidamos cada detalle tipográfico, de diseño y encuadernación para que el resultado final sea digno de perdurar en las estanterías de los lectores."
            </blockquote>

            <div style={{ marginTop: '30px' }}>
              <Link to="/contacto" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                TRABAJA CON NOSOTROS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
