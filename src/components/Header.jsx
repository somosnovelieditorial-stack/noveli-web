import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Header({ brandSettings, onOpenMenu }) {
  const headerClass = `header header-cream-solid`;

  return (
    <header 
      className={headerClass} 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)', 
        backdropFilter: 'blur(8px)', 
        backgroundColor: '#FFFFFF', 
        borderBottom: '1px solid rgba(199, 148, 58, 0.15)', 
        height: '76px', 
        display: 'flex', 
        alignItems: 'center' 
      }}
    >
      <div 
        className="container" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr auto 1fr', 
          alignItems: 'center', 
          width: '100%', 
          padding: '0 20px' 
        }}
      >
        {/* Left: MENÚ Button */}
        <div style={{ justifySelf: 'start' }}>
          <button 
            onClick={onOpenMenu} 
            aria-label="Abrir menú"
            id="btn-menu-toggle-editorial"
            className="btn-header-menu-toggle"
            style={{ 
              backgroundColor: 'transparent',
              color: 'var(--wine-dark)',
              border: '1px solid var(--wine-dark)',
              borderRadius: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            MENÚ ☰
          </button>
        </div>

        {/* Center: BrandLogo */}
        <div style={{ justifySelf: 'center' }}>
          <a 
            href="/" 
            className="logo-link" 
            style={{ 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <BrandLogo brandSettings={brandSettings} variant="dark" placement="header" />
          </a>
        </div>

        {/* Right: SOLICITAR PROPUESTA Button */}
        <div style={{ justifySelf: 'end' }} className="header-cta-wrapper-dynamic">
          <Link 
            to="/contacto" 
            className="btn btn-header-cta-dynamic" 
            style={{
              backgroundColor: 'var(--accent-gold)',
              color: 'var(--wine-dark)',
              border: '1px solid var(--accent-gold)',
              borderRadius: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '8px 16px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}
          >
            SOLICITAR PROPUESTA
          </Link>
        </div>

      </div>
    </header>
  );
}
