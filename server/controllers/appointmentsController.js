const Appointment = require('../models/Appointment'); 
const Slot = require('../models/Slot')
const verifyId = require('../utils/verifyId');


// Appointment
async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createAppointment(req, res) {
  const { user_id, dentist_id } = req.body;
  try {
    const dentist =  await verifyId('Dentist', dentist_id);
    if (dentist.error) {
        return res.status(dentist.status).json(dentist);
    }
    const user =  await verifyId('User', user_id);
    if (user.error) {
      return res.status(user.status).json(user);
    }
    const appointmentData = req.body;
    const newAppointment = await Appointment.createAppointment(appointmentData);
    if (newAppointment.error) {
        return res.status(newAppointment.status).json(newAppointment);
    }
    res.status(201).json({ message: 'Appointment created successfully', newAppointment });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAppointmentById(req, res) {
  try {
    const appointment = await verifyId('Appointment', req.params.id);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateAppointment(req, res) {
  try {
    const appointment =  await verifyId('Appointment', req.params.id);
    if (appointment.error) {
      return res.status(appointment.status).json(appointment);
    }

    const updatedAppointment = await Appointment.updateAppointment(req.params.id, req.body);
    res.status(201).json({ message: 'Appointment updated successfully', updatedAppointment });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteAppointment(req, res) {
  try {
    const appointment =  await verifyId('Appointment', req.params.id);
    if (appointment.error) {
      return res.status(appointment.status).json(appointment);
    }
    await Appointment.deleteAppointment(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function cancelAppointment(req, res) {
  try {
    const { slot_id } = req.body
    const deletedSlot = await Slot.deleteSlot(req.body)
    if(deletedSlot.error){
      return res.status(deletedSlot.status).send(deletedSlot)
    }
    const cancelledAppointment = await Appointment.cancelAppointment(slot_id);
    if(cancelledAppointment.error){
      return res.status(cancelledAppointment.status).send(cancelledAppointment)
    }
    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



module.exports = {
  getAllAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  cancelAppointment,
};
