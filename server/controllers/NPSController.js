const axios = require('axios');

const API_KEY = 'btQCAT4O0selRfC9gtES2mS0u149qPEhBxOuNU8i';
const NPSController = {};

//makes a get request to NPS api, with the api key and creates an object with key value pairs of park_name: park_code
NPSController.getParkCodes = async (_req, res, next) => {
  try {
    const result = await axios.get(
      `http://developer.nps.gov/api/v1/parks?api_key=${API_KEY}&limit=600`
    );
    const parkCodes = {};
    for (const park of result.data.data) {
      //filtering all the parks for specifically the national parks
      if (
        // park.designation.includes('National Park & Preserve') ||
        // park.designation.includes('National Parks') ||
        park.designation.includes('National Park') ||
        park.name.includes('Samoa') ||
        park.name.includes('Redwood')
      ) {
        parkCodes[park.name] = park.parkCode;
      }
    }
    res.locals.parkCodes = parkCodes;
    return next();
  } catch (err) {
    return next(err);
  }
};

// THIS ONE WORKS FINE
//given a specific park code, this makes a get request to NPS to grab all the park data.
NPSController.getPark = async (req, res, next) => {
  try {
    const { parkCode } = req.params;
    const result = await axios.get(
      `http://developer.nps.gov/api/v1/parks?api_key=${API_KEY}&parkCode=${parkCode}`
    );
    res.locals.parkData = result.data.data[0];
    return next();
  } catch (err) {
    return next(err);
  }
};

//formats the modal data and makes an additional get request to the webcam api to include that link in the modal.
NPSController.getModalInfo = async (req, res, next) => {
  try {
    const park = res.locals.parkData;
    const { parkCode } = req.params;
    const imgIdx = Math.floor(Math.random() * park.images.length);
    const webcam = await axios.get(
      `https://developer.nps.gov/api/v1/webcams?parkCode=${parkCode}&api_key=${API_KEY}`
    );
    const modalInfo = {
      description: park.description,
      latLong: park.latLong,
      states: park.states,
      photo: park.images[imgIdx].url,
      altText: park.images[imgIdx].altText,
      webcam: webcam.data.data.length > 0 ? webcam.data.data[0].url : null,
    };
    res.locals.modalInfo = modalInfo;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = NPSController;
