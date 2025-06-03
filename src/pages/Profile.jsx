import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../store/authSlice.js'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, user])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="profile-container">
      <h1>Welcome, {user?.name}</h1>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Membership:</strong> {user?.membership}</p>
      <p><strong>Credits:</strong> {user?.credits}</p>

      <h2>Order History</h2>
      <ul>
        {user?.orders?.map((order, index) => (
          <li key={index}>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Total Spent:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Credits Earned:</strong> {order.creditsEarned}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
