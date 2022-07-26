
const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
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

const Movie = module.exports = mongoose.model('Movie', MovieSchema);

module.exports.addMovie = function(movie, callback)
{
    movie.save(callback);
};

module.exports.removeMovie = function(id, callback)
{
    Movie.findByIdAndDelete(id, callback);
};


  