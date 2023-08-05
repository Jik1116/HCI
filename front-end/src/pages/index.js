import { useEffect, useState, useCallback } from "react";
import styles from "./index.module.css";

const HomePage = () => {
  const [pictures, setPictures] = useState([]); 
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    "type of clothing": null,
    "occasion": null,
    "geography": null,
  });

  const onItemClick = useCallback((category, item) => {
    setSelectedItems((prevSelectedItems) => {
      // Toggle selection: If the item is already selected, set it to null; otherwise, set it to the clicked item
      const newItemValue = prevSelectedItems[category] === item ? null : item;
      
      // Return the updated state
      return { ...prevSelectedItems, [category]: newItemValue };
    });
  }, []);

  useEffect(() => {
    console.log("Selected Items:", selectedItems);
  }, [selectedItems]);



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
            <div className={`${styles.rectangleGroup} ${selectedItems["type of clothing"] === "Camis" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Camis")}>
              <div className={styles.groupItem} /> 
              <div className={styles.camis}>Camis</div> 
            </div> 
            <div className={styles.searchFilter1}>Search Filter</div>
            <div className={styles.typeOfClothing}>Type Of Clothing</div>
            <div className={`${styles.rectangleContainer} ${selectedItems["type of clothing"] === "Tees" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Tees")}> 
              <div className={styles.groupItem} /> 
              <div className={styles.tees}>Tees</div> 
            </div>
            <div className={`${styles.groupDiv} ${selectedItems["type of clothing"] === "Shirts" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Shirts")}>
              <div className={styles.groupItem} /> 
              <div className={styles.shirts}>Shirts</div>
            </div> 
            <div className={`${styles.rectangleParent1} ${selectedItems["type of clothing"] === "Shorts" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Shorts")}> 
              <div className={styles.groupItem} />
              <div className={styles.camis}>Shorts</div> 
            </div>
            <div className={`${styles.rectangleParent2} ${selectedItems["type of clothing"] === "Skirts" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Skirts")}> 
              <div className={styles.groupItem} />
              <div className={styles.skirts}>Skirts</div> 
            </div> 
            <div className={`${styles.rectangleParent3} ${selectedItems["type of clothing"] === "Jackets" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Jackets")}> 
              <div className={styles.groupItem} />
              <div className={styles.jackets}>Jackets</div> 
            </div> 
            <div className={`${styles.rectangleParent4} ${selectedItems["type of clothing"] === "Cardigans" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Cardigans")}>  
              <div className={styles.groupItem} />
              <div className={styles.cardigans}>Cardigans</div> 
            </div> 
            <div className={`${styles.rectangleParent5} ${selectedItems["type of clothing"] === "Hoodies" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Hoodies")}>  
              <div className={styles.groupItem} />
              <div className={styles.hoodies}>Hoodies</div> 
            </div> 
            <div className={`${styles.rectangleParent6} ${selectedItems["type of clothing"] === "Tank Tops" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Tank Tops")}>  
              <div className={styles.groupItem} />
              <div className={styles.tankTops}>Tank Tops</div> 
            </div> 
            <div className={`${styles.rectangleParent7} ${selectedItems["type of clothing"] === "Dresses" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Dresses")}> 
              <div className={styles.groupItem} />
              <div className={styles.dresses}>Dresses</div> 
            </div> 
            <div className={`${styles.rectangleParent8} ${selectedItems["type of clothing"] === "Crop Tops" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Crop Tops")}>  
              <div className={styles.groupItem} />
              <div className={styles.cardigans}>Crop Tops</div> 
            </div> 
            <div className={`${styles.rectangleParent9} ${selectedItems["type of clothing"] === "Pants" ? styles.active : ""}`} onClick={() => onItemClick("type of clothing", "Pants")}> 
              <div className={styles.groupItem} />
              <div className={styles.skirts}>Pants</div> 
            </div> 

            <div className={styles.geography}>Geography</div> 
            <div className={`${styles.rectangleParent10} ${selectedItems["geography"] === "Korea" ? styles.active : ""}`} onClick={() => onItemClick("geography", "Korea")}>
              <div className={styles.groupChild11} />
              <div className={styles.shirts}>Korea</div> 
            </div> 
            <div className={`${styles.rectangleParent11} ${selectedItems["geography"] === "Japan" ? styles.active : ""}`} onClick={() => onItemClick("geography", "Japan")}> 
              <div className={styles.groupChild11} />
              <div className={styles.shirts}>Japan</div> 
            </div> 
            <div className={`${styles.rectangleParent12} ${selectedItems["geography"] === "Western" ? styles.active : ""}`} onClick={() => onItemClick("geography", "Western")}>
              <div className={styles.groupChild11} />
              <div className={styles.western}>Western</div> 
            </div> 
            <div className={`${styles.rectangleParent13} ${selectedItems["geography"] === "China" ? styles.active : ""}`} onClick={() => onItemClick("geography", "China")}>
              <div className={styles.groupChild11} />
              <div className={styles.shirts}>China</div> 
            </div> 

            <div className={`${styles.rectangleParent14} ${selectedItems["occasion"] === "Casual" ? styles.active : ""}`} onClick={() => onItemClick("occasion", "Casual")}>
              <div className={styles.groupChild11} />
              <div className={styles.casual}>Casual</div> 
            </div> 
            <div className={`${styles.rectangleParent15} ${selectedItems["occasion"] === "Wedding" ? styles.active : ""}`} onClick={() => onItemClick("occasion", "Wedding")}>
              <div className={styles.groupChild11} />
              <div className={styles.wedding}>Wedding</div> 
            </div> 
            <div className={`${styles.rectangleParent16} ${selectedItems["occasion"] === "Formal" ? styles.active : ""}`} onClick={() => onItemClick("occasion", "Formal")}>
              <div className={styles.groupChild11} />
              <div className={styles.casual}>Formal</div> 
            </div> 
            <div className={`${styles.rectangleParent17} ${selectedItems["occasion"] === "Brunch" ? styles.active : ""}`} onClick={() => onItemClick("occasion", "Brunch")}>
              <div className={styles.groupChild11} />
              <div className={styles.jackets}>Brunch</div> 
            </div> 
            <div className={`${styles.rectangleParent18} ${selectedItems["occasion"] === "Christmas" ? styles.active : ""}`} onClick={() => onItemClick("occasion", "Christmas")}>
              <div className={styles.groupChild11} />
              <div className={styles.cardigans}>Christmas</div> 
            </div> 
            <div className={`${styles.rectangleParent19} ${selectedItems["occasion"] === "New Year" ? styles.active : ""}`} onClick={() => onItemClick("occasion", "New Year")}>
              <div className={styles.groupChild11} />
              <div className={styles.tankTops}>New Year</div> 
            </div> 
            <div className={`${styles.rectangleParent20} ${selectedItems["occasion"] === "Beach" ? styles.active : ""}`} onClick={() => onItemClick("occasion", "Beach")}>
              <div className={styles.groupChild11} />
              <div className={styles.camis}>Beach</div>
            </div>
            <div className={`${styles.rectangleParent21} ${selectedItems["occasion"] === "Birthday" ? styles.active : ""}`} onClick={() => onItemClick("occasion", "Birthday")}>
              <div className={styles.groupChild11} />
              <div className={styles.western}>Birthday</div> 
            </div> 

            <div className={styles.rectangleParent22}> 
              <div className={styles.groupChild23} /> 
              <div className={styles.applyFilters}>Apply Filters</div> 
            </div> 
            <div className={styles.rectangleParent23}>
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

