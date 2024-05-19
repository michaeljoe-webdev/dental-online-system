const knex = require('../config/db');
const TABLE_NAME = 'users';
const currentDate = require('../utils/currentDate');

async function getAllUsers() {
  return await knex(TABLE_NAME).select('*', knex.raw("LPAD(user_id, 8, '0') AS user_id")).where('deleted_at', null);
}

async function createUser(userData) {
  try {
    const [userId] = await knex(TABLE_NAME).insert(userData);
    const newUser = await knex(TABLE_NAME).where('user_id', userId).first();
    return newUser;
  } catch (error) {
    throw error; 
  }
}

async function getUserById(userId) {
  return knex(TABLE_NAME).select('*', knex.raw("LPAD(user_id, 8, '0') AS user_id")).where('user_id', userId).andWhere('deleted_at', null).first();
}

async function getUserSchedules(user_id) {
  // const currentDate = new Date().toISOString().slice(0, 10);
  return await knex('appointments as A')
    .select('*')
    .leftJoin('users as U', 'A.user_id', 'U.user_id')
    .where('A.user_id', user_id)
    .whereNull('U.deleted_at')
    // .andWhere('A.status', 'scheduled')
    // .andWhere('A.appointment_datetime', '>', knex.raw('NOW()'))
    // .andWhere('A.appointment_datetime', '>', knex.raw([currentDate]))
    // .andWhereRaw('DATE(A.appointment_datetime) = ?', [currentDate]) // Appointments for today
    .orderBy('A.appointment_datetime');
}

async function updateUser(userId, updatedData) {
  await knex(TABLE_NAME).where('user_id', userId).update(updatedData);
  const updatedUser = await knex(TABLE_NAME).where('user_id', userId).first();
  return updatedUser
}

async function deleteUser(userId) {
  return knex(TABLE_NAME).where('user_id', userId).del();
}

// AUTH
async function checkExistingUser (user) {
  try {
    const existingUser = await knex(TABLE_NAME).where('username', user).orWhere('email', user).first();
    return existingUser
  } catch (error) {
    throw error;
  }
};


async function verifyUser(user_id, full_name){
  try {
    const existingUser = await knex(TABLE_NAME).where('user_id', user_id).andWhere('full_name', full_name).first();
    return existingUser
  } catch (error) {
    throw error;
  }
}

// SLOTS
async function getAllByStatus(user_id, status) {
  return knex('slots').select('*').where('user_id',user_id).andWhere('date', '>=', currentDate).andWhere('status',status);
}

async function getAllSlotsById(user_id) {
  return knex('slots as S')
  .select('S.*', 'D.name')
  .leftJoin('dentists as D', 'S.dentist_id', 'D.dentist_id')
  .where('S.user_id', user_id)
  .orderBy('S.date')
  .orderBy('S.start_time');
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserSchedules,
  updateUser,
  deleteUser,

  checkExistingUser,
  verifyUser,

  getAllByStatus,
  getAllSlotsById,
};
