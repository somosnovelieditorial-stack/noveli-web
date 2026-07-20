import React from 'react';

const FALLBACK_LOGOS = {
  main: 'https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784521668999_identity_main.png',
  dark: 'https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784521689999_identity_dark.png',
  light: 'https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784521681484_identity_light.png'
};

const cleanUrl = (value) => {
  if (!value) return null;
  const trimmed = String(value).trim();
  return trimmed.length > 0 && trimmed !== 'null' ? trimmed : null;
};

function BrandLogo({ brandSettings, settings, variant = 'dark' }) {
  const source = brandSettings || settings || {};

  const logoSrc =
    variant === 'light'
      ? cleanUrl(source.logo_light_url) || cleanUrl(source.logo_url) || cleanUrl(source.logo_dark_url) || FALLBACK_LOGOS.light
      : cleanUrl(source.logo_dark_url) || cleanUrl(source.logo_url) || cleanUrl(source.logo_light_url) || FALLBACK_LOGOS.dark;

  return (
    <img
      src={logoSrc}
      alt={source.brand_name || 'Noveli Editorial'}
      className="brand-logo-image"
    />
  );
}

export default BrandLogo;
