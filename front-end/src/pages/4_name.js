
import { useCallback, useRef, useState } from "react";
import Link from "next/link"; // Import the Link component
import { useRouter } from "next/router"; // Import the useRouter hook
import styles from "./4_name.module.css";
import 'animate.css';

const OnboardingName = () => {
  const [email, setEmail] = useState(""); // State to store the email value
  const clearEmailText = () => {
    setEmail("");
    emailRef.current.textContent = "";
    emailRef.current.focus();
  };
  const emailRef = useRef(null);

  const router = useRouter(); // Initialize the useRouter hook

  const onResponseBoxContainerClick = useCallback(() => {
    // Please sync "onboarding - name" to the project
  }, []);

  const onBackButtonIconClick = useCallback(() => {
    // Navigate to the "3_confirmsignup" page when the back button is clicked
    router.push("/");
  }, [router]);

  return (
    <div className={styles.onboardingName}>
      <div className={styles.responseBox} onClick={onResponseBoxContainerClick}>
      <div className={styles.enterYourResponseHereWrapper}>
      <div
          className={styles.enterYourResponse}
          onClick={clearEmailText}
          onFocus={clearEmailText}
          onBlur={() => {
            if (!email) {
              emailRef.current.textContent = "Enter Your Name";
            }
          }}
        >
          <div
            className={styles.email}
            ref={emailRef}
            contentEditable
            onInput={(e) => setEmail(e.target.textContent.trim())}
          >
            {email ? email : "Enter Your Name"}
          </div>
          </div>
        </div>
      </div>
      <b className={styles.whatIsYour}>What is your name?</b>
      <img className={styles.purpleWaveIcon} alt="" src="/wave1.png" />
      <b className={styles.helpUsGet}>Help us get to know you more!</b>
      <img
        className={styles.backButtonIcon}
        alt=""
        src="/backarrow(white).png"
        onClick={onBackButtonIconClick}
      />
      {/* Use the Link component to handle navigation */}
      <Link href="/5_birthday">
        <div className={styles.nextButton}>
          <div className={styles.next}>Next</div>
          <img className={styles.vectorIcon} alt="" src="/nextarrow.png" />
        </div>
      
      </Link>
    </div>
  );
};

export default OnboardingName;
