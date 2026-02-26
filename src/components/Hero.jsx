import React, { useState, useEffect } from 'react';
import ReservationForm from './ReservationForm';

function Hero({ onNavigate }) {
  const [currentLeftImage, setCurrentLeftImage] = useState(0);
  const [currentRightImage, setCurrentRightImage] = useState(0);
  const [isReservationFormOpen, setIsReservationFormOpen] = useState(false);
  
  // Imágenes para el lado izquierdo (café, granos, preparación)
  const leftImages = [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070',
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2061',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070'
  ];
  
  // Imágenes para el lado derecho (postres, comida, ambiente)
  const rightImages = [
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=2070',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2128',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2187',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072'
  ];
  
  // Cambiar imágenes automáticamente
  useEffect(() => {
    const leftInterval = setInterval(() => {
      setCurrentLeftImage((prev) => (prev + 1) % leftImages.length);
    }, 4000);
    
    const rightInterval = setInterval(() => {
      setCurrentRightImage((prev) => (prev + 1) % rightImages.length);
    }, 4500);
    
    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  return (
    <section className="hero-split" id="hero">
      {/* Imagen izquierda */}
      <div className="hero-split-left">
        {leftImages.map((img, index) => (
          <div
            key={`left-${index}`}
            className={`hero-split-image ${index === currentLeftImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-split-overlay"></div>
      </div>
      
      {/* Contenido central */}
      <div className="hero-split-center">
        <div className="hero-center-content">
          <div className="hero-badge-split">Sostenible & Orgánico</div>
          <h1 className="hero-split-title">
            GreenBite<br/>
            <span className="hero-split-subtitle">Café</span>
          </h1>
          <p className="hero-split-text">
            Café artesanal de origen<br/>
            Comida saludable y sostenible
          </p>
          <div className="hero-split-buttons">
            <button className="hero-btn-primary" onClick={() => onNavigate('menu')}>
              Ver Menú
            </button>
            <button 
              className="hero-btn-secondary"
              onClick={() => setIsReservationFormOpen(true)}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
      
      {/* Imagen derecha */}
      <div className="hero-split-right">
        {rightImages.map((img, index) => (
          <div
            key={`right-${index}`}
            className={`hero-split-image ${index === currentRightImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-split-overlay"></div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="scroll-down-indicator">
        <span>Desliza</span>
        <div className="scroll-arrow">↓</div>
      </div>

      {/* Formulario de reserva */}
      <ReservationForm 
        isOpen={isReservationFormOpen}
        onClose={() => setIsReservationFormOpen(false)}
      />
    </section>
  );
}

export default Hero;
