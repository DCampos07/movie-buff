const router = require('express').Router();
const { response } = require('express');
const sequelize = require('../../config/connection');
const { Comment, User } = require('../../models');

//Find Comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:movie_title', (req, res) =>{
  Comment.findAll({
    where: {
      movie_title: req.params.movie_title
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
  .then(response => {
    res.json(response);
    console.log(response);
  })

});

// Create Comment
router.post('/', (req, res) => {

  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    movie_title: req.body.movie_title
  })
    .then(dbCommentData => {
      console.log(dbCommentData)
      res.json(dbCommentData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
