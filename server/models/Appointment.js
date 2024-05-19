const knex = require('../config/db'); // Assuming you have configured Knex
const TABLE_NAME = 'appointments';
const currentDate = require('../utils/currentDate');


async function getAllAppointments() {
  return knex(TABLE_NAME).select('*', knex.raw("LPAD(appointment_id, 8, '0') AS appointment_id")).where('appointment_datetime', '>', currentDate);
}
// async function getScheduledAppointments() {
//   return knex(TABLE_NAME).select('*');
// }

async function createAppointment(appointmentData) {
  try {
    const exist = await knex('appointments')
      .select('*')
      .where('dentist_id',appointmentData.dentist_id)
      .andWhere('appointment_datetime',appointmentData.appointment_datetime)
      .andWhere('status', 'scheduled')
      .first();
    if (exist) {
        return { status: 409 , error: `Conflict record found` }
    }
    const [appointmentId] = await knex(TABLE_NAME).insert(appointmentData);
    const newAppointment = await knex(TABLE_NAME).where('appointment_id', appointmentId).first();
    return newAppointment;
  } catch (error) {
    throw error; 
  }
}

async function getAppointmentById(appointmentId) {
  return knex(TABLE_NAME).select('*', knex.raw("LPAD(appointment_id, 8, '0') AS appointment_id")).where('appointment_id', appointmentId).first();
}

async function updateAppointment(appointmentId, updatedData) {
  await knex(TABLE_NAME).where('appointment_id', appointmentId).update(updatedData);
  const updatedAppointment = await knex(TABLE_NAME).where('appointment_id', appointmentId).first();
  return updatedAppointment
}

async function deleteAppointment(appointmentId) {
  return knex(TABLE_NAME).where('appointment_id', appointmentId).del();
}

async function cancelAppointment(slotId) {
  const exist = await knex(TABLE_NAME).where('slot_id', slotId).first();
  if(!exist){
    return { status: 404 , error: 'No Record Found' }
  }
  exist.status = 'cancelled'
  const updatedAppointment = exist
  await knex(TABLE_NAME).where('slot_id', slotId).update(updatedAppointment);
  return updatedAppointment
}

module.exports = {
  getAllAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  cancelAppointment
};
