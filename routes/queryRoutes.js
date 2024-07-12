const express = require('express');
const router = express.Router();
const {
    getQueries,
    getQuery,
    createQuery,
    updateQuery,
    deleteQuery,
    getUserQueries,
    getAllQueries
} = require('../controllers/queryController');
const { protect, adminMiddleware, consultorMiddleware } = require('../middleware/authMiddleware');

// Rutas para usuarios autenticados
router.route('/')
    .get(protect, getUserQueries) // Obtener las consultas del usuario autenticado
    .post(protect, createQuery);

// Rutas para consultores
router.route('/all')
    .get(protect, consultorMiddleware, getAllQueries); // Obtener todas las consultas para consultores

// Rutas para administradores
router.route('/admin')
    .get(protect, adminMiddleware, getAllQueries); // Obtener todas las consultas para administradores

router.route('/admin/:id')
    .get(protect, adminMiddleware, getQuery) // Obtener una consulta específica
    .put(protect, adminMiddleware, updateQuery) // Actualizar una consulta
    .delete(protect, adminMiddleware, deleteQuery); // Eliminar una consulta

// Rutas generales
router.route('/:id')
    .get(protect, getQuery) // Obtener una consulta específica
    .put(protect, updateQuery) // Actualizar una consulta
    .delete(protect, deleteQuery); // Eliminar una consulta

module.exports = router;
