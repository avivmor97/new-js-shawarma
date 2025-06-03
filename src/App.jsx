import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { fetchUserProfile } from './store/authSlice'

import { CartProvider } from './cmps/Cart.jsx'
import { NavBar } from './cmps/NavBar.jsx'
import { Homepage } from './pages/Homepage.jsx'
import { Menu } from './pages/Menu.jsx'
import { Profile } from './pages/Profile.jsx'
import { Reservation } from './pages/Reservation.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ContactUs } from './pages/ContactUs.jsx'
import { Footer } from './cmps/Footer.jsx'
import { Cart } from './cmps/Cart.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { ProtectedRoute } from './cmps/ProtectedRoute.jsx'

import './assets/main.css'

export const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

// 🔹 Main App Content (Separation for Redux Store)
const AppContent = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)


  return (
    <CartProvider>
      <Router>
        <div className="app">
          <NavBar />
          <Cart />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={token ? <Navigate to="/profile" /> : <Login />} />
            <Route path="/register" element={token ? <Navigate to="/profile" /> : <Register />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/reservation" element={<Reservation />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}
