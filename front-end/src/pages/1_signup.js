import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "./1_signup.module.css";
import 'animate.css';
import { auth } from '../../../back-end/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onBackButtonIconClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleSignUp = useCallback(async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error.message);
      throw error
    }
  }, [email, password]);

  const onNextButtonClick = useCallback(() => {
    handleSignUp()
      .then(() => {
        router.push("/4_name");
      })
      .catch((error) => {
        alert("ERROR SIGNING IN: " + error.message);
      });
  }, [handleSignUp, router]);


  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.signUpPage}>
        <button className={styles.next} onClick={onNextButtonClick}>
        Next
        </button>

      <div className={styles.textBoxes}>
        <div className={styles.emailFieldFrame}>
          <input
            ref={emailRef}
            className={styles.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter A Valid Email"
          />
        </div>
        <div className={styles.passwordFieldFrame}>
          <input
            ref={passwordRef}
            className={styles.email}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
          />
          <img
            className={styles.eyeIcon}
            alt="Show/Hide Password"
            src="/eye.png"
            onClick={togglePasswordVisibility}
          />
        </div>
      </div>

      <div className={styles.signUp}>
        Sign Up
      </div>

      <img
        className={styles.backButtonIcon}
        alt="Back"
        src="/backarrow.png"
        onClick={onBackButtonIconClick}
      />
    </div>
  );
};

export default SignUpPage;
