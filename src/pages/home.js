import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Redirect to login if token is not found
    } else {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [router]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Head>
        <title>My Assignment 4</title>
      </Head>
      <header className="header text-center py-4">
        <Navbar />
        <div className="container mx-auto">
          <Image src="/Seneca_College-Logo.wine.png" alt="Organization Logo" width={500} height={200} className="mx-auto py-6" />
          <h1 className="text-6xl font-bold">Welcome to Our Product Store</h1>
          <p className="text-xl mt-2">We sell everything your heart desires. If you can think it, we sell it</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-3">
        <div className="product-gallery container mx-auto px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div className="my-2 rounded-lg p-3 text-white" key={product.id}>
                <Layout product={product} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
