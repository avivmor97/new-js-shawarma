import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const Reservation = () => {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [guests, setGuests] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleReservation = (e) => {
    e.preventDefault()
    if (!name || !contact || !selectedDate) {
      alert('Please fill in all fields!')
      return
    }
    alert(`Reservation made for ${name} on ${selectedDate.toDateString()} for ${guests} guest(s).`)
  }

  return (
    <section className="reservation-section main-container">
      <h1>Book Your Table</h1>
      <form className="reservation-form" onSubmit={handleReservation}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Phone Number</label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter your Phone Number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <input
            id="guests"
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Select Date and Time</label>
          <DatePicker
            id="date"
            className="styled-datepicker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="🎉 Pick a Date & Time 🎊"
          />
        </div>
        <button type="submit" className="reservation-btn">
          Confirm Reservation
        </button>
      </form>
    </section>
  )
}
