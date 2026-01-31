'use client';

import styles from './Contact.module.css';

const Contact = () => {
    return (
        <>
            <section id="contact" className={styles.contact}>
                <div className={styles.bgShape}></div>

                <div className={styles.container}>
                    <div className={styles.content}>
                        <span className={styles.badge}>Get In Touch</span>
                        <h2 className={styles.title}>
                            Ready to Glow?
                        </h2>
                        <div className={styles.divider}></div>
                        <p className={styles.description}>
                            Book your consultation today or reach out with any questions.
                            Our team is here to help you on your wellness journey.
                        </p>

                        <div className={styles.contactInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoIcon}>📍</span>
                                <div>
                                    <h4 className={styles.infoTitle}>Location</h4>
                                    <p className={styles.infoText}>Mobile Service & Clinic-Based<br />Serving across the UK</p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.infoIcon}>📧</span>
                                <div>
                                    <h4 className={styles.infoTitle}>Email</h4>
                                    <a
                                        href="mailto:vitalglow.uk@gmail.com"
                                        className={styles.infoLink}
                                    >
                                        vitalglow.uk@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.infoIcon}>📱</span>
                                <div>
                                    <h4 className={styles.infoTitle}>Instagram</h4>
                                    <a
                                        href="https://www.instagram.com/vitalglow.uk/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.infoLink}
                                    >
                                        @vitalglow.uk
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.hours}>
                            <h4 className={styles.hoursTitle}>Operating Hours</h4>
                            <p className={styles.hoursText}>
                                Monday - Friday: 9am - 8pm<br />
                                Saturday: 10am - 6pm<br />
                                Sunday: By Appointment
                            </p>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className={styles.bookingCard}>
                        <div className={styles.bookingIcon}>💬</div>
                        <h3 className={styles.bookingTitle}>Book Your Consultation</h3>
                        <p className={styles.bookingText}>
                            Message us on Instagram or email us to book your appointment.
                            We&apos;ll respond within 24 hours!
                        </p>

                        <div className={styles.bookingButtons}>
                            <a
                                href="https://www.instagram.com/vitalglow.uk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.bookingBtnPrimary}
                            >
                                <svg className={styles.instagramIcon} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                Message on Instagram
                            </a>
                            <a
                                href="mailto:vitalglow.uk@gmail.com?subject=Booking%20Enquiry%20-%20Vital%20Glow"
                                className={styles.bookingBtnSecondary}
                            >
                                ✉️ Email Us
                            </a>
                        </div>

                        <p className={styles.bookingNote}>
                            ✓ We typically respond within 24 hours
                        </p>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Contact;
