import { useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./10_bodyshapechart.module.css";
import 'animate.css';

const OnboardingBodyShapeChart = () => {
  const router = useRouter();

  const onBackButtonIconClick = useCallback(() => {
    router.push("/9_bodyshape");
  }, [router]);

  return (
    <div className={styles.onboardingBodyShapeChart}>
      <img className={styles.purpleWaveIcon} alt="" src="/wave2.5.png" />
      <b className={styles.shapeChart}>Shape Chart</b>
      <b className={styles.shapeChart1}>(choose the one that best matches you)</b>
      <img
        className={styles.backButtonIcon}
        alt=""
        src="/backarrow.png"
        onClick={onBackButtonIconClick}
      />
      <img className={styles.image2Icon} alt="" src="/mshape.png" />
      <div className={styles.onboardingBodyShapeChartChild} />
      <img className={styles.image1Icon} alt="" src="/fshape.png" />
    </div>
  );
};

export default OnboardingBodyShapeChart;
