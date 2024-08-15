import { renderHook, act } from '@testing-library/react-hooks';
import { useCart, CartProvider } from '@/contexts/CartContext';

describe('CartContext', () => {
  test('should add item to cart and update total', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.dispatch({ type: 'ADD_ITEM', payload: { id: 1, price: 100 } });
    });

    expect(result.current.state.items.length).toBe(1);
    expect(result.current.state.total).toBe(100);
  });
});
