var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  knex('posts').select().then(function(results) {
    res.json({'SUCCESS': results});
  });
});

router.post('/', function(req, res, next) {
  knex('posts').insert(req.body).then(function(result) {
    res.redirect('/posts');
  });
});

router.get('/:id', function(req, res, next) {
  knex('posts').where('id', req.params.id).select().then(function(results) {
    res.json({'SUCCESS': results[0]});
  });
});

router.get('/:id/edit', function(req, res, next) {
  knex('posts').where('id', req.params.id).select().then(function(results) {
    res.json({'SUCCESS': results});
  });
});

router.post('/:id', function(req, res, next) {
  knex('posts').where('id', req.params.id).update(req.body).then(function(result) {
    res.redirect('/posts/' + req.params.id);
  });
});

router.post('/:id/delete', function(req, res, next) {
  knex('posts').where('id', req.params.id).del().then(function(result) {
    res.redirect('/posts');
  });
});

module.exports = router;
