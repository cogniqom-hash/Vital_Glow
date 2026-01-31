import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <a href="#home" className={styles.logo}>
                            <Image
                                src="/logo.jpeg"
                                alt="Vital Glow"
                                width={45}
                                height={45}
                                className={styles.logoImage}
                            />
                            <span className={styles.logoText}>VITAL GLOW</span>
                        </a>
                        <p className={styles.tagline}>
                            Feel better. Look better. Perform better.
                        </p>
                        <p className={styles.description}>
                            Premium IV drips and aesthetic treatments delivered by medical professionals across the UK.
                        </p>
                        <div className={styles.social}>
                            <a
                                href="https://www.instagram.com/vitalglow.uk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Instagram"
                            >
                                📸
                            </a>
                            <a
                                href="mailto:vitalglow.uk@gmail.com"
                                className={styles.socialLink}
                                aria-label="Email"
                            >
                                ✉️
                            </a>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Quick Links</h4>
                        <ul className={styles.links}>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#testimonials">Testimonials</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>IV Treatments</h4>
                        <ul className={styles.links}>
                            <li><a href="#services">Energy Boost</a></li>
                            <li><a href="#services">Immunity</a></li>
                            <li><a href="#services">Beauty Glow</a></li>
                            <li><a href="#services">Hydration</a></li>
                            <li><a href="#services">Detox</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Aesthetics</h4>
                        <ul className={styles.links}>
                            <li><a href="#services">Anti-Wrinkle</a></li>
                            <li><a href="#services">Dermal Fillers</a></li>
                            <li><a href="#services">Skin Boosters</a></li>
                            <li><a href="#services">PRP Therapy</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        <p>© {currentYear} Vital Glow UK. All rights reserved.</p>
                    </div>
                    <div className={styles.legal}>
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
