import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = () => {
    router.push('/login');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>Timble Store</title>
        <meta name="description" content="Explore our modern product store with the best items." />
      </Head>
      <header className="bg-gray-800 py-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold cursor-pointer" onClick={() => router.push('/')}>Timble Store</h1>
          <nav className="space-x-4">
            <span onClick={() => router.push('/register')} className="hover:text-gray-400 cursor-pointer">Register</span>
            <span onClick={() => router.push('/login')} className="hover:text-gray-400 cursor-pointer">Login</span>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 animate-fadeIn">Welcome to Timble Store</h2>
          <p className="text-lg text-gray-300 mb-8 animate-fadeIn">Discover a wide range of products curated just for you.</p>
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300 px-8 py-3 rounded-full text-white font-semibold text-lg shadow-lg animate-bounce"
            onClick={handleProductClick}
          >
            Shop Now
          </button>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={handleProductClick}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-bold mb-1">{product.title}</h3>
              </div>
            </div>
          ))}
        </section>
      </main>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-5%);
          }
          50% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
