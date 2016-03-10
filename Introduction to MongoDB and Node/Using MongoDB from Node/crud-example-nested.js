var mongodb = require('mongodb');
var uri = 'mongodb://localhost:27017/example';
mongodb.MongoClient.connect(uri, function(error, db) {
  if(error) {
    console.log(error);
    process.exit(1);
  }

  var doc = {
    title: 'Jaws',
    year: 1975,
    director: 'Steven Spilberg',
    rating: 'PG',
    ratings: {
      critics: 80,
      audience: 97
    },
    sceenplay: ['Peter Benchley', 'Carl Gotlieb']
  };

  db.collection('movies').insert(doc, function(error, result) {
    if(error) {
      console.log(error);
      process.exit(1);
    }

    var query = {year: 1975, rating: 'PG'};
    db.collection('movies').find({'ratings.audience': {'$gte': 90}}).toArray(function(error, movies) {
      if(error) {
        console.log(error);
        process.exit(1);
      }
      console.log('Found movies: ');
      movies.forEach(function(movie) {
        console.log(JSON.stringify(movie));
      });
      process.exit(0);
    });
  });
});
