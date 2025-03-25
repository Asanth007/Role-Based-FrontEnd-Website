import React from "react";
import styles from "../styles/Card.module.scss"; // Ensure correct path

export const Card = ({ children }) => {
  return <div className={styles.customCard}>{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className={styles.customCardContent}>{children}</div>;
};
