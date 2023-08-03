import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "./1_signup.module.css";
import Link from "next/link"; // Import Link from next/link
import 'animate.css';
import firebase from '../../../back-end/firebase';


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
      const auth = firebase.auth();
      await auth.createUserWithEmailAndPassword(email, password);

      // User registration successful
      // You can handle the successful sign-up here (e.g., show a success message, redirect to a new page, etc.)
      console.log('User registered successfully!');
    } catch (error) {
      // Handle sign-up errors (e.g., email already in use, weak password, etc.)
      console.error('Error registering user:', error.message);
    }
  }, [email, password]);

  const onNextButtonClick = useCallback(() => {
    handleSignUp()
      .then(() => {
        console.log('Signup successful!');
        router.push("/3_confirmsignup"); // Navigate after successful signup
      })
      .catch((error) => {
        // Handle the error that occurred during signup
        console.error('Signup error:', error);
      });
  }, [handleSignUp, router]);


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
