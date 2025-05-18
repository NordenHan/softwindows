import React, { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Product, getWidthOptionsForProduct } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const widthOptions = getWidthOptionsForProduct(product.id);
  const [selectedWidth, setSelectedWidth] = useState(widthOptions[0]);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, isItemInCart } = useCart();

  const handleAddToCart = () => {
    if (isItemInCart(product.id, selectedWidth.value)) return;
    
    addToCart({
      productId: product.id,
      productName: product.name,
      width: selectedWidth.value,
      length: null,
      pricePerCm2: selectedWidth.pricePerCm2,
      unit: product.unit,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const isInCart = isItemInCart(product.id, selectedWidth.value);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative pb-[66.67%]">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain bg-gray-50 p-4"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        {widthOptions.length > 1 && (
          <div className="mb-4">
            <label htmlFor={`width-${product.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Выберите {product.unit === 'м' ? 'толщину' : 'размер'}:
            </label>
            <select
              id={`width-${product.id}`}
              value={selectedWidth.value}
              onChange={(e) => {
                const width = Number(e.target.value);
                const option = widthOptions.find(opt => opt.value === width);
                if (option) setSelectedWidth(option);
              }}
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {widthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-blue-900">
            {selectedWidth.pricePerCm2} ₽/{product.unit}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`
              flex items-center justify-center rounded-lg px-4 py-2 transition-colors duration-300
              ${isInCart 
                ? 'bg-green-600 text-white cursor-not-allowed' 
                : 'bg-blue-900 hover:bg-blue-800 text-white'
              }
            `}
          >
            {isAdded || isInCart ? (
              <Check size={20} className="mr-1" />
            ) : (
              <ShoppingCart size={20} className="mr-1" />
            )}
            {isInCart ? 'В корзине' : 'В корзину'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;