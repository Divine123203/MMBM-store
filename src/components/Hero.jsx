import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-inner">
                <div className="hero-content">
                    <span className="hero-subtitle">New Collection 2026</span>
                    <h1 className="hero-title">
                        Elegance <br />
                        <span className="outline-text">Redefined</span>
                    </h1>
                    <p className="hero-description">
                        Discover a world where modern aesthetics meet timeless luxury.
                        MMBM Store brings you the finest selection.
                    </p>
                    <Link to="/collections" className="cta-button">
                        Explore Collection
                    </Link>
                </div>
                <div className="hero-visual">
                    <div className="circle-graphic"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero
