import { useCallback, useEffect, useState } from "react"; 
import Link from "next/link";
import styles from "./index.module.css"; 

const HomePage = () => {

  // Please include useCallback code when i navigate to the favorites page when the favorites icon is clicked 


  // Sample data for pictures (replace this with data fetched from the backend)
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    // Fetch pictures from the backend here and update the state with the data
    // For example:
    // const fetchedPictures = await fetchPicturesFromBackend();
    // setPictures(fetchedPictures);
    // Replace the empty array above with the fetchedPictures array 

    // For demonstration purposes, assume we fetched an array of pictures
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
    // Update the pictures state with the fetched data
    setPictures(fetchedPictures);
  }, []);


  return (
    <div className={styles.homePage}> 

      {/* Top bar */}
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



      {/* Picture gallery */} 
   
        <div className={styles.pictureGallery}>
          {pictures.map((picture) => (
            <div key={picture.id} className={styles.pictureItem}>
              {/* Display your pictures here */}
              <img key={picture.id} src={picture.url} alt={`Picture ${picture.id}`} />
            </div>
          ))}
        </div>
      </div> 

    );
  };



export default HomePage;



