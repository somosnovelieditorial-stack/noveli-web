import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { HashRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { fetchWebsiteData, getCachedWebsiteData, fallbackData, getBookCover, defaultWebsiteSettings, getLogoSrc, normalizeWebsiteSettings, fetchBrandSettings, cleanUrl, withVersion, FALLBACK_LOGOS } from './services/dataService'
import HomePage from './pages/HomePage'

// Lazy loaded page components
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const BooksPage = lazy(() => import('./pages/BooksPage'))
const NosotrosPage = lazy(() => import('./pages/NosotrosPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))

import BookCover from './components/BookCover'
import EditorialSkeleton from './components/EditorialSkeleton'
import SideNavigation from './components/SideNavigation'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Footer from './components/Footer'

function AppContent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(() => {
    const cached = getCachedWebsiteData();
    return cached || fallbackData;
  });
  const [loaded, setLoaded] = useState(() => !!getCachedWebsiteData());
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [brandSettings, setBrandSettings] = useState(null);
  const location = useLocation();

  const { services, books, sections, links, footerSettings, footerGallery } = data || {};

  useEffect(() => {
    fetchBrandSettings().then(setBrandSettings);
  }, []);

  useEffect(() => {
    const faviconUrl = withVersion(
      cleanUrl(brandSettings?.favicon_url) || FALLBACK_LOGOS.favicon,
      brandSettings?.updated_at
    );
    if (faviconUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [brandSettings]);

  useEffect(() => {
    const brand = brandSettings?.brand_name || defaultWebsiteSettings.brand_name;
    document.title = `${brand} | Editorial Independiente`;
  }, [brandSettings]);

  const fs = footerSettings || {
    contact_title: "Contáctanos",
    contact_email: "hola@somosnoveli.cl",
    contact_location: "Santiago, Chile",
    contact_description: "Acompañamos tu proceso de escritura y autopublicación de principio a fin.",
    instagram_title: "Síguenos en Instagram",
    instagram_url: "https://instagram.com/somosnoveli",
    instagram_enabled: true
  };

  const loadData = async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      const result = await fetchWebsiteData();
      if (result) {
        setData(result);
        setLoaded(true);
      }
    } catch (err) {
      console.error("Critical error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleReload = () => {
    loadData(true);
  };

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Conectando con la editorial...</p>
      </div>
    );
  }

  return (
    <div className="app-routing-wrapper">
      
      <Header brandSettings={brandSettings} onOpenMenu={() => setSideNavOpen(true)} />

      {/* Pages Content Container */}
      <main className="main-content-flow">
        <Suspense fallback={
          <div className="container" style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#555555' }}>
            <div className="spinner" style={{ margin: '0 auto 16px auto' }}></div>
            Cargando sección...
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage data={data} loaded={loaded} handleReload={handleReload} />} />
            <Route path="/servicios" element={<ServicesPage services={services} servicesError={data.servicesError} />} />
            <Route path="/servicios/:id" element={<ServiceDetailPage services={services} />} />
            <Route path="/libros" element={<BooksPage books={books} bookCategories={data.bookCategories} booksError={data.booksError} handleReload={handleReload} />} />
            <Route path="/nosotros" element={<NosotrosPage sections={sections} links={links} />} />
            <Route path="/contacto" element={<ContactPage services={services} links={links} />} />
          </Routes>
        </Suspense>
      </main>

      <Footer brandSettings={brandSettings} fs={fs} services={services} footerGallery={footerGallery} loaded={loaded} />

      <SideNavigation 
        isOpen={sideNavOpen} 
        onClose={() => setSideNavOpen(false)} 
        links={links} 
        brandSettings={brandSettings}
      />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
