import { useCallback } from "react";
import styles from "./12_favorites.module.css"; 

const FavCollections = () => {
  const onSavedTextClick = useCallback(() => {
    // Please sync "fav saved" to the project
  }, []);

  const onGroupContainer2Click = useCallback(() => {
    // Please sync "home page" to the project
  }, []);

  const onGroupContainer4Click = useCallback(() => {
    // Please sync "fav collections" to the project
  }, []);

  return (
    <div className={styles.favCollections}>
      <div className={styles.groupParent}>
        <div className={styles.favoritesWrapper}>
          <div className={styles.favorites}>Favorites</div>
        </div>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      </div>
      <div className={styles.collectionsParent}>
        <div className={styles.collections}>Collections</div>
        <div className={styles.saved} onClick={onSavedTextClick}>
          Saved
        </div>
      </div>
      <div className={styles.homeParent} onClick={onGroupContainer2Click}>
        <div className={styles.home}>Home</div>
        <img className={styles.homeIcon} alt="" src="/home.svg" />
      </div>
      <div className={styles.rectangleParent} onClick={onGroupContainer4Click}>
        <div className={styles.groupChild} />
        <div className={styles.createCollectionParent}>
          <div className={styles.createCollection}>Create Collection</div>
          <img className={styles.groupItem} alt="" src="/group-37.svg" />
        </div>
      </div>
    </div>
  );
};

export default FavCollections;

