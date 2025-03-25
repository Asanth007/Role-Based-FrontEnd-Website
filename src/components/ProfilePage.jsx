import React from "react";
import ProfileCard from "./ProfileCard";

const ProfilePage = () => {
  const user = {
    name: "Asanth B.",
    role: "Full Stack Developer",
    email: "asanth@example.com",
    bio: "Passionate about web development, AI, and building scalable applications.",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg" // Replace with your own image
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <ProfileCard {...user} />
    </div>
  );
};

export default ProfilePage;
