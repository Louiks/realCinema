require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const app = express();
const database = require('./models');
const configDatabase = require('./config/database');
const { init } = require('express/lib/application');
const res = require('express/lib/response');
const Role = database.role;


database.mongoose.connect(configDatabase.database, {
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

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieSession({
    name: "session",
    secret: process.env.COOKKIE_SECRET,
    httpOnly: true
}));

require('./routes/authRoute')(app);

// seats 

const SeatSchema = new database.mongoose.Schema({
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
      default: false
  },
});

const Seat = new database.mongoose.model("Seat", SeatSchema);


/////////// Seats ////////////////////////////////

app.route("/seats")

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
  const newSeat = Seat({
    row: req.body.row,
    column: req.body.column,
    isReserved: false
  });
  newSeat.save(function(err){
    if(!err){
      res.send("Successfully added a new seat");
    }
  });
})


.delete(function(req, res){
  Seat.deleteMany(function(err){
    if(!err){
      res.send("Successfully delete all seats!");
    } else {
      res.send(err);
    }
  });
});


app.route("/seats/:seatsRowColumn")

.get(function(req, res){
  const seatRow = req.params.seatRow;
  const seatColumn = req.params.seatColumn;
  Seat.findOne({row: seatRow, column: seatColumn}, function(err, seat){
    if(seat){
      const jsonSeat = JSON.stringify(seat);
      res.send(jsonSeat);
    }
    else {
      res.send("No seat find");
    }
  });
})

.patch(function(req, res){
  const seatRow = req.params.seatRow;
  const seatColumn = req.params.seatColumn;
  Seat.update(
      { row: seatRow },
      { column: seatColumn},
      {isReserved: req.body.isReservedSeat},
  function(err){
    if(!err){
      res.send("Successfully updated selected seat.");
    }
    else {
      res.send(err);
    }
  });
})

.put(function(req, res){
  const seatRow = req.params.seatRow;
  const seatColumn = req.params.seatColumn;
  Seat.update(
    {row: seatRow},
    {column: seatColumn},
    {isReserved: false},
    function(err)
    {
      if(!err){
        res.send("Successfully updated selected seat");
      } else {
        res.send(err);
      }
    });
})

.delete(function(req, res){
  const seatRow = req.params.seatRow;
  const seatColumn = req.params.seatColumn;
  Seat.findOneAndDelete({row: seatRow}, {column: seatColumn}, function(err){
    if(!err){
      res.send("Successfully deleted selected seat!");
    } else {
      res.send(err);
    }
  });
});

// reservation

const ReservationSchema = new database.mongoose.Schema({
  username: {
      type: String,
      required: true
  },
  seats: [{
      type: database.mongoose.Schema.Types.Mixed, ref: 'Seat',
      required: true
  }],
  movie: {
      type: database.mongoose.Schema.Types.Mixed, ref: 'Movie',
      required: true
  },

  hall: {
      type: database.mongoose.Schema.Types.Mixed, ref: 'Hall',
      required: true
  },

  date: {
      type: Date,
      required: true
  },

});

const Reservation = new database.mongoose.model("Reservation", ReservationSchema);


// movies

const MovieSchema = new database.mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  year: {
      type: Date,
  },
  author: {
      type: String,
      required: true
  },
});

const Movie = new database.mongoose.model("Movie", MovieSchema);

app.route("/movies")

.get(function(req, res){
  Movie.find(function(err, movies){
    if(movies) {
      const jsonMovies = JSON.stringify(movies);
      res.send(jsonMovies);
    }
    else
    {
      res.send("No movies");
    }
  });
})

.post(function(req, res){
  const newMovie = Movie({
    name: req.body.name,
    year: req.body.year,
    author: req.body.author
  });
  newMovie.save(function(err){
    if(!err){
      res.send("Successfully added a new movie");
    }
  });
})


.delete(function(req, res){
  Movie.deleteMany(function(err){
    if(!err){
      res.send("Successfully delete all movies!");
    } else {
      res.send(err);
    }
  });
});


app.route("/movies/:movieName")

