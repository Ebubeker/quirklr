import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./authStyled.module.css";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(undefined);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(undefined);
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    if(!email) setEmailError('Email field is required!')
    if(!password) setPasswordError('Password field is required!')

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        if(error.message.includes('auth/invalid-credential')){
          toast.error('Email or password is incorrect, please check them again!')
        }
      });
  };

  return (
    <div className={styles.background}>
      <form onSubmit={onLogin} className={styles.form}>
        <div className={styles.headingsContainer}>
          <p className={styles.headerText}>Sign in</p>
          <p>Sign in with your Email and Password</p>
        </div>

        <div className={styles.mainContainer}>
          <label for="username">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          {emailError ? <p className={styles.fieldErr}>{emailError}</p> : null}
          <br />
          <br />

          <label for="pswrd">Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError ? <p className={styles.fieldErr}>{passwordError}</p> : null}
          <div className={styles.subcontainer}>
            <p className={styles.forgotpsd}>
              {" "}
              <Link to="/forget-password">Forgot Password?</Link>
            </p>
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>

          <p className={styles.register}>
            Don't have an account? <Link to="/register">Register here!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
