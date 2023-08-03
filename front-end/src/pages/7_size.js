import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import styles from "./7_size.module.css";
import 'animate.css';

const OnboardingSize = () => {
  const router = useRouter();

  const [sizeButtons, setSizeButtons] = useState({
    xxsXxs: false,
    xs: false,
    s: false,
    m: false,
    l: false,
    xl: false,
    xxlXxl: false,
  });

  const onBackButtonIconClick = useCallback(() => {
    router.push("/6_gender");
  }, [router]);

  const onNextButtonContainerClick = useCallback(() => {
    router.push("/9_bodyshape");
  }, [router]);

  const handleSizeButtonClick = useCallback((size) => {
    setSizeButtons((prevSizeButtons) => ({
      ...Object.fromEntries(Object.keys(prevSizeButtons).map(btn => [btn, false])),
      [size]: true,
    }));
  }, []);

  const onSizeChartTextClick = useCallback(() => {
    router.push("/8_sizechart");
  }, [router]);

  return (
    <div className={styles.onboardingSize}>
      <b className={styles.whatSizesOf}>
        What sizes of clothes do you usually buy?
      </b>
      <img className={styles.purpleWaveIcon} alt="" src="/wave2.png" />
      <b className={styles.helpUsGet}>Help us get to know you more!</b>
      <img
        className={styles.backButtonIcon}
        alt=""
        src="/backarrow(white).png"
        onClick={onBackButtonIconClick}
      />
      <div className={styles.nextButton} onClick={onNextButtonContainerClick}>
        <div className={styles.next}>Next</div>
        <img className={styles.vectorIcon} alt="" src="/nextarrow.png" />
      </div>
      <div
        className={`${styles.onboardingSizeChild} ${
          sizeButtons.xxsXxs ? styles.xxsXxsActiveState : ""
        }`}
        onClick={() => handleSizeButtonClick("xxsXxs")}
      />
      <div
        className={`${styles.onboardingSizeChild1} ${
          sizeButtons.xs ? styles.xsActiveState : ""
        }`}
        onClick={() => handleSizeButtonClick("xs")}
      />
      <div
        className={`${styles.onboardingSizeChild2} ${
          sizeButtons.s ? styles.active : ""
        }`}
        onClick={() => handleSizeButtonClick("s")}
      />
      <div
        className={`${styles.onboardingSizeChild3} ${
          sizeButtons.m ? styles.active : ""
        }`}
        onClick={() => handleSizeButtonClick("m")}
      />
      <div
        className={`${styles.onboardingSizeInner} ${
          sizeButtons.l ? styles.active : ""
        }`}
        onClick={() => handleSizeButtonClick("l")}
      />
      <div
        className={`${styles.onboardingSizeItem} ${
          sizeButtons.xl ? styles.active : ""
        }`}
        onClick={() => handleSizeButtonClick("xl")}
      />
      <div
        className={`${styles.rectangleDiv} ${
          sizeButtons.xxlXxl ? styles.active : ""
        }`}
        onClick={() => handleSizeButtonClick("xxlXxl")}
      />
      <div className={styles.xxsXxs}>{`<XXS — XXS`}</div>
      <div className={styles.l}>L</div>
      <div className={styles.xs}>XS</div>
      <div className={styles.s}>S</div>
      <div className={styles.m}>M</div>
      <div className={styles.xl}>XL</div>
      <div className={styles.xxlXxl}>{`XXL — >XXL`}</div>
      <div className={styles.sizeChart} onClick={onSizeChartTextClick}>
        size chart
      </div>
    </div>
  );
};

export default OnboardingSize;
