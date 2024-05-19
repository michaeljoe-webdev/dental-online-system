const express = require('express');
const router = express.Router();
const dentistsController = require('../controllers/dentistsController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/', authenticateToken, dentistsController.getAllDentists);
router.post('/', authenticateToken, dentistsController.createDentist);
router.get('/:id', authenticateToken, dentistsController.getDentistById);
router.get('/:id/working-schedule', authenticateToken,dentistsController.getDentistWorkingSchedule);
router.get('/:id/appointments', authenticateToken, dentistsController.getDentistSchedules);
router.get('/:id/appointments-today', authenticateToken, dentistsController.getDentistScheduleToday);
router.get('/:id/:date', authenticateToken, dentistsController.getDentistScheduleByDate);
router.put('/:id', authenticateToken, dentistsController.updateDentist);
router.delete('/:id', authenticateToken, dentistsController.deleteDentist);

module.exports = router;
