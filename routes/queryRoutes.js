const express = require('express');
const router = express.Router();
const { getQueries, getQuery, createQuery, updateQuery, deleteQuery } = require('../controllers/queryController');
const { protect, consultorMiddleware } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getQueries)
  .post(protect, createQuery);

router.route('/:id')
  .get(protect, getQuery)
  .put(protect, consultorMiddleware, updateQuery)
  .delete(protect, deleteQuery);

module.exports = router;
