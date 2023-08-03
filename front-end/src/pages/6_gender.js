import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./6_gender.module.css";
import 'animate.css';

const OnboardingBirthday = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [selectedGender, setSelectedGender] = useState(""); // State to track the selected gender

  const onBackButtonIconClick = useCallback(() => {
    // Navigate to the "4_name" page when the back button is clicked
    router.push("/5_birthday");
  }, [router]);

  const handleGenderChange = useCallback((e) => {
    // Update the selected gender when an option is chosen from the drop-down list
    setSelectedGender(e.target.value);
  }, []);

  return (
    <div className={styles.onboardingName}>
      <div className={styles.responseBox} onClick={() => {}}>
        <div className={styles.enterYourResponseHereWrapper}>
          <select
            className={styles.selectGender} // Add styles for the drop-down list in your CSS
            value={selectedGender}
            onChange={handleGenderChange}
          >
            <option value="" disabled hidden>
              Select Gender 
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <b className={styles.whatIsYour}>What is your gender?</b>
      <img className={styles.purpleWaveIcon} alt="" src="/wave1.png" />
      <b className={styles.helpUsGet}>Help us get to know you more!</b>
      <img
        className={styles.backButtonIcon}
        alt=""
        src="/backarrow(white).png"
        onClick={onBackButtonIconClick}
      />
      <Link href="/7_size"> {/* Replace "6_something_else" with the desired next page */}
        <div className={styles.nextButton}>
          <div className={styles.next}>Next</div>
          <img className={styles.vectorIcon} alt="" src="/nextarrow.png" />
        </div>
      </Link>
    </div>
  );
};

export default OnboardingBirthday;
