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
  if (!settings) return null;

  if (variant === 'light') {
    return settings.logo_light_url || settings.logo_url || settings.logo_dark_url || null;
  }

  return settings.logo_dark_url || settings.logo_url || settings.logo_light_url || null;
};

export const fallbackData = {
  settings: {
    hero_title: "Tu libro merece una edición a la altura de su historia.",
    hero_subtitle: "En Noveli acompañamos a autores en el proceso editorial, desde la revisión del manuscrito hasta la preparación final para publicación digital o impresa.",
    brand_name: "NOVELI",
    brand_subtitle: " — EDITORIAL",
    logo_url: "",
    logo_dark_url: "",
    logo_light_url: "",
    favicon_url: ""
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

export async function fetchWebsiteData() {
  // Create a deep copy of fallbackData to avoid side-effects
  const data = JSON.parse(JSON.stringify(fallbackData))
  data.servicesError = null
  data.booksError = null

  if (!supabase) {
    console.log("Using fallback data (Supabase not initialized)")
    return data
  }

  // 1. Fetch settings
  try {
    const { data: row, error } = await supabase
      .from('website_settings')
      .select('*')
      .eq('active', true)
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Error cargando website_settings:', error);
      data.settings = { ...defaultWebsiteSettings, hero_title: fallbackData.settings.hero_title, hero_subtitle: fallbackData.settings.hero_subtitle };
    } else if (!row) {
      console.log("website_settings returned no row, using defaultWebsiteSettings");
      data.settings = { ...defaultWebsiteSettings, hero_title: fallbackData.settings.hero_title, hero_subtitle: fallbackData.settings.hero_subtitle };
    } else {
      data.settings.hero_title = row.hero_title || row.title || row.titulo || fallbackData.settings.hero_title
      data.settings.hero_subtitle = row.hero_subtitle || row.subtitle || row.subtitulo || fallbackData.settings.hero_subtitle
      data.settings.brand_name = row.brand_name || defaultWebsiteSettings.brand_name
      data.settings.brand_subtitle = row.brand_subtitle || defaultWebsiteSettings.brand_subtitle
      data.settings.logo_url = row.logo_url || defaultWebsiteSettings.logo_url
      data.settings.logo_dark_url = row.logo_dark_url || defaultWebsiteSettings.logo_dark_url
      data.settings.logo_light_url = row.logo_light_url || defaultWebsiteSettings.logo_light_url
      data.settings.favicon_url = row.favicon_url || defaultWebsiteSettings.favicon_url
      
      // Populate contact info from settings if available
      const email = row.contact_email || row.email || row.correo || row.correo_contacto
      if (email) data.links.email = email.replace('mailto:', '')

      const instagram = row.instagram || row.instagram_url
      if (instagram) data.links.instagram = instagram

      const contact = row.contact_url || row.contact_link || row.contact || row.contacto || row.phone || row.telefono || row.whatsapp
      if (contact) data.links.contact = contact
    }
  } catch (err) {
    console.error('Error cargando website_settings:', err);
    data.settings = { ...defaultWebsiteSettings, hero_title: fallbackData.settings.hero_title, hero_subtitle: fallbackData.settings.hero_subtitle };
  }

  // 2. Fetch services
  try {
    console.log('ENV URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase client existe:', !!supabase);

    const { data: servicesData, error } = await supabase
      .from('website_services')
      .select('id, organization_id, title, short_description, full_description, price_from, currency, category, featured, visible_on_website, active, display_order, image_url, background_url, icon_name, color_theme, created_at, includes, not_included, process_steps, estimated_time, requires_manuscript_info, quote_note')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true })

    console.log('Error servicios:', error);
    console.log('Data servicios:', servicesData);

    if (error) throw error

    // Map and filter active/visible on website (programmatically to tolerate nulls)
    const activeServices = (servicesData || []).filter(row => row.active !== false && row.visible_on_website !== false)

    data.services = activeServices.map(row => ({
      id: row.id,
      organization_id: row.organization_id,
      title: row.title || 'Servicio sin título',
      category: row.category || 'Edición',
      short_description: row.short_description || '',
      full_description: row.full_description || '',
      description: row.short_description || row.full_description || '', // compatible with App.jsx
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
      created_at: row.created_at
    }))
  } catch (err) {
    console.error("Error al cargar servicios desde Supabase:", err);
    data.servicesError = err.message || String(err);
    data.services = [];
    console.warn("Failed to fetch website_services, using fallback:", err.message || err)
  }

  // 3. Fetch books, categories, and category links
  try {
    // 3a. Fetch book categories
    let categories = []
    try {
      const { data: catData, error: catError } = await supabase
        .from('website_book_categories')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true })
      if (!catError && catData) {
        categories = catData
      }
    } catch (catErr) {
      console.warn("Failed to fetch website_book_categories:", catErr)
    }

    // 3b. Fetch book category links
    let categoryLinks = []
    try {
      const { data: linkData, error: linkError } = await supabase
        .from('website_book_category_links')
        .select('*')
      if (!linkError && linkData) {
        categoryLinks = linkData
      }
    } catch (linkErr) {
      console.warn("Failed to fetch website_book_category_links:", linkErr)
    }

    // 3c. Fetch books (only active/visible, ordered display_order, then created_at)
    const { data: booksData, error } = await supabase
      .from('website_books')
      .select('id,organization_id,title,author,cover_url,cover_image_url,short_description,genre,status,featured,visible_on_website,sale_url,sale_platform,display_order,created_at,active,book_origin,purchase_type,author_purchase_url,noveli_purchase_url,is_featured,is_new,is_coming_soon,visible')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (import.meta.env.DEV) {
      console.log('Error libros:', error)
      console.log('Libros crudos desde Supabase:', booksData)
    }

    if (error) {
      data.booksError = error.message;
      throw error;
    }

    // Map activeBooks to empty array first, to clear fallback if Supabase responded successfully
    const activeBooks = (booksData || []).filter(row => row.visible !== false && row.active !== false && row.visible_on_website !== false)

    if (import.meta.env.DEV) {
      console.log('Libros visibles:', activeBooks)
    }

    data.books = activeBooks.map(row => {
      const linkedCatIds = categoryLinks
        .filter(link => link.book_id === row.id)
        .map(link => link.category_id)
      
      const bookCats = categories.filter(cat => linkedCatIds.includes(cat.id))

      return {
        id: row.id,
        organization_id: row.organization_id,
        title: row.title || row.titulo || row.nombre || 'Libro sin título',
        author: row.author || row.autor || 'Autor desconocido',
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
      }
    })

    if (categories.length > 0) {
      data.bookCategories = categories
    } else {
      data.bookCategories = []
    }

    if (import.meta.env.DEV) {
      console.log('Libros cargados desde Supabase:', data.books)
    }
  } catch (err) {
    console.error("Error al cargar libros desde Supabase:", err)
    data.booksError = err.message || String(err);
    console.warn("Failed to fetch website_books, using fallback:", err.message || err)
  }

  // 4. Fetch sections (for nosotros and other sections)
  try {
    const { data: sectionsData, error } = await supabase
      .from('website_sections')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    if (sectionsData && sectionsData.length > 0) {
      sectionsData.forEach(row => {
        const identifier = (row.key || row.slug || row.identifier || row.name || row.title || '').toLowerCase()
        if (identifier) {
          data.sections[identifier] = {
            title: row.title || row.titulo || (data.sections[identifier] ? data.sections[identifier].title : ''),
            content: row.content || row.texto || row.contenido || (data.sections[identifier] ? data.sections[identifier].content : '')
          }
        }
      })
    }
  } catch (err) {
    console.warn("Failed to fetch website_sections, using fallback:", err.message || err)
  }

  // 5. Fetch links
  try {
    const { data: linksData, error } = await supabase
      .from('website_links')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    if (linksData && linksData.length > 0) {
      linksData.forEach(row => {
        const key = (row.key || row.type || row.name || '').toLowerCase()
        const url = row.url || row.value || ''

        if (key === 'email' || key === 'correo' || url.includes('mailto:')) {
          data.links.email = url.replace('mailto:', '')
        } else if (key === 'instagram' || url.includes('instagram.com')) {
          data.links.instagram = url
        } else if (key === 'contacto' || key === 'contact' || key === 'whatsapp') {
          data.links.contact = url
        }
      })
    }
  } catch (err) {
    console.warn("Failed to fetch website_links, using fallback:", err.message || err)
  }

  // 6. Fetch footer settings
  try {
    const { data: footerData, error } = await supabase
      .from('website_footer_settings')
      .select('contact_title, contact_email, contact_location, contact_description, instagram_title, instagram_url, instagram_enabled, active')
      .eq('active', true)
      .limit(1)

    if (error) throw error

    if (footerData && footerData.length > 0) {
      const row = footerData[0]
      data.footerSettings = {
        contact_title: row.contact_title || fallbackData.footerSettings.contact_title,
        contact_email: row.contact_email || fallbackData.footerSettings.contact_email,
        contact_location: row.contact_location || fallbackData.footerSettings.contact_location,
        contact_description: row.contact_description || fallbackData.footerSettings.contact_description,
        instagram_title: row.instagram_title || fallbackData.footerSettings.instagram_title,
        instagram_url: row.instagram_url || fallbackData.footerSettings.instagram_url,
        instagram_enabled: row.instagram_enabled !== false
      }
      
      // Keep main links aligned with footer links if present
      if (row.contact_email) data.links.email = row.contact_email.replace('mailto:', '')
      if (row.instagram_url) data.links.instagram = row.instagram_url
    }
  } catch (err) {
    console.warn("Failed to fetch website_footer_settings, using fallback:", err.message || err)
  }

  // 7. Fetch footer gallery
  try {
    const { data: galleryData, error } = await supabase
      .from('website_footer_gallery')
      .select('image_url, title, link_url, display_order, active')
      .eq('active', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    if (galleryData && galleryData.length > 0) {
      data.footerGallery = galleryData.map(row => ({
        image_url: row.image_url || '',
        title: row.title || '',
        link_url: row.link_url || '',
        display_order: row.display_order,
        active: row.active !== false
      }))
    }
  } catch (err) {
    console.warn("Failed to fetch website_footer_gallery, using fallback:", err.message || err)
  }

  // 8. Fetch hero settings
  try {
    const { data: heroData, error } = await supabase
      .from('website_hero_settings')
      .select('id, eyebrow, title, highlighted_word, subtitle, primary_button_text, primary_button_url, secondary_button_text, secondary_button_url, background_image_url, side_image_url, featured_book_id, show_featured_book, active')
      .eq('active', true)
      .limit(1)

    if (error) throw error

    if (heroData && heroData.length > 0) {
      const row = heroData[0]
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
      }
    }
  } catch (err) {
    console.warn("Failed to fetch website_hero_settings, using fallback:", err.message || err)
  }

  // 9. Fetch hero quick services
  try {
    const { data: qData, error } = await supabase
      .from('website_hero_quick_services')
      .select('label, icon_name, link_url, display_order, active')
      .eq('active', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    if (qData && qData.length > 0) {
      data.heroQuickServices = qData.map(row => ({
        label: row.label || '',
        icon_name: row.icon_name || 'feather',
        link_url: row.link_url || '',
        display_order: row.display_order,
        active: row.active !== false
      }))
    }
  } catch (err) {
    console.warn("Failed to fetch website_hero_quick_services, using fallback:", err.message || err)
  }

  return data
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
