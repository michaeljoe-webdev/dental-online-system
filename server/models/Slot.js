const knex = require('../config/db'); 
const TABLE_NAME = 'slots';


async function getAllSlots() {
  return knex(TABLE_NAME).select('*');
}

async function createSlot(slotData) {
  try {
    const existingSlot = await knex(TABLE_NAME)
      .where('dentist_id', '=', slotData.dentist_id)
      .andWhere('date', '=', slotData.date)
      .andWhere('start_time', '=', slotData.start_time)
      .andWhere('end_time', '=', slotData.end_time)
      .andWhere('status', '=', slotData.status)
      .first();

    if (existingSlot) {
      return { status: 422 , error: 'Invalid entity type' }
    }

    const [slotId] = await knex(TABLE_NAME).insert(slotData);
    const newSlot = await knex(TABLE_NAME).where('slot_id', slotId).first();
    return newSlot;
  } catch (error) {
    throw error;
  }
}

async function deleteSlot(slotData) {
  const exist = await knex(TABLE_NAME)
  .where('slot_id', slotData.slot_id)
  .andWhere('user_id',slotData.user_id)
  .andWhere('dentist_id',slotData.dentist_id)
  .andWhere('status',slotData.status)
  .first();
  if(!exist){
    return { status: 404 , error: 'No Record Found' }
  }
  exist.status = 'cancelled'
  const updatedAppointment = exist
  await knex(TABLE_NAME).where('slot_id', updatedAppointment.slot_id).update(updatedAppointment);
  return updatedAppointment
}

// async function getAllByStatus(dentist_id, status) {
//   return knex(TABLE_NAME).select('*').where('dentist_id',dentist_id).andWhere('status',status);
// }



// async function getAllSlotsById(dentist_id) {
//   return knex(TABLE_NAME).select('*').where('dentist_id',dentist_id);
// }

module.exports = {
  getAllSlots,
  createSlot,
  deleteSlot,

  // getAllByStatus,
  // getAllSlotsById,
};

