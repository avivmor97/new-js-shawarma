import React, { useState, createContext, useContext } from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev)
  }

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item])
  }

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, toggleCart, isCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}

export const Cart = () => {
  const { cartItems, toggleCart, isCartOpen, removeFromCart } = useCart()

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0)

  return (
    <div className={`cart-container ${isCartOpen ? 'open' : ''}`}>
      {/* Cart Icon */}
      {!isCartOpen && (
        <div className="cart-icon" onClick={toggleCart}>
          <FaShoppingCart size={30} />
          <span className="cart-count">{cartItems.length}</span>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="cart-modal">
          <button className="close-btn" onClick={toggleCart}>
            ✕
          </button>
          <h2>Your Cart</h2>
          {cartItems.length > 0 ? (
            <>
              <ul className="cart-items">
                {cartItems.map((item, index) => (
                  <li key={index} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
    </div>
  )
}
