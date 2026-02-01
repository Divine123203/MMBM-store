import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import Collections from './pages/Collections'
import FeaturedCategories from './components/FeaturedCategories'
import BrandStory from './components/BrandStory'
import ProductSpotlight from './components/ProductSpotlight'
import Ticker from './components/Ticker'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import CartDrawer from './components/CartDrawer'
import './index.css'

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product) => {
    setCart([...cart, product])
    setIsCartOpen(true) // Open cart when item is added
  }

  const removeFromCart = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const cartCount = cart.length

  return (
    <Router>
      <div className="app">
        <Header cartCount={cartCount} toggleCart={toggleCart} />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          removeFromCart={removeFromCart}
        />
        <main>
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
            <Route path="/collections" element={<Collections addToCart={addToCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
