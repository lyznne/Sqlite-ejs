const express = require("express")
const { createMovieItem, getMovies, deleteMovie, updateMovie, insertMovies, getMovieDetail } = require("../controllers/movieController.js")

const router = express.Router()

router.post('/movie', createMovieItem)
router.get('/movie', getMovies)
router.get('/movie/:id', getMovieDetail)
router.delete('/movie/:id',deleteMovie )
router.put('/movie/:id', updateMovie)
router.get('/movies', insertMovies)

module.exports = router