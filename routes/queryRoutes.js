const express = require('express');
const router = express.Router();
const {
    getQueries,
    getQuery,
    createQuery,
    updateQuery,
    deleteQuery,
    getUserQueries // asegúrate de tener esta función en tu controlador
} = require('../controllers/queryController');
const { protect, adminMiddleware, consultorMiddleware } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, adminMiddleware, getQueries) // o consultorMiddleware dependiendo de quién tiene acceso
    .post(protect, adminMiddleware, createQuery);

router.route('/:id')
    .get(protect, getQuery)
    .put(protect, adminMiddleware, updateQuery)
    .delete(protect, adminMiddleware, deleteQuery);

router.route('/myqueries')
    .get(protect, getUserQueries);

module.exports = router;
