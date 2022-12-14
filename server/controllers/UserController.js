const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const userController = {};

//createUser
userController.createUser = async (req, res, next) => {
  const { username, password, parksVisited } = req.body;

  User.create({ username, password, parksVisited }, (err, user) => {

    if (err) {
      console.log(err);
      return next({
        log: 'Error: UserController.createUser middleware',
        message: {
          err: err,
        },
      });
    }
    res.locals.user = user;
    return next();
  });
}

//verifyUser
userController.verifyUser = async (req, res, next) => {
  const {username, password} = req.body;
  try {
    
    const user = await User.find({ username }).exec()
    //check if user found
    //if user not found in data base by username
    if(!user[0]) {
      res.locals.needSignUp = true
      return next();
    };
    //checking if the passwords are a match with bcrypt compare
    const match = await bcrypt.compare(password, user[0].password)
    if (!match) {res.locals.needSignUp = true;}
    else res.locals.user = user[0];
    
    return next();
  } catch (err) {
    return next({
        log: "Error in createUser",
        message: { err },
    })
  }
}

//updateUser - req.body = {username: , notes: , dateVisited: , activitiesCompleted}
userController.updateUserParksVisited = (req, res, next) => {
  console.log("request body", req.body)
  const {
    username,
    parkCode,
    notes,
    dateVisited,
    activitiesDone,
    parksVisited,
  } = req.body;
console.log('username:',username)
  User.findOneAndUpdate(
    { username },
    {
     parksVisited: {
        ...parksVisited,
        [parkCode]: { notes, dateVisited, activitiesDone },
      },
    },
    {
      new: true,
    }
  )
    .then((updatedUser) => {
      console.log("updatedUser", updatedUser);
      res.locals.updatedUser = updatedUser;
      return next();
    })
    .catch((err) => {
      return next({
        log: "Error in updateUserParksVisited",
        message: { err },
      });
    });
};



// // Create a new user in the database - this is invoked on a post request to /user

// // The request coming in currently looks like {name: -----}
// userController.createUser = async (req, res, next) => {
//   console.log('in');
//   try {
//     const user = await User.create({
//       name: req.body.name,
//       parksVisited: {},
//     });
//     res.locals.newUser = user; // <-- send back all user info
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// };

// // Get user info - invoked on a get request to /user/:parkCode -

// //To do - on the front a user has to be signed in, and the username needs to be stored somewhere in state after sign in for this to work
// //request coming looks like
// //req.body = {name: ----}
// //req.params = park_code

// //why do you need to get the user if you want the info on a specific park? - they are using this to grab a users park-specific information for the modal
// userController.getUser = (req, res, next) => {
//   // User.findOne({ name: req.body.name})
//   User.findOne({ name: 'Aalok' })
//     .then((user) => {
//       if (user) {
//         res.locals.user = user; // <-- send back all user info
//         return next();
//       }
//     })
//     .catch((err) => {
//       console.log('User not found');
//       return next({ message: 'Error in getUser' });
//     });
// };

// // Add a park to a user's completed parks
// // This one is invoked on a post request to the /user/:parkcode route. It is supposed to UPDATE the user's document and add a new park to the parksVisited property. It is currently doing something weird TODO.
// //req.body {name: ---, date: ,notes: , activitiesDone}
// //req.params: park_code

// //this needs revision: should be using findOneAndUpdate({name:  }, {parksVisited : {..., newPark}})

// userController.addPark = async (req, res, next) => {
//   try {
//     const parkCode = req.params.parkCode;
//     const newPark = {
//       date: req.body.date,
//       notes: req.body.notes,
//       activitiesCompleted: req.body.activitiesDone,
//     };
//     // const user = await User.findOne({ name: req.body.name})
//     const user = await User.findOne({ name: 'Aalok' });
//     if (user) {
//       const parksVisited = { ...user.parksVisited, [parkCode]: newPark };
//       user.parksVisited = parksVisited;
//       const newUser = await user.save();
//       console.log(newUser);
//     }
//     res.locals.park = user.parksVisited[parkCode]; // <-- send back the newly added park's info
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// };

// // Get parks completed array for icon coloring on landing page --- seems redundant, we only need to get the full user data once upon login and we can do this on the front end.

// //This is grabbing only the keys of the users parks visited
// userController.getParks = (req, res, next) => {
//   // User.findOne({ name: req.body.name})
//   User.findOne({ name: 'Aalok' })
//     .then((user) => {
//       res.locals.parks = Object.keys(user.parksVisited); // <-- send back array of parks completed
//       return next();
//     })
//     .catch((err) => {
//       return next({ message: 'Error in getParks' });
//     });
// };

// // Get user's park-specific info for top of modal display -- also redundant
// userController.getParkInfo = (req, res, next) => {
//   try {
//     // console.log(req.params);
//     const { parkCode } = req.params;
//     const { parksVisited } = res.locals.user;
//     // console.log(parkCode);
//     console.log(parksVisited);
//     res.locals.parkInfo = parksVisited[parkCode];
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// };

module.exports = userController;
