import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import EnquiryModal from './components/EnquiryModal';

// Views
import HomeView from './components/HomeView';
import BuyDscView from './components/BuyDscView';
import TokensView from './components/TokensView';
import ProductsView from './components/ProductsView';
import PricingView from './components/PricingView';
import DownloadsView from './components/DownloadsView';
import ContactView from './components/ContactView';

import { Product, CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [quickBuyId, setQuickBuyId] = useState<string | undefined>(undefined);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Load cart from localStorage for offline/session persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('dsc_india_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data:', e);
      }
    }
  }, []);

  // Sync cart to localStorage
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('dsc_india_cart', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product: Product, years: 1 | 2 | 3, includeToken: boolean) => {
    // Calculate custom item price based on configurations
    let itemPrice = product.price;

    // validity multipliers
    if (years === 1) {
      itemPrice = Math.round(itemPrice * 0.7);
    } else if (years === 3) {
      itemPrice = Math.round(itemPrice * 1.35);
    }

    // FIPS token adjustments
    if (includeToken && product.category === 'renewal') {
      itemPrice += 399; // token hardware add-on
    } else if (!includeToken && product.category !== 'renewal') {
      itemPrice -= 300; // token hardware deduction (saves cost!)
    }

    const cartItemId = `${product.id}-${years}-${includeToken ? 'token' : 'notoken'}`;

    // Check if duplicate configuration already exists in cart
    const existingIndex = cart.findIndex(
      (item) => item.id === cartItemId
    );

    let updatedCart = [...cart];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: cartItemId,
        product,
        quantity: 1,
        selectedYears: years,
        includeToken,
        calculatedPrice: itemPrice,
      });
    }

    saveCartToStorage(updatedCart);
    setIsCartOpen(true); // Automatically open cart drawer for immediate visual checkout flow
  };

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    let updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item.id === id);
    if (index > -1) {
      if (newQty <= 0) {
        updatedCart.splice(index, 1);
      } else {
        updatedCart[index].quantity = newQty;
      }
      saveCartToStorage(updatedCart);
    }
  };

  const handleRemoveCartItem = (id: string) => {
    let updatedCart = cart.filter((item) => item.id !== id);
    saveCartToStorage(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const handleSearch = (query: string) => {
    setActiveTab('products');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Render correct view block
  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            onAddToCart={handleAddToCart}
            setActiveTab={setActiveTab}
            onOpenEnquiry={() => setIsEnquiryOpen(true)}
          />
        );
      case 'buy-dsc':
        return (
          <BuyDscView
            onAddToCart={handleAddToCart}
            initialProductId={quickBuyId}
          />
        );
      case 'tokens':
        return <TokensView onAddToCart={handleAddToCart} />;
      case 'products':
        return (
          <ProductsView
            onAddToCart={handleAddToCart}
            setActiveTab={setActiveTab}
            setQuickBuyId={setQuickBuyId}
          />
        );
      case 'pricing':
        return (
          <PricingView
            setActiveTab={setActiveTab}
            setQuickBuyId={setQuickBuyId}
          />
        );
      case 'downloads':
        return <DownloadsView />;
      case 'contact':
        return <ContactView />;
      default:
        return (
          <HomeView
            onAddToCart={handleAddToCart}
            setActiveTab={setActiveTab}
            onOpenEnquiry={() => setIsEnquiryOpen(true)}
          />
        );
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* 1. Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setQuickBuyId(undefined); // Reset prefilled selected ids on manual navigations
        }}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
        onSearch={handleSearch}
      />

      {/* 2. Main Page View Content */}
      <main className="flex-1 pb-16">
        {renderActiveView()}
      </main>

      {/* 3. Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setQuickBuyId(undefined);
        }}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      {/* 4. Cart Side Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 5. Quick Support/Sales Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />

    </div>
  );
}
