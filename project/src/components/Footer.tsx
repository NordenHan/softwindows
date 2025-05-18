import React from 'react';
import { scrollToSection } from '../utils/scroll';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ИП Кондратьева</h3>
            <p className="text-gray-400">
              Комфорт под открытым небом — в любое время года.
Мягкие окна для террас, беседок, веранд и балконов.
Надёжная защита от дождя, ветра и холода без потери света и простора.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Навигация</h3>
            <nav className="flex flex-col space-y-2">
              {[
                { name: 'О нас', id: 'about' },
                { name: 'Товар', id: 'products' },
                { name: 'Корзина', id: 'cart' },
                { name: 'Контакты', id: 'contacts' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Контактная информация</h3>
            <div className="space-y-2 text-gray-400">
              <p>Телефон: +7 (980) 326-20-88</p>
              <p>Email: info@kantmaster.ru</p>
              <p>Адрес: Белгородский район, село Таврово, ул. Надежды 5</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} КантМастер. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;