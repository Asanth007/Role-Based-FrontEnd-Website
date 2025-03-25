import React from "react";
import styles from "../styles/Services.module.scss";

const Services = () => {
  return (
    <section className={styles.services}>
      <h2 className={styles.servicesTitle}>Our Services</h2>
      <p className={styles.servicesDescription}>
        We specialize in cutting-edge solutions to empower your business.
      </p>

      <ul className={styles.serviceList}>
        <li className={styles.serviceItem}>🌐 Web Development</li>
        <li className={styles.serviceItem}>☁️ Cloud Computing</li>
        <li className={styles.serviceItem}>🤖 AI Solutions</li>
        <li className={styles.serviceItem}>🚀 Digital Transformation</li>
      </ul>

      <div className={styles.agileApproach}>
        <h3 className={styles.agileTitle}>
          How does Alpha Tech ensure project success?
        </h3>
        <ul className={styles.agileList}>
          <li className={styles.agileItem}>✅ Continuous feedback & collaboration</li>
          <li className={styles.agileItem}>🔄 Iterative development for adaptability</li>
          <li className={styles.agileItem}>🛠️ Rigorous testing for reliability</li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
