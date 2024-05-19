const Dentist = require('../models/Dentist');
const verifyId = require('../utils/verifyId');

// OKAY
async function getAllDentists(req, res) {
  try {
    const dentists = await Dentist.getAllDentists();
    res.json(dentists);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// OKAY
async function createDentist(req, res) {
  try {
    const dentistData = req.body;
    const newDentist = await Dentist.createDentist(dentistData);
    res.status(201).json(newDentist);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// OKAY
async function getDentistById(req, res) {
  try {
    const dentist = await verifyId('Dentist', req.params.id);
    res.json(dentist);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// OKAY
async function getDentistWorkingSchedule(req, res){
  try {
    const dentist = await verifyId('Dentist', req.params.id);
    if (dentist.error) {
      return res.status(dentist.status).json(dentist);
    }
    const workingSchedule = await Dentist.getDentistWorkingSchedule(dentist.dentist_id)
    res.json(workingSchedule);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// OKAY
async function getDentistSchedules(req, res){
  try {
    const dentist = await verifyId('Dentist', req.params.id);
    if (dentist.error) {
      return res.status(dentist.status).json(dentist);
    }
    const schedules = await Dentist.getDentistSchedules(req.params.id)
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// OKAY
async function getDentistScheduleToday(req, res){
  try {
    const dentist = await verifyId('Dentist', req.params.id);
    if (dentist.error) {
      return res.status(dentist.status).json(dentist);
    }
    const scheduleToday = await Dentist.getDentistScheduleToday(req.params.id)
    res.json(scheduleToday);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getDentistScheduleByDate(req, res){
  try {
    const dentist = await verifyId('Dentist', req.params.id);
    if (dentist.error) {
      return res.status(dentist.status).json(dentist);
    }
    const scheduleByDate = await Dentist.getDentistScheduleByDate(req.params.id,req.params.date )
    res.json(scheduleByDate);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// OKAY
async function updateDentist(req, res) {
  try {
    const dentist = await verifyId('Dentist', req.params.id);
    if (dentist.error) {
      return res.status(dentist.status).json(dentist);
    }

    const updatedDentist = await Dentist.updateDentist(req.params.id, req.body);
    res.status(201).json({ message: 'Dentist updated successfully', updatedDentist });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// OKAY
async function deleteDentist(req, res) {
  try {
    const dentist =  await verifyId('Dentist', req.params.id);
    if (dentist.error) {
      return res.status(dentist.status).json(dentist);
    }
    // await Dentist.deleteDentist(req.params.id);
    req.body.deleted_at = new Date();
    await Dentist.updateDentist(req.params.id, req.body);
    res.status(200).json({ message: 'Dentist deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// ============= //
// === SLOTS === //
// ============= //
async function getAllByStatus(req, res) {
  try {
      const dentist_id = req.params.dentist_id;
      const status = req.params.status;
      const dentist = await verifyId('Dentist', dentist_id);
      if (dentist.error) {
        return res.status(dentist.status).json(dentist);
      }
      const slots = await Dentist.getAllByStatus(dentist_id, status);
      res.json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllSlotsById(req, res) {
try {
  const dentist = await verifyId('Dentist', req.params.dentist_id);
  if (dentist.error) {
    return res.status(dentist.status).json(dentist);
  }
  const slots = await Dentist.getAllSlotsById(req.params.dentist_id)

  res.json(slots);
} catch (error) {
  res.status(500).json({ error: 'Internal Server Error' });
}
}


module.exports = {
  getAllDentists,
  createDentist,
  getDentistById,
  getDentistWorkingSchedule,
  getDentistSchedules,
  getDentistScheduleToday,
  getDentistScheduleByDate,
  updateDentist,
  deleteDentist,

  
  getAllByStatus,
  getAllSlotsById,
};
