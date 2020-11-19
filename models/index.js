// import all models
const Post = require('./Post');
const User = require('./User');
const Rate = require('./Rate');
const Comment = require('./Comment');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
  through: Rate,
  as: 'rated_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
  through: Rate,
  as: 'rated_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Rate.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Rate.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Rate, {
  foreignKey: 'user_id'
});

Post.hasMany(Rate, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Comment.belongsTo(Movie, {
//   foreignKey: 'movie_title',
//   onDelete: 'SET NULL'
// });

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Rate, Comment };