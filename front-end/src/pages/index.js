/* index.js */
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Link from "next/link"; // Import Link from next/link
import styles from "./index.module.css";

const LogInScreen = () => {
  const [email, setEmail] = useState(""); // State to store the email value
  const [password, setPassword] = useState(""); // State to store the password value
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter(); // Initialize Next.js router

  const onDontHaveAnClick = useCallback(() => {
    // Please sync "sign up page" to the project
  }, []);

  const onLoginClick = useCallback(() => {
    // Use the 'email' and 'password' variables for login logic or API calls
    console.log("Email:", email);
    console.log("Password:", password);

    // Navigate to the 4_name page programmatically
    router.push("/4_name");
  }, [email, password, router]);

  const clearEmailText = () => {
    setEmail("");
    emailRef.current.textContent = "";
    emailRef.current.focus();
  };

  const clearPasswordText = () => {
    setPassword("");
    passwordRef.current.textContent = "";
    passwordRef.current.focus();
  };

  return (
    <div className={styles.logInScreen}>
      <div className={styles.logInButton}>
        <span className={styles.logIn} onClick={onLoginClick}>
          Log In
        </span>
      </div>

      <div className={styles.textBoxes}>
        <div
          className={styles.emailFieldFrame}
          onClick={clearEmailText}
          onFocus={clearEmailText}
          onBlur={() => {
            if (!email) {
              emailRef.current.textContent = "Enter A Valid Email";
            }
          }}
        >
          <div
            className={styles.email}
            ref={emailRef}
            contentEditable
            onInput={(e) => setEmail(e.target.textContent.trim())}
          >
            {email ? email : "Enter A Valid Email"}
          </div>
        </div>
        <div
          className={styles.passwordFieldFrame}
          onClick={clearPasswordText}
          onFocus={clearPasswordText}
          onBlur={() => {
            if (!password) {
              passwordRef.current.textContent = "Create A Password";
            }
          }}
        >
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          <div
            className={styles.email}
            ref={passwordRef}
            contentEditable
            onInput={(e) => setPassword(e.target.textContent.trim())}
          >
            {password ? password : "Create A Password"}
          </div>
        </div>
        <div className={styles.forgotYourPassword}>Forgot Your Password?</div>
        <div className={styles.dontHaveAnContainer} onClick={onDontHaveAnClick}>
          {`Don’t have an account yet? Create one `}
          <Link href="/1_signup" passHref>
            <span className={styles.here}>HERE</span>
          </Link>
        </div>
      </div>

      <b className={styles.logIn1} onClick={onLoginClick}>
        Log In
      </b>
    </div>
  );
};

export default LogInScreen;
