import React from "react";
import "./Cardcss.css";
const Card = ({name,url}) => {
    const medicineName={name};
    const medicineURL={url};
    console.log(medicineName,medicineURL);
  return (
    <div className="card">
      {/* <img src="image.jpg" alt="Card Image" className="card-image" /> */}
      <div className="card-content">
        <h2 className="card-title">medicineName</h2>
        <p className="card-description">
          <a href={medicineURL} target="_blank" rel="noopener noreferrer">
            medicineName
          </a>
        </p>
        <button className="card-button">Learn More</button>
      </div>
    </div>
  );
};

export default Card;
