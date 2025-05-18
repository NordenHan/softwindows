import React from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import CartSection from './components/CartSection';
import ContactsSection from './components/ContactsSection';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <div className="font-[Roboto, sans-serif]">
        <Header />
        <HomeSection />
        <AboutSection />
        <ProductsSection />
        <CartSection />
        <ContactsSection />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;