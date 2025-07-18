import React, { useState } from 'react';
import './App.css';
import { BrowserProvider, parseEther } from 'ethers'; // Make sure you imported these

const picturesList = [
  { id: 1, name: 'Rose', price: 0.000001, url: '/images/rose.jpg' },
  { id: 2, name: 'White Tulip', price: 0.000002, url: '/images/White tulips.jpg' },
  { id: 3, name: 'Sunflower', price: 0.0000015, url: '/images/Sunflower.jpg' },
  { id: 4, name: 'Daisy', price: 0.0000012, url: '/images/daisy.jpg' },
  { id: 5, name: 'Hibiscus', price: 0.0000011, url: '/images/Hibiscus.jpg' },
  { id: 6, name: 'Lilac', price: 0.0000013, url: '/images/lilac.jpg' },
  { id: 7, name: 'Lily', price: 0.0000017, url: '/images/lily.jpg' },
  { id: 8, name: 'Marigold', price: 0.0000009, url: '/images/marigold.jpg' },
  { id: 9, name: 'Lotus', price: 0.000002, url: '/images/Lotus.jpg' },
];

function Floramint() {
  const [pictures, setPictures] = useState(picturesList);
  const [cart, setCart] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [account, setAccount] = useState(null);

  const handleBuy = (pic) => {
    const alreadyInCart = cart.some((item) => item.id === pic.id);
    if (!alreadyInCart) {
      setCart([...cart, { ...pic }]);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        alert('Wallet connection failed!');
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handlePay = async () => {
    if (!account) {
      alert('Connect your wallet first!');
      return;
    }

  


const provider = new BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

    const yourWalletAddress = '0xF09AC8BEa55763d0b9d338bDDC3dF2069B22ab71';

    const totalEth = cart.reduce((sum, item) => sum + item.price, 0);
    const ethValue = parseEther(totalEth.toString());


    try {
      const tx = await signer.sendTransaction({
        to: yourWalletAddress,
        value: ethValue,
      });

      await tx.wait();

      const boughtIds = cart.map((p) => p.id);
      const remainingPics = pictures.filter((p) => !boughtIds.includes(p.id));
      setPictures(remainingPics);
      setCart([]);
      setPaymentSuccess(true);
      setTimeout(() => setPaymentSuccess(false), 3000);
    } catch (err) {
      alert('Transaction failed.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Floramint</h1>

      <button onClick={connectWallet}>
        {account ? `Connected: ${account.substring(0, 6)}...` : 'Connect Wallet'}
      </button>

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
            <p>Price: {pic.price} ETH</p>
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
              <p>{item.name} = {item.price} ETH</p>
            </div>
          ))
        )}
        <h3>Total: {cart.reduce((sum, item) => sum + item.price, 0)} ETH</h3>
        {cart.length > 0 && <button onClick={handlePay}>Pay</button>}
      </div>
    </div>
  );
}

export default Floramint;
