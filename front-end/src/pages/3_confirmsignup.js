// 3_confirmsignup.js
import { useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./3_confirmsignup.module.css";
import Link from "next/link"; // Import Link from next/link

const SignUpPageWPasswordFilled = () => {
  const router = useRouter();

  const onFrameContainerClick = useCallback(() => {
    // Please sync "log in screen" to the project
  }, []);

  const onBackToLogInClick = useCallback(() => {
    router.push("/"); // Navigate back to the login page
  }, [router]);

  return (
    <div className={styles.signUpPageWPasswordFilled}>
      <div className={styles.tickIconWrapper}>
        <img
          className={styles.tickIcon}
          alt="tick"
          src="/tick.png" // tick icon image path
        />
      </div>
      <b className={styles.youveSuccessfullyCreated}>
        You’ve successfully created an account! Log in to continue
      </b>
      <div className={styles.backToLogInWrapper} onClick={onBackToLogInClick}>
        Back To Log In
      </div>
    </div>
  );
};

export default SignUpPageWPasswordFilled;
