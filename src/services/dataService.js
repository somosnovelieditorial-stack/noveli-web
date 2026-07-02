import { supabase } from '../lib/supabaseClient'

export const fallbackData = {
  settings: {
    hero_title: "Tu historia merece ser contada con belleza",
    hero_subtitle: "En Somos Noveli Editorial acompañamos a autores apasionados en el viaje de escribir, editar, diseñar y publicar libros con calidad premium, maquetación artesanal y distribución global."
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
  books: [
    {
      id: 1,
      title: "El Eco de los Girasoles",
      author: "Elena Rostova",
      cover_url: "", // triggers CSS-based cover generator
      status: "Novedad",
      sale_url: "https://amazon.com"
    },
    {
      id: 2,
      title: "Bajo las Cenizas del Invierno",
      author: "Carlos Mendoza",
      cover_url: "",
      status: "Disponible",
      sale_url: "https://amazon.com"
    },
    {
      id: 3,
      title: "Crónicas del Mañana",
      author: "Sofía Varela",
      cover_url: "",
      status: "Próximamente",
      sale_url: ""
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
  const data = {
    settings: { ...fallbackData.settings },
    services: [ ...fallbackData.services ],
    books: [ ...fallbackData.books ],
    sections: {
      nosotros: { ...fallbackData.sections.nosotros }
    },
    links: { ...fallbackData.links }
  }

  if (!supabase) {
    console.log("Using fallback data (Supabase not initialized)")
    return data
  }

  // 1. Fetch settings
  try {
    const { data: settingsData, error } = await supabase.from('website_settings').select('*')
    if (error) throw error
    if (settingsData && settingsData.length > 0) {
      const row = settingsData[0]
      data.settings.hero_title = row.hero_title || row.title || fallbackData.settings.hero_title
      data.settings.hero_subtitle = row.hero_subtitle || row.subtitle || fallbackData.settings.hero_subtitle
    }
  } catch (err) {
    console.warn("Failed to fetch website_settings, using fallback:", err.message || err)
  }

  // 2. Fetch services
  try {
    const { data: servicesData, error } = await supabase.from('website_services').select('*')
    if (error) throw error
    if (servicesData && servicesData.length > 0) {
      const activeServices = servicesData
        .filter(row => {
          const active = row.active !== undefined ? row.active : (row.activo !== undefined ? row.activo : true)
          const visible = row.visible !== undefined ? row.visible : (row.visible !== undefined ? row.visible : true)
          return active && visible
        })
        .map(row => ({
          id: row.id,
          title: row.title || row.titulo || row.nombre || row.name || 'Servicio sin título',
          category: row.category || row.categoria || 'Edición',
          description: row.description || row.descripcion || row.texto || '',
          price_from: row.price_from !== undefined ? row.price_from : (row.precio_desde !== undefined ? row.precio_desde : 0),
          currency: row.currency || row.moneda || '€',
          featured: row.featured !== undefined ? row.featured : (row.destacado !== undefined ? row.destacado : false)
        }))
      if (activeServices.length > 0) {
        data.services = activeServices
      }
    }
  } catch (err) {
    console.warn("Failed to fetch website_services, using fallback:", err.message || err)
  }

  // 3. Fetch books
  try {
    const { data: booksData, error } = await supabase.from('website_books').select('*')
    if (error) throw error
    if (booksData && booksData.length > 0) {
      const activeBooks = booksData
        .filter(row => {
          const active = row.active !== undefined ? row.active : (row.activo !== undefined ? row.activo : true)
          const visible = row.visible !== undefined ? row.visible : (row.visible !== undefined ? row.visible : true)
          return active && visible
        })
        .map(row => ({
          id: row.id,
          title: row.title || row.titulo || row.nombre || 'Libro sin título',
          author: row.author || row.autor || 'Autor desconocido',
          cover_url: row.cover_url || row.portada_url || row.portada || '',
          status: row.status || row.estado || 'Disponible',
          sale_url: row.sale_url || row.url_compra || row.link_compra || ''
        }))
      if (activeBooks.length > 0) {
        data.books = activeBooks
      }
    }
  } catch (err) {
    console.warn("Failed to fetch website_books, using fallback:", err.message || err)
  }

  // 4. Fetch sections (for nosotros)
  try {
    const { data: sectionsData, error } = await supabase.from('website_sections').select('*')
    if (error) throw error
    if (sectionsData && sectionsData.length > 0) {
      const nosotrosRow = sectionsData.find(row => {
        const identifier = (row.key || row.slug || row.name || row.title || '').toLowerCase()
        return identifier === 'nosotros'
      })
      if (nosotrosRow) {
        data.sections.nosotros.title = nosotrosRow.title || nosotrosRow.titulo || fallbackData.sections.nosotros.title
        data.sections.nosotros.content = nosotrosRow.content || nosotrosRow.texto || nosotrosRow.contenido || fallbackData.sections.nosotros.content
      }
    }
  } catch (err) {
    console.warn("Failed to fetch website_sections, using fallback:", err.message || err)
  }

  // 5. Fetch links
  try {
    const { data: linksData, error } = await supabase.from('website_links').select('*')
    if (error) throw error
    if (linksData && linksData.length > 0) {
      linksData.forEach(row => {
        const active = row.active !== undefined ? row.active : true
        if (!active) return

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
