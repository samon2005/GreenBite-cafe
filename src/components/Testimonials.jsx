import React from 'react';

const testimonials = [
  {
    name: 'María López',
    comment: 'El mejor café de la ciudad y un ambiente increíble. ¡Recomendado!'
  },
  {
    name: 'Carlos Pérez',
    comment: 'La comida es deliciosa y saludable. Me encanta el enfoque sostenible.'
  },
  {
    name: 'Ana Torres',
    comment: 'Siempre me sorprenden con nuevas opciones. Atención excelente.'
  }
];

function Testimonials() {
  const renderStars = () => {
    return (
      <div className="testimonial-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="testimonials" id="testimonials">
      <h2>Experiencias de Clientes</h2>
      <div className="testimonials-list">
        {testimonials.map((t, idx) => (
          <div className="testimonial-card" key={idx}>
            {renderStars()}
            <p>"{t.comment}"</p>
            <strong>{t.name}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
