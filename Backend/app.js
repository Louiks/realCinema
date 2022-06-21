require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const app = express();
const database = require('./models');
const configDatabase = require('./config/database');
const Role = database.role;
const passport = require("passport");
const User = database.user;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
var bodyParser = require('body-parser')



const ticketRoute = require('./routes/ticketRoute');
const reservationRoute = require('./routes/reservationRoute');

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
secret: process.env.COOKKIE_SECRET,
resave: false,
saveUninitialized: false
}));


app.use('/ticket', ticketRoute);
//app.use('/seats', seatsRoute);
app.use('/reservation', reservationRoute);
app.use(passport.initialize());
app.use(passport.session());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// sso
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);

  User.findOrCreate({ firstName: profile.name.givenName,
    lastName: profile.name.familyName, googleID: profile.id }, function (err, user) {
  return cb(null, user);
  });
}
));

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
  passport.authenticate('google'),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.send("Successful authentication!");
  });

database.mongoose.connect('mongodb://localhost:27017/realCinema22', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

database.mongoose.connection.on('connected', () => {
    console.log("Connected to database successfully");
    initDatabase();
});
database.mongoose.connection.on('error', (err) => {
    console.log("Connection to database with error: " + err);
});

function initDatabase() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  };


require('./routes/authRoute')(app);


// pojedyncze miejsce
const SeatSchema = database.mongoose.Schema({
   row: {
      type: String,
      required: true
   },
   column: {
       type: String,
       required: true
   },
   isReserved: {
       type: Boolean,
       required: true
   },
});

const Seat = database.mongoose.model("Seat", SeatSchema);

Seat.deleteMany({});
app.route("/seats")
// pobieramy wszystkie miejsca
 .get(function(req, res){
   Seat.find(function(err, seats){
     if(seats) {
       const jsonSeats = JSON.stringify(seats);
       res.send(jsonSeats);
     }
     else
     {
       res.send("No seats");
     }
   });
 })

 .post(function(req, res){
  
  array = [];
  req.body.forEach(element => {
    console.log(element.isReserved);
    var isReserved = Math.random() < 0.5;
    const newSeat = Seat({
      row: element.row,
      column: element.column,
      isReserved: isReserved
    });
    array.push(newSeat);
  });
  Seat.insertMany(array, function(err){
    if(!err){
       res.send("Successfully added a new seat");
     }});
 })


// .delete(function(req, res){
//   Seat.deleteMany(function(err){
//     if(!err){
//       res.send("Successfully delete all seats!");
//     } else {
//       res.send(err);
//     }
//   });
// });


// app.route("/seats/:seatsRowColumn")

// .get(function(req, res){
//   const seatRow = req.params.seatRow;
//   const seatColumn = req.params.seatColumn;
//   Seat.findOne({row: seatRow, column: seatColumn}, function(err, seat){
//     if(seat){
//       const jsonSeat = JSON.stringify(seat);
//       res.send(jsonSeat);
//     }
//     else {
//       res.send("No seat find");
//     }
//   });
// })

// .patch(function(req, res){
//   const seatRow = req.params.seatRow;
//   const seatColumn = req.params.seatColumn;
//   Seat.update(
//       { row: seatRow },
//       { column: seatColumn},
//       {isReserved: req.body.isReservedSeat},
//   function(err){
//     if(!err){
//       res.send("Successfully updated selected seat.");
//     }
//     else {
//       res.send(err);
//     }
//   });
// })

 .put(function(req, res){
  console.log(req.body);
   rowArray = [];
   columnArray = [];
   updateSeats = [];
   req.body.forEach(element => {
    console.log(element);
    rowArray.push(element.row);
    });
    req.body.forEach(element => {
      console.log(element);
      columnArray.push(element.column);
      }); 

  Seat.updateMany({$and: [
    {row : {$in : rowArray}},
    {column : {$in : columnArray}},
    {isReserved : false}
  ]}, { $set : {isReserved: true}},  (err, doc, ress) => {
    if (err) { 
        res.json({
            message: "error: " + err,
            success: false,
        })
    } else {
        res.json({
            success: true,
            message: doc, ress
        });
    }});        
 });



   

