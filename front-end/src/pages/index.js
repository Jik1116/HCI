import { useEffect, useState } from "react";
import styles from "./index.module.css";

const HomePage = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchedPictures = [
      { id: 1, url: "/zone.jpg" },
      { id: 2, url: "/ztwo.jpg" },
      { id: 3, url: "/zthree.jpg" },
      { id: 4, url: "/zfour.jpg" },
      { id: 5, url: "/zfive.jpg" },
      { id: 6, url: "/zsix.jpg" },
      { id: 7, url: "/zseven.jpg" },
      { id: 8, url: "/zeight.jpg" },
    ];
    setPictures(fetchedPictures);
  }, []);

  return (
    <div className={styles.homePage}>
      <div className={styles.topBar}>
        <div className={styles.filterContainer}>
          <img className={styles.filterIcon} src="/filtericon.jpg" alt="Filter" />
        </div>
        <div className={styles.latestParent}>
          <div className={styles.latest}>Latest</div>
          <img className={styles.vectorIcon} alt="" src="/latesticon.jpg" />
        </div>
        <div className={styles.favoritesContainer}>
          <img className={styles.favoritesIcon} src="/favoritesicon.jpg" alt="Favorites" />
        </div>
      </div>
      <div className={styles.scrollableGallery}>
        <div className={styles.pictureGallery}>
          {pictures.map((picture) => (
            <div key={picture.id} className={styles.pictureItem}>
              <img key={picture.id} src={picture.url} alt={`Picture ${picture.id}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
