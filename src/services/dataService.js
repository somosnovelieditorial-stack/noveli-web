import { supabase } from '../lib/supabaseClient'

export const fallbackData = {
  settings: {
    hero_title: "Tu libro merece una edición a la altura de su historia.",
    hero_subtitle: "En Noveli acompañamos a autores en el proceso editorial, desde la revisión del manuscrito hasta la preparación final para publicación digital o impresa."
  },
  services: [
    {
      id: 1,
      title: "Corrección Estilística y Ortotipográfica",
      category: "Edición",
      description: "Pulimos la gramática, coherencia y estilo de tu manuscrito, cuidando la ortotipografía y respetando al máximo tu voz y personalidad como autor.",
      price_from: 149,
      currency: "€",
      featured: true
    },
    {
      id: 2,
      title: "Diseño de Portada Editorial",
      category: "Diseño",
      description: "Diseños de portada exclusivos e impactantes que transmiten la esencia de tu obra y atraen las miradas de los lectores en cualquier escaparate.",
      price_from: 199,
      currency: "€",
      featured: false
    },
    {
      id: 3,
      title: "Maquetación Profesional (Impreso y Digital)",
      category: "Diseño",
      description: "Damos formato profesional al interior de tu libro cumpliendo con los estándares de imprenta y optimizando versiones digitales para Kindle y ePub.",
      price_from: 119,
      currency: "€",
      featured: false
    },
    {
      id: 4,
      title: "Publicación y Distribución Global",
      category: "Publicación",
      description: "Te guiamos para publicar tu obra en plataformas de distribución mundial como Amazon e IngramSpark, conservando el 100% de tus regalías y derechos.",
      price_from: 299,
      currency: "€",
      featured: true
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
      title: "El Eco de los Girasoles",
      author: "Elena Rostova",
      cover_url: "",
      status: "Novedad",
      sale_url: "https://amazon.com",
      book_origin: "published_by_noveli",
      is_featured: true,
      is_new: true,
      is_coming_soon: false,
      noveli_purchase_url: "https://amazon.com",
      author_purchase_url: "",
      categories: [
        { id: "cat-2", name: "Novela", slug: "novela", type: "genre" }
      ]
    },
    {
      id: 2,
      title: "Bajo las Cenizas del Invierno",
      author: "Carlos Mendoza",
      cover_url: "",
      status: "Disponible",
      sale_url: "https://amazon.com",
      book_origin: "author_purchase",
      is_featured: false,
      is_new: false,
      is_coming_soon: false,
      noveli_purchase_url: "",
      author_purchase_url: "https://amazon.com",
      categories: [
        { id: "cat-1", name: "Poesía", slug: "poesia", type: "genre" }
      ]
    },
    {
      id: 3,
      title: "Crónicas del Mañana",
      author: "Sofía Varela",
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
      content: "Somos Noveli Editorial, un espacio dedicado a dar vida a las palabras y hacer realidad el sueño de ver tu libro publicado. Creemos firmemente que cada manuscrito es un tesoro único que merece ser cuidado con dedicación artesanal y profesionalismo. Nuestro equipo de editores, diseñadores y correctores trabaja codo con codo con cada autor, transformando ideas en obras de arte memorables y conectando historias con lectores de todo el mundo."
    }
  },
  links: {
    email: "contacto@somosnoveli.com",
    instagram: "https://instagram.com/somosnoveli",
    contact: "mailto:contacto@somosnoveli.com"
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
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })

    if (error) throw error

    if (servicesData && servicesData.length > 0) {
      data.services = servicesData.map(row => ({
        id: row.id,
        title: row.title || row.titulo || row.nombre || row.name || 'Servicio sin título',
        category: row.category || row.categoria || 'Edición',
        description: row.description || row.descripcion || row.texto || '',
        price_from: row.price_from !== undefined ? row.price_from : (row.precio_desde !== undefined ? row.precio_desde : 0),
        currency: row.currency || row.moneda || '€',
        featured: row.featured !== undefined ? row.featured : (row.destacado !== undefined ? row.destacado : false)
      }))
    }
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
      .select('*')
      .eq('active', true)
      .eq('visible', true)
      .order('is_featured', { ascending: false })
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error

    if (booksData && booksData.length > 0) {
      data.books = booksData.map(row => {
        const linkedCatIds = categoryLinks
          .filter(link => link.book_id === row.id)
          .map(link => link.category_id)
        
        const bookCats = categories.filter(cat => linkedCatIds.includes(cat.id))

        return {
          id: row.id,
          title: row.title || row.titulo || row.nombre || 'Libro sin título',
          author: row.author || row.autor || 'Autor desconocido',
          cover_url: row.cover_url || row.portada_url || row.portada || '',
          status: row.status || row.estado || 'Disponible',
          sale_url: row.sale_url || row.url_compra || row.link_compra || '',
          book_origin: row.book_origin || 'published_by_noveli',
          is_featured: !!row.is_featured,
          is_new: !!row.is_new,
          is_coming_soon: !!row.is_coming_soon,
          noveli_purchase_url: row.noveli_purchase_url || '',
          author_purchase_url: row.author_purchase_url || '',
          categories: bookCats
        }
      })
    }

    if (categories.length > 0) {
      data.bookCategories = categories
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
