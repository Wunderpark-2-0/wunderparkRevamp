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
    // console.log('we are in getPark');
    const { parkcode } = req.params;
    // console.log('this is parkCode in getPark: ', parkCode);
    const result = await axios.get(
      `http://developer.nps.gov/api/v1/parks?api_key=${API_KEY}&parkCode=${parkcode}`
    );
    res.locals.parkData = result.data.data[0];
    // console.log(
    //   'this is res.locals.parkData.description: ',
    //   res.locals.parkData.description
    // );
    return next();
  } catch (err) {
    return next(err);
  }
};

//formats the modal data and makes an additional get request to the webcam api to include that link in the modal.
NPSController.getModalInfo = async (req, res, next) => {
  try {
    const park = res.locals.parkData;
    // console.log(park);
    console.log('this is park description in getModal: ', park.description);
    // const { parkCode } = req.params;
    // const imgIdx = Math.floor(Math.random() * park.images.length);
    // const webcam = await axios.get(
    //   `https://developer.nps.gov/api/v1/webcams?parkCode=${parkCode}&api_key=${API_KEY}`
    // );
    const modalInfo = {
      description: park.description,
      latLong: park.latLong,
      latitude: park.latitude,
      longitude: park.longitude,
      states: park.states,
      photo: park.images[0].url,
      altText: park.images[0].altText,
      // webcam: webcam.data.data.length > 0 ? webcam.data.data[0].url : null,
    };
    res.locals.modalInfo = modalInfo;
    return next();
  } catch (err) {
    next(err);
  }
};

//req.params - parkcode
NPSController.getCampgrounds = async (req, res, next) => {
  try {
    // console.log(
    //   'this is parksData.description: ',
    //   res.locals.parkData.description
    // );
    console.log('we are in campgrounds');
    const { parkcode } = req.params;
    console.log('this is parkcode in campGrounds: ', parkcode);
    const url = `https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkcode}&api_key=btQCAT4O0selRfC9gtES2mS0u149qPEhBxOuNU8i`;
    const campground = await axios.get(url);
    const campgroundInfo = [];
    campground.data.data.forEach((campground) =>
      campgroundInfo.push({
        name: campground.name,
        contactEmail: campground.contacts.emailAddresses[0].emailAddress,
        contactPhone: campground.contacts.phoneNumbers[0].phoneNumber,
        campsitesTotal: campground.campsites.totalSites,
      })
    );
    res.locals.campgrounds = {
      totalCampgrounds: campground.data.total,
      campground: campgroundInfo,
    };
    return next();
  } catch (err) {
    next({
      log: 'error in getCampgrounds',
      message: { err },
    });
  }
};

//req.params - parkcode
NPSController.getParkAmenities = async (req, res, next) => {
  try {
    console.log('we are in amenities');
    const { parkcode } = req.params;
    const url = `https://developer.nps.gov/api/v1/amenities/parksplaces?parkCode=${parkcode}&api_key=btQCAT4O0selRfC9gtES2mS0u149qPEhBxOuNU8i`;
    const amenities = await axios.get(url);
    const parkAmenitiesInfo = [];
    amenities.data.data.forEach((amenity) =>
      parkAmenitiesInfo.push(amenity[0].name)
    );
    res.locals.amenities = parkAmenitiesInfo;

    return next();
  } catch (err) {
    next({
      log: 'error in getAmenity',
      message: { err },
    });
  }
};

NPSController.getWeather = async (req, res, next) => {
  try {
    console.log('we are in weather');
    const { latitude, longitude } = res.locals.modalInfo;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C%20${longitude}?unitGroup=us&include=days%2Ccurrent&key=HZV9FC29JZBT8PBRUNYN8FTHW&contentType=json`;
    const weather = await axios.get(url);
    // const weatherInfo = [];
    // for (let i = 0; i < 7; i++) {
    //   const currDay = weather.data.days[i];
    //   weatherInfo.push({
    //     date: currDay.datetime,
    //     tempmax: currDay.tempmax,
    //     tempmin: currDay.tempmin,
    //     description: currDay.description,
    //   });
    // }
    // res.locals.weather = weatherInfo;

    //hardcoded dummy weather data - due to api limit, above code works
    res.locals.weather = [
      {
        date: '2022-12-14',
        tempmax: 40.9,
        tempmin: 16.1,
        description: 'Partly cloudy throughout the day.',
      },
      {
        date: '2022-12-15',
        tempmax: 38.9,
        tempmin: 31,
        description: 'Partly cloudy throughout the day.',
      },
      {
        date: '2022-12-16',
        tempmax: 36,
        tempmin: 32.6,
        description:
          'Cloudy skies throughout the day with a chance of rain or snow.',
      },
      {
        date: '2022-12-17',
        tempmax: 36,
        tempmin: 33,
        description:
          'Cloudy skies throughout the day with a chance of rain or snow throughout the day.',
      },
      {
        date: '2022-12-18',
        tempmax: 34.2,
        tempmin: 30.6,
        description:
          'Cloudy skies throughout the day with early morning snow or rain.',
      },
      {
        date: '2022-12-19',
        tempmax: 34.1,
        tempmin: 27.8,
        description: 'Partly cloudy throughout the day.',
      },
      {
        date: '2022-12-20',
        tempmax: 29,
        tempmin: 19.2,
        description: 'Clearing in the afternoon.',
      },
    ];
    return next();
  } catch (err) {
    next({
      log: 'error in getAmenity',
      message: { err },
    });
  }
};
module.exports = NPSController;
