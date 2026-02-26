import React, { useState } from 'react';

function ReservationForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://rochy.app.n8n.cloud/webhook/Reserva', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setFormData({
            nombre: '',
            telefono: '',
            fecha: '',
            hora: '',
            personas: ''
          });
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="reservation-modal-overlay" onClick={onClose}>
      <div className="reservation-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="reservation-modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="reservation-modal-title">Reservar Mesa</h2>
        <p className="reservation-modal-subtitle">
          Completa el formulario y reserva tu mesa en GreenBite Café
        </p>
        
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="305..."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hora">Hora</label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="personas">Cantidad de personas</label>
            <select
              id="personas"
              name="personas"
              value={formData.personas}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona...</option>
              <option value="1">1 persona</option>
              <option value="2">2 personas</option>
              <option value="3">3 personas</option>
              <option value="4">4 personas</option>
              <option value="5">5 personas</option>
              <option value="6">6 personas</option>
              <option value="7">7 personas</option>
              <option value="8">8 personas</option>
              <option value="9+">9 o más personas</option>
            </select>
          </div>

          {submitStatus === 'success' && (
            <div className="reservation-alert reservation-alert-success">
              ¡Reserva enviada exitosamente! Te contactaremos pronto.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="reservation-alert reservation-alert-error">
              Hubo un error al enviar la reserva. Por favor, intenta de nuevo.
            </div>
          )}

          <button 
            type="submit" 
            className="reservation-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
