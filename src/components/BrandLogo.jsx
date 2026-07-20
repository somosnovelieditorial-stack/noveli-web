import React from 'react';

export const FALLBACK_LOGOS = {
  main: "https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784521668999_identity_main.png",
  dark: "https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784521689999_identity_dark.png",
  light: "https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784521681484_identity_light.png",
  favicon: "https://bdxlzhpmifxwmqjnnmxa.supabase.co/storage/v1/object/public/documents/11111111-1111-1111-1111-111111111111/website/identity/1784521718347_identity_favicon.png"
};

export default function BrandLogo({ brandSettings, variant = 'dark' }) {
  const cleanUrl = (value) => {
    if (!value) return null;
    const trimmed = String(value).trim();
    return trimmed.length > 0 && trimmed !== 'null' ? trimmed : null;
  };

  const logoDarkUrl = cleanUrl(brandSettings?.logo_dark_url);
  const logoMainUrl = cleanUrl(brandSettings?.logo_url);
  const logoLightUrl = cleanUrl(brandSettings?.logo_light_url);

  let logoSrc = null;

  if (variant === 'dark') {
    // For light/white background (Header)
    logoSrc = logoDarkUrl || logoMainUrl || logoLightUrl || FALLBACK_LOGOS.dark || FALLBACK_LOGOS.main;
  } else {
    // For dark/black background (Footer, SideNav)
    logoSrc = logoLightUrl || logoMainUrl || logoDarkUrl || FALLBACK_LOGOS.light || FALLBACK_LOGOS.main;
  }

  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={brandSettings?.brand_name || 'Noveli Editorial'}
        className="brand-logo-image"
      />
    );
  }

  return (
    <div className="logo-text">
      <span>{brandSettings?.brand_name || 'NOVELI'}</span>
      <span>{brandSettings?.brand_subtitle || 'EDITORIAL'}</span>
    </div>
  );
}
