const express = require('express');
const userController = require('../controllers/UserController');

const userRouter = express.Router();


// POST to /login   - logging in  -- should go through the verifyUser middle ware
userRouter.post('/login', userController.verifyUser, (req, res) => {
  if(res.locals.needSignUp){
    return res.sendStatus(401);
  }
  return res.status(200).json(res.locals.user);
})


// POST to /signup   - Create a User   - create user middleware
userRouter.post('/signup', userController.createUser, (req,res) => {
  return res.status(200).json(res.locals.user);
})

// PATCH to /  - adding to parks visited  update user middleware
userRouter.patch('/', userController.updateUserParksVisited, (req, res) => {
  return res.status(200).json(res.locals.updatedUser);
})



// userRouter.get(
//   '/:parkCode',
//   userController.getUser,
//   userController.getParkInfo,
//   (_req, res) => {
//     return res.status(200).json(res.locals.parkInfo);
//   }
// );

// userRouter.get('/', userController.getParks, (_req, res) => {
//   return res.status(200).json(res.locals.parks);
// });

// userRouter.post('/:parkCode', userController.addPark, (_req, res) => {
//   return res.status(200).json(res.locals.park);
// });

// userRouter.post('/', userController.createUser, (_req, res) => {
//   return res.status(200).json(res.locals.newUser);
// });

module.exports = userRouter;
