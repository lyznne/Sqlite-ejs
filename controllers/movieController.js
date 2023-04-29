const db = require("../database.js")
const movies = require("../response.js")
// create new movie item 
exports.createMovieItem = (req, res) => {
  const { id, rank, title, thumbnail, rating, year, image, description, trailer, genre, director, writers, imdbid } = req.body

  const movie = { id, rank, title, thumbnail, rating, year, image, description, trailer, genre, director, writers, imdbid }
  const q = "INSERT INTO movie (id, rank, title, thumbnail, rating, year, image, description, trailer, genre, director, writers, imdbid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

  db.run(q, [id, rank, title, thumbnail, rating, year, image, description, trailer, JSON.stringify(genre), JSON.stringify(director), JSON.stringify(writers), imdbid], (err) => {
    if (err) {
      console.log(err.message)
      res.status(500).send("Error creating new movie item")
      return
    } else {
      console.log(`A row has been inserted with rowid ${this.lastID}`)
      res.status(201).send(`${movie.title} has been created`)
    }
  })
}



//get movies from database
exports.getMovies = (req, res) => {
  const q = "SELECT * from movie"
  const params = []

  db.all(q, params, (err, data) => {
    if (err) {
      // console.log(err.message)
      res.status(500).send("Error retrieving movies from database")
    }
    // Render the movie data using the EJS template engine
    res.render('pages/index', { movies: data });
    // res.status(200).json(data)
  })
}

// get details for movie 
exports.getMovieDetail = (req, res) => {
  const q = "SELECT * FROM movie WHERE id = ?"
  const id = req.params.id

  db.get(q,[id], (err, data) => {
    if (err) {
      console.log(err.message)
      res.status(500).send("Error retrieving movie title")
    }

    const results = {
      ...data,
      genre: JSON.parse(data.genre),
      director: JSON.parse(data.director),
      writers: JSON.parse(data.writers)
    };

    res.render('pages/movie', {results})
  })
}


//delete movie from database
exports.deleteMovie = async (req, res) => {
  const q = "SELECT title FROM movie WHERE id = ?"
  const id = req.params.id
  console.log("ID", id)

  db.get(q, [id], (err, result) => {
    if (err) {
      console.log(err.message)
      res.status(500).send("Error retrieving movie title")
    }
    // console.log(result)
    if (!result) {
      res.status(404).send("No movie Found ")
    }
    const deleteQ = "DELETE FROM movie WHERE id = ?"


    db.run(deleteQ, [id], (err, data) => {
      if (err) {
        console.log(err.message)
        res.status(500).send("Error deleting movie")

      }
      res.status(200).send(`Successfully deleted movie with title: ${result.title}`)
    })


  })



}


// update a movie in the database
exports.updateMovie = (req, res) => {
  const id = req.params.id;
  const {
    rank,
    title,
    thumbnail,
    rating,
    year,
    image,
    description,
    trailer,
    genre,
    director,
    writers,
    imdbid,
  } = req.body;

  const q = `
      UPDATE movie SET
        rank = COALESCE(?, rank),
        title = COALESCE(?, title),
        thumbnail = COALESCE(?, thumbnail),
        rating = COALESCE(?, rating),
        year = COALESCE(?, year),
        image = COALESCE(?, image),
        description = COALESCE(?, description),
        trailer = COALESCE(?, trailer),
        genre = COALESCE(?, genre),
        director = COALESCE(?, director),
        writers = COALESCE(?, writers),
        imdbid = COALESCE(?, imdbid)
      WHERE id = ?
    `;

  const params = [
    rank,
    title,
    thumbnail,
    rating,
    year,
    image,
    description,
    trailer,
    JSON.stringify(genre),
    JSON.stringify(director),
    JSON.stringify(writers),
    imdbid,
    id,
  ];

  db.run(q, params, (err) => {
    if (err) {
      console.log(err.message);
      res.status(500).send("Failed to update movie");
    } else {
      res.status(200).send(`Successfully updated ${title} movie with id ${id}`);
    }
  });
};

// insert movies 
exports.insertMovies = () => {
  console.log(movies[0])

  movies.map((movie) => {
    const { id, rank, title, thumbnail, rating, year, image, description, trailer, genre, director, writers, imdbid } = movie

    // const movie = {id, rank, title, thumbnail, rating, year, image, description, trailer, genre, director, writers, imdbid}
    const q = "INSERT INTO movie (id, rank, title, thumbnail, rating, year, image, description, trailer, genre, director, writers, imdbid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.run(q, [id, rank, title, thumbnail, rating, year, image, description, trailer, JSON.stringify(genre), JSON.stringify(director), JSON.stringify(writers), imdbid], (err) => {
      if (err) {
        console.log(err.message)
        res.status(500).send("Error creating new movie item")
        return
      } else {
        console.log(`A row has been inserted with rowid ${this.lastID}`)
        res.status(201).send(`${movie.title} has been created`)
      }
    })

  })

}