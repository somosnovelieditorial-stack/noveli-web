import { supabase } from '../lib/supabaseClient'

export const defaultWebsiteSettings = {
  brand_name: 'NOVELI',
  brand_subtitle: 'EDITORIAL',
  logo_url: null,
  logo_dark_url: null,
  logo_light_url: null,
  favicon_url: null
};

export const getLogoSrc = (settings, variant = 'dark') => {
  const cleanUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '' || url.trim() === 'null') return null;
    return url.trim();
  };

  const logoSrc =
    variant === 'light'
      ? cleanUrl(settings?.logo_light_url) || cleanUrl(settings?.logo_url) || cleanUrl(settings?.logo_dark_url)
      : cleanUrl(settings?.logo_dark_url) || cleanUrl(settings?.logo_url) || cleanUrl(settings?.logo_light_url);

  console.log('SETTINGS USADOS PARA LOGO:', settings);
  console.log('LOGO FINAL:', logoSrc);

  return logoSrc;
};

export const normalizeWebsiteSettings = (input) => {
  if (!input) return null;

  // Si viene directo desde Supabase
  if (input.logo_url || input.logo_dark_url || input.logo_light_url) {
    return input;
  }

  // Si viene anidado por dataService
  if (input.settings) return normalizeWebsiteSettings(input.settings);
  if (input.websiteSettings) return normalizeWebsiteSettings(input.websiteSettings);
  if (input.data) return normalizeWebsiteSettings(input.data);
  if (input.result) return normalizeWebsiteSettings(input.result);

  return input;
};

