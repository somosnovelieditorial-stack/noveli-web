import React from 'react';

export default function BrandLogo({ settings, variant = 'dark' }) {
  const cleanUrl = (value) => {
    if (!value) return null;
    const trimmed = String(value).trim();
    return trimmed.length > 0 && trimmed !== 'null' ? trimmed : null;
  };

  const logoUrl = cleanUrl(settings?.logo_url);
  const logoDarkUrl = cleanUrl(settings?.logo_dark_url);
  const logoLightUrl = cleanUrl(settings?.logo_light_url);

  const logoSrc =
    variant === 'light'
      ? logoLightUrl || logoUrl || logoDarkUrl
      : logoDarkUrl || logoUrl || logoLightUrl;

  console.log('BRANDLOGO SETTINGS:', settings);
  console.log('BRANDLOGO SRC:', logoSrc);

  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={settings?.brand_name || 'Noveli Editorial'}
        className="brand-logo-image"
      />
    );
  }

  return (
    <div className="logo-text">
      <span>{settings?.brand_name || 'NOVELI'}</span>
      <span>{settings?.brand_subtitle || 'EDITORIAL'}</span>
    </div>
  );
}
