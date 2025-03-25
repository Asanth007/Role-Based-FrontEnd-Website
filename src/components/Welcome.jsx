import { useSelector } from "react-redux";
import styles from "../styles/Welcome.module.scss";

export function WelcomeMessage() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={styles.welcome}>
      {user ? <h2>Welcome Back , {user.name}!</h2> : <h2>Welcome, Guest!</h2>}
    </div>
  );
}

export default WelcomeMessage;