// .delete(function(req, res){
//   const seatRow = req.params.seatRow;
//   const seatColumn = req.params.seatColumn;
//   Seat.findOneAndDelete({row: seatRow}, {column: seatColumn}, function(err){
//     if(!err){
//       res.send("Successfully deleted selected seat!");
//     } else {
//       res.send(err);
//     }
//   });
// });


// // movies

// const MovieSchema = database.mongoose.Schema({
//   name: {
//       type: String,
//       required: true,
//   },
//   year: {
//       type: Date,
//   },
//   author: {
//       type: String,
//       required: true
//   },
// });

// const Movie = database.mongoose.model("Movie", MovieSchema);

// app.route("/movies")

// .get(function(req, res){
//   Movie.find(function(err, movies){
//     if(movies) {
//       const jsonMovies = JSON.stringify(movies);
//       res.send(jsonMovies);
//     }
//     else
//     {
//       res.send("No movies");
//     }
//   });
// })

// .post(function(req, res){
//   const newMovie = Movie({
//     name: req.body.name,
//     year: req.body.year,
//     author: req.body.author
//   });
//   newMovie.save(function(err){
//     if(!err){
//       res.send("Successfully added a new movie");
//     }
//   });
// })


// .delete(function(req, res){
//   Movie.deleteMany(function(err){
//     if(!err){
//       res.send("Successfully delete all movies!");
//     } else {
//       res.send(err);
//     }
//   });
// });


// app.route("/movies/:movieName")

// .get(function(req, res){
//   const movieName = req.params.movieName;
//   Movie.findOne({name: movieName}, function(err, movie){
//     if(movie){
//       const jsonMovie = JSON.stringify(movie);
//       res.send(jsonMovie);
//     }
//     else {
//       res.send("No movie find");
//     }
//   });
// })

// .patch(function(req, res){
//   const movieName = req.params.movieName;
//   Movie.update(
//       { name: movieName },
//       { year: req.body.yearFilm},
//       {author: req.body.authorName},
//   function(err){
//     if(!err){
//       res.send("Successfully updated selected movie.");
//     }
//     else {
//       res.send(err);
//     }
//   });
// })

// .put(function(req, res){
//   const movieName = req.params.movieName;
//   Movie.update(
//     {name: movieName},
//     {year: req.body.yearFilm},
//     {author: req.body.authorName},
//     function(err)
//     {
//       if(!err){
//         res.send("Successfully updated selected movie");
//       } else {
//         res.send(err);
//       }
//     });
// })

// .delete(function(req, res){
//   const movieName = req.params.movieName;
//   Seat.findOneAndDelete({name: movieName}, function(err){
//     if(!err){
//       res.send("Successfully deleted selected movie!");
//     } else {
//       res.send(err);
//     }
//   });
// });


// // hall

// const HallSchema = database.mongoose.Schema({
//   NumberOfHall: {
//       type: Number,
//       required: true,
//       unique: true
//   },
//   NumberOfColumns: {
//       type: Number,
//       required: true
//   },
//   NmberOfRows: {
//       type: Number,
//       required: true
//   },
// });

// const Hall = database.mongoose.model("Hall", HallSchema);


// app.route("/halls")

// .get(function(req, res){
//   Hall.find(function(err, halls){
//     if(halls) {
//       const jsonHalls = JSON.stringify(halls);
//       res.send(jsonHalls);
//     }
//     else
//     {
//       res.send("No halls");
//     }
//   });
// })

// .post(function(req, res){
//   const newHall = Hall({
//     NumberOfHall: req.body.numberOfHall,
//     NumberOfColumns: req.body.numberOfColumns,
//     NumberOfRows: req.body.numberOfRows
//   });
//   newHall.save(function(err){
//     if(!err){
//       res.send("Successfully added a new hall");
//     }
//   });
// })


