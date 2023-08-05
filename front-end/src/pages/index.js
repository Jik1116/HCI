import { useEffect, useState, useCallback } from "react";
import styles from "./index.module.css";

const HomePage = () => {
  const [pictures, setPictures] = useState([]); 
  const [showFilterPopup, setShowFilterPopup] = useState(false); // Step 1: State to control the filter pop-up

  useEffect(() => { 
    // Fetch pictures from the backend here and update the state with the data
    // For example:
    // const fetchedPictures = await fetchPicturesFromBackend();
    // setPictures(fetchedPictures);
    // Remove the code below for pictures zone to zeight after pictures are fetched from backend

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

  const onGroupContainer3Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer4Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer5Click = useCallback(() => {
    // Please sync "onboarding - search filter" to the project
  }, []);

  const onGroupContainer6Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer7Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer8Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer9Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer10Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer11Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer12Click = useCallback(() => {
    // Please sync "onboarding - search filter" to the project
  }, []);

  const onGroupContainer13Click = useCallback(() => {
    // Please sync "onboarding - search filter" to the project
  }, []);

  const onGroupContainer14Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer16Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer18Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer19Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer20Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer23Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer24Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer25Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []);

  const onGroupContainer26Click = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []); 

  const onapplyFiltersClick = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []); 

  const onresetFiltersClick = useCallback(() => {
    // Please sync "warning - no data present" to the project
  }, []); 


    
  const toggleFilterPopup = () => {
    // Step 2: Function to toggle the filter pop-up state
    setShowFilterPopup((prevValue) => !prevValue);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.topBar}>
        <div className={styles.filterContainer} onClick={toggleFilterPopup}> 
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

      {/* Step 3: Render the filter pop-up based on the showFilterPopup state */}
      {showFilterPopup && (
        <div className={styles.filterPopup}>
          <div className={styles.occasion}>Occasion</div>
          <div className={styles.rectangleParent}> 
            <div className={styles.groupChild} />
            <div className={styles.rectangleGroup} onClick={onGroupContainer3Click}>
              <div className={styles.groupItem} /> 
              <div className={styles.camis}>Camis</div> 
            </div> 
            <div className={styles.searchFilter1}>Search Filter</div>
            <div className={styles.typeOfClothing}>Type Of Clothing</div>
            <div className={styles.rectangleContainer} onClick={onGroupContainer4Click}> 
              <div className={styles.groupItem} /> 
              <div className={styles.tees}>Tees</div> 
            </div>
            <div className={styles.groupDiv} onClick={onGroupContainer5Click}>
              <div className={styles.groupItem} />
              <div className={styles.shirts}>Shirts</div>
            </div> 
            <div className={styles.rectangleParent1} onClick={onGroupContainer6Click}> 
              <div className={styles.groupItem} />
              <div className={styles.camis}>Shorts</div> 
            </div>
            <div className={styles.rectangleParent2} onClick={onGroupContainer7Click}> 
              <div className={styles.groupItem} />
              <div className={styles.skirts}>Skirts</div>
            </div> 
            <div className={styles.rectangleParent3} onClick={onGroupContainer8Click}> 
              <div className={styles.groupItem} />
              <div className={styles.jackets}>Jackets</div> 
            </div> 
            <div className={styles.rectangleParent4} onClick={onGroupContainer9Click}> 
              <div className={styles.groupItem} />
              <div className={styles.cardigans}>Cardigans</div> 
            </div> 
            <div className={styles.rectangleParent5} onClick={onGroupContainer10Click}> 
              <div className={styles.groupItem} />
              <div className={styles.hoodies}>Hoodies</div> 
            </div> 
            <div className={styles.rectangleParent6} onClick={onGroupContainer11Click}> 
              <div className={styles.groupItem} />
              <div className={styles.tankTops}>Tank Tops</div> 
            </div> 
            <div className={styles.rectangleParent7} onClick={onGroupContainer12Click}> 
              <div className={styles.groupItem} />
              <div className={styles.dresses}>Dresses</div> 
            </div> 
            <div className={styles.rectangleParent8} onClick={onGroupContainer13Click}> 
              <div className={styles.groupItem} />
              <div className={styles.cardigans}>Crop Tops</div> 
            </div> 
            <div className={styles.rectangleParent9} onClick={onGroupContainer14Click}> 
              <div className={styles.groupItem} />
              <div className={styles.skirts}>Pants</div> 
            </div> 
            <div className={styles.geography}>Geography</div> 
            <div className={styles.rectangleParent10}>
              <div className={styles.groupChild11} />
              <div className={styles.shirts}>Korea</div> 
            </div> 
            <div className={styles.rectangleParent11} onClick={onGroupContainer16Click}> 
              <div className={styles.groupChild11} />
              <div className={styles.shirts}>Japan</div> 
            </div> 
            <div className={styles.rectangleParent12}>
              <div className={styles.groupChild11} />
              <div className={styles.western}>Western</div> 
            </div> 
            <div className={styles.rectangleParent13} onClick={onGroupContainer18Click}>
              <div className={styles.groupChild11} />
              <div className={styles.shirts}>China</div> 
            </div> 

            <div className={styles.rectangleParent14} onClick={onGroupContainer19Click}>
              <div className={styles.groupChild11} />
              <div className={styles.casual}>Casual</div> 
            </div> 
            <div className={styles.rectangleParent15} onClick={onGroupContainer20Click}>
              <div className={styles.groupChild11} />
              <div className={styles.wedding}>Wedding</div> 
            </div> 
            <div className={styles.rectangleParent16}>
              <div className={styles.groupChild11} />
              <div className={styles.casual}>Formal</div> 
            </div> 
            <div className={styles.rectangleParent17}>
              <div className={styles.groupChild11} />
              <div className={styles.jackets}>Brunch</div> 
            </div> 
            <div className={styles.rectangleParent18} onClick={onGroupContainer23Click}>
              <div className={styles.groupChild11} />
              <div className={styles.cardigans}>Christmas</div> 
            </div> 
            <div className={styles.rectangleParent19} onClick={onGroupContainer24Click}>
              <div className={styles.groupChild11} />
              <div className={styles.tankTops}>New Year</div> 
            </div> 
            <div className={styles.rectangleParent20} onClick={onGroupContainer25Click}>
              <div className={styles.groupChild11} />
              <div className={styles.camis}>Beach</div> 
            </div> 
            <div className={styles.rectangleParent21} onClick={onGroupContainer26Click}>
              <div className={styles.groupChild11} />
              <div className={styles.western}>Birthday</div> 
            </div> 

            <div className={styles.rectangleParent22} onClick={onapplyFiltersClick}> 
              <div className={styles.groupChild23} /> 
              <div className={styles.applyFilters}>Apply Filters</div> 
            </div> 
            <div className={styles.rectangleParent23} onClick={onresetFiltersClick}>
              <div className={styles.groupChild24} /> 
              <div className={styles.applyFilters}>Reset Filters</div> 
            </div> 
          </div> 
          <div className={styles.occasion}>Occasion</div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

