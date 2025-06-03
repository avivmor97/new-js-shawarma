import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/authSlice'

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Mobile Menu Button */}
          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>☰</button>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/menu" className="nav-link">Menu</Link>
            <Link to="/reservation" className="nav-link">Reservation</Link>
            <Link to="/about-us" className="nav-link">About Us</Link>
            <Link to="/contact-us" className="nav-link">Contact Us</Link>

            {/* Authentication Actions */}
            <div className="nav-actions">
              {user ? (
                <>
                  <span className="user-welcome">
                    Welcome, <Link to="/profile" className="profile-link">{user.name}</Link>
                  </span>
                  <button className="nav-btn" onClick={() => dispatch(logoutUser())}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-btn">Sign In</Link>
                  <Link to="/register" className="nav-btn signup-btn">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Modal */}
      {isMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>✖</button>

            <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/menu" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Menu</Link>
            <Link to="/reservation" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Reservation</Link>
            <Link to="/about-us" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact-us" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>

            {/* Authentication for Mobile Menu */}
            {user ? (
              <>
                <span className="user-welcome">Welcome, {user.name}</span>
                <button className="nav-btn" onClick={() => { dispatch(logoutUser()); setIsMenuOpen(false) }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-btn" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                <Link to="/register" className="nav-btn signup-btn" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
