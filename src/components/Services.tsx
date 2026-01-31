import styles from './Services.module.css';

const services = {
    ivDrips: [
        {
            icon: '⚡',
            title: 'Energy Boost',
            description: 'Combat fatigue and restore your natural energy levels with our vitamin B complex infusion.',
            price: 'From £150',
        },
        {
            icon: '🛡️',
            title: 'Immunity',
            description: 'Strengthen your immune system with high-dose Vitamin C and essential minerals.',
            price: 'From £175',
        },
        {
            icon: '✨',
            title: 'Beauty Glow',
            description: 'Enhance your skin radiance with glutathione, biotin, and collagen boosters.',
            price: 'From £200',
        },
        {
            icon: '💧',
            title: 'Hydration',
            description: 'Rapid rehydration with electrolytes, perfect for recovery and wellness.',
            price: 'From £125',
        },
        {
            icon: '🌿',
            title: 'Detox',
            description: 'Cleanse your body with our powerful antioxidant and liver support formula.',
            price: 'From £180',
        },
        {
            icon: '🏃',
            title: 'Athletic',
            description: 'Optimize recovery and performance with amino acids and minerals.',
            price: 'From £195',
        },
    ],
    aesthetics: [
        {
            icon: '💉',
            title: 'Anti-Wrinkle',
            description: 'Smooth fine lines and wrinkles with precision treatments.',
            price: 'From £180',
        },
        {
            icon: '💋',
            title: 'Dermal Fillers',
            description: 'Restore volume and enhance facial contours naturally.',
            price: 'From £250',
        },
        {
            icon: '💎',
            title: 'Skin Boosters',
            description: 'Deep hydration and rejuvenation with hyaluronic acid.',
            price: 'From £200',
        },
        {
            icon: '🌸',
            title: 'PRP Therapy',
            description: 'Harness your body\'s healing power for skin regeneration.',
            price: 'From £300',
        },
    ],
};

const Services = () => {
    return (
        <section id="services" className={styles.services}>
            {/* Background Decoration */}
            <div className={styles.bgDecor}>
                <div className={styles.decorCircle}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>Our Services</span>
                    <h2 className={styles.title}>Treatments Tailored for You</h2>
                    <div className={styles.divider}></div>
                    <p className={styles.subtitle}>
                        Discover our range of medically-led IV drips and aesthetic treatments,
                        all delivered by qualified healthcare professionals.
                    </p>
                </div>

                {/* IV Drips Section */}
                <div className={styles.category}>
                    <h3 className={styles.categoryTitle}>IV Drip Therapy</h3>
                    <p className={styles.categoryDescription}>
                        Pharmaceutical-grade vitamins delivered directly to your bloodstream
                    </p>

                    <div className={styles.grid}>
                        {services.ivDrips.map((service, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.cardIcon}>{service.icon}</div>
                                <div className={styles.cardContent}>
                                    <h4 className={styles.cardTitle}>{service.title}</h4>
                                    <p className={styles.cardDescription}>{service.description}</p>
                                </div>
                                <div className={styles.cardFooter}>
                                    <span className={styles.price}>{service.price}</span>
                                    <a href="#contact" className={styles.cardLink}>
                                        Book →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Aesthetics Section */}
                <div className={styles.category}>
                    <h3 className={styles.categoryTitle}>Aesthetic Treatments</h3>
                    <p className={styles.categoryDescription}>
                        Enhance your natural beauty with non-surgical cosmetic procedures
                    </p>

                    <div className={styles.gridSmall}>
                        {services.aesthetics.map((service, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.cardIcon}>{service.icon}</div>
                                <div className={styles.cardContent}>
                                    <h4 className={styles.cardTitle}>{service.title}</h4>
                                    <p className={styles.cardDescription}>{service.description}</p>
                                </div>
                                <div className={styles.cardFooter}>
                                    <span className={styles.price}>{service.price}</span>
                                    <a href="#contact" className={styles.cardLink}>
                                        Book →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.cta}>
                    <p className={styles.ctaText}>Not sure which treatment is right for you?</p>
                    <a href="#contact" className={styles.ctaButton}>
                        Book a Free Consultation
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;