export const fallbackData = {
  settings: {
    hero_title: "Tu libro merece una edición a la altura de su historia.",
    hero_subtitle: "En Noveli acompañamos a autores en el proceso editorial, desde la revisión del manuscrito hasta la preparación final para publicación digital o impresa.",
    brand_name: "NOVELI",
    brand_subtitle: " — EDITORIAL",
    logo_url: null,
    logo_dark_url: null,
    logo_light_url: null,
    favicon_url: null
  },
  heroSettings: {
    eyebrow: "Somos Noveli Editorial",
    title: "Tu libro merece una edición a la altura de su",
    highlighted_word: "historia.",
    subtitle: "En Noveli acompañamos a autores en el proceso editorial, desde la revisión del manuscrito hasta la preparación final para publicación digital o impresa.",
    primary_button_text: "SOLICITAR PROPUESTA EDITORIAL",
    primary_button_url: "/contacto",
    secondary_button_text: "VER SERVICIOS",
    secondary_button_url: "/servicios",
    background_image_url: "",
    side_image_url: "",
    featured_book_id: null,
    show_featured_book: true
  },
  heroQuickServices: [
    { label: "CORRECCIÓN EDITORIAL", icon_name: "edit", link_url: "/servicios" },
    { label: "MAQUETACIÓN PROFESIONAL", icon_name: "layout", link_url: "/servicios" },
    { label: "DISEÑO DE PORTADAS", icon_name: "book", link_url: "/servicios" },
    { label: "AUTOPUBLICACIÓN EN AMAZON", icon_name: "globe", link_url: "/servicios" }
  ],
  services: [
    {
      id: 1,
      title: "Corrección editorial",
      category: "Edición",
      description: "Revisión ortográfica, gramatical y de estilo para que tu manuscrito brille con claridad.",
      price_from: 120000,
      currency: "CLP",
      featured: true
    },
    {
      id: 2,
      title: "Maquetación profesional",
      category: "Diseño",
      description: "Diseño interior para eBook e impreso, listo para cualquier plataforma.",
      price_from: 150000,
      currency: "CLP",
      featured: false
    },
    {
      id: 3,
      title: "Diseño de portadas",
      category: "Arte",
      description: "Portadas únicas que representan tu historia y conectan con tus lectores.",
      price_from: 90000,
      currency: "CLP",
      featured: false
    },
    {
      id: 4,
      title: "Autopublicación en Amazon",
      category: "Distribución",
      description: "Te guiamos paso a paso para publicar tu libro en Amazon KDP con confianza.",
      price_from: 80000,
      currency: "CLP",
      featured: true
    },
    {
      id: 5,
      title: "Libro físico bajo demanda",
      category: "Impresión",
      description: "Impresión profesional bajo demanda con la mejor calidad.",
      price_from: 90000,
      currency: "CLP",
      featured: false
    }
  ],
  bookCategories: [
    { id: "cat-1", name: "Poesía", slug: "poesia", type: "genre", active: true, display_order: 1 },
    { id: "cat-2", name: "Novela", slug: "novela", type: "genre", active: true, display_order: 2 },
    { id: "cat-3", name: "Fantasía", slug: "fantasia", type: "genre", active: true, display_order: 3 }
  ],
  books: [
    {
      id: 1,
      title: "El Imperio de las Mareas",
      author: "Noveli",
      cover_url: "",
      status: "Destacado",
      sale_url: "",
      book_origin: "published_by_noveli",
      is_featured: true,
      is_new: false,
      is_coming_soon: false,
      noveli_purchase_url: "",
      author_purchase_url: "",
      categories: [
        { id: "cat-2", name: "Novela", slug: "novela", type: "genre" }
      ]
    },
    {
      id: 2,
      title: "Susurros del Viento",
      author: "Colección",
      cover_url: "",
      status: "Novedad",
      sale_url: "",
      book_origin: "published_by_noveli",
      is_featured: false,
      is_new: true,
      is_coming_soon: false,
      noveli_purchase_url: "",
      author_purchase_url: "",
      categories: [
        { id: "cat-2", name: "Novela", slug: "novela", type: "genre" }
      ]
    },
    {
      id: 3,
      title: "Voces de la Memoria",
      author: "Edición Especial",
      cover_url: "",
      status: "",
      sale_url: "",
      book_origin: "published_by_noveli",
      is_featured: false,
      is_new: false,
      is_coming_soon: false,
      noveli_purchase_url: "",
      author_purchase_url: "",
      categories: [
        { id: "cat-1", name: "Poesía", slug: "poesia", type: "genre" }
      ]
    },
    {
      id: 4,
      title: "El Umbral del Silencio",
      author: "Obra Selecta",
      cover_url: "",
      status: "Destacado",
      sale_url: "",
      book_origin: "author_purchase",
      is_featured: true,
      is_new: false,
      is_coming_soon: false,
      noveli_purchase_url: "",
      author_purchase_url: "",
      categories: [
        { id: "cat-2", name: "Novela", slug: "novela", type: "genre" }
      ]
    },
    {
      id: 5,
      title: "Senderos Ocultos",
      author: "Antología",
      cover_url: "",
      status: "",
      sale_url: "",
      book_origin: "author_purchase",
      is_featured: false,
      is_new: false,
      is_coming_soon: false,
      noveli_purchase_url: "",
      author_purchase_url: "",
      categories: [
        { id: "cat-2", name: "Novela", slug: "novela", type: "genre" }
      ]
    },
    {
      id: 6,
      title: "El Despertar del Fuego",
      author: "Edición Especial",
      cover_url: "",
      status: "Próximamente",
      sale_url: "",
      book_origin: "published_by_noveli",
      is_featured: false,
      is_new: false,
      is_coming_soon: true,
      noveli_purchase_url: "",
      author_purchase_url: "",
      categories: [
        { id: "cat-3", name: "Fantasía", slug: "fantasia", type: "genre" }
      ]
    }
  ],
  sections: {
    nosotros: {
      title: "Sobre Noveli Editorial",
      content: "Creemos que cada libro merece ser tratado con respeto, belleza y cuidado editorial. No publicamos historias, las acompañamos."
    }
  },
  links: {
    email: "hola@somosnoveli.cl",
    instagram: "https://instagram.com/somosnoveli",
    contact: "mailto:hola@somosnoveli.cl"
  },
  footerSettings: {
    contact_title: "Contáctanos",
    contact_email: "hola@somosnoveli.cl",
    contact_location: "Santiago, Chile",
    contact_description: "Acompañamos tu proceso de escritura y autopublicación de principio a fin.",
    instagram_title: "Síguenos en Instagram",
    instagram_url: "https://instagram.com/somosnoveli",
    instagram_enabled: true
  },
  footerGallery: [],
  heroSettings: {
    eyebrow: 'EDITORIAL INDEPENDIENTE',
    title: 'Tu historia merece ser contada de la manera más',
    highlighted_word: 'hermosa',
    subtitle: 'Ayudamos a autores independientes a maquetar, corregir, diseñar y distribuir sus libros a nivel global con calidad profesional.',
    primary_button_text: 'Ver Servicios',
    primary_button_url: '#servicios',
    secondary_button_text: 'Conoce el Catálogo',
    secondary_button_url: '#libros',
    background_image_url: '',
    side_image_url: '',
    featured_book_id: '',
    show_featured_book: true,
    active: true
  },
  heroQuickServices: []
}

