import { useCallback } from "react";
import Link from "next/link"; // Import the Link component
import { useRouter } from "next/router"; // Import the useRouter hook
import styles from "./4_name.module.css";
import 'animate.css';

const OnboardingName = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const onResponseBoxContainerClick = useCallback(() => {
    // Please sync "onboarding - name" to the project
  }, []);

  const onBackButtonIconClick = useCallback(() => {
    // Navigate to the "3_confirmsignup" page when the back button is clicked
    router.push("/3_confirmsignup");
  }, [router]);

  return (
    <div className={styles.onboardingName}>
      <div className={styles.responseBox} onClick={onResponseBoxContainerClick}>
        <div className={styles.enterYourResponseHereWrapper}>
          <i className={styles.enterYourResponse}>Enter Your Response Here</i>
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
