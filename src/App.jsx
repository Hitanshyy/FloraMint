
import React, { useState } from 'react';
import './App.css';

const picturesList = [
  { id: 1, name: 'Rose', price: 100 , url: '/images/rose.jpg' },
  { id: 2, name: ' White Tulip', price: 150, url: '/images/White tulips.jpg' },
  { id: 3, name: 'Sunflower', price: 120, url: '/images/Sunflower.jpg' },
  { id: 4, name: 'Daisy', price: 130, url: '/images/daisy.jpg' },
  { id: 5, name: 'Hibiscus', price: 130, url: '/images/Hibiscus.jpg' },
  { id: 6, name: 'Lilac', price: 130, url: '/images/lilac.jpg' },  
  { id: 7, name: 'Lily', price: 130, url: '/images/lily.jpg' },
  { id: 8, name: 'Marigold', price: 110, url: '/images/marigold.jpg' },
  { id: 4, name: 'Lotus', price: 130, url: '/images/Lotus.jpg' },
  
];

function Floramint() {
  const [pictures, setPictures] = useState(picturesList);
  const [cart, setCart] = useState([]);

  const handleBuy = (pic) => {
    setCart([...cart, pic]);
  };

  const handlePay = () => {
    const boughtIds = cart.map((p) => p.id);
    const remainingPics = pictures.filter((p) => !boughtIds.includes(p.id));
    setPictures(remainingPics);
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="App">
      <h1>Floramint</h1>
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
        {cart.map((item, index) => (
          <p key={index}>{item.name} - ${item.price}</p>
        ))}
        <h3>Total: ${total}</h3>
        {cart.length > 0 && <button onClick={handlePay}>Pay</button>}
      </div>
    </div>
  );
}

export default Floramint;
