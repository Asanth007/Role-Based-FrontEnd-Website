import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ProfileCard from "../components/ProfileCard";
import styles from "../styles/RecruitmentPage.module.scss";
import Loading from "../components/Loading";
export const RecruitmentPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch multiple candidates
    const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer"];
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/?results=9"); // number of candidates
        const users = response.data.results.map((data) => ({
          name: `${data.name.first} ${data.name.last}`,
          role: roles[Math.floor(Math.random() * roles.length)], 
          email: data.email,
          location: `${data.location.city}, ${data.location.country}`,
          profilePic: data.picture.large,
        }));
        setCandidates(users);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <Loading/>;

  return (
    <motion.div 
      className={styles.recruitmentPage}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h1 className={styles.title}>Recruitment Page</h1>
      <div className={styles.profileGrid}>
        {candidates.map((candidate, index) => (
          <ProfileCard key={index} user={candidate} />
        ))}
      </div>
    </motion.div>
  );
};

export default RecruitmentPage;
