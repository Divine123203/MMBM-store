import './Ticker.css'

const Ticker = () => {
    const items = [
        "LIMITED EDITIONS",
        "GLOBAL SHIPPING",
        "EXQUISITE CRAFTSMANSHIP",
        "MMBM ESSENTIALS",
        "PREMIUM QUALITY",
        "MODERN MINIMALISM"
    ]

    return (
        <div className="ticker-wrapper">
            <div className="ticker-content">
                {/* Render items twice for seamless loop */}
                {[...items, ...items].map((item, index) => (
                    <div key={index} className="ticker-item">
                        <span className="ticker-text">{item}</span>
                        <span className="ticker-dot">•</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Ticker
