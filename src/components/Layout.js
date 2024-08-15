import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Layout({ product }) {
  const { dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 3000); // 3 seconds
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 m-4 bg-white rounded-md flex flex-col justify-between w-full text-black">
      <div>
        <div className="flex justify-center mb-4">
          <Image src={product.image} alt={product.title} width={250} height={200} className="object-contain" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
        <div className="mb-4">
          <p className="text-gray-700 mb-2"><strong>Rating:</strong> {product.rating.rate}</p>
          <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
          <p className="text-gray-600 text-sm"><strong>Description:</strong> {product.description}</p>
        </div>
      </div>
      <div>
        <button onClick={addToCart} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Add to Cart</button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md text-center relative max-w-md mx-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition"
            >
              &times;
            </button>
            <p className='mt-7'>{product.title} has been added to the cart.</p>
          </div>
        </div>
      )}
    </div>
  );
}
