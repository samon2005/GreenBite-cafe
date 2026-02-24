import React, { useState } from 'react';

const products = [
  {
    name: 'Latte Orgánico',
    description: 'Café espresso con leche orgánica, suave y cremoso.',
    img: 'latte-organico.jpg',
  },
  {
    name: 'Smoothie Verde',
    description: 'Mezcla de espinaca, manzana y jengibre, refrescante y nutritivo.',
    img: 'Smoothie-Verde.jpg',
  },
  {
    name: 'Tarta de Avena',
    description: 'Tarta casera de avena y frutos rojos, sin azúcar añadida.',
    img: 'Tarta-de-Avena.jpg',
  },
  {
    name: 'Ensalada Vital',
    description: 'Ensalada fresca con quinoa, aguacate y semillas.',
    img: 'Ensalada-Vital.jpg',
  },
  {
    name: 'Café Frío Artesanal',
    description: 'Café filtrado en frío, sabor intenso y refrescante.',
    img: 'Café-Frío-Artesanal.jpg',
  },
];

function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
  };

  const currentProduct = products[currentIndex];

  return (
    <section className="product-carousel" id="carousel">
      <h2>Conoce nuestros productos</h2>
      <div className="carousel-container">
        <button className="carousel-btn carousel-btn-left" onClick={goToPrevious} aria-label="Anterior">
          &#8592;
        </button>
        <div className="carousel-content">
          <div className="carousel-image-wrapper">
            <img src={`/${currentProduct.img}`} alt={currentProduct.name} className="carousel-image" />
          </div>
          <div className="carousel-text">
            <h3>{currentProduct.name}</h3>
            <p>{currentProduct.description}</p>
          </div>
        </div>
        <button className="carousel-btn carousel-btn-right" onClick={goToNext} aria-label="Siguiente">
          &#8594;
        </button>
      </div>
      <div className="carousel-indicators">
        {products.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-indicator ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir a producto ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductCarousel;
