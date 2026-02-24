import React, { useState, useEffect } from 'react';

function About() {
  const [currentLeftImage, setCurrentLeftImage] = useState(0);
  const [currentRightImage, setCurrentRightImage] = useState(0);
  
  // Imágenes para los lados (café, ingredientes, ambiente)
  const leftImages = [
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=600',
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600'
  ];
  
  const rightImages = [
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600',
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600'
  ];
  
  useEffect(() => {
    const leftInterval = setInterval(() => {
      setCurrentLeftImage((prev) => (prev + 1) % leftImages.length);
    }, 3500);
    
    const rightInterval = setInterval(() => {
      setCurrentRightImage((prev) => (prev + 1) % rightImages.length);
    }, 4000);
    
    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  return (
    <section className="about" id="about">
      {/* Imágenes laterales izquierdas */}
      <div className="about-images-left">
        {leftImages.map((img, index) => (
          <div
            key={`left-${index}`}
            className={`about-bg-image ${index === currentLeftImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      
      {/* Imágenes laterales derechas */}
      <div className="about-images-right">
        {rightImages.map((img, index) => (
          <div
            key={`right-${index}`}
            className={`about-bg-image ${index === currentRightImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      
      <div className="about-content-wrapper">
        <div className="about-header">
          <h2>Sobre Nosotros</h2>
          <div className="about-divider"></div>
        </div>
        
        <div className="about-text-content">
          <p className="about-intro">
            GreenBite Café nació de la pasión por el café artesanal y la alimentación saludable.
          </p>
          <p className="about-description">
            Nuestro compromiso es ofrecer productos elaborados con ingredientes naturales, priorizando la sostenibilidad y el bienestar de nuestros clientes. Cada experiencia en GreenBite Café es única, gracias a nuestro ambiente acogedor y a la dedicación de nuestro equipo.
          </p>
        </div>
        
        <div className="about-values">
          <div className="value-card">
            <div className="value-badge">ORGÁNICO</div>
            <h3>Ingredientes Certificados</h3>
            <p>Trabajamos exclusivamente con productos 100% orgánicos de origen natural</p>
          </div>
          <div className="value-card">
            <div className="value-badge">SOSTENIBLE</div>
            <h3>Compromiso Ambiental</h3>
            <p>Prácticas eco-friendly en cada paso de nuestra operación</p>
          </div>
          <div className="value-card">
            <div className="value-badge">SALUDABLE</div>
            <h3>Nutrición & Bienestar</h3>
            <p>Menús diseñados para tu salud sin comprometer el sabor</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
