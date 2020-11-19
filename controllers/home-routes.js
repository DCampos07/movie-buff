const router = require("express").Router();
const sequelize = require("../config/connection");
const axios = require("axios");
const fetch = require("isomorphic-fetch");
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  // const response = await axios.get("http://www.omdbapi.com/?t=Toy+Story&apikey=d69ff318");
  // const response2 = await axios.get("http://www.omdbapi.com/?t=Titanic&apikey=d69ff318");
  // const response3 = await axios.get("http://www.omdbapi.com/?t=Frozen&apikey=d69ff318");

  // console.log(response.data.Title);
  // console.log(response2.data.Title);
  // console.log(response3.data.Title);
  const movies = [];

  const titles = [
    "Toy Story",
    "A Bug's Life",
    "Toy Story 2",
    "Monsters, Inc.",
    "Finding Nemo",
    "The Incredibles",
    "Cars",
    "Ratatouille",
    "WALL-E",
    "Up",
    "Toy Story 3",
    "Cars 2",
    "Brave",
    "Monsters University",
    "Inside Out",
    "The Good Dinosaur",
    "Finding Dory",
    "Cars 3",
    "Coco",
    "Incredibles 2",
    "Toy Story 4",
    "Onward",
  ];
  for (let i = 0; i < titles.length; i++) {
    const response = await axios.get(
      `https://www.omdbapi.com/?t=${titles[i]}&apikey=d69ff318`
    );
    // console.log(response.data.Title);
    // console.log(response)
    const movie = {
      id: response.data.imdbID,
      title: response.data.Title,
      poster: response.data.Poster,
      plot: response.data.Plot,
      actors: response.data.Actors,
      runtime: response.data.Runtime,
    };

    movies.push(movie);
  }
  console.log(movies);

  res.render("homepage", {
    loggedIn: req.session.loggedIn,
    movies: movies,
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/search", (req, res) => {
  res.render("search");
});

router.get("/movie", async (req, res) => {
  // console.log(req.query);
  const title = req.query.title;

  const comments = await Comment.findAll({
    where: {
      movie_title: title
    },
    attributes: [
      'id',
      'comment_text',
      //movie_tile -from commentes table select * from comments where movie-title = "movieTitle"
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.movie_title = movie_title)'), 'movie_title']
      // [sequelize.literal('(SELECT COUNT(*) FROM rate WHERE post.id = movie.post_id)'), 'rate_count']
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  console.log(comments)

    const response = await axios.get(
      "https://www.omdbapi.com/?t=" + title + "&apikey=d69ff318"
    );
    const movie = {
      id: response.data.imdbID,
      title: response.data.Title,
      poster: response.data.Poster,
      plot: response.data.Plot,
      runtime: response.data.Runtime,
      comments: comments,
    };
  
    console.log(movie);
  
  // fetch/api/comments/<movie_title) GET //movie.comments = movie.title
  // movie.comments = fetch/api/comments/<movie_title) GET //movie.comments = movie.title
  res.render("movie", {
    loggedIn: req.session.loggedIn,
    userId: req.session.user_id,
    movie: movie,
  });
});

module.exports = router;
