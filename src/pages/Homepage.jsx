import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Homepage = () => {
    const navigate = useNavigate()

    const handleOrderNow = () => {
        navigate('/menu')
    }

    return (
        <section className="homepage">
            {/* Hero Section */}
            <div className="hero">
                <h1>ShawarmBoutique</h1>
            </div>

            {/* Description Section */}
            <div className="info-section">
                <h2>
                    Elevate Your<br />
                    <span className="bolder">Shawarma Experience</span>
                </h2>
                <p className="des">
                    At ShawarmBoutique, we are more than just a restaurant, we are a shawarma empire delivering award-winning flavors. Using only the freshest, locally-sourced ingredients, we create authentic recipes inspired by global traditions. Loved by critics and customers alike, our fast and reliable service guarantees satisfaction. Join our community-driven mission and experience shawarma like never before!
                </p>
            </div>

            {/* Order Section */}
            <div className="order-section">
                <button className="order-now-btn" onClick={handleOrderNow}>
                    Order Now
                </button>
            </div>
        </section>
    )
}
