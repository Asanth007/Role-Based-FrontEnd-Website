import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Homepage.module.scss";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.homepage}>
      <section id="about" className={styles.about}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
        >
          <h1>Innovating the Future</h1>
          <p>At Alpha-Tech, we harness the power of innovation to create cutting-edge technology solutions. Our goal is to bridge the gap between businesses and the ever-evolving digital world.</p>
          <button className={styles.cta} onClick={() => navigate("/login")}>
      Get Started
    </button>
        </motion.div>
      </section>

      <section className={styles.aboutContent}>
        <p>With a commitment to excellence, we develop scalable and efficient solutions that cater to a diverse range of industries. Our expert team combines creativity and technical expertise to deliver impactful results.</p>

       
      </section>
      <section className={styles.aboutContent}>
      <p>From seamless web applications to AI-driven analytics, our services are designed to drive growth and efficiency. We believe in the transformative power of technology and its ability to shape the future.</p>

      </section>
      <section className={styles.aboutContent}>
      <p>From seamless web applications to AI-driven analytics, our services are designed to drive growth and efficiency. We believe in the transformative power of technology and its ability to shape the future.</p>

      </section>
      <section className={styles.aboutContent}>
      <p>From seamless web applications to AI-driven analytics, our services are designed to drive growth and efficiency. We believe in the transformative power of technology and its ability to shape the future.</p>

      </section>
        
      <section className={styles.accordionSection}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.accordion}>
          {[
            { question: "What services does Alpha-Tech offer?", answer: "We specialize in web development, cloud computing, AI solutions, and digital transformation strategies." },
            { question: "How does Alpha-Tech ensure project success?", answer: "We follow an agile approach, involving continuous feedback, iterative development, and rigorous testing." },
            { question: "Can Alpha-Tech customize solutions for my business?", answer: "Yes! Our team works closely with clients to create tailored solutions that align with their business goals." },
            { question: "What industries does Alpha-Tech serve?", answer: "We work with businesses across various industries, including healthcare, finance, e-commerce, and education." },
            { question: "How can I get started with Alpha-Tech?", answer: "Simply reach out to us through our contact page, and our team will guide you through the process." }
          ].map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <button className={styles.accordionTitle} onClick={() => toggleAccordion(index)}>
                {item.question} <span>{openIndex === index ? "-" : "+"}</span>
              </button>
              {openIndex === index && <div className={styles.accordionContent}>{item.answer}</div>}
            </div>
          ))}
        </div>
      </section>
      
      

      <footer className={styles.footer}>
        <p>&copy; 2025 Alpha-Tech. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
