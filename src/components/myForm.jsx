import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import styles from "../styles/Login.module.scss";

const MyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // Toggle between login & signup

  const validationSchema = Yup.object().shape({
    ...(isSignup && {
      firstName: Yup.string().min(2, "Too short").required("First Name is required"),
      lastName: Yup.string().min(2, "Too short").required("Last Name is required"),
    }),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    ...(isSignup && {
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
  });

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    if (isSignup) {
      console.log("Signup details:", values);
      alert("Signup successful! (Handle actual signup logic here)");
    } else {
      try {
        const user = await dispatch(loginUser(values)).unwrap();
        if (user.role === "Admin") navigate("/admin");
        else if (user.role === "HR") navigate("/hr");
        else navigate("/employee");
      } catch {
        setErrors({ email: "Invalid credentials", password: "Invalid credentials" });
      }
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.formWrapper} ${isSignup ? styles.signupMode : ""}`}>
        <h2 className={styles.heading}>{isSignup ? "Sign Up" : "Login"}</h2>
        <Formik
          key={isSignup}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              {isSignup && (
                <>
                  <div className={styles.inputGroup}>
                    <Field type="text" name="firstName" placeholder="First Name" className={styles.input} />
                    <ErrorMessage name="firstName" component="div" className={styles.error} />
                  </div>
                  <div className={styles.inputGroup}>
                    <Field type="text" name="lastName" placeholder="Last Name" className={styles.input} />
                    <ErrorMessage name="lastName" component="div" className={styles.error} />
                  </div>
                </>
              )}

              {/* Email */}
              <div className={styles.inputGroup}>
                <Field type="email" name="email" placeholder="Email" className={styles.input} />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </div>

              {/* Password */}
              <div className={styles.inputGroup}>
                <Field type="password" name="password" placeholder="Password" className={styles.input} />
                <ErrorMessage name="password" component="div" className={styles.error} />
              </div>

              {/* Confirm Password - Only for Sign Up */}
              {isSignup && (
                <div className={styles.inputGroup}>
                  <Field type="password" name="confirmPassword" placeholder="Confirm Password" className={styles.input} />
                  <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className={styles.button}>
                {isSubmitting ? "Processing..." : isSignup ? "Sign Up" : "Login"}
              </button>

              <p className={styles.toggleText}>
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <span onClick={() => setIsSignup(!isSignup)} className={styles.toggleLink}>
                  {isSignup ? "Login" : "Sign up"}
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MyForm;
