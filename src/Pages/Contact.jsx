import styles from "../styles/Contact.module.scss";


const ContactPage = () => {
  return (
    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>
      <p>Get in touch with Alpha Tech for any inquiries, collaborations, or support.</p>

      <div className={styles.contactInfo}>
        <div className={styles.infoItem}>
          <h3>Email</h3>
          <p>contact@alphatech.com</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Phone</h3>
          <p>+1 234 567 890</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Address</h3>
          <p>123 Tech Street, Silicon Valley, CA</p>
        </div>
      </div>

      <h3>Follow Us</h3>
      <div className={styles.socialLinks}>
        <a href="https://twitter.com/alphatech" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://linkedin.com/company/alphatech" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/alphatech" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
