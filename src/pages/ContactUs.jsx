import React from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

export const ContactUs = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCFcdIdanTS9NKH9Befe-WKm5YBfSCIRWU',
  })

  const locations = [
    { name: 'Jerusalem Branch', lat: 31.7683, lng: 35.2137 },
    { name: 'Tel Aviv Branch', lat: 32.0853, lng: 34.7818 },
    { name: 'Haifa Branch', lat: 32.794, lng: 34.9896 },
    { name: 'Beersheba Branch', lat: 31.252973, lng: 34.791462 },
  ]

  const reviews = [
    { name: 'David R.', text: 'Best shawarma in town! Fresh and delicious.', rating: 5 },
    { name: 'Sarah L.', text: 'Loved the tahini sauce, great portion sizes.', rating: 4.5 },
    { name: 'Eli M.', text: 'Authentic Israeli shawarma experience!', rating: 5 },
    { name: 'Rami C.', text: 'Fantastic customer service and tasty meat.', rating: 4 },
    { name: 'Maya G.', text: 'Crunchy fries and amazing hummus, highly recommended.', rating: 4.5 },
    { name: 'Noam S.', text: 'Great place for family gatherings!', rating: 5 },
    { name: 'Tamar K.', text: 'A must-visit if you love Middle Eastern food.', rating: 4 },
  ]

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 !== 0

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FaStar key={i} color="#ffc107" />
          ))}
        {halfStar && <FaStarHalfAlt color="#ffc107" />}
      </>
    )
  }

  return (
    <section className="contact-us">
      {/* Top Row - Branches with a single map */}
      <div className="branches">
        <h2>Our Branches</h2>
        {isLoaded ? (
          <div className="map-container">
            <GoogleMap
              className="google-map"
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={{ lat: 32.0, lng: 34.8 }} // Center between all locations
              zoom={7}
            >
              {locations.map((branch, index) => (
                <Marker key={index} position={{ lat: branch.lat, lng: branch.lng }} />
              ))}
            </GoogleMap>
          </div>
        ) : (
          <p>Loading map...</p>
        )}
      </div>

      {/* Middle Row - Reviews */}
      <div className="reviews">
        <h2>What Our Customers Say</h2>
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h3>{review.name}</h3>
              <p>{review.text}</p>
              <div className="stars">{renderStars(review.rating)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Contact Details */}
      <div className="contact-info">
        <h2 className="contact-header">Contact Us</h2>
        <p>Email: contact@shawarma.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Shawarma St, Food City</p>
      </div>
    </section>
  )
}
