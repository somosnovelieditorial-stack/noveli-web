import { supabase } from '../lib/supabaseClient'

export const fallbackData = {
  settings: {
    hero_title: "Tu libro merece una edición a la altura de su historia.",
    hero_subtitle: "En Noveli acompañamos a autores en el proceso editorial, desde la revisión del manuscrito hasta la preparación final para publicación digital o impresa."
  },
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
      title: "Besos con sabor a sal",
      author: "Vale Barrios",
      cover_url: "",
      status: "Destacado",
      sale_url: "https://amazon.com",
      book_origin: "published_by_noveli",
      is_featured: true,
      is_new: false,
      is_coming_soon: false,
      noveli_purchase_url: "https://amazon.com",
      author_purchase_url: "",
      categories: [
        { id: "cat-2", name: "Novela", slug: "novela", type: "genre" }
      ]
    },
    {
      id: 2,
      title: "Bajo el cielo que callamos",
      author: "Daniela Torres",
      cover_url: "",
      status: "Novedad",
      sale_url: "https://amazon.com",
      book_origin: "published_by_noveli",
      is_featured: false,
      is_new: true,
      is_coming_soon: false,
      noveli_purchase_url: "https://amazon.com",
      author_purchase_url: "",
      categories: [
        { id: "cat-2", name: "Novela", slug: "novela", type: "genre" }
      ]
    },
    {
      id: 3,
      title: "Fragmentos de lo que fuimos",
      author: "A.M.",
      cover_url: "",
      status: "",
      sale_url: "https://amazon.com",
      book_origin: "published_by_noveli",
      is_featured: false,
      is_new: false,
      is_coming_soon: false,
      noveli_purchase_url: "https://amazon.com",
      author_purchase_url: "",
      categories: [
        { id: "cat-1", name: "Poesía", slug: "poesia", type: "genre" }
      ]
    },
    {
      id: 4,
      title: "La raíz de lo que no se ve",
      author: "Sofía Delgado",
      cover_url: "",
      status: "Destacado",
      sale_url: "https://amazon.com",
      book_origin: "author_purchase",
      is_featured: true,
      is_new: false,
      is_coming_soon: false,
      noveli_purchase_url: "",
      author_purchase_url: "https://amazon.com",
      categories: [
        { id: "cat-2", name: "Novela", slug: "novela", type: "genre" }
      ]
    },
    {
      id: 5,
      title: "Cartas a mi mejor enemigo",
      author: "Javier R.",
      cover_url: "",
      status: "",
      sale_url: "https://amazon.com",
      book_origin: "author_purchase",
      is_featured: false,
      is_new: false,
      is_coming_soon: false,
      noveli_purchase_url: "",
      author_purchase_url: "https://amazon.com",
      categories: [
        { id: "cat-2", name: "Novela", slug: "novela", type: "genre" }
      ]
    },
    {
      id: 6,
      title: "El eco de las sombras",
      author: "Luna Véliz",
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
  }
}

export async function fetchWebsiteData() {
  // Create a deep copy of fallbackData to avoid side-effects
  const data = JSON.parse(JSON.stringify(fallbackData))

  if (!supabase) {
    console.log("Using fallback data (Supabase not initialized)")
    return data
  }

  // 1. Fetch settings
  try {
    const { data: settingsData, error } = await supabase
      .from('website_settings')
      .select('*')
      .eq('active', true)

    if (error) throw error

    if (settingsData && settingsData.length > 0) {
      // Support both key-value and row-based structures
      const isKeyValue = settingsData.some(row => row.key !== undefined && (row.value !== undefined || row.val !== undefined));
      if (isKeyValue) {
        settingsData.forEach(row => {
          const key = (row.key || '').toLowerCase();
          const val = row.value || row.val || '';
          if (key === 'hero_title' || key === 'title' || key === 'titulo') {
            data.settings.hero_title = val;
          } else if (key === 'hero_subtitle' || key === 'subtitle' || key === 'subtitulo') {
            data.settings.hero_subtitle = val;
          } else if (key === 'email' || key === 'correo' || key === 'contact_email') {
            data.links.email = val.replace('mailto:', '');
          } else if (key === 'instagram') {
            data.links.instagram = val;
          } else if (key === 'contacto' || key === 'contact' || key === 'whatsapp') {
            data.links.contact = val;
          }
        });
      } else {
        const row = settingsData[0]
        data.settings.hero_title = row.hero_title || row.title || row.titulo || fallbackData.settings.hero_title
        data.settings.hero_subtitle = row.hero_subtitle || row.subtitle || row.subtitulo || fallbackData.settings.hero_subtitle
        
        // Populate contact info from settings if available
        const email = row.contact_email || row.email || row.correo || row.correo_contacto
        if (email) data.links.email = email.replace('mailto:', '')

        const instagram = row.instagram || row.instagram_url
        if (instagram) data.links.instagram = instagram

        const contact = row.contact_url || row.contact_link || row.contact || row.contacto || row.phone || row.telefono || row.whatsapp
        if (contact) data.links.contact = contact
      }
    }
  } catch (err) {
    console.warn("Failed to fetch website_settings, using fallback:", err.message || err)
  }

  // 2. Fetch services
  try {
    const { data: servicesData, error } = await supabase
      .from('website_services')
      .select('id, title, short_description, full_description, price_from, currency, category, featured, visible_on_website, active, display_order, created_at')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) throw error

    // Map and filter active/visible on website (programmatically to tolerate nulls)
    const activeServices = (servicesData || []).filter(row => row.active !== false && row.visible_on_website !== false)

    data.services = activeServices.map(row => ({
      id: row.id,
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
      display_order: row.display_order,
      created_at: row.created_at
    }))
  } catch (err) {
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

    // 3c. Fetch books (only active/visible, ordered featured first, then display_order, then created_at)
    const { data: booksData, error } = await supabase
      .from('website_books')
      .select('id, title, author, cover_url, visible, active, book_origin, purchase_type, author_purchase_url, noveli_purchase_url, is_featured, is_new, is_coming_soon, display_order, created_at')
      .order('is_featured', { ascending: false })
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error

    // Map activeBooks to empty array first, to clear fallback if Supabase responded successfully
    const activeBooks = (booksData || []).filter(row => row.visible !== false && row.active !== false)

    data.books = activeBooks.map(row => {
      const linkedCatIds = categoryLinks
        .filter(link => link.book_id === row.id)
        .map(link => link.category_id)
      
      const bookCats = categories.filter(cat => linkedCatIds.includes(cat.id))

      return {
        id: row.id,
        title: row.title || row.titulo || row.nombre || 'Libro sin título',
        author: row.author || row.autor || 'Autor desconocido',
        description: row.description || null, // Tolerates null/missing column
        cover_url: row.cover_url || '',
        cover_image_url: row.cover_image_url || null, // Tolerates null/missing column
        image_url: row.image_url || null, // Tolerates null/missing column
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
  } catch (err) {
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

  return data
}

export function getBookCover(book) {
  if (!book) return null
  return book.cover_url || book.cover_image_url || book.image_url || null
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
