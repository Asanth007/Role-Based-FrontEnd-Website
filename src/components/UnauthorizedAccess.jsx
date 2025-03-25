import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "../styles/UnauthorizedAccess.module.scss";
export function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className={styles.unauthorized}>
      <FaExclamationTriangle size={50} color="red" />
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to view this page.</p>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
}
export default Unauthorized;