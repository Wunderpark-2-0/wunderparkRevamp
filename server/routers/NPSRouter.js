const express = require('express');
const NPSController = require('../controllers/NPSController');

const NPSRouter = express.Router();

// MIGHT NOT BE NEEDED, PARK CODES ARE STORED LOCALLY
//grabs all the park codes and sends it back to client as an object {park_name: park_code, ....}
NPSRouter.get('/parks', NPSController.getParkCodes, (_req, res) => {
  return res.status(200).send(res.locals.parkCodes);
});

// THIS ONE WORKS FINE
//given a specific park code, this will make a fetch request to the nps parks api and get all the details on that specific park and send it back to the client.
NPSRouter.get('/parks/:parkCode', NPSController.getPark, (_req, res) => {
  return res.status(200).send(res.locals.parkData);
});

//given a park code, get the park data, then refine the park data for only the modal information. This is the get request that is made when a modal is clicked.
NPSRouter.get(
  '/modalInfo/:parkCode',
  NPSController.getPark,
  NPSController.getModalInfo,
  (_req, res) => {
    return res.status(200).json(res.locals.modalInfo);
  }
);

module.exports = NPSRouter;
