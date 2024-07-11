const express = require('express');
const router = express.Router();
const { getQueries, getQuery, createQuery, updateQuery, deleteQuery, getUserQueries } = require('../controllers/queryController');
const { protect, consultorMiddleware } = require('../middleware/authMiddleware');

// Ruta específica para obtener las consultas del usuario autenticado
router.get('/myqueries', protect, getUserQueries);

// Ruta para obtener todas las consultas y crear una nueva consulta
router.route('/')
  .get(protect, getQueries)
  .post(protect, createQuery);

// Rutas para operaciones específicas en una consulta existente
router.route('/:id')
  .get(protect, getQuery)
  .put(protect, consultorMiddleware, updateQuery)
  .delete(protect, deleteQuery);

module.exports = router;
