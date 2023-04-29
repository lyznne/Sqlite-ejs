const express = require("express")
const db = require("./database.js")
const cors = require("cors")
const app = express()

//import controllers and routers
const movieRouter = require("./routes/movieRouter.js")
const { getMovies, createMovieItem, deleteMovie, updateMovie, insertMovies, getMovieDetail } = require("./controllers/movieController.js")

//set the view engine 
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000;

// create new movie 
app.post('/movie', createMovieItem)
app.get('/', getMovies)
app.delete('/movie/:id', deleteMovie)
app.put('movie/:id', updateMovie)
app.get('/movies', insertMovies)
app.get('movie/:id', getMovieDetail)

// about page 
app.get ('/about', (req,res) => {
    res.render('pages/about')
})

//mount the routers
app.use("/", movieRouter)

// define the catch-all route at the end
app.get('*', (req, res) => {
    res.status(404).render('pages/404')
  })
  


app.listen(port,() => {
    console.log(` [=]  Server running at port ${port}  [=]`)
} )