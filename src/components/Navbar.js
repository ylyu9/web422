import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const { state } = useCart();
  const cartItemCount = state.items.length;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by looking for a token
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove token from localStorage and set isLoggedIn to false
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Timble Store
        </Link>
        <button
          onClick={toggleMenu}
          className="block lg:hidden px-3 py-2 border rounded text-white border-white hover:text-gray-300 hover:border-gray-300"
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
          </svg>
        </button>
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow">
            <Link
              href="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-gray-300 mr-4"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-gray-300 mr-4"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-gray-300 mr-4"
            >
              Contact
            </Link>
            <Link
              href="/dashboard"
              className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-gray-300 mr-4"
            >
              Dashboard
            </Link>
            <Link
              href="/products"
              className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-gray-300 mr-4"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-gray-300"
            >
              Shopping Cart ({cartItemCount})
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-gray-300 mr-4"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block mt-4 lg:inline-block lg:mt-0 text-white font-bold hover:text-gray-300 mr-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
