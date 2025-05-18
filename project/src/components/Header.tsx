import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scroll';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-900">Мягкие Окна</div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {[
            { name: 'О нас', id: 'about' },
            { name: 'Товар', id: 'products' },
            { name: 'Корзина', id: 'cart' },
            { name: 'Контакты', id: 'contacts' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-base font-medium transition-colors duration-300 ${
                isScrolled ? 'text-blue-900 hover:text-blue-700' : 'text-white hover:text-gray-200'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-blue-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4">
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            {[
              { name: 'О нас', id: 'about' },
              { name: 'Товар', id: 'products' },
              { name: 'Корзина', id: 'cart' },
              { name: 'Контакты', id: 'contacts' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-base font-medium text-blue-900 hover:text-blue-700 text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;