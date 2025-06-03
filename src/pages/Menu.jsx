import React, { useState } from 'react'
import pitaImg from '../assets/images/pita.png'
import laffaImg from '../assets/images/laffa.png'
import plateImg from '../assets/images/plate.png'
import friesImg from '../assets/images/fries.png'
import hummusImg from '../assets/images/hummus.png'
import saladImg from '../assets/images/salad.png'
import drinkImg from '../assets/images/drink.png'
import { useCart } from '../cmps/Cart.jsx'
import { ItemModal } from '../cmps/ItemModal.jsx'

export const Menu = () => {
  const { addToCart } = useCart()
  const [selectedItem, setSelectedItem] = useState(null)

  const categories = [
    {
      name: 'Top Sellers',
      items: [
        { name: 'Pita Shawarma', price: 9.99, image: pitaImg },
        { name: 'Laffa Shawarma', price: 12.99, image: laffaImg },
        { name: 'Shawarma Plate', price: 14.99, image: plateImg },
      ],
    },
    {
      name: 'Extras',
      items: [
        { name: 'Fries', price: 4.99, image: friesImg },
        { name: 'Salad', price: 14.99, image: saladImg },
        { name: 'Plate with Hummus', price: 16.99, image: hummusImg },
      ],
    },
    {
      name: 'Drinks',
      items: [
        { name: 'Coke', price: 2.99, image: drinkImg },
        { name: 'Coke Zero', price: 2.99, image: drinkImg },
        { name: 'Pepsi', price: 2.99, image: drinkImg },
      ],
    },
  ]

  return (
    <div className="main-container">
      <section className="menu-section">
        <h1>Our Menu</h1>
        <div className="scrollable-menu">
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="menu-category">
              <h2>{category.name}</h2>
              <ul className="menuRoll">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="menu-item" onClick={() => setSelectedItem(item)}>
                    <img src={item.image} alt={item.name} />
                    <div className="menu-info">
                      <h3 className="cardItemName">{item.name}</h3>
                      <p>${item.price.toFixed(2)}</p>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(item) }}>
                        Add to Cart
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {selectedItem && <ItemModal item={selectedItem} closeModal={() => setSelectedItem(null)} addToCart={addToCart} />}
    </div>
  )
}
