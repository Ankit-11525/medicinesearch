const axios = require("axios");
const cheerio = require("cheerio");

const getmedicinepharmaDescription = async (URL) => {
  try {
    const response = await axios.get(URL);
    const SearchResultArrForpharmaeasynMedicine = [];
    const html = response.data;
    let $ = cheerio.load(html);
    let allClasses=$('.Search_medicineLists__hM5Hk');
    // console.log(URL);
    for (let i = 0; i < allClasses.length; i++) {
      let data = $(allClasses[i]).find("h1").text();
    //   console.log(data);
      let url = $(allClasses[i]).find("a").attr("href");
    //   console.log(url);
      const result = {
        data,
        url,
      };
      SearchResultArrForpharmaeasynMedicine.push(result);
    }
    return SearchResultArrForpharmaeasynMedicine;
  } catch (err) {
    console.error(err);
  }
};

module.exports = getmedicinepharmaDescription;