// .delete(function(req, res){
//   Hall.deleteMany(function(err){
//     if(!err){
//       res.send("Successfully delete all halls!");
//     } else {
//       res.send(err);
//     }
//   });
// });


// app.route("/halls/:hallnumber")

// .get(function(req, res){
//   const hallNumber = req.params.hallNumber;
//   Movie.findOne({NumberOfHall: hallNumber}, function(err, hall){
//     if(hall){
//       const jsonHall = JSON.stringify(hall);
//       res.send(jsonHall);
//     }
//     else {
//       res.send("No hall find");
//     }
//   });
// })

// .patch(function(req, res){
//   const hallNumber = req.params.hallNumber;
//   Hall.update(
//       { NumberOfHall: hallNumber },
//       { NumberOfColumns: req.body.numberOfColumns},
//       {NumberOfRows: req.body.numberOfRows},
//   function(err){
//     if(!err){
//       res.send("Successfully updated selected hall.");
//     }
//     else {
//       res.send(err);
//     }
//   });
// })

// .put(function(req, res){
//   const hallNumber = req.params.hallNumber;
//   Hall.update(
//     {NumberOfHall: hallNumber},
//     {NumberOfColumns: req.body.numberOfColumns},
//     {NumberOfRows: req.body.numberOfRows},
//     function(err)
//     {
//       if(!err){
//         res.send("Successfully updated selected hall");
//       } else {
//         res.send(err);
//       }
//     });
// })

// .delete(function(req, res){
//   const hallNumber = req.params.hallNumber;
//   Hall.findOneAndDelete({NumberOfHall: hallNumber}, function(err){
//     if(!err){
//       res.send("Successfully deleted selected hall!");
//     } else {
//       res.send(err);
//     }
//   });
// });

// // ticket

// const TicketSchema = database.mongoose.Schema({
//   datesOfFilm: {
//       type: [Date],
//       required: true
//   },
//   movie: {
//       type: database.mongoose.Schema.Types.ObjectId, ref: 'Movie',
//       required: true
//   },
//   seats: [
//       {
//           type: database.mongoose.Schema.Types.Mixed, ref: 'Seat',
//           required: true
//       }
//   ],
//   hall: {
//       type: database.mongoose.Schema.Types.ObjectId, ref: 'Room',
//       required:  true
//   },
// });

// const Ticket = database.mongoose.model('Ticket', TicketSchema);

// // reservation

// const ReservationSchema = database.mongoose.Schema({
//   firstName: {
//       type: String,
//       required: true
//   },
//   lastName: {
//     type: String,
//     required: true
// },  email: {
//   type: String,
//   required: true
// },
//   seats: [{
//       type: database.mongoose.Schema.Types.Mixed, ref: 'Seat',
//       required: true
//   }],
//   movie: {
//       type: database.mongoose.Schema.Types.Mixed, ref: 'Movie',
//       required: true
//   },
//   date: {
//       type: Date,
//       required: false
//   },

// });

// const Reservation = database.mongoose.model("Reservation", ReservationSchema);

// addReservation =  function (newReservation, callback) {
//   newReservation.save(callback)
// };



// /////////// Seats ////////////////////////////////

// app.use('/reserve', (req, res) => {

//   Seat.reserveSeat({ seats: req.body.seats }, (err, done) => {
//       if (err) {
//           res.json({
//               msg: "Failed to reserve seats " + err,
//               success: false,
//           });
//       } else {
//           let reservation = new Reservation({
//               firstName: req.body.personInfo.firstName,
//               lastName: req.body.personInfo.lastName,
//               email: req.body.personInfo.email,
//               seats: req.body.seats,
//               movie: req.body.movie
//           })
//           Reservation.addReservation(reservation, (err2, reserv) => {
//               if (err) {
//                   res.json({
//                       msg: "Failed to reserve seats " + err2,
//                       success: false,
//                   });
//               } else {
//                   res.json({
//                       msg: "Reservation has done: ",
//                       success: true,
//                       reservation: reserv,
//                       updatedSeats: done
//                   });
//               }
//           })
//       }
//   });
// });

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});