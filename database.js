const sqlite3 = require("sqlite3").verbose()

const db  = new sqlite3.Database("db.movies", (err) => {
    if (err) {
        console.log(err.message)
        throw err
    } else {
        console.log(" [=] Connected to database [=] ")
        const q = `CREATE TABLE movie (
            id TEXT PRIMARY KEY,
            rank INTEGER , 
            title TEXT,
            thumbnail TEXT,
            rating REAL,
            year INTEGER,
            image TEXT,
            description TEXT,
            trailer TEXT,
            genre TEXT,
            director TEXT,
            writers TEXT,
            imdbid TEXT
        )`

        db.run(q , (err) => {
            if (err){
                //table already created   
            }
            // else {
            //     const insert = "INSERT INTO movie (id, rank, title, thumbnail, rating, year, image, description, trailer, genre, director, writers, imdbid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
            //     const values =[
            //         'top1',
            //         1,
            //         'The Shawshank Redemption',
            //         'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg',
            //         9.3,
            //         1994,
            //         'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg',
            //         'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            //         'https://www.youtube.com/embed/NmzuHjWmXOc',
            //         'Drama',
            //         'Frank Darabont',
            //         'Stephen King (based on the short novel "Rita Hayworth and the Shawshank Redemption" by),Frank Darabont (screenplay by)',
            //         'tt0111161'
            //     ]

            //     db.run(insert, values)
                
            // }
        })
    }
})

module.exports = db