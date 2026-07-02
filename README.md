# Somos Noveli Editorial - Web Pública

Este repositorio contiene el código de la web pública de **Somos Noveli Editorial**, desarrollada en React con Vite. La web presenta un diseño editorial premium, limpio y responsive, caracterizado por sus fondos de color marfil, tipografías clásicas y acentos dorados.

## 📖 Características
- **Aesthetic Premium e Ivory Background:** Un diseño moderno enfocado en la experiencia de lectura y edición, con tarjetas de fondo blanco y finas líneas de acento dorado.
- **Header dinámico:** Navegación responsive por las distintas secciones (Inicio, Servicios, Libros, Nosotros, Contacto).
- **Hero personalizable:** Carga el título y subtítulo desde la base de datos de Supabase, con textos fallback elegantes.
- **Grilla de Servicios:** Muestra servicios editoriales activos, indicando categoría, descripción y precio aproximado, destacando visualmente aquellos marcados como *featured*.
- **Catálogo de Libros:** Listado de obras publicadas con su estado (Disponible, Novedad, Próximamente) y enlace a compra/lectura.
- **Generador de Portadas CSS:** Si un libro carece de imagen de portada o la URL falla, el componente `BookCover` renderiza de forma automática una cubierta estilizada con gradientes de color y tipografía editorial clásica con detalles dorados.
- **Formulario de Contacto Interactivo:** Formulario React para que los autores compartan su manuscrito e ideas, que simula el envío y se adapta responsive.
- **Resiliencia Extrema:** La web está diseñada para arrancar con contenido de alta calidad y diseño óptimo incluso si la base de datos de Supabase está caída, no configurada, o cuenta con tablas y campos nombrados de forma distinta (soporta nombres en inglés y español).

---

## 🛠️ Requisitos e Instalación

### 1. Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-public-key
```

### 2. Tablas Esperadas en Supabase (Opcional)
Si deseas poblar el contenido de forma dinámica, la aplicación consultará las siguientes tablas y mapeará de forma inteligente columnas en español o inglés:

#### `website_settings`
- `hero_title` (o `title`): Título principal del banner.
- `hero_subtitle` (o `subtitle`): Subtítulo explicativo del banner.

#### `website_services`
- `title` (o `titulo` / `nombre`): Nombre del servicio.
- `category` (o `categoria`): Área del servicio (Diseño, Edición, etc.).
- `description` (o `descripcion`): Qué incluye.
- `price_from` (o `precio_desde`): Costo mínimo.
- `currency` (o `moneda`): Tipo de divisa (ej. €, $).
- `featured` (o `destacado`): Boolean para resaltar el servicio.
- `active` / `visible` (o `activo`): Booleans para controlar su visibilidad.

#### `website_books`
- `title` (o `titulo`): Título del libro.
- `author` (o `autor`): Nombre del autor.
- `cover_url` (o `portada`): Dirección URL de la imagen de portada.
- `status` (o `estado`): Ej. "Novedad", "Disponible", "Próximamente".
- `sale_url` (o `url_compra`): Enlace externo de compra o lectura.
- `active` / `visible`: Booleans para controlar su visibilidad.

#### `website_sections`
- Se busca la fila correspondiente a `key = 'nosotros'` (o `slug = 'nosotros'` o `name = 'nosotros'`).
- `title` (o `titulo`): Título de sección.
- `content` (o `texto` / `contenido`): Descripción de la editorial.

#### `website_links`
- Colección de enlaces activos (`active = true`).
- `key` (o `type` / `name`): 'email', 'instagram', 'contacto'.
- `url` (o `value`): La dirección o correo correspondiente.

*Nota: Si alguna tabla o columna no coincide, el sistema ignora el error de forma segura y mezcla la información disponible con los datos locales predeterminados.*

---

## 🚀 Comandos

Para instalar dependencias locales:
```bash
npm install
```

Para correr en modo desarrollo:
```bash
npm run dev
```

Para generar la compilación de producción optimizada:
```bash
npm run build
```

Para previsualizar la compilación localmente:
```bash
npm run preview
```
