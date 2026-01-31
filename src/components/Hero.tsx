import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section id="home" className={styles.hero}>
            {/* Organic Background Shapes */}
            <div className={styles.bgShapes}>
                <div className={`${styles.shape} ${styles.shape1}`}></div>
                <div className={`${styles.shape} ${styles.shape2}`}></div>
                <div className={`${styles.shape} ${styles.shape3}`}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.badge}>Medically-Led Wellness</span>

                    <h1 className={styles.title}>
                        Feel Better.<br />
                        Look Better.<br />
                        <span className={styles.highlight}>Perform Better.</span>
                    </h1>

                    <div className={styles.divider}></div>

                    <p className={styles.subtitle}>
                        Premium IV drips and aesthetic treatments delivered by qualified
                        medical professionals. Experience luxury wellness at our clinic
                        or in the comfort of your own space.
                    </p>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>✦</span>
                            <span>IV Therapy</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>✦</span>
                            <span>Aesthetics</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>✦</span>
                            <span>Mobile Service</span>
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <a href="#contact" className={styles.btnPrimary}>
                            Book Consultation
                        </a>
                        <a href="#services" className={styles.btnSecondary}>
                            Explore Services
                        </a>
                    </div>
                </div>

                <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.logoCard}>
                            <Image
                                src="/logo.jpeg"
                                alt="Vital Glow"
                                width={280}
                                height={280}
                                className={styles.logoImage}
                                priority
                            />
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className={`${styles.floatCard} ${styles.floatCard1}`}>
                        <span className={styles.floatIcon}>🩺</span>
                        <span className={styles.floatText}>Medical Grade</span>
                    </div>
                    <div className={`${styles.floatCard} ${styles.floatCard2}`}>
                        <span className={styles.floatIcon}>✨</span>
                        <span className={styles.floatText}>500+ Clients</span>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.scrollMouse}>
                    <div className={styles.scrollWheel}></div>
                </div>
                <span className={styles.scrollText}>Scroll</span>
            </div>
        </section>
    );
};

export default Hero;
