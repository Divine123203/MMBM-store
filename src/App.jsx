import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import FeaturedCategories from './components/FeaturedCategories'
import BrandStory from './components/BrandStory'
import ProductSpotlight from './components/ProductSpotlight'
import Ticker from './components/Ticker'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'

// Lazy load pages for performance
const About = lazy(() => import('./pages/About'))
const Shop = lazy(() => import('./pages/Shop'))
const CollectionsLanding = lazy(() => import('./pages/CollectionsLanding'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))

// Premium loading fallback
const PageLoader = () => (
  <div className="page-loader" style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#050505',
    color: 'var(--color-accent)',
    fontSize: '0.9rem',
    letterSpacing: '5px',
    textTransform: 'uppercase'
  }}>
    <div className="loader-content">MMBM</div>
  </div>
)
import './index.css'
import { ToastProvider } from './context/ToastContext'

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  // ... rest of state stays same
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = localStorage.getItem('userInfo')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    // Check if item already exists with same ID
    const existingItemIndex = cart.findIndex(item => item.id === product.id)

    if (existingItemIndex !== -1) {
      const newCart = [...cart]
      newCart[existingItemIndex].quantity += quantity
      setCart(newCart)
    } else {
      setCart([...cart, { ...product, quantity }])
    }

    setIsCartOpen(true)
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item))
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <GoogleOAuthProvider clientId="619316628751-hbanlk6mj5448pnub96gvd8234gvue5q.apps.googleusercontent.com">
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="app">
            <Header cartCount={cartCount} toggleCart={toggleCart} userInfo={userInfo} setUserInfo={setUserInfo} />
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={
                    <>
                      <Hero />
                      <ProductSpotlight addToCart={addToCart} />
                      <FeaturedCategories />
                      <BrandStory />
                      <Ticker />
                      <ProductGrid addToCart={addToCart} />
                      <Testimonials />
                      <Newsletter />
                    </>
                  } />
                  <Route path="/shop" element={<Shop addToCart={addToCart} />} />
                  <Route path="/collections" element={<CollectionsLanding />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
                  <Route path="/checkout" element={<Checkout cart={cart} />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </GoogleOAuthProvider>
  )
}

export default App
