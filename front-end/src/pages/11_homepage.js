import { useEffect, useState, useCallback } from "react";
import styles from "./11_homepage.module.css";
import Link from 'next/link';
import { ref, getDownloadURL,getStorage, getMetadata } from "firebase/storage";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAdiDavMCbaDUpBRvrTJjqeUXoj_VDxg-0",
  authDomain: "sparkstyle.firebaseapp.com",
  databaseURL: "https://sparkstyle-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sparkstyle",
  storageBucket: "sparkstyle.appspot.com",
  messagingSenderId: "789876522013",
  appId: "1:789876522013:web:d70a2e9e353b6084a19af4",
  measurementId: "G-H9N76CL7FR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const HomePage = () => {
  const storage = getStorage()
  const [pictures, setPictures] = useState([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    "type of clothing": null,
    "occasion": null,
    "geography": null,
  });
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [selectedPictureDescription, setSelectedPictureDescription] = useState('');

  // Function to handle picture click and fetch description from the backend
  const onPictureClick = async (picture) => {
    try {
      const imageRef = ref(storage, picture.url);
      const metadata = await getMetadata(imageRef);
      setSelectedPicture(picture.url);
      setSelectedPictureDescription(metadata.customMetadata.caption || "");
      setShowFilterPopup(true);
    } catch (error) {
      console.error("Error fetching picture metadata:", error);
      // Handle error if metadata cannot be fetched
    }
  };

  // Function to handle the back button click and close the popup
  const onBackButtonClick = () => {
    setSelectedPicture(null);
    setSelectedPictureDescription('');
    setShowFilterPopup(false);
  };


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

  const resetFilters = () => {
    // Function to reset all filters
    setSelectedItems({
      "type of clothing": null,
      "occasion": null,
      "geography": null,
    });
  };

  // Function to download an image from Firebase Storage using URL
  async function downloadImage(imageUrl, imageId) {
    try {
      const imageRef = ref(storage, imageUrl);
      const url = await getDownloadURL(imageRef);
      return { id: imageId, url: url };
    } catch (error) {
      console.error(`Error downloading image ${imageId}:`, error);
      return null;
    }
  }

  useEffect(() => {
    // Fetch pictures from the backend here and update the state with the data
    // For example:
    // const fetchedPicturesFromBackend = await fetchPicturesFromBackend();
    // setPictures(fetchedPicturesFromBackend);

    // Replace the code below for pictures zone to zeight after pictures are fetched from backend
    const imageUrls = [
      { id: 1, url: "images/image_03.png" },
      { id: 2, url: "images/image_15.png" },
      { id: 3, url: "images/image_11.png" },
      { id: 4, url: "images/image_12.png" },
      { id: 5, url: "images/image_13.png" },
      { id: 6, url: "images/image_17.png" },
      { id: 7, url: "images/image_23.png" },
      { id: 8, url: "images/image_27.png" },
    ];

    const fetchPictures = async () => {
      const fetchedPictures = await Promise.all(
        imageUrls.map(({ id, url }) => downloadImage(url, id))
      );
      setPictures(fetchedPictures.filter((picture) => picture !== null));
    };

    fetchPictures();
  }, []);

  const toggleFilterPopup = () => {
    // Function to toggle the filter pop-up state when the filter icon is clicked
    setShowFilterPopup((prevValue) => !prevValue);
  };

  const onApplyFilters = () => {
    // Function to close the filter pop-up when "Apply Filters" is clicked
    setShowFilterPopup(false);
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
        <Link href="/12_favorites">
          <div className={styles.favoritesContainer}>
            <img className={styles.favoritesIcon} src="/favoritesicon.jpg" alt="Favorites" />
          </div>
        </Link>
      </div>

      <div className={styles.scrollableGallery}>
        <div className={styles.pictureGallery}>
          {pictures.map((picture) => (
            <div key={picture.id} className={styles.pictureItem} onClick={() => onPictureClick(picture)}>
              <img key={picture.id} src={picture.url} alt={`Picture ${picture.id}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Popup to display the enlarged image and description */}
      {showFilterPopup && (
        <div className={styles.popupContainer}>
          <div className={styles.popupContent}>
            {/* Back button at the top left corner */}
            <div className={styles.backButton} onClick={onBackButtonClick}>
              <img className={styles.backIcon} src="/backarrow.png" alt="Back" />
            </div>
            <div className={styles.enlargedImageContainer}>
              <img className={styles.enlargedImage} src={selectedPicture} alt="Enlarged" />
            </div>
            <div className={styles.descriptionContainer}>
              <p>{selectedPictureDescription}</p>
            </div>
          </div>
        </div>
      )}

      {/* Render the filter pop-up based on the showFilterPopup state */}
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
              <div className={styles.applyFilters} onClick={onApplyFilters}>Apply Filters</div>
            </div>
            <div className={styles.rectangleParent23}>
              <div className={styles.groupChild24} />
              <div className={styles.applyFilters} onClick={resetFilters}>Reset Filters</div>
            </div>
          </div>
          <div className={styles.occasion}>Occasion</div>
        </div>
      )}
    </div>
  );
};

export default HomePage;



