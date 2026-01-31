import Image from 'next/image';
import styles from './About.module.css';

const About = () => {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imageCard}>
                            <Image
                                src="/logo.jpeg"
                                alt="Vital Glow"
                                width={400}
                                height={400}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.experienceBadge}>
                            <span className={styles.badgeNumber}>5+</span>
                            <span className={styles.badgeText}>Years of Excellence</span>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <span className={styles.badge}>About Us</span>
                    <h2 className={styles.title}>
                        Medical Expertise Meets<br />
                        <span className={styles.highlight}>Luxury Wellness</span>
                    </h2>
                    <div className={styles.divider}></div>

                    <p className={styles.description}>
                        Vital Glow UK was founded with a simple mission: to bring premium,
                        medically-led wellness treatments directly to you. Our team of qualified
                        healthcare professionals is dedicated to helping you look and feel your best.
                    </p>

                    <p className={styles.description}>
                        Whether you visit our clinic or we come to you, every treatment is
                        administered with the highest standards of care, using only pharmaceutical-grade
                        products from trusted suppliers.
                    </p>

                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>500+</span>
                            <span className={styles.statLabel}>Happy Clients</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>10+</span>
                            <span className={styles.statLabel}>Treatments</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Satisfaction</span>
                        </div>
                    </div>

                    <div className={styles.credentials}>
                        <div className={styles.credential}>
                            <span className={styles.credentialIcon}>✓</span>
                            <span>Registered Healthcare Professionals</span>
                        </div>
                        <div className={styles.credential}>
                            <span className={styles.credentialIcon}>✓</span>
                            <span>Fully Insured & Certified</span>
                        </div>
                        <div className={styles.credential}>
                            <span className={styles.credentialIcon}>✓</span>
                            <span>Pharmaceutical-Grade Products</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
