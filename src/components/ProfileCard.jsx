import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "../styles/ProfileCard.module.scss";
import Loading from "../components/Loading";
export const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer"];
  useEffect(() => {
    axios.get("https://randomuser.me/api/")
      .then(response => {
        const data = response.data.results[0];
        setUser({
          name: `${data.name.first} ${data.name.last}`,
          role: roles[Math.floor(Math.random() * roles.length)], 
          email: data.email,
          location: `${data.location.city}, ${data.location.country}`,
          profilePic: data.picture.large
        });
      })
      .catch(error => console.error("Error fetching profile:", error));
  }, []);

  if (!user) return <Loading/>;

  return (
    <motion.div 
      className={styles.profileCard}
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className={styles.profileImage}>
        <img src={user.profilePic} alt="Profile" />
      </div>
      <div className={styles.profileInfo}>
        <h2>{user.name}</h2>
        <p className={styles.role}>{user.role}</p>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.location}>{user.location}</p>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
