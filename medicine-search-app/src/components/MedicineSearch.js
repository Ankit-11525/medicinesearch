import React, { useState } from "react";
import axios from "axios";

const MedicineSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([[]]);

  const handleSearch = async () => {
    try {
      console.log(searchInput);
      const response = await axios.get(
        `http://localhost:5000/api/medicine/${searchInput}`
      );
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Medicine Search</h1>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Enter a medicine name"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {searchResults.forEach((singleresult, ind) => {
              if (singleresult) {
                if (ind === 0) {
                  singleresult.map((result, index) => (
                    <li key={index}>
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.data}
                      </a>
                    </li>
                  ));
                } else {
                  singleresult.map((result, index) => (
                    <li key={index}>
                      {/* <a
                        href={result.medicineURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.medicinename}
                      </a> */}
                      <span>{result.medicinename}</span>
                      <span>{result.medicineMRP}</span>
                      <span>{result.medicineDiscountPrice}</span>
                      <span>{result.medicinediscountpercentage}</span>
                      <span>{result.deliverydate}</span>
                    </li>
                  ));
                }
              }
            })}
           
          </ul>
        )}
      </div>
    </div>
  );
};

export default MedicineSearch;
