import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { CartProvider } from '@/contexts/CartContext';
import { useRouter } from 'next/router';

// Mock the Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
    }));
  });

  test('should render the Navbar with correct links', () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
  });
});
