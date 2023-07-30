import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "./1_signup.module.css";
import Link from "next/link"; // Import Link from next/link
import 'animate.css';
const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState(""); // State to store the email value
  const [password, setPassword] = useState(""); // State to store the password value
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onEnterAValidClick = useCallback(() => {
    // Please sync "sign up page (w email filled)" to the project
  }, []);

  const onBackButtonIconClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const onNextButtonClick = useCallback(() => {
    // Add logic here to handle data validation or API calls before navigating
    router.push("/3_confirmsignup");
  }, [router]);

  const clearEmailText = () => {
    setEmail(""); // Clear the email text
    emailRef.current.textContent = ""; // Clear the text inside the email container
    emailRef.current.focus(); // Focus on the email container after clearing
  };

  const clearPasswordText = () => {
    setPassword(""); // Clear the password text
    passwordRef.current.textContent = ""; // Clear the text inside the password container
    passwordRef.current.focus(); // Focus on the password container after clearing
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the password visibility state
  };

  return (
    <div className={styles.signUpPage}>
      <div className={styles.nextWrapper}>
        <div className={styles.next} onClick={onNextButtonClick}>
          Next
        </div>
      </div>

      <div
        className={styles.emailField}
        onClick={clearEmailText} // Call the function to clear email text on click
      >
        <div
          className={styles.enterAValid}
          ref={emailRef}
          contentEditable // Make the container editable
          onInput={(e) => setEmail(e.target.textContent.trim())} // Use trim() to remove leading/trailing spaces
        >
          {email ? email : "Enter A Valid Email"} {/* Display the email value or placeholder text */}
        </div>
      </div>

      <div
        className={styles.createPasswordField}
        onClick={clearPasswordText} // Call the function to clear password text on click
      >
        <div
          className={styles.createAPassword}
          ref={passwordRef}
          contentEditable
          onInput={(e) => setPassword(e.target.textContent.trim())} // Use trim() to remove leading/trailing spaces
        >
          {password ? password : "Create A Password"} {/* Display the password value or placeholder text */}
        </div>
        <img
          className={styles.eyeIcon}
          alt="Show/Hide Password"
          src="/eye.png" // Eye icon image path
          onClick={togglePasswordVisibility} // Toggle password visibility on click
        />
      </div>

      <b className={styles.signUp} onClick={onEnterAValidClick}>
        Sign Up
      </b>
      <img
        className={styles.backButtonIcon}
        alt="Back"
        src="/backarrow.png" // Corrected image path
        onClick={onBackButtonIconClick}
      />
    </div>
  );
};

export default SignUpPage;
