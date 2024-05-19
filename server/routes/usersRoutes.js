const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js');
const { authenticateToken } = require('../middleware/authMiddleware'); 


router.get('/', authenticateToken, usersController.getAllUsers);
router.post('/', authenticateToken, usersController.createUser);
router.get('/:id', authenticateToken, usersController.getUserById);
router.get('/:id/appointments', authenticateToken, usersController.getUserSchedules);
router.put('/:id', authenticateToken, usersController.updateUser);
router.delete('/:id', authenticateToken, usersController.deleteUser);

module.exports = router;
