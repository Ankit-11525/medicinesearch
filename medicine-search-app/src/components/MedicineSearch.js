import React, { useState } from "react";
import axios from "axios";
import Card from "./Card.jsx";
import "./Cardcss.css";


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
        {searchResults.length === 1 ? (
          <p>No results found.</p>
        ) : (
          <div className="container" >
            {searchResults.map((singleresult) => {
              return singleresult.map((result, index) => {
                return <Card key={index} url={result.url} name={result.data}/>;
              });
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineSearch;
