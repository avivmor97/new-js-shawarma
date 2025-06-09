import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../store/authSlice.js'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resultAction = await dispatch(registerUser(formData))

    if (registerUser.fulfilled.match(resultAction)) {
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
        navigate('/')
      }, 2000)
    }
  }

  return (
    <section className="register-section">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {showModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <p>🎉 Registration successful!</p>
          </div>
        </div>
      )}
    </section>
  )
}
