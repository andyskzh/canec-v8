const express = require('express');
const router = express.Router();
const {
    getQueries,
    getQuery,
    createQuery,
    updateQuery,
    deleteQuery,
    getUserQueries
} = require('../controllers/queryController');
const { protect, adminMiddleware, consultorMiddleware } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getUserQueries) // Obtener las consultas del usuario autenticado
    .post(protect, createQuery);

router.route('/all')
    .get(protect, consultorMiddleware, getQueries); // Obtener todas las consultas para consultores

router.route('/:id')
    .get(protect, getQuery) // Obtener una consulta específica
    .put(protect, updateQuery) // Actualizar una consulta
    .delete(protect, deleteQuery); // Eliminar una consulta

module.exports = router;
