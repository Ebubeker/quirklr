import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { registerUserInDatabase } from "../../lib/api/user";
import styles from "./authStyled.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        registerUserInDatabase(email)
        navigate("/onBoarding");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className={styles.background}>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.headingsContainer}>
          <p className={styles.headerText}>Register</p>
          <p>Create account with your Email and Password</p>
        </div>

        <div className={styles.mainContainer}>
          <label for="username">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <br />
          <br />

          <label for="pswrd">Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.button}>Register</button>

          <p className={styles.register}>
            You already have an account? <Link to="/login">Login here!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
