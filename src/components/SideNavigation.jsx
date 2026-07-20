import { useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function SideNavigation({ isOpen, onClose, links = {}, settings = {} }) {
  const panelRef = useRef(null);
  const location = useLocation();

  // Stable reference to onClose callback to avoid infinite loops on re-render
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Close when route changes
  useEffect(() => {
    onCloseRef.current();
  }, [location.pathname]);

  // Escape key close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onCloseRef.current();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="side-nav-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(14, 14, 14, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-start',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div 
        className="side-nav-panel"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '85vw',
          maxWidth: '360px',
          height: '100%',
          backgroundColor: '#0E0E0E', /* premium editorial black */
          borderRight: '1px solid var(--accent-gold)',
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '10px 0 30px rgba(0,0,0,0.4)',
          animation: 'slideRight 0.3s ease-out',
          position: 'relative',
          textAlign: 'left'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Cerrar menú"
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: 'var(--accent-gold)',
            fontSize: '2rem',
            lineHeight: 1,
            cursor: 'pointer',
            opacity: 0.8,
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0.8}
        >
          &times;
        </button>

        {/* Logo */}
        <div className="logo-wrapper-sidenav" style={{ marginBottom: '40px' }}>
          <BrandLogo settings={settings} variant="light" />
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `side-nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent-gold)' : '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'color 0.2s ease',
              paddingBottom: '4px',
              borderBottom: isActive ? '1px solid var(--accent-gold)' : '1px solid transparent',
              width: 'fit-content'
            })}
          >
            INICIO
          </NavLink>
          <NavLink 
            to="/servicios" 
            className={({ isActive }) => `side-nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent-gold)' : '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'color 0.2s ease',
              paddingBottom: '4px',
              borderBottom: isActive ? '1px solid var(--accent-gold)' : '1px solid transparent',
              width: 'fit-content'
            })}
          >
            SERVICIOS
          </NavLink>
          <NavLink 
            to="/libros" 
            className={({ isActive }) => `side-nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent-gold)' : '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'color 0.2s ease',
              paddingBottom: '4px',
              borderBottom: isActive ? '1px solid var(--accent-gold)' : '1px solid transparent',
              width: 'fit-content'
            })}
          >
            LIBROS
          </NavLink>
          <NavLink 
            to="/nosotros" 
            className={({ isActive }) => `side-nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent-gold)' : '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'color 0.2s ease',
              paddingBottom: '4px',
              borderBottom: isActive ? '1px solid var(--accent-gold)' : '1px solid transparent',
              width: 'fit-content'
            })}
          >
            NOSOTROS
          </NavLink>
          <NavLink 
            to="/contacto" 
            className={({ isActive }) => `side-nav-link ${isActive ? 'active' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent-gold)' : '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'color 0.2s ease',
              paddingBottom: '4px',
              borderBottom: isActive ? '1px solid var(--accent-gold)' : '1px solid transparent',
              width: 'fit-content'
            })}
          >
            CONTACTO
          </NavLink>
        </nav>

        <div style={{ height: '1px', backgroundColor: 'rgba(199, 148, 58, 0.15)', marginBottom: '32px' }}></div>

        {/* CTA Request Button */}
        <Link 
          to="/contacto" 
          className="btn btn-primary"
          style={{ 
            textAlign: 'center', 
            borderRadius: 0,
            textDecoration: 'none', 
            fontSize: '0.78rem',
            padding: '12px',
            letterSpacing: '0.08em',
            marginBottom: '28px'
          }}
        >
          SOLICITAR PROPUESTA
        </Link>

        {/* Instagram Link */}
        {links.instagram && (
          <a 
            href={links.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              color: 'var(--accent-gold)', 
              fontSize: '0.78rem', 
              textDecoration: 'none', 
              fontFamily: 'var(--font-sans)', 
              fontWeight: 600, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              marginTop: 'auto' 
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            SÍGUENOS EN INSTAGRAM
          </a>
        )}
      </div>
    </div>
  );
}
