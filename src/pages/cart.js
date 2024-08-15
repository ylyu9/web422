import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function CartPage() {
  const { state, dispatch } = useCart();

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
      <header className="header text-center py-3 bg-black">
        <Navbar />
      </header>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Shopping Cart</h1>
          {state.items.length === 0 ? (
            <p className="text-center text-gray-700">Your cart is empty.</p>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ul>
                {state.items.map((product, index) => (
                  <li key={`${product.id}-${index}`} className="border-b border-gray-200 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Image src={product.image} alt={product.title} width={100} height={50} className="object-contain" />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
                        <p className="text-gray-600">Price: ${product.price}</p>
                        <p className="text-gray-500 text-sm">{product.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-800">Total: ${state.total.toFixed(2)}</h2>
                <button
                  onClick={clearCart}
                  className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition mt-2"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
