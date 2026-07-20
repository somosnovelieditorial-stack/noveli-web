import React from 'react';

const FALLBACK_LOGOS = {
  dark: 'https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784584032191_identity_dark.png',
  light: 'https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784521681484_identity_light.png',
  main: 'https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784521668999_identity_main.png'
};

const cleanUrl = (value) => {
  if (!value) return null;
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : null;
};

const withVersion = (url, updatedAt) => {
  if (!url) return null;
  if (!updatedAt) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${encodeURIComponent(updatedAt)}`;
};

const getLogoHeight = (brandSettings, placement) => {
  if (placement === 'footer') return brandSettings?.logo_footer_height || 46;
  if (placement === 'menu') return brandSettings?.logo_menu_height || 42;
  return brandSettings?.logo_header_height || 42;
};

function BrandLogo({ brandSettings, variant = 'dark', placement = 'header' }) {
  const logoDark = cleanUrl(brandSettings?.logo_dark_url);
  const logoMain = cleanUrl(brandSettings?.logo_url);
  const logoLight = cleanUrl(brandSettings?.logo_light_url);

  const rawLogoSrc =
    variant === 'light'
      ? logoLight || logoMain || logoDark || FALLBACK_LOGOS.light
      : logoDark || logoMain || logoLight || FALLBACK_LOGOS.dark;

  const logoSrc = withVersion(rawLogoSrc, brandSettings?.updated_at);
  const height = getLogoHeight(brandSettings, placement);
  const mobileHeight = brandSettings?.logo_mobile_height || 32;

  if (!logoSrc) {
    return <span className="brand-logo-fallback">Noveli Editorial</span>;
  }

  return (
    <img
      className="brand-logo-image"
      src={logoSrc}
      alt="Noveli Editorial"
      style={{
        '--logo-height': `${height}px`,
        '--logo-mobile-height': `${mobileHeight}px`
      }}
    />
  );
}

export default BrandLogo;
