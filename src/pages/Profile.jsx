import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../store/authSlice.js'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile())
    } else {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      })
    }
  }, [dispatch, user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile(formData))
  }

  if (loading) return <p className="profile-loading">Loading...</p>
  if (error) return <p className="profile-error">{error}</p>

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome {user?.username || user?.name }</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label-input" >Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label className="label-input">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
        </div>
        <button type="submit" className="profile-save-btn">Save Changes</button>
      </form>

      <div className="profile-details">
        <p><strong>Membership:</strong> {user?.membership}</p>
        <p><strong>Credits:</strong> {user?.credits}</p>
      </div>

      <h2 className="order-history-title">Order History</h2>
      <ul className="order-history-list">
        {user?.orders?.map((order, index) => (
          <li key={index} className="order-history-item">
            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Total Spent:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Credits Earned:</strong> {order.creditsEarned}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
