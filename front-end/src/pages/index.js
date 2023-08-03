/* index.js */
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Link from "next/link"; // Import Link from next/link
import styles from "./index.module.css";
import 'animate.css';
import {auth} from '../../../back-end/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const LogInScreen = () => {
  const [email, setEmail] = useState(""); // State to store the email value
  const [password, setPassword] = useState(""); // State to store the password value
  // const emailRef = useRef(null);
  // const passwordRef = useRef(null);
  const router = useRouter(); // Initialize Next.js router
  const onDontHaveAnClick = useCallback(() => {
    // Please sync "sign up page" to the project
  }, []);

  //Need to add ERROR HANDELING
  const onLoginClick = useCallback(async () => {
    try {
      // Use the 'email' and 'password' variables for login logic or API calls
      console.log('Email:', email);
      console.log('Password:', password);
      console.log(auth)
      await signInWithEmailAndPassword(auth, email, password);
      //Add error message

      // User has successfully signed in
      // You can redirect the user to the dashboard or another page here
      router.push('/11_homepage');
    } catch (error) {
      alert("ERROR SINGING: MY VOICE IS GREAT!")
      console.error('Error signing in:', error.message);
      // Handle sign-in errors (e.g., invalid credentials, network issues, etc.)
    }
  }, [email, password, router]);

  return (
    <div className={styles.logInScreen}>
      <b className={styles.logIn1}>
          Log In
        </b>
      <button className={styles.logInButton} onClick={onLoginClick}>
        Log In
      </button>

      <div className={styles.textBoxes}>
        <div
          className={styles.emailFieldFrame}
        >
          <input
            className={styles.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter A Valid Email"
          />
        </div>
        <div
          className={styles.passwordFieldFrame}
        >
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          <input
            className={styles.email}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className={styles.forgotYourPassword}>Forgot Your Password?</div>
        <div className={styles.dontHaveAnContainer} onClick={onDontHaveAnClick}>
          {`Don’t have an account yet? Create one `}
          <Link href="/1_signup" passHref>
            <span className={styles.here}>HERE</span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default LogInScreen;
