import React, { useState, useEffect } from 'react';

function Location() {
  const [currentLeftImage, setCurrentLeftImage] = useState(0);
  const [currentRightImage, setCurrentRightImage] = useState(0);
  
  // Imágenes de fondo para location
  const leftImages = [
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800',
    'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800'
  ];
  
  const rightImages = [
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800'
  ];
  
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
    <div className="location-page fade-in">
      <section className="location-hero">
        {/* Imágenes de fondo izquierdas */}
        <div className="location-images-left">
          {leftImages.map((img, index) => (
            <div
              key={`left-${index}`}
              className={`location-bg-image ${index === currentLeftImage ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        
        {/* Imágenes de fondo derechas */}
        <div className="location-images-right">
          {rightImages.map((img, index) => (
            <div
              key={`right-${index}`}
              className={`location-bg-image ${index === currentRightImage ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        
        {/* Contenido central */}
        <div className="location-hero-content-wrapper">
          <h1>Cómo Llegar</h1>
          <p>Visítanos en nuestro establecimiento</p>
        </div>
      </section>
      <section className="location-content">
        <div className="location-info">
          <div className="location-details">
            <h2>Dirección</h2>
            <p className="address">Av 26 # 52-200</p>
            <p className="city">Bogotá, Colombia</p>
            
            <div className="location-hours">
              <h3>Horarios</h3>
              <p>Lunes - Viernes: 7:00 AM - 8:00 PM</p>
              <p>Sábados: 8:00 AM - 9:00 PM</p>
              <p>Domingos: 9:00 AM - 6:00 PM</p>
            </div>
            
            <div className="location-contact">
              <h3>Contacto</h3>
              <p>+57 324 209 0985</p>
              <p>contacto@greenbite.com</p>
              
              <a 
                href="https://wa.me/573242090985?text=Hola! Tengo una pregunta sobre GreenBite Café" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-button"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
          
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6380344567896!2d-74.0817!3d4.6486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzgnNTUuMCJOIDc0wrAwNCc1NC4xIlc!5e0!3m2!1ses!2sco!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación GreenBite Café"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Location;
