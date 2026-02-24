import React, { useState } from 'react';

const products = [
  {
    name: 'Latte Orgánico',
    description: 'Café espresso con leche orgánica, suave y cremoso.',
    price: '$55',
    img: 'latte-organico.jpg',
  },
  {
    name: 'Smoothie Verde',
    description: 'Mezcla de espinaca, manzana y jengibre, refrescante y nutritivo.',
    price: '$48',
    img: 'Smoothie-Verde.jpg',
  },
  {
    name: 'Tarta de Avena',
    description: 'Tarta casera de avena y frutos rojos, sin azúcar añadida.',
    price: '$42',
    img: 'Tarta-de-Avena.jpg',
  },
  {
    name: 'Ensalada Vital',
    description: 'Ensalada fresca con quinoa, aguacate y semillas.',
    price: '$60',
    img: 'Ensalada-Vital.jpg',
  },
  {
    name: 'Café Frío Artesanal',
    description: 'Café filtrado en frío, sabor intenso y refrescante.',
    price: '$50',
    img: 'Café-Frío-Artesanal.jpg',
  },
];

function Products({ onAdd }) {
  return (
    <section className="products" id="products">
      <h2>Nuestros Productos</h2>
      <div className="products-list">
        {products.map((product, idx) => (
          <div className="product-card" key={idx}>
            <img src={`/${product.img}`} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="product-price">{product.price}</span>
            <div className="product-btn-row">
              <button onClick={() => onAdd(product)}>Añadir al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
