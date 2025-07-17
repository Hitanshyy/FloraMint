import React, { useState } from 'react';
import './App.css';

const picturesList = [
  { id: 1, name: 'Rose', price: 2, url: '/images/rose.jpg' },
  { id: 2, name: 'White Tulip', price: 8, url: '/images/White tulips.jpg' },
  { id: 3, name: 'Sunflower', price: 5, url: '/images/Sunflower.jpg' },
  { id: 4, name: 'Daisy', price: 5, url: '/images/daisy.jpg' },
  { id: 5, name: 'Hibiscus', price: 3, url: '/images/Hibiscus.jpg' },
  { id: 6, name: 'Lilac', price: 5, url: '/images/lilac.jpg' },
  { id: 7, name: 'Lily', price: 10, url: '/images/lily.jpg' },
  { id: 8, name: 'Marigold', price: 2, url: '/images/marigold.jpg' },
  { id: 9, name: 'Lotus', price: 10, url: '/images/Lotus.jpg' },
];

function Floramint() {
  const [pictures, setPictures] = useState(picturesList);
  const [cart, setCart] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleBuy = (pic) => {
    const alreadyInCart = cart.some((item) => item.id === pic.id);
    if (!alreadyInCart) {
      setCart([...cart, { ...pic }]);
    }
  };

  const handlePay = () => {
    const boughtIds = cart.map((p) => p.id);
    const remainingPics = pictures.filter((p) => !boughtIds.includes(p.id));
    setPictures(remainingPics);
    setCart([]);
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3000);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="App">
      <h1>Floramint</h1>

      {paymentSuccess && (
        <div className="success-message">
          🎉 Payment successful! Thank you for your purchase.
        </div>
      )}

      <div className="gallery">
        {pictures.map((pic) => (
          <div key={pic.id} className="picture-card">
            <img src={pic.url} alt={pic.name} />
            <h3>{pic.name}</h3>
            <p>Price: ${pic.price}</p>
            <button onClick={() => handleBuy(pic)}>Buy</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.name} = ${item.price}</p>
            </div>
          ))
        )}
        <h3>Total: ${total}</h3>
        {cart.length > 0 && <button onClick={handlePay}>Pay</button>}
      </div>
    </div>
  );
}

export default Floramint;