.get(function(req, res){
  const movieName = req.params.movieName;
  Movie.findOne({name: movieName}, function(err, movie){
    if(movie){
      const jsonMovie = JSON.stringify(movie);
      res.send(jsonMovie);
    }
    else {
      res.send("No movie find");
    }
  });
})

.patch(function(req, res){
  const movieName = req.params.movieName;
  Movie.update(
      { name: movieName },
      { year: req.body.yearFilm},
      {author: req.body.authorName},
  function(err){
    if(!err){
      res.send("Successfully updated selected movie.");
    }
    else {
      res.send(err);
    }
  });
})

.put(function(req, res){
  const movieName = req.params.movieName;
  Movie.update(
    {name: movieName},
    {year: req.body.yearFilm},
    {author: req.body.authorName},
    function(err)
    {
      if(!err){
        res.send("Successfully updated selected movie");
      } else {
        res.send(err);
      }
    });
})

.delete(function(req, res){
  const movieName = req.params.movieName;
  Seat.findOneAndDelete({name: movieName}, function(err){
    if(!err){
      res.send("Successfully deleted selected movie!");
    } else {
      res.send(err);
    }
  });
});


// hall

const HallSchema = new database.mongoose.Schema({
  NumberOfHall: {
      type: Number,
      required: true,
      unique: true
  },
  NumberOfColumns: {
      type: Number,
      required: true
  },
  NmberOfRows: {
      type: Number,
      required: true
  },
});

const Hall = new database.mongoose.model("Hall", HallSchema);


app.route("/halls")

.get(function(req, res){
  Hall.find(function(err, halls){
    if(halls) {
      const jsonHalls = JSON.stringify(halls);
      res.send(jsonHalls);
    }
    else
    {
      res.send("No halls");
    }
  });
})

.post(function(req, res){
  const newHall = Hall({
    NumberOfHall: req.body.numberOfHall,
    NumberOfColumns: req.body.numberOfColumns,
    NumberOfRows: req.body.numberOfRows
  });
  newHall.save(function(err){
    if(!err){
      res.send("Successfully added a new hall");
    }
  });
})


.delete(function(req, res){
  Hall.deleteMany(function(err){
    if(!err){
      res.send("Successfully delete all halls!");
    } else {
      res.send(err);
    }
  });
});


app.route("/halls/:hallnumber")

.get(function(req, res){
  const hallNumber = req.params.hallNumber;
  Movie.findOne({NumberOfHall: hallNumber}, function(err, hall){
    if(hall){
      const jsonHall = JSON.stringify(hall);
      res.send(jsonHall);
    }
    else {
      res.send("No hall find");
    }
  });
})

.patch(function(req, res){
  const hallNumber = req.params.hallNumber;
  Hall.update(
      { NumberOfHall: hallNumber },
      { NumberOfColumns: req.body.numberOfColumns},
      {NumberOfRows: req.body.numberOfRows},
  function(err){
    if(!err){
      res.send("Successfully updated selected hall.");
    }
    else {
      res.send(err);
    }
  });
})

.put(function(req, res){
  const hallNumber = req.params.hallNumber;
  Hall.update(
    {NumberOfHall: hallNumber},
    {NumberOfColumns: req.body.numberOfColumns},
    {NumberOfRows: req.body.numberOfRows},
    function(err)
    {
      if(!err){
        res.send("Successfully updated selected hall");
      } else {
        res.send(err);
      }
    });
})

.delete(function(req, res){
  const hallNumber = req.params.hallNumber;
  Hall.findOneAndDelete({NumberOfHall: hallNumber}, function(err){
    if(!err){
      res.send("Successfully deleted selected hall!");
    } else {
      res.send(err);
    }
  });
});

// ticket

const TicketSchema = new database.mongoose.Schema({
  datesOfFilm: {
      type: [Date],
      required: true
  },
  movie: {
      type: database.mongoose.Schema.Types.ObjectId, ref: 'Movie',
      required: true
  },
  seats: [
      {
          type: database.mongoose.Schema.Types.Mixed, ref: 'Seat',
          required: true
      }
  ],
  hall: {
      type: database.mongoose.Schema.Types.ObjectId, ref: 'Room',
      required:  true
  },
});


const Ticket = new database.mongoose.model('Ticket', TicketSchema);

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});