import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ContactForm({ email: _email, services = [], initialService = 'General' }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    service_interest: initialService || 'General',
    manuscript_info: ''
  });

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service_interest: initialService }));
    }
  }, [initialService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name || formData.name.trim().length === 0) {
      setErrorMsg('Por favor, ingresa tu nombre completo.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMsg('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!formData.manuscript_info || formData.manuscript_info.trim().length === 0) {
      setErrorMsg('Por favor, describe la información de tu manuscrito.');
      return;
    }

    setLoading(true);

    const leadData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone ? formData.phone.trim() : null,
      instagram: formData.instagram ? formData.instagram.trim() : null,
      service_interest: formData.service_interest,
      manuscript_info: formData.manuscript_info.trim(),
      message: null,
      source: 'website',
      status: 'nuevo',
      organization_id: '11111111-1111-1111-1111-111111111111'
    };

    if (!supabase) {
      console.warn('Supabase not configured. Using fallback simulated submission.');
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1000);
      return;
    }

    try {
      const { error } = await supabase
        .from('website_leads')
        .insert([leadData]);

      if (error) throw error;

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting lead to Supabase:', err);
      setErrorMsg(err.message || 'Hubo un error al enviar tu propuesta. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-form-card fade-in" style={{ textAlign: 'center', padding: '40px 30px' }}>
        <div className="contact-icon" style={{ margin: '0 auto 20px', width: '50px', height: '50px', fontSize: '1.5rem', backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckIcon />
        </div>
        <h3 className="contact-intro-title" style={{ color: 'var(--accent-gold)' }}>¡Solicitud Recibida!</h3>
        <p className="contact-intro-p" style={{ margin: '12px 0 20px', lineHeight: '1.6', fontSize: '0.88rem' }}>
          Gracias por escribirnos. Recibimos tu solicitud y la revisaremos para orientarte en el siguiente paso editorial.
        </p>
        <button 
          className="btn btn-primary" 
          onClick={() => { 
            setSubmitted(false); 
            setFormData({
              name: '',
              email: '',
              phone: '',
              instagram: '',
              service_interest: initialService || 'General',
              manuscript_info: ''
            }); 
            setErrorMsg(null);
          }}
          id="btn-send-another"
          style={{ width: '100%' }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="contact-form-card">
      <h3 className="contact-intro-title">Cuéntanos sobre tu libro</h3>
      <p className="contact-intro-p">Compártenos una breve descripción de tu obra y el servicio que necesitas. Revisaremos tu solicitud y podremos prepararte una propuesta editorial.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
            <label htmlFor="form-name">Nombre Completo *</label>
            <input
              id="form-name"
              type="text"
              required
              disabled={loading}
              placeholder="Tu nombre completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
            <label htmlFor="form-email">Correo Electrónico *</label>
            <input
              id="form-email"
              type="email"
              required
              disabled={loading}
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
            <label htmlFor="form-phone">Teléfono (Opcional)</label>
            <input
              id="form-phone"
              type="tel"
              disabled={loading}
              placeholder="+34 600 000 000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
            <label htmlFor="form-instagram">Instagram (Opcional)</label>
            <input
              id="form-instagram"
              type="text"
              disabled={loading}
              placeholder="@usuario"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
          <label htmlFor="form-service">Servicio de interés *</label>
          <select
            id="form-service"
            disabled={loading}
            value={formData.service_interest}
            onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
          >
            <option value="General">Asesoría Editorial General</option>
            {services && services.map(service => (
              <option key={service.id} value={service.title}>{service.title}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
          <label htmlFor="form-manuscript">Mensaje / Información del manuscrito *</label>
          <textarea
            id="form-manuscript"
            required
            disabled={loading}
            rows="3"
            placeholder="Indica el género, estado de tu manuscrito, páginas aproximadas y el servicio que requieres..."
            value={formData.manuscript_info}
            onChange={(e) => setFormData({ ...formData, manuscript_info: e.target.value })}
          ></textarea>
        </div>

        {errorMsg && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: '#FDF2F2',
            borderLeft: '4px solid #F05252',
            color: '#9B1C1C',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-sans)',
            borderRadius: '4px',
            textAlign: 'left',
            lineHeight: '1.4'
          }}>
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary" 
          id="btn-submit-proposal" 
          disabled={loading}
          style={{ marginTop: '4px', width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? (
            <>
              <span className="spinner-mini" style={{ marginRight: '8px' }}></span>
              Enviando...
            </>
          ) : 'Enviar solicitud editorial'}
        </button>
      </form>
    </div>
  );
}
