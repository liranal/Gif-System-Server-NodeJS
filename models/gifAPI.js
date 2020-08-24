const axios = require("axios");
const API_KEY = "SLxpT5H3A05fhLkbJCerQcoW7Ch9aceG";
const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

exports.GetRandomGif = async (subject) => {
  let gif = await axios.get(`${url}&tag=${subject}&rating=g`);

  return gif.data;
};
