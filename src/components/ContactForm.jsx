import React, { useState } from 'react';

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setMessage('');

    const data = {
      nombre: e.target.nombre.value,
      telefono: e.target.telefono.value,
      mensaje: e.target.mensaje.value,
    };

    try {
      // 1️⃣ Enviar datos a n8n
      await fetch("https://rochy.app.n8n.cloud/webhook/cafeteria-contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // 2️⃣ Abrir WhatsApp
      const text = `☕ Nuevo mensaje GreenBite Café
Nombre: ${data.nombre}
Teléfono: ${data.telefono}
Mensaje: ${data.mensaje}`;

      window.open(
        `https://wa.me/573242090985?text=${encodeURIComponent(text)}`,
        "_blank"
      );

      setMessage('¡Mensaje enviado! Se abrirá WhatsApp en un momento.');
      e.target.reset();
    } catch (error) {
      setMessage('Hubo un error. Por favor, intenta de nuevo.');
      console.error('Error:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input 
            id="nombre"
            name="nombre" 
            type="text"
            placeholder="Tu nombre" 
            required 
            disabled={sending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input 
            id="telefono"
            name="telefono" 
            type="tel"
            placeholder="Tu teléfono" 
            required 
            disabled={sending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea 
            id="mensaje"
            name="mensaje" 
            placeholder="Escribe tu mensaje aquí..."
            rows="5"
            disabled={sending}
          ></textarea>
        </div>

        <button type="submit" className="submit-btn" disabled={sending}>
          {sending ? 'Enviando...' : 'Enviar por WhatsApp'}
        </button>

        {message && (
          <div className={`form-message ${message.includes('error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
