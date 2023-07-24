import { useCallback } from "react";
import styles from "./signup_scr.module.css";

const SignUpPage = () => {
  const onEnterAValidClick = useCallback(() => {
    // Please sync "sign up page (w email filled)" to the project
  }, []);

  const onBackButtonIconClick = useCallback(() => {
    // Please sync "log in screen" to the project
  }, []);

  return (
    <div className={styles.signUpPage}>
      <div className={styles.parent}>
        <img className={styles.frameChild} alt="" src="/group-10.svg" />
      </div>
      <div className={styles.nextWrapper}>
        <div className={styles.next}>Next</div>
      </div>
      <div className={styles.emailField}>
        <div className={styles.enterAValid} onClick={onEnterAValidClick}>
          Enter A Valid Email
        </div>
      </div>
      <div className={styles.createPasswordField}>
        <div className={styles.createAPassword}>Create A Password</div>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      </div>
      <b className={styles.signUp}>Sign Up</b>
      <img
        className={styles.backButtonIcon}
        alt=""
        src="/back-button.svg"
        onClick={onBackButtonIconClick}
      />
    </div>
  );
};

export default SignUpPage;
