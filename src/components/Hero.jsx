import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Hero.css'

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-inner">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.span
                        className="hero-subtitle"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        New Collection 2026
                    </motion.span>
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        Elegance <br />
                        <span className="outline-text">Redefined</span>
                    </motion.h1>
                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                    >
                        Discover a world where modern aesthetics meet timeless luxury.
                        MMBM Store brings you the finest selection.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        <Link to="/collections" className="cta-button">
                            Explore Collection
                        </Link>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="circle-graphic"></div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
