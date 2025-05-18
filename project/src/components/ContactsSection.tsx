import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactsSection: React.FC = () => {
  return (
    <section id="contacts" className="py-20 bg-blue-900 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
          <div className="w-16 h-1 bg-yellow-600 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Свяжитесь с нами</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-800 p-3 rounded-full mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Телефон</p>
                    <p className="font-medium">+7 (980) 326-20-88</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-800 p-3 rounded-full mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Email</p>
                    <p className="font-medium">info@kantmaster.ru</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-800 p-3 rounded-full mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">Адрес</p>
                    <p className="font-medium">Белгородский район, село Таврово, ул. Надежды 5</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Время работы</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-800 p-3 rounded-full mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Понедельник - Пятница</p>
                    <p className="text-blue-200">9:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-800 p-3 rounded-full mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Суббота</p>
                    <p className="text-blue-200">10:00 - 16:00</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-800 p-3 rounded-full mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Воскресенье</p>
                    <p className="text-blue-200">Выходной</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;