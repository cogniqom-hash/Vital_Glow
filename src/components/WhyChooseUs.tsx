import styles from './WhyChooseUs.module.css';

const features = [
    {
        icon: '🩺',
        title: 'Medically-Led',
        description: 'All treatments administered by qualified healthcare professionals.',
    },
    {
        icon: '🚗',
        title: 'Mobile Service',
        description: 'We come to you – home, office, or hotel.',
    },
    {
        icon: '💎',
        title: 'Premium Products',
        description: 'Only pharmaceutical-grade vitamins and products.',
    },
    {
        icon: '📋',
        title: 'Personalized Care',
        description: 'Treatment plans tailored to your unique needs.',
    },
    {
        icon: '🔒',
        title: 'Discrete & Private',
        description: 'Confidential consultations in comfortable settings.',
    },
    {
        icon: '⭐',
        title: '5-Star Experience',
        description: 'Seamless, luxury wellness from booking to aftercare.',
    },
];

const WhyChooseUs = () => {
    return (
        <section id="why-us" className={styles.whyUs}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>Why Choose Us</span>
                    <h2 className={styles.title}>The Vital Glow Difference</h2>
                    <div className={styles.divider}></div>
                    <p className={styles.subtitle}>
                        Experience wellness redefined with our commitment to excellence,
                        safety, and personalized care.
                    </p>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardIcon}>{feature.icon}</div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.trustBadges}>
                    <div className={styles.trustBadge}>
                        <span className={styles.trustIcon}>🏆</span>
                        <span className={styles.trustText}>Fully Insured</span>
                    </div>
                    <div className={styles.trustBadge}>
                        <span className={styles.trustIcon}>✅</span>
                        <span className={styles.trustText}>CQC Compliant</span>
                    </div>
                    <div className={styles.trustBadge}>
                        <span className={styles.trustIcon}>🎓</span>
                        <span className={styles.trustText}>Certified Professionals</span>
                    </div>
                    <div className={styles.trustBadge}>
                        <span className={styles.trustIcon}>💯</span>
                        <span className={styles.trustText}>Satisfaction Guaranteed</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
