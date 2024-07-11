import React from 'react';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { WalletProvider } from '../context/WalletContext'; // Ensure this import path is correct
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/authContext'; // Adjust the import path as needed
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Core Access',
  description: 'Revolutionizing Event Ticketing with Web3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <AuthProvider>
          <WalletProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
