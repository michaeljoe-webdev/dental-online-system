const express = require('express');
const router = express.Router();
const slotsController = require('../controllers/slotsController');
const dentistsController = require('../controllers/dentistsController');
const usersController = require('../controllers/usersController.js');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, slotsController.getAllSlots);
router.post('/', authenticateToken, slotsController.createSlot);
router.get('/dentist/:dentist_id/:status', authenticateToken, dentistsController.getAllByStatus); 
router.get('/dentist/:dentist_id', authenticateToken, dentistsController.getAllSlotsById);
router.get('/user/:user_id/:status', authenticateToken, usersController.getAllByStatus); 
router.get('/user/:user_id', authenticateToken, usersController.getAllSlotsById);

module.exports = router;
