import { useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./9_bodyshape.module.css";
import 'animate.css';

const OnboardingBodyShape = () => {
  const router = useRouter();

  const onNextButtonContainerClick = useCallback(() => {
    router.push("3_confirmsignup");
  }, [router]);

  const onRectangleClick = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onRectangle1Click = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onRectangle2Click = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onRectangle3Click = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onRectangle4Click = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onRectangle5Click = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onRectangle6Click = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onRectangle7Click = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onRectangle8Click = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onRectangle9Click = useCallback(() => {
    // Please sync "onboarding - body shape choosing" to the project
  }, []);

  const onShapeChartTextClick = useCallback(() => {
    router.push("/10_bodyshapechart");
  }, [router]);

  const onBackButtonIconClick = useCallback(() => {
    router.push("/7_size");
  }, [router]);

  return (
    <div className={styles.onboardingBodyShape}>
      <img className={styles.purpleWaveIcon} alt="" src="/wave1.png" />
      <b className={styles.whatIsYour}>What is your body shape?</b>
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
        className={styles.onboardingBodyShapeChild}
        onClick={onRectangleClick}
      />
      <div
        className={styles.onboardingBodyShapeItem}
        onClick={onRectangle1Click}
      />
      <div
        className={styles.onboardingBodyShapeInner}
        onClick={onRectangle2Click}
      />
      <div className={styles.rectangleDiv} onClick={onRectangle3Click} />
      <div
        className={styles.onboardingBodyShapeChild1}
        onClick={onRectangle4Click}
      />
      <div
        className={styles.onboardingBodyShapeChild2}
        onClick={onRectangle5Click}
      />
      <div className={styles.rectangle}>Rectangle</div>
      <div className={styles.rectangle1}>Rectangle</div>
      <div className={styles.invertedTriangle}>Inverted Triangle</div>
      <div className={styles.apple}>Apple</div>
      <div className={styles.invertedTriangle1}>Inverted Triangle</div>
      <div
        className={styles.onboardingBodyShapeChild3}
        onClick={onRectangle6Click}
      />
      <div
        className={styles.onboardingBodyShapeChild4}
        onClick={onRectangle7Click}
      />
      <div className={styles.hourglass}>Hourglass</div>
      <div className={styles.trapezoid}>Trapezoid</div>
      <div
        className={styles.onboardingBodyShapeChild5}
        onClick={onRectangle8Click}
      />
      <div
        className={styles.onboardingBodyShapeChild6}
        onClick={onRectangle9Click}
      />
      <div className={styles.pear}>Pear</div>
      <div className={styles.triangle}>Triangle</div>
      <div className={styles.oval}>Oval</div>
      <div className={styles.female}>Female</div>
      <div className={styles.male}>Male</div>
      <div className={styles.shapeChart} onClick={onShapeChartTextClick}>
        shape chart
      </div>
    </div>
  );
};

export default OnboardingBodyShape;
