const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, appointmentsController.getAllAppointments);
router.post('/', authenticateToken, appointmentsController.createAppointment);
router.get('/:id', authenticateToken, appointmentsController.getAppointmentById);
router.put('/:id', authenticateToken, appointmentsController.updateAppointment);
router.delete('/:id', authenticateToken, appointmentsController.deleteAppointment);
router.post('/cancel', authenticateToken, appointmentsController.cancelAppointment);




module.exports = router;
