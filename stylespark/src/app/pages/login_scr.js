import { useCallback } from "react";
import styles from ".Login.css";
const Login_scr = () => {
  const onDontHaveAnClick = useCallback(() => {
    // Please sync "sign up page" to the project
  }, []);

  return (
    <div className={styles.logInScreen}>
      <div className={styles.statusBar}>
        <div className={styles.div}>12:00</div>
        <img
          className={styles.battWifiSignal}
          alt=""
          src="/batt-wifi-signal.svg"
        />
      </div>
      <div className={styles.logInButton}>
        <div className={styles.logIn}>Log In</div>
      </div>
      <div className={styles.textBoxes}>
        <div className={styles.emailFieldFrame}>
          <div className={styles.email}>Email</div>
        </div>
        <div className={styles.passwordFieldFrame}>
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          <div className={styles.email}>Password</div>
        </div>
        <div className={styles.forgotYourPassword}>Forgot Your Password?</div>
        <div className={styles.dontHaveAnContainer} onClick={onDontHaveAnClick}>
          {`Don’t have an account yet? Create one `}
          <span className={styles.here}>HERE</span>
        </div>
      </div>
      <b className={styles.logIn1}>Log In</b>
    </div>
  );
};

export default LogInScreen;
