const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, adminMiddleware, getUsers)
    .post(protect, adminMiddleware, createUser);

router.route('/:id')
    .get(protect, adminMiddleware, getUser)
    .put(protect, adminMiddleware, updateUser)
    .delete(protect, adminMiddleware, deleteUser);

module.exports = router;
