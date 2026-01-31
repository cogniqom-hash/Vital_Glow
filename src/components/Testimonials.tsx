import styles from './Testimonials.module.css';

const testimonials = [
    {
        name: 'Sarah M.',
        location: 'London',
        rating: 5,
        text: 'Absolutely amazing experience! The IV drip gave me an instant energy boost. The nurse was professional and made me feel completely at ease.',
        treatment: 'Energy Boost IV',
    },
    {
        name: 'James K.',
        location: 'Manchester',
        rating: 5,
        text: 'The mobile service is a game-changer. Had the immunity IV at home after a long week of travel. Felt rejuvenated within hours.',
        treatment: 'Immunity IV',
    },
    {
        name: 'Emma L.',
        location: 'Birmingham',
        rating: 5,
        text: 'The Beauty Glow IV has done wonders for my skin. My friends have noticed the difference! The whole experience feels luxurious.',
        treatment: 'Beauty Glow IV',
    },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className={styles.testimonials}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>Testimonials</span>
                    <h2 className={styles.title}>What Our Clients Say</h2>
                    <div className={styles.divider}></div>
                    <p className={styles.subtitle}>
                        Real experiences from clients who have transformed their wellness journey with us.
                    </p>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.rating}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i} className={styles.star}>★</span>
                                ))}
                            </div>

                            <p className={styles.text}>&ldquo;{testimonial.text}&rdquo;</p>

                            <div className={styles.cardFooter}>
                                <div className={styles.avatar}>
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className={styles.clientInfo}>
                                    <h4 className={styles.clientName}>{testimonial.name}</h4>
                                    <span className={styles.clientLocation}>{testimonial.location}</span>
                                </div>
                            </div>

                            <div className={styles.treatment}>
                                {testimonial.treatment}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <div className={styles.ctaContent}>
                        <span className={styles.ctaIcon}>📸</span>
                        <div>
                            <h3 className={styles.ctaTitle}>Follow Our Journey</h3>
                            <p className={styles.ctaText}>See real results on Instagram</p>
                        </div>
                    </div>
                    <a
                        href="https://www.instagram.com/vitalglow.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaButton}
                    >
                        @vitalglow.uk
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
