import { useCallback,useState,useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import the useRouter hook
import styles from "./5_birthday.module.css";
import 'animate.css';

const OnboardingBirthday = () => {

  const [birthday, setBirthday] = useState(""); // State to store the email value
  const clearBirthdayText = () => {
    setBirthday("");
    birthdayRef.current.textContent = "";
    birthdayRef.current.focus();
  };
  const birthdayRef = useRef(null);

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
      <div
          className={styles.enterYourResponse}
          onClick={clearBirthdayText}
          onFocus={clearBirthdayText}
          onBlur={() => {
            if (!birthday) {
              birthdayRef.current.textContent = "Enter Your Birthday";
            }
          }}
        >
          <div
            ref={birthdayRef}
            contentEditable
            onInput={(e) => setBirthday(e.target.textContent.trim())}
          >
            {birthday ? birthday : "Enter Your Name"}
          </div>
          </div>
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
      <Link href="/6_gender"> {/* Replace "6_something_else" with the desired next page */}
        <div className={styles.nextButton}>
          <div className={styles.next}>Next</div>
          <img className={styles.vectorIcon} alt="" src="/nextarrow.png" />
        </div>
      </Link>
    </div>
  );
};

export default OnboardingBirthday;
