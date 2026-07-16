import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          backgroundColor: '#FFF9EF',
          color: '#2A0F14',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h2 style={{ fontFamily: 'serif', color: '#C7943A', marginBottom: '16px' }}>Algo salió mal</h2>
          <p style={{ maxWidth: '500px', lineHeight: '1.6', fontSize: '0.95rem', color: '#6F6557' }}>
            Hubo un error inesperado al cargar esta sección. Por favor, intenta recargar la página o volver a la página de inicio.
          </p>
          {import.meta.env.DEV && (
            <pre style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#FDF2F2',
              color: '#9B1C1C',
              border: '1px solid #F05252',
              borderRadius: '4px',
              textAlign: 'left',
              maxWidth: '80%',
              overflowX: 'auto',
              fontSize: '0.85rem'
            }}>
              {this.state.error?.toString()}
            </pre>
          )}
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '24px',
              padding: '10px 20px',
              backgroundColor: '#2A0F14',
              color: '#FFF9EF',
              border: '1px solid #2A0F14',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '0.75rem'
            }}
          >
            Recargar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
