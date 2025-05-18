import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import emailjs from '@emailjs/browser'; 

const CartSection: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItemLength, clearCart } = useCart();
  const [contact, setContact] = useState('');
  const [needSpecialist, setNeedSpecialist] = useState(false);
  const [needInstallation, setNeedInstallation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculatePrice = (item: typeof cartItems[0]) => {
    if (item.length === null || item.length <= 0) {
      return item.pricePerCm2;
    }
    return item.pricePerCm2 * item.length;
  };

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + calculatePrice(item),
    0
  );

  const specialistCost = needSpecialist ? 1500 : 0;
  const installationCost = needInstallation ? 2000 : 0;
  const totalPrice = itemsTotal + specialistCost + installationCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0 || !contact) return;

    const orderDetails = cartItems.map((item) => {
      const product = products.find(p => p.id === item.productId);
      const unit = product?.unit || 'м';

      return `
Товар: ${item.productName}
Размер: ${item.width} ${unit}
Количество: ${item.length ?? '-'}
Цена: ${calculatePrice(item)} ₽
`;
    }).join('\n');

    const templateParams = {
      contact,
      message: `
===== Новый заказ =====
Контакт: ${contact}

${orderDetails}

Дополнительно:
- Вызов специалиста: ${needSpecialist ? 'Да (1500₽)' : 'Нет'}
- Доставка и установка: ${needInstallation ? 'Да (2000₽)' : 'Нет'}

Итого: ${totalPrice} ₽
=======================
      `,
    };

    emailjs.send(
      'service_0o1t9di',
      'template_9sok3d7',
      templateParams,
      '-g3DN0yJfwXFyTZko'
    )
      .then((res) => {
        console.log('Email sent:', res.text);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setContact('');
          setNeedSpecialist(false);
          setNeedInstallation(false);
          clearCart();
        }, 2000);
      })
      .catch((err) => {
        console.error('Email error:', err);
      });
  };

  return (
    <section id="cart" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Корзина</h2>
          <div className="w-16 h-1 bg-yellow-600 mx-auto"></div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Ваша корзина пуста</p>
            <p className="text-gray-500 mt-2">Добавьте товары из раздела "Товар"</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <div className="hidden md:grid md:grid-cols-5 gap-4 text-sm font-medium text-gray-500 mb-4 pb-2 border-b">
                  <div className="col-span-2">Товар</div>
                  <div>Размер</div>
                  <div>Количество</div>
                  <div>Цена (₽)</div>
                </div>

                {cartItems.map((item) => {
                  const product = products.find(p => p.id === item.productId);
                  const unit = product?.unit || 'м';

                  return (
                    <div
                      key={`${item.productId}-${item.width}`}
                      className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4 border-b items-center"
                    >
                      <div className="col-span-2">
                        <div className="font-medium text-blue-900">{item.productName}</div>
                      </div>
                      <div>
                        <div className="md:hidden text-sm text-gray-500 mb-1">Размер:</div>
                        <div>{item.width} {unit === 'м' ? 'мкм' : ''}</div>
                      </div>
                      <div>
                        <div className="md:hidden text-sm text-gray-500 mb-1">Количество ({unit}):</div>
                        <input
                          type="number"
                          min="1"
                          placeholder={`Введите количество (${unit})`}
                          value={item.length !== null ? item.length : ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            const length = value ? Number(value) : null;
                            updateCartItemLength(item.productId, item.width, length);
                          }}
                          className="w-full py-1 px-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="md:hidden text-sm text-gray-500 mb-1">Цена:</div>
                          <div className="font-medium">{calculatePrice(item)} ₽</div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId, item.width)}
                          className="text-red-500 hover:text-red-700 p-1"
                          aria-label="Удалить из корзины"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex flex-col space-y-2 mt-6 pt-4 border-t">
                  <div className="flex justify-between text-gray-600">
                    <span>Стоимость товаров:</span>
                    <span>{itemsTotal} ₽</span>
                  </div>
                  {needSpecialist && (
                    <div className="flex justify-between text-gray-600">
                      <span>Вызов специалиста:</span>
                      <span>1500 ₽</span>
                    </div>
                  )}
                  {needInstallation && (
                    <div className="flex justify-between text-gray-600">
                      <span>Доставка и установка:</span>
                      <span>2000 ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-blue-900 pt-2 border-t">
                    <span>Итого:</span>
                    <span>{totalPrice} ₽</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон или email для связи:
                  </label>
                  <input
                    id="contact"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+7 (XXX) XXX-XX-XX или email@example.com"
                  />
                </div>

                <div className="space-y-4 mb-6">
                  <label className="flex items-start cursor-pointer">
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        checked={needSpecialist}
                        onChange={(e) => setNeedSpecialist(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                    </div>
                    <div className="ml-3">
                      <span className="text-sm font-medium text-gray-600">
                        Вызвать специалиста (1500 рублей)
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Вы можете вызвать специалиста на дом для замера необходимого количества.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start cursor-pointer">
                    <div className="flex items-center h-6">
                      <input
                        type="checkbox"
                        checked={needInstallation}
                        onChange={(e) => setNeedInstallation(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                    </div>
                    <div className="ml-3">
                      <span className="text-sm font-medium text-gray-600">
                        Доставить и установить (2000 рублей)
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        наш специалист доставит и осуществит установку
                      </p>
                    </div>
                  </label>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    disabled={cartItems.length === 0 || !contact || isSubmitted}
                    className={`
                      py-2 px-6 rounded-lg font-medium text-white transition-colors duration-300
                      ${
                        isSubmitted
                          ? 'bg-green-600'
                          : cartItems.length === 0 || !contact
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-900 hover:bg-blue-800'
                      }
                    `}
                  >
                    {isSubmitted ? 'Успешно отправлено' : 'Отправить'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartSection;