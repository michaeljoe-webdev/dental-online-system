const Slot = require('../models/Slot'); 
const User = require('../models/User'); 
const verifyId = require('../utils/verifyId');

async function getAllSlots(req, res) {
  try {
    const slots = await Slot.getAllSlots();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createSlot(req, res) {
  const { user_id, dentist_id, full_name } = req.body;
  try {
    const dentist =  await verifyId('Dentist', dentist_id);
    if (dentist.error) {
        return res.status(dentist.status).json(dentist);
    }
    const verifyUser = await User.verifyUser(user_id, full_name)
    if(!verifyUser){
      return  res.status(422).json({ status: 422 , error: 'Invalid entity type' })
    }
    const slotData = req.body;
    delete slotData.full_name;

    const newSlot = await Slot.createSlot(slotData);
    if(newSlot.error){
      return  res.status(newSlot.status).json(newSlot)
    }

    res.status(201).json({ message: 'Slot created successfully', newSlot });
  } catch (error) {
    res.status(409).json({ error: 'Conflict data' });
  }
}

module.exports = {
  getAllSlots,
  createSlot,
};
