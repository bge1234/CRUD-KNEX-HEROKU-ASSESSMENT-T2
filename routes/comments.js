var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/:post_id/comments', function(req, res, next) {
  knex('comments').where('post_id', req.params.post_id).select().then(function(results) {
    res.json({'SUCCESS': results});
  });
});

router.post('/:post_id/comments', function(req, res, next) {
  knex('comments').insert({
    post_id: req.params.post_id,
    commenter: req.body.commenter,
    body: req.body.body
  }).then(function(result) {
    res.redirect('/posts/' + req.params.post_id + '/comments');
  });
});

router.get('/:post_id/comments/:id', function(req, res, next) {
  knex('comments').where('id', req.params.id).select().then(function(results) {
    res.json({'SUCCESS': results[0]});
  });
});

router.get('/:post_id/comments/:id/edit', function(req, res, next) {
  knex('comments').where('id', req.params.id).select().then(function(results) {
    res.json({'SUCCESS': results});
  });
});


router.post('/:post_id/comments/:id', function(req, res, next) {
  knex('comments').where('id', req.params.id).update(req.body).then(function(result) {
    res.redirect('/posts/:post_id/comments/' + req.params.id);
  });
});

router.post('/:post_id/comments/:id/delete', function(req, res, next) {
  knex('commoents').where('id', req.params.id).del().then(function(result) {
    res.redirect('/posts/:post_id/comments');
  });
});

module.exports = router;
