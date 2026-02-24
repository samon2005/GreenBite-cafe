import React from 'react';

function Cart({ cartItems, onRemove, onOrder, onClose }) {
  return (
    <aside className="cart">
      <button className="cart-close-btn" onClick={onClose} title="Cerrar">&#10005;</button>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx} className="cart-item">
                <img src={`/${item.img}`} alt={item.name} className="cart-img" />
                <span>{item.name}</span>
                <span>{item.price}</span>
                <button onClick={() => onRemove(idx)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            <button className="order-btn" onClick={onOrder}>Ordenar por WhatsApp</button>
            <button
              className="order-btn"
              style={{background:'#0070ba', color:'#fff'}}
              onClick={() => {
                const total = cartItems.reduce((acc, item) => acc + Number(item.price.replace(/[^\d]/g, '')), 0);
                window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=samuelroldanlaverde@gmail.com&item_name=Compra%20en%20GreenBite%20Café&amount=${(total/4000).toFixed(2)}&currency_code=USD`, '_blank');
              }}
            >
              Pagar con PayPal
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default Cart;
