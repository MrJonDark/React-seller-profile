import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "1",
    title: "Terminator",
    image:'https://dummyimage.com/100x100/25/ffff',
    price:'1500LE',
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },

        DiscountedPrice:'1300LE',
    numberInStock: 6,
    Status: 'true',
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "2",
    title: "Die Hard",
    image:'https://dummyimage.com/100x100/25/ffff',
    price:'1500LE',
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },

    DiscountedPrice:'1300LE',    numberInStock: 5,
    Status: 'true'
  },
  {
    _id: "3",
    title: "Get Out",
    image:'https://dummyimage.com/100x100/25/ffff',
    price:'1500LE',
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },

    DiscountedPrice:'1300LE',    numberInStock: 8,
    Status:'false'
  },
  {
    _id: "4",
    title: "Trip to Italy",
    image:'https://dummyimage.com/100x100/25/ffff',
    price:'1500LE',
        genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },

    DiscountedPrice:'1300LE',    numberInStock: 7,
    Status:'false'
  },
  {
    _id: "5",
    title: "Airplane",
    image:'https://dummyimage.com/100x100/25/ffff',
    price:'1500LE',
        genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },

    DiscountedPrice:'1300LE',    numberInStock: 8,    numberInStock: 7,
    Status:'false'
  },
  {
    _id: "6",
    title: "Wedding Crashers",
    image:'https://dummyimage.com/100x100/25/ffff',
    price:'1500LE3',
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    DiscountedPrice:'1300LE',    numberInStock: 7,
    Status: 'true'
  },
  {
    _id: "7",
    title: "Gone Girl",
    image:'https://dummyimage.com/100x100/25/ffff',
    price:'1500LE',
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    DiscountedPrice:'1300LE',    numberInStock: 7,
    Status: 'true'
  },
  {
    _id: "8",
    title: "The Sixth Sense",
    image:'https://dummyimage.com/100x100/25/ffff',
    price:'1500LE',
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    DiscountedPrice:'1300LE',    numberInStock: 4,
    Status:'false'
  },
  {
    _id: "9",
    title: "The Avengers",
    image:'https://dummyimage.com/100x100/25/ffff',
    price:'1500LE',
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    DiscountedPrice:'1300LE',    numberInStock: 7,
    Status:'false'
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
