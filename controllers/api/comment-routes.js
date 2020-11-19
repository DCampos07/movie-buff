const router = require('express').Router();
const { response } = require('express');
const { Comment } = require('../../models');

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
      movie_title = movie_title
    }
  })
  .then(response => {
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
