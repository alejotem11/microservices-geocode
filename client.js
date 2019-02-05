const axios = require('axios');
const keys = require('./keys');

const getLocation = address => {
  return new Promise(async (resolve, reject) => {
    try {
      var encodedAddress = encodeURIComponent(address);
      const res = await axios
        .get(`${keys.url}?key=${keys.apiKey}&location=${encodedAddress}`);
      if (res.info.statusCode === 0) {
        resolve({
          address: res.results[0].providedLocation.location,
          lat: res.results[0].locations[0].latLng.lat,
          lng: res.results[0].locations[0].latLng.lng
        });
      } else {
        reject('Something went wrong');
      }
    } catch (error) {
      reject('ERROR. Unable to connect to the mapquestapi.com servers');
    }
  });
};

module.exports = { getLocation };