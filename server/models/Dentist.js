const knex = require('../config/db');
const TABLE_NAME = 'dentists';
const currentDate = require('../utils/currentDate');
const currentTime = require('../utils/currentTime');

// OKAY
async function getAllDentists() {
  return await knex('dentists as D')
  .select('*', knex.raw("LPAD(D.dentist_id, 5, '0') AS dentist_id"))
  .leftJoin('working_days as W', 'D.dentist_id', 'W.dentist_id')
  .whereNull('D.deleted_at');

}

// OKAY
async function createDentist(dentistData) {
  try {
    dentistData.created_at = currentDate + "T" + currentTime
    dentistData.updated_at = currentDate + "T" + currentTime
    dentistData.deleted_at = null
    const [dentistId] = await knex(TABLE_NAME).insert(dentistData);
    await knex('working_days').insert({ 'dentist_id': dentistId});
    const newDentist = await knex(TABLE_NAME).where('dentist_id', dentistId).first();
    return newDentist;
  } catch (error) {
    throw error; 
  }
}

// OKAY
async function getDentistById(dentistId) {
  return knex(TABLE_NAME).select('*', knex.raw("LPAD(dentist_id, 5, '0') AS dentist_id")).where('dentist_id', dentistId).andWhere('deleted_at', null).first();
}

// OKAY
async function getDentistWorkingSchedule(dentistId) {
  return knex('working_days').where('dentist_id', dentistId).first();
}

// OKAY
async function getDentistSchedules(dentistId) {
  return await knex('appointments as A')
    .select('*')
    .leftJoin('dentists as D', 'A.dentist_id', 'D.dentist_id')
    .where('A.dentist_id', dentistId)
    .whereNull('D.deleted_at')
    .andWhere('A.status', 'scheduled')
    .andWhere('A.appointment_datetime', '>=', currentDate)
    .orderBy('A.appointment_datetime');
}

// OKAY
async function getDentistScheduleToday(dentistId) {
  return await knex('appointments as A')
    .select('*')
    .leftJoin('dentists as D', 'A.dentist_id', 'D.dentist_id')
    .where('A.dentist_id', dentistId)
    .whereNull('D.deleted_at')
    .andWhere('A.status', 'scheduled')
    // .andWhere('A.appointment_datetime', '>', knex.raw('NOW()')) // Include appointments scheduled for the future
    .andWhereRaw('DATE(A.appointment_datetime) = ?', [currentDate]) // Filter appointments for today
    .orderBy('A.appointment_datetime');
}

async function getDentistScheduleByDate(dentistId, date) {
  return await knex('slots')
    .select('*')
    .where('dentist_id', dentistId)
    .andWhereRaw('DATE(date) = ?', [date]) // Filter appointments for today
    .andWhere('status', 'booked')
    .orderBy('start_time');
}


// OKAY
async function updateDentist(dentistId, updatedData) {
  updatedData.updated_at = currentDate + "T" + currentTime
  await knex(TABLE_NAME).where('dentist_id', dentistId).update(updatedData);
  const updatedDentist = await knex(TABLE_NAME).where('dentist_id', dentistId).first();
  return updatedDentist
}

// OKAY
async function deleteDentist(dentistId) {
  return knex(TABLE_NAME).where('dentist_id', dentistId).del();
}

// SLOTS
async function getAllByStatus(dentist_id, status) {
  return knex('slots').select('*').where('dentist_id',dentist_id).andWhere('date', '>=', currentDate).andWhere('status',status);
}

async function getAllSlotsById(dentist_id) {
  return knex('slots').select('*').where('dentist_id',dentist_id).andWhere('date', '>=', currentDate);
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