// LocalStorage caching helpers
const CACHE_TTL_SECONDS = import.meta.env.DEV ? 600 : 1800;

function getCachedItem(key) {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { val, expiry } = JSON.parse(cached);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return val;
  } catch (e) {
    return null;
  }
}

function setCachedItem(key, val) {
  try {
    const expiry = Date.now() + (CACHE_TTL_SECONDS * 1000);
    localStorage.setItem(key, JSON.stringify({ val, expiry }));
  } catch (e) {
    // Ignore quota errors or disabled localStorage
  }
}

// Timeout helper for Supabase promises
function withTimeout(promise, timeoutMs = 2500, label = 'Query') {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout: ${label} demoró más de ${timeoutMs}ms`));
    }, timeoutMs);

    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

// Return cached data immediately if any is available
export function getCachedWebsiteData() {
  const cachedSettings = null; // getCachedItem('noveli_settings_cache');
  const cachedHero = getCachedItem('noveli_hero_cache');
  const cachedServices = getCachedItem('noveli_services_cache');
  const cachedBooks = getCachedItem('noveli_books_cache');
  const cachedFooter = getCachedItem('noveli_footer_cache');

  if (!cachedSettings && !cachedHero && !cachedServices && !cachedBooks && !cachedFooter) {
    return null;
  }

  const data = JSON.parse(JSON.stringify(fallbackData));
  if (cachedSettings) data.settings = cachedSettings;
  if (cachedHero) {
    data.heroSettings = cachedHero.heroSettings || data.heroSettings;
    data.heroQuickServices = cachedHero.heroQuickServices || data.heroQuickServices;
  }
  if (cachedServices) data.services = cachedServices;
  if (cachedBooks) {
    data.books = cachedBooks.books || data.books;
    data.bookCategories = cachedBooks.bookCategories || data.bookCategories;
  }
  if (cachedFooter) {
    data.footerSettings = cachedFooter.footerSettings || data.footerSettings;
    data.footerGallery = cachedFooter.footerGallery || data.footerGallery;
  }

  return data;
}

export async function fetchWebsiteData() {
  const data = JSON.parse(JSON.stringify(fallbackData));
  data.servicesError = null;
  data.booksError = null;

  if (!supabase) {
    if (import.meta.env.DEV) {
      console.log("Using fallback data (Supabase not initialized)");
    }
    return data;
  }

  const TIMEOUT_LIMIT = 2500;

  const queryPromises = [
    // 0: Settings
    withTimeout(
      supabase
        .from('website_settings')
        .select('id,brand_name,brand_subtitle,logo_url,logo_light_url,logo_dark_url,favicon_url,active,updated_at')
        .eq('id', '3a170b5c-4382-4271-830c-abd7e14dae79')
        .maybeSingle(),
      TIMEOUT_LIMIT,
      'Settings'
    ),
    // 1: Services
    withTimeout(
      supabase.from('website_services').select('id, organization_id, title, short_description, full_description, price_from, currency, category, featured, visible_on_website, active, display_order, image_url, background_url, icon_name, color_theme, created_at, includes, not_included, process_steps, estimated_time, requires_manuscript_info, quote_note').order('display_order', { ascending: true }).order('created_at', { ascending: true }),
      TIMEOUT_LIMIT,
      'Services'
    ),
    // 2: Book Categories
    withTimeout(
      supabase.from('website_book_categories').select('*').eq('active', true).order('display_order', { ascending: true }),
      TIMEOUT_LIMIT,
      'Book Categories'
    ),
    // 3: Book Category Links
    withTimeout(
      supabase.from('website_book_category_links').select('*'),
      TIMEOUT_LIMIT,
      'Category Links'
    ),
    // 4: Books
    withTimeout(
      supabase.from('website_books').select('id,organization_id,title,author,cover_url,cover_image_url,short_description,genre,status,featured,visible_on_website,sale_url,sale_platform,display_order,created_at,active,book_origin,purchase_type,author_purchase_url,noveli_purchase_url,is_featured,is_new,is_coming_soon,visible').order('display_order', { ascending: true }).order('created_at', { ascending: false }),
      TIMEOUT_LIMIT,
      'Books'
    ),
    // 5: Sections
    withTimeout(
      supabase.from('website_sections').select('*').eq('active', true).order('display_order', { ascending: true }),
      TIMEOUT_LIMIT,
      'Sections'
    ),
    // 6: Links
    withTimeout(
      supabase.from('website_links').select('*').eq('active', true).order('display_order', { ascending: true }),
      TIMEOUT_LIMIT,
      'Links'
    ),
    // 7: Footer Settings
    withTimeout(
      supabase.from('website_footer_settings').select('contact_title, contact_email, contact_location, contact_description, instagram_title, instagram_url, instagram_enabled, active').eq('active', true).limit(1),
      TIMEOUT_LIMIT,
      'Footer Settings'
    ),
    // 8: Footer Gallery
    withTimeout(
      supabase.from('website_footer_gallery').select('image_url, title, link_url, display_order, active').eq('active', true).order('display_order', { ascending: true }),
      TIMEOUT_LIMIT,
      'Footer Gallery'
    ),
    // 9: Hero Settings
    withTimeout(
      supabase.from('website_hero_settings').select('id, eyebrow, title, highlighted_word, subtitle, primary_button_text, primary_button_url, secondary_button_text, secondary_button_url, background_image_url, side_image_url, featured_book_id, show_featured_book, active').eq('active', true).limit(1),
      TIMEOUT_LIMIT,
      'Hero Settings'
    ),
    // 10: Hero Quick Services
    withTimeout(
      supabase.from('website_hero_quick_services').select('label, icon_name, link_url, display_order, active').eq('active', true).order('display_order', { ascending: true }),
      TIMEOUT_LIMIT,
      'Hero Quick Services'
    )
  ];

  const results = await Promise.allSettled(queryPromises);

  const getResult = (index) => {
    const res = results[index];
    if (res.status === 'fulfilled' && res.value && !res.value.error) {
      return res.value.data;
    }
    if (import.meta.env.DEV) {
      if (res.status === 'rejected') {
        console.warn(`Query index ${index} failed:`, res.reason);
      } else if (res.value && res.value.error) {
        console.warn(`Query index ${index} error:`, res.value.error);
      }
    }
    return null;
  };

  // 1. Map settings
  const settingsData = getResult(0);
  if (settingsData) {
    const row = settingsData;
    const cachedSettings = null; // Disable cache read/write for settings in this test

    data.settings.hero_title = row.hero_title || row.title || row.titulo || fallbackData.settings.hero_title;
    data.settings.hero_subtitle = row.hero_subtitle || row.subtitle || row.subtitulo || fallbackData.settings.hero_subtitle;
    data.settings.brand_name = row.brand_name || defaultWebsiteSettings.brand_name;
    data.settings.brand_subtitle = row.brand_subtitle || defaultWebsiteSettings.brand_subtitle;
    data.settings.logo_url = row.logo_url || defaultWebsiteSettings.logo_url;
    data.settings.logo_dark_url = row.logo_dark_url || defaultWebsiteSettings.logo_dark_url;
    data.settings.logo_light_url = row.logo_light_url || defaultWebsiteSettings.logo_light_url;
    data.settings.favicon_url = row.favicon_url || defaultWebsiteSettings.favicon_url;
    data.settings.updated_at = row.updated_at || null;
    data.settings.created_at = row.created_at || null;

    const email = row.contact_email || row.email || row.correo || row.correo_contacto;
    if (email) data.links.email = email.replace('mailto:', '');
    const instagram = row.instagram || row.instagram_url;
    if (instagram) data.links.instagram = instagram;
    const contact = row.contact_url || row.contact_link || row.contact || row.contacto || row.phone || row.telefono || row.whatsapp;
    if (contact) data.links.contact = contact;
  } else {
    const cachedSettings = null; // Disable cache
  }

  // 2. Map services
  const servicesData = getResult(1);
  if (servicesData) {
    const activeServices = (servicesData || []).filter(row => row.active !== false && row.visible_on_website !== false);
    data.services = activeServices.map(row => ({
      id: row.id,
      organization_id: row.organization_id,
      title: row.title || 'Servicio sin título',
      category: row.category || 'Edición',
      short_description: row.short_description || '',
      full_description: row.full_description || '',
      description: row.short_description || row.full_description || '',
      price_from: row.price_from,
      currency: row.currency || 'CLP',
      featured: row.featured === true,
      visible_on_website: row.visible_on_website !== false,
      active: row.active !== false,
      image_url: row.image_url || '',
      background_url: row.background_url || '',
      icon_name: row.icon_name || '',
      color_theme: row.color_theme || '',
      display_order: row.display_order,
      created_at: row.created_at,
      includes: row.includes || '',
      not_included: row.not_included || '',
      process_steps: row.process_steps || '',
      estimated_time: row.estimated_time || '',
      requires_manuscript_info: row.requires_manuscript_info === true,
      quote_note: row.quote_note || ''
    }));

    setCachedItem('noveli_services_cache', data.services);
  } else {
    const cachedServices = getCachedItem('noveli_services_cache');
    if (cachedServices) data.services = cachedServices;
  }

  // 3. Map books and categories
  const categoriesData = getResult(2);
  const categoryLinksData = getResult(3);
  const booksData = getResult(4);

  const finalCategories = categoriesData || [];
  const finalCategoryLinks = categoryLinksData || [];

  if (booksData) {
    const activeBooks = booksData.filter(row => row.visible !== false && row.active !== false && row.visible_on_website !== false);
    data.books = activeBooks.map(row => {
      const linkedCatIds = finalCategoryLinks
        .filter(link => link.book_id === row.id)
        .map(link => link.category_id);
      
      const bookCats = finalCategories.filter(cat => linkedCatIds.includes(cat.id));

      return {
        id: row.id,
        organization_id: row.organization_id,
        title: row.title || 'Libro sin título',
        author: row.author || 'Autor desconocido',
        short_description: row.short_description || '',
        genre: row.genre || '',
        status: row.status || '',
        featured: !!row.featured,
        visible_on_website: row.visible_on_website !== false,
        sale_url: row.sale_url || '',
        sale_platform: row.sale_platform || '',
        cover_url: row.cover_url || '',
        cover_image_url: row.cover_image_url || '',
        visible: row.visible,
        active: row.active,
        book_origin: row.book_origin || 'published_by_noveli',
        purchase_type: row.purchase_type || '',
        author_purchase_url: row.author_purchase_url || '',
        noveli_purchase_url: row.noveli_purchase_url || '',
        is_featured: !!row.is_featured,
        is_new: !!row.is_new,
        is_coming_soon: !!row.is_coming_soon,
        display_order: row.display_order,
        created_at: row.created_at,
        categories: bookCats
      };
    });

    data.bookCategories = finalCategories;

    setCachedItem('noveli_books_cache', {
      books: data.books,
      bookCategories: data.bookCategories
    });
  } else {
    const cachedBooks = getCachedItem('noveli_books_cache');
    if (cachedBooks) {
      data.books = cachedBooks.books;
      data.bookCategories = cachedBooks.bookCategories;
    }
  }

  // 4. Map sections
  const sectionsData = getResult(5);
  if (sectionsData) {
    sectionsData.forEach(row => {
      const identifier = (row.key || row.slug || row.identifier || row.name || row.title || '').toLowerCase();
      if (identifier) {
        data.sections[identifier] = {
          title: row.title || row.titulo || '',
          content: row.content || row.texto || row.contenido || ''
        };
      }
    });
  }

  // 5. Map links
  const linksData = getResult(6);
  if (linksData) {
    linksData.forEach(row => {
      const key = (row.key || row.type || row.name || '').toLowerCase();
      const url = row.url || row.value || '';
      if (key === 'email' || key === 'correo' || url.includes('mailto:')) {
        data.links.email = url.replace('mailto:', '');
      } else if (key === 'instagram' || url.includes('instagram.com')) {
        data.links.instagram = url;
      } else if (key === 'contacto' || key === 'contact' || key === 'whatsapp') {
        data.links.contact = url;
      }
    });
  }

  // 6. Map footer settings
  const footerSettingsData = getResult(7);
  const footerGalleryData = getResult(8);

  if (footerSettingsData && footerSettingsData.length > 0) {
    const row = footerSettingsData[0];
    data.footerSettings = {
      contact_title: row.contact_title || fallbackData.footerSettings.contact_title,
      contact_email: row.contact_email || fallbackData.footerSettings.contact_email,
      contact_location: row.contact_location || fallbackData.footerSettings.contact_location,
      contact_description: row.contact_description || fallbackData.footerSettings.contact_description,
      instagram_title: row.instagram_title || fallbackData.footerSettings.instagram_title,
      instagram_url: row.instagram_url || fallbackData.footerSettings.instagram_url,
      instagram_enabled: row.instagram_enabled !== false
    };
    if (row.contact_email) data.links.email = row.contact_email.replace('mailto:', '');
    if (row.instagram_url) data.links.instagram = row.instagram_url;
  }

  if (footerGalleryData) {
    data.footerGallery = footerGalleryData.map(row => ({
      image_url: row.image_url || '',
      title: row.title || '',
      link_url: row.link_url || '',
      display_order: row.display_order,
      active: row.active !== false
    }));
  }

  if (footerSettingsData || footerGalleryData) {
    setCachedItem('noveli_footer_cache', {
      footerSettings: data.footerSettings,
      footerGallery: data.footerGallery
    });
  } else {
    const cachedFooter = getCachedItem('noveli_footer_cache');
    if (cachedFooter) {
      data.footerSettings = cachedFooter.footerSettings;
      data.footerGallery = cachedFooter.footerGallery;
    }
  }

  // 7. Map hero settings
  const heroSettingsData = getResult(9);
  const heroQuickServicesData = getResult(10);

  if (heroSettingsData && heroSettingsData.length > 0) {
    const row = heroSettingsData[0];
    data.heroSettings = {
      eyebrow: row.eyebrow || fallbackData.heroSettings.eyebrow,
      title: row.title || fallbackData.heroSettings.title,
      highlighted_word: row.highlighted_word || fallbackData.heroSettings.highlighted_word,
      subtitle: row.subtitle || fallbackData.heroSettings.subtitle,
      primary_button_text: row.primary_button_text || fallbackData.heroSettings.primary_button_text,
      primary_button_url: row.primary_button_url || fallbackData.heroSettings.primary_button_url,
      secondary_button_text: row.secondary_button_text || fallbackData.heroSettings.secondary_button_text,
      secondary_button_url: row.secondary_button_url || fallbackData.heroSettings.secondary_button_url,
      background_image_url: row.background_image_url || fallbackData.heroSettings.background_image_url,
      side_image_url: row.side_image_url || fallbackData.heroSettings.side_image_url,
      featured_book_id: row.featured_book_id || fallbackData.heroSettings.featured_book_id,
      show_featured_book: row.show_featured_book !== false,
      active: row.active !== false
    };
  }

  if (heroQuickServicesData) {
    data.heroQuickServices = heroQuickServicesData.map(row => ({
      label: row.label || '',
      icon_name: row.icon_name || 'feather',
      link_url: row.link_url || '',
      display_order: row.display_order,
      active: row.active !== false
    }));
  }

  if (heroSettingsData || heroQuickServicesData) {
    setCachedItem('noveli_hero_cache', {
      heroSettings: data.heroSettings,
      heroQuickServices: data.heroQuickServices
    });
  } else {
    const cachedHero = getCachedItem('noveli_hero_cache');
    if (cachedHero) {
      data.heroSettings = cachedHero.heroSettings;
      data.heroQuickServices = cachedHero.heroQuickServices;
    }
  }

  return data;
}

export function getBookCover(book) {
  if (!book) return null;
  return book.cover_image_url || book.cover_url || null;
}

export function formatServicePrice(price, currency) {
  if (price === undefined || price === null || price <= 0) {
    return "Cotización personalizada";
  }
  const formatted = price.toLocaleString('es-CL');
  if (currency === 'CLP') {
    return `DESDE $${formatted} CLP`;
  }
  return `DESDE $${formatted}`;
}

export function getBookSummary(book) {
  if (!book) return 'Resumen no disponible por el momento.';
  return book.short_description || 'Resumen no disponible por el momento.';
}

export function getSalePlatform(book) {
  if (!book) return '';
  return book.sale_platform || '';
}

export function getBookPurchaseUrl(book) {
  if (!book) return null;
  
  const isAuthor = book.purchase_type === 'external_author' || book.book_origin === 'author_purchase';
  if (isAuthor) {
    return book.author_purchase_url || book.sale_url || null;
  }
  
  const isNoveli = book.purchase_type === 'noveli' || book.book_origin === 'published_by_noveli';
  if (isNoveli) {
    return book.noveli_purchase_url || book.sale_url || null;
  }
  
  return book.sale_url || book.author_purchase_url || book.noveli_purchase_url || null;
}

export function getBookAction(book) {
  if (!book) return { label: 'Ver detalles', action: 'modal' };

  if (book.is_coming_soon === true) {
    return { label: 'Próximamente', disabled: true, action: 'none' };
  }

  const isAuthor = book.book_origin === 'author_purchase' || book.purchase_type === 'external_author';
  if (isAuthor) {
    const url = getBookPurchaseUrl(book);
    if (url) {
      return { label: 'Comprar con el autor', url, action: 'link' };
    }
    return { label: 'Ver detalles', action: 'modal' };
  }

  const isNoveli = book.book_origin === 'published_by_noveli' || book.purchase_type === 'noveli';
  if (isNoveli) {
    const url = getBookPurchaseUrl(book);
    if (url) {
      return { label: 'Comprar en Noveli', url, action: 'link' };
    }
    return { label: 'Ver detalles', action: 'modal' };
  }

  // Any other case
  if (book.sale_url) {
    return { label: 'Comprar', url: book.sale_url, action: 'link' };
  }
  return { label: 'Ver detalles', action: 'modal' };
}

export const serviceNeedsManuscriptInfo = (service) => {
  if (!service) return false;
  const title = String(service?.title || '').toLowerCase();
  const category = String(service?.category || '').toLowerCase();

  const needs = [
    'full ebook',
    'full físico',
    'full fisico',
    'full total',
    'corrección',
    'correccion',
    'maquetación',
    'maquetacion',
    'editorial',
    'digitalización',
    'digitalizacion',
    'producción editorial',
    'produccion editorial'
  ];

  const excluded = [
    'portada',
    'diseño de portada',
    'diseno de portada',
    'difusión',
    'difusion',
    'registro',
    'derechos',
    'legal',
    'marketing'
  ];

  if (excluded.some(word => title.includes(word) || category.includes(word))) return false;
  if (needs.some(word => title.includes(word) || category.includes(word))) return true;

  return service?.requires_manuscript_info === true;
};

export async function refreshWebsiteSettings() {
  if (!supabase) return null;
  try {
    const { data: row, error } = await supabase
      .from('website_settings')
      .select('id,brand_name,brand_subtitle,logo_url,logo_light_url,logo_dark_url,favicon_url,active,updated_at')
      .eq('id', '3a170b5c-4382-4271-830c-abd7e14dae79')
      .maybeSingle();

    if (error) throw error;
    if (row) {
      const settings = {
        brand_name: row.brand_name || defaultWebsiteSettings.brand_name,
        brand_subtitle: row.brand_subtitle || defaultWebsiteSettings.brand_subtitle,
        logo_url: row.logo_url || defaultWebsiteSettings.logo_url,
        logo_dark_url: row.logo_dark_url || defaultWebsiteSettings.logo_dark_url,
        logo_light_url: row.logo_light_url || defaultWebsiteSettings.logo_light_url,
        favicon_url: row.favicon_url || defaultWebsiteSettings.favicon_url,
        updated_at: row.updated_at || null
      };
      setCachedItem('noveli_settings_cache', settings);
      return settings;
    }
  } catch (err) {
    console.error("Error refreshing website settings:", err);
  }
  return null;
}

export async function fetchBrandSettings() {
  let data = null;

  if (supabase) {
    try {
      let { data: byId } = await supabase
        .from('website_settings')
        .select('id,brand_name,brand_subtitle,logo_url,logo_dark_url,logo_light_url,favicon_url,active,updated_at,created_at')
        .eq('id', '3a170b5c-4382-4271-830c-abd7e14dae79')
        .maybeSingle();

      if (byId) data = byId;

      if (!data || (!data.logo_url && !data.logo_dark_url && !data.logo_light_url)) {
        const { data: activeData } = await supabase
          .from('website_settings')
          .select('id,brand_name,brand_subtitle,logo_url,logo_dark_url,logo_light_url,favicon_url,active,updated_at,created_at')
          .eq('active', true)
          .order('updated_at', { ascending: false, nullsFirst: false })
          .limit(1)
          .maybeSingle();
        if (activeData) data = activeData;
      }

      if (!data || (!data.logo_url && !data.logo_dark_url && !data.logo_light_url)) {
        const { data: anyData } = await supabase
          .from('website_settings')
          .select('id,brand_name,brand_subtitle,logo_url,logo_dark_url,logo_light_url,favicon_url,active,updated_at,created_at')
          .limit(1)
          .maybeSingle();
        if (anyData) data = anyData;
      }
    } catch (err) {
      console.error('Error cargando identidad visual desde Supabase:', err);
    }
  }

  if (!data || (!data.logo_url && !data.logo_dark_url && !data.logo_light_url)) {
    try {
      const cmsCache = localStorage.getItem('somos_noveli_website_settings_cms');
      if (cmsCache) {
        const parsed = JSON.parse(cmsCache);
        if (parsed && (parsed.logo_url || parsed.logo_dark_url || parsed.logo_light_url)) {
          data = parsed;
        }
      }
      if (!data) {
        const brandCache = localStorage.getItem('noveli_brand_settings_cache');
        if (brandCache) {
          const parsed = JSON.parse(brandCache);
          if (parsed && (parsed.logo_url || parsed.logo_dark_url || parsed.logo_light_url)) {
            data = parsed;
          }
        }
      }
    } catch (e) {}
  }

  if (data) {
    try {
      localStorage.setItem('noveli_brand_settings_cache', JSON.stringify(data));
    } catch (e) {}
  }

  return data || null;
}
