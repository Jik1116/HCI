import { useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./8_sizechart.module.css";

const OnboardingSizeChart = () => {
  const router = useRouter();

  const onBackButtonIconClick = useCallback(() => {
    router.push("/7_size");
  }, [router]);

  return (
    <div className={styles.onboardingSizeChart}>
      <img className={styles.purpleWaveIcon} alt="" src="/wave1.5.png" />
      <b className={styles.sizeChartInchesContainer}>
        <p className={styles.sizeChart}>Size Chart (inches)</p>
      </b>
      <div className={styles.onboardingSizeChartChild} />
      <div className={styles.xs}>XS</div>
      <div className={styles.div}>30.5” - 32.5”</div>
      <div className={styles.div1}>25” - 26”</div>
      <div className={styles.div2}>35” - 36”</div>
      <div className={styles.m}>M</div>
      <div className={styles.div3}>36.5” - 37.5”</div>
      <div className={styles.div4}>28.5” - 30.5”</div>
      <div className={styles.div5}>39” - 41”</div>
      <div className={styles.xl}>XL</div>
      <div className={styles.div6}>41.5” - 43.7”</div>
      <div className={styles.div7}>35” - 37”</div>
      <div className={styles.div8}>45” - 46.7”</div>
      <div className={styles.size}>Size</div>
      <div className={styles.bust}>Bust</div>
      <div className={styles.waist}>Waist</div>
      <div className={styles.hip}>Hip</div>
      <div className={styles.xs1}>2XS</div>
      <div className={styles.div9}>27” - 29.25”</div>
      <div className={styles.div10}>20” - 23”</div>
      <div className={styles.div11}>31” - 33.5”</div>
      <div className={styles.xl1}>3XL</div>
      <div className={styles.div12}>49” - 51”</div>
      <div className={styles.div13}>43” - 45”</div>
      <div className={styles.div14}>52” - 54.5”</div>
      <div className={styles.xl2}>2XL</div>
      <div className={styles.div15}>45.5” - 47.7”</div>
      <div className={styles.div16}>39” - 41”</div>
      <div className={styles.div17}>48” - 50”</div>
      <div className={styles.l}>L</div>
      <div className={styles.div18}>38” - 40”</div>
      <div className={styles.div19}>32.1” - 33.5”</div>
      <div className={styles.div20}>41.7” - 43”</div>
      <div className={styles.s}>S</div>
      <div className={styles.div21}>35.5” - 36”</div>
      <div className={styles.div22}>27” - 28”</div>
      <div className={styles.div23}>37” - 38”</div>
      <img
        className={styles.backButtonIcon}
        alt=""
        src="/backarrow.png"
        onClick={onBackButtonIconClick}
      />
    </div>
  );
};

export default OnboardingSizeChart;
