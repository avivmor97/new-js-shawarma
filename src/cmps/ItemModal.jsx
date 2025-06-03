import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const ItemModal = ({ item, closeModal, addToCart }) => {
  const [customization, setCustomization] = useState({
    removedIngredients: [],
    extras: [],
    size: 'Medium',
  })

  const [availableIngredients, setAvailableIngredients] = useState([])

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:8080/api/ingredients', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setAvailableIngredients(response.data)
      } catch (error) {
        console.error('Failed to fetch ingredients:', error)
      }
    }
    fetchIngredients()
  }, [])

  const handleRemoveIngredient = (ingredient) => {
    setCustomization((prev) => ({
      ...prev,
      removedIngredients: prev.removedIngredients.includes(ingredient)
        ? prev.removedIngredients.filter((ing) => ing !== ingredient)
        : [...prev.removedIngredients, ingredient],
    }))
  }

  const handleAddExtra = (extra) => {
    setCustomization((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }))
  }

  const handleSizeChange = (size) => {
    setCustomization((prev) => ({ ...prev, size }))
  }

  const handleConfirm = () => {
    let finalPrice = item.price + customization.extras.length * 1.99

    if (item.category === 'Drinks') {
      if (customization.size === 'Small') finalPrice -= 0.5
      if (customization.size === 'Large') finalPrice += 0.5
    }

    const customizedItem = {
      ...item,
      removedIngredients: customization.removedIngredients,
      extras: customization.extras,
      size: item.category === 'Drinks' ? customization.size : undefined,
      price: finalPrice,
    }

    addToCart(customizedItem)
    closeModal()
  }

  const handleCancel = () => {
    setCustomization({ removedIngredients: [], extras: [], size: 'Medium' })
    closeModal()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeModal}>✖</button>
        <h2 className='itemName'>{item.name}</h2>
        <img src={item.image} alt={item.name} className="modal-img" />
        <p>Customize your {item.name} before adding it to the cart.</p>

        <div className="custom-options">
          {['Pita Shawarma', 'Laffa Shawarma', 'Shawarma Plate'].includes(item.name) && (
            <>
              <h3>Remove Ingredients:</h3>
              <div className="option-list">
                {availableIngredients.map((ingredient) => (
                  <button
                    key={ingredient.id}
                    className={customization.removedIngredients.includes(ingredient.name) ? 'selected' : ''}
                    onClick={() => handleRemoveIngredient(ingredient.name)}
                  >
                    {customization.removedIngredients.includes(ingredient.name) ? `❌ ${ingredient.name}` : ingredient.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {['Pita Shawarma', 'Laffa Shawarma', 'Shawarma Plate', 'Fries', 'Salad', 'Plate with Hummus'].includes(item.name) && (
            <>
              <h3>Add Extras:</h3>
              <div className="option-list">
                {availableIngredients.map((ingredient) => (
                  <button
                    key={ingredient.id}
                    className={`extra-btn ${customization.extras.includes(ingredient.name) ? 'selected-extra' : ''}`}
                    onClick={() => handleAddExtra(ingredient.name)}
                  >
                    {customization.extras.includes(ingredient.name) ? `✔ ${ingredient.name}` : ingredient.name} (+$1.99)
                  </button>
                ))}
              </div>
            </>
          )}

          {['Coke', 'Coke Zero', 'Pepsi'].includes(item.name) && (
            <>
              <h3>Choose Size:</h3>
              <div className="option-list">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${customization.size === size ? 'selected-extra' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {customization.size === size ? `✔ ${size}` : size}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={handleCancel}>Cancel Changes</button>
          <button className="confirm-btn" onClick={handleConfirm}>
            Add to Cart - ${item.price + customization.extras.length * 1.99}
          </button>
        </div>
      </div>
    </div>
  )
}
