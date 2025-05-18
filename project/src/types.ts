export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  unit: 'м' | 'шт';
}

export interface CartItem {
  productId: number;
  productName: string;
  width: number;
  length: number | null;
  pricePerCm2: number;
  unit: 'м' | 'шт';
}

export interface WidthOption {
  value: number;
  label: string;
  pricePerCm2: number;
}

export const getWidthOptionsForProduct = (productId: number): WidthOption[] => {
  switch (productId) {
    case 1: // Классический кант
      return [
        { value: 5, label: '5 см', pricePerCm2: 17.5 },
        { value: 10, label: '10 см', pricePerCm2: 35 },
        { value: 14, label: '14 см', pricePerCm2: 49 },
        { value: 16, label: '16 см', pricePerCm2: 56 },
        { value: 20, label: '20 см', pricePerCm2: 70 },
        { value: 30, label: '30 см', pricePerCm2: 105 },
      ];
    case 2: // Премиум кант
      return [
        { value: 10, label: '10 см', pricePerCm2: 45 },
        { value: 14, label: '14 см', pricePerCm2: 64 },
        { value: 16, label: '16 см', pricePerCm2: 73 },
        { value: 20, label: '20 см', pricePerCm2: 91 },
      ];
    case 6: // Технологичный кант
      return [
        { value: 10, label: '10 см', pricePerCm2: 35 },
        { value: 14, label: '14 см', pricePerCm2: 49 },
        { value: 16, label: '16 см', pricePerCm2: 56 },
        { value: 20, label: '20 см', pricePerCm2: 70 },
        { value: 30, label: '30 см', pricePerCm2: 105 },
      ];
    case 7: // Мягкое стекло из полиуретана
      return [
        { value: 500, label: '500 мкм', pricePerCm2: 600 },
        { value: 700, label: '700 мкм', pricePerCm2: 800 },
      ];
    case 8: // Мягкое стекло из ПВХ
      return [
        { value: 500, label: '500 мкм', pricePerCm2: 400 },
        { value: 800, label: '800 мкм', pricePerCm2: 800 },
        { value: 1000, label: '1000 мкм', pricePerCm2: 950 },
        { value: 2000, label: '2000 мкм', pricePerCm2: 1400 },
      ];
    case 9: // Скоба тентовая
      return [
        { value: 11, label: 'Н 11', pricePerCm2: 15 },
        { value: 15, label: 'Н 15', pricePerCm2: 18 },
        { value: 17, label: 'Н 17', pricePerCm2: 19 },
        { value: 20, label: 'Н 20', pricePerCm2: 19 },
        { value: 25, label: 'Н 25', pricePerCm2: 20 },
      ];
    case 10: // Скоба поворотная
      return [
        { value: 1, label: 'Стандартная', pricePerCm2: 20 },
      ];
    case 11: // Скоба малая черная
      return [
        { value: 15, label: 'Н 15', pricePerCm2: 19 },
        { value: 17, label: 'Н 17', pricePerCm2: 22 },
        { value: 20, label: 'Н 20', pricePerCm2: 25 },
      ];
    default: // Кант модерн, Эко кант, Кант люкс
      return [
        { value: 10, label: '10 см', pricePerCm2: 35 },
        { value: 14, label: '14 см', pricePerCm2: 49 },
        { value: 16, label: '16 см', pricePerCm2: 56 },
        { value: 20, label: '20 см', pricePerCm2: 70 },
      ];
  }
};