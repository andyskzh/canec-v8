const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, adminMiddleware } = require('../middleware/authMiddleware');

router.route('/').get(protect, adminMiddleware, getAllUsers);
router.route('/profile')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, adminMiddleware, deleteUser);

module.exports = router;
