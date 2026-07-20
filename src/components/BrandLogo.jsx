import { getLogoSrc, normalizeWebsiteSettings } from '../services/dataService';

export default function BrandLogo({ settings, variant = 'dark' }) {
  const normalizedSettings = normalizeWebsiteSettings(settings);

  const cleanUrl = (value) => {
    if (!value) return null;
    const trimmed = String(value).trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  const logoUrl = cleanUrl(normalizedSettings?.logo_url);
  const logoDarkUrl = cleanUrl(normalizedSettings?.logo_dark_url);
  const logoLightUrl = cleanUrl(normalizedSettings?.logo_light_url);

  const logoSrc =
    variant === 'light'
      ? logoLightUrl || logoUrl || logoDarkUrl
      : logoDarkUrl || logoUrl || logoLightUrl;

  if (import.meta.env.DEV) {
    console.log('Website settings logo raw:', settings);
    console.table(settings);
    console.log('Website settings normalizado:', normalizedSettings);
    console.log('Logo seleccionado final:', logoSrc);
    console.log('Logo URL limpia:', logoSrc);
  }

  if (logoSrc) {
    return (
      <img 
        src={logoSrc} 
        alt={normalizedSettings?.brand_name || 'Noveli Editorial'} 
        className="brand-logo-image" 
        onError={(e) => {
          console.error('Error cargando logo:', logoSrc);
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  // Fallback text
  const brandName = normalizedSettings?.brand_name || 'NOVELI';
  const brandSubtitle = normalizedSettings?.brand_subtitle || ' — EDITORIAL';
  const isDark = variant === 'dark';

  return (
    <div 
      className="logo-text" 
      style={{ 
        color: isDark ? 'var(--wine-dark)' : '#FFFFFF', 
        margin: 0,
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      {brandName}
      <span 
        className="logo-sub" 
        style={{ 
          color: isDark ? 'var(--text-muted)' : 'rgba(255,255,255,0.45)', 
          fontSize: '0.62rem',
          marginLeft: '4px'
        }}
      >
        {brandSubtitle}
      </span>
      <svg 
        className="logo-leaf" 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="var(--accent-gold)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ marginLeft: '5px', display: 'inline-block', verticalAlign: 'middle' }}
      >
        <path d="M2 22C2 22 10 22 16 16C21 11 20 4 20 4C20 4 13 3 8 8C2 14 2 22 2 22Z" fill="var(--accent-gold)" />
        <path d="M12 12L2 22" />
      </svg>
    </div>
  );
}
