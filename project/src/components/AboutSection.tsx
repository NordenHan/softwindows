import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">О нас</h2>
          <div className="w-16 h-1 bg-yellow-600 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <p className="text-gray-700 text-lg mb-6">
              Мы — надежный поставщик мягких окон с многолетним опытом. Наши товары отличаются высоким качеством и долговечностью, что подтверждено отзывами клиентов.
            </p>
            <p className="text-gray-700 text-lg mb-6">
              Уже более 10 лет наша компания обеспечивает строительные и ремонтные организации, а также частных клиентов, высококачественными мягкими окнами различных типов и размеров.
            </p>
            <p className="text-gray-700 text-lg">
              Мы гордимся тем, что наша продукция соответствует самым высоким стандартам качества и экологической безопасности. Наши специалисты готовы помочь вам с выбором оптимального решения для ваших окон.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-900 font-bold text-4xl mb-2">10+</div>
              <p className="text-gray-600">лет на рынке</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-900 font-bold text-4xl mb-2">5000+</div>
              <p className="text-gray-600">довольных клиентов</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-900 font-bold text-4xl mb-2">100%</div>
              <p className="text-gray-600">гарантия качества</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;