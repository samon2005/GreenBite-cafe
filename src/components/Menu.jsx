import React from 'react';

const menuItems = [
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

function Menu() {
  return (
    <div className="menu-page fade-in">
      <section className="menu-hero">
        <h1>Nuestra Carta</h1>
        <p>Descubre nuestros productos artesanales</p>
      </section>
      <section className="menu-content">
        <div className="menu-grid">
          {menuItems.map((item, idx) => (
            <div key={idx} className="menu-card">
              <div className="menu-card-image">
                <img src={`/${item.img}`} alt={item.name} />
              </div>
              <div className="menu-card-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="menu-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a 
            href="https://wa.me/573242090985?text=Hola! Me gustaría hacer una reserva en GreenBite Café" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta"
            style={{ 
              display: 'inline-block',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, var(--brown-main), #5d3a1a)',
              color: 'white',
              padding: '16px 40px',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '700',
              boxShadow: '0 8px 24px rgba(123,74,40,0.3)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            📱 Hacer una Reserva
          </a>
        </div>
      </section>
    </div>
  );
}

export default Menu;
