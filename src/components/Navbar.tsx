'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#about', label: 'About' },
        { href: '#why-us', label: 'Why Us' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <a href="#home" className={styles.logo}>
                    <Image
                        src="/logo.jpeg"
                        alt="Vital Glow"
                        width={50}
                        height={50}
                        className={styles.logoImage}
                    />
                    <span className={styles.logoText}>VITAL GLOW</span>
                </a>

                <div className={styles.desktopNav}>
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className={styles.navLink}>
                            {link.label}
                        </a>
                    ))}
                    <a href="#contact" className={styles.ctaButton}>
                        Book Now
                    </a>
                </div>

                <button
                    className={styles.mobileMenuButton}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className={styles.mobileNavLink}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </a>
                ))}
                <a href="#contact" className={styles.mobileCta} onClick={() => setIsMobileMenuOpen(false)}>
                    Book Now
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
