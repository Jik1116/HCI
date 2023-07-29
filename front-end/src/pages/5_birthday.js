import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import the useRouter hook
import styles from "./5_birthday.module.css";

const OnboardingBirthday = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const onResponseBoxContainerClick = useCallback(() => {
    // Please sync "onboarding - name" to the project
  }, []);

  const onBackButtonIconClick = useCallback(() => {
    // Navigate to the "4_name" page when the back button is clicked
    router.push("/4_name");
  }, [router]);

  return (
    <div className={styles.onboardingName}>
      <div className={styles.responseBox} onClick={onResponseBoxContainerClick}>
        <div className={styles.enterYourResponseHereWrapper}>
          <i className={styles.enterYourResponse}>Enter Your Response Here</i>
        </div>
      </div>
      <b className={styles.whatIsYour}>What is your birthday?</b>
      <img className={styles.purpleWaveIcon} alt="" src="/wave2.png" />
      <b className={styles.helpUsGet}>Help us get to know you more!</b>
      <img
        className={styles.backButtonIcon}
        alt=""
        src="/backarrow(white).png"
        onClick={onBackButtonIconClick}
      />
      <Link href="/6_something_else"> {/* Replace "6_something_else" with the desired next page */}
        <div className={styles.nextButton}>
          <div className={styles.next}>Next</div>
          <img className={styles.vectorIcon} alt="" src="/nextarrow.png" />
        </div>
      </Link>
    </div>
  );
};

export default OnboardingBirthday;
