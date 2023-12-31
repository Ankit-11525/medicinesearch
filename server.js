const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const getmedicineAmazonDescription=require('./Categories/Medicine/AmazonModule.js');
const getmedicinepharmaDescription=require('./Categories/Medicine/PharmaeasyModule.js');
const getmedicineApollopharmaDescription=require('./Categories/Medicine/ApolloPharmaModule.js');
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

// Define the API endpoint for medicine search
app.get("/api/medicine/:name", async (req, res) => {
  const { name } = req.params;

  try {
   
    const searchResults = [];


    const URL = `https://www.amazon.in/s?k=${name}&i=hpc&crid=1OSR6C5KJ804W&sprefix=aciloc%2Chpc%2C195&ref=nb_sb_noss_2`;
    let result = await getmedicineAmazonDescription(URL);
    // console.log(result);


    const pharmeasyurl=`https://pharmeasy.in/search/all?name=${name}`;
    let result2=await getmedicinepharmaDescription(pharmeasyurl);
    // console.log(result2);

    const Apollopharmaurl=`https://www.apollopharmacy.in/search-medicines/${name}`;
    let result3=await getmedicineApollopharmaDescription(Apollopharmaurl);

    searchResults.push(result);
    searchResults.push(result2);
    searchResults.push(result3);
    console.log(searchResults);
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// const getmedicineDescription= async(URL)=>
// {
//   try {
//     // console.log('before :');
//     const response = await axios.get(URL);
//     const html = response.data;
//     const $ = cheerio.load(html);
    
//     // const medicineimagearr=$('.ClickableElement_clickable__ItKj2.ProductImageCarousel_clickableImg__YVeX_');
//     // const medicineimage=$(medicineimagearr[0]).find('img').attr('src');
//     // console.log("medicineimage : ",medicineimagearr);
//     // console.log("medicineimagearr "+medicineimagearr.length);



//     const medicinename=$('.MedicineOverviewSection_medicineName__dHDQi').text();
//     // console.log("medicinename "+medicinename);
//     // const delivarye=$('.Edd_eddDetails__8kgLR>div').text();
//     // const date=$(".Edd_eddDetails__8kgLR span").text();
//     // console.log("date "+date);


//     const medicineqnty=$('.MedicineOverviewSection_measurementUnit__7m5C3').text();
//     // console.log(medicineqnty);



//     const medicinemrp=$('.PriceInfo_striked__Hk2U_').text();
//     // console.log(medicinemrp);



//     const medicineofferarray=$('.DescriptionTable_value__0GUMC');
//     const medicinenewPrice=$(medicineofferarray[0]).text();
//     const medicinesavedPrice=$(medicineofferarray[1]).text();
//     // console.log("medicinenewPrice : ",medicinenewPrice);
//     // console.log("medicinesavedPrice : ",medicinesavedPrice);


//     const medicineURL=URL;

//     const SingleMedicineDescription = {
//       // medicineimagearr,
//       medicineURL,
//       medicinename,
//       medicineqnty,
//       medicinemrp,
//       medicinenewPrice,
//       medicinesavedPrice,
//     };
//     // console.log(SingleMedicineDescription);
//     return SingleMedicineDescription;
//   }
//   catch(error) {
//     console.error(error);
//     // res.status(500).json({ error: "Internal server error (single product )" });
//   }

// }