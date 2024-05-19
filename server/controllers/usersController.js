const User = require('../models/User');
const verifyId = require('../utils/verifyId');

async function getAllUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await User.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserById(req, res) {
  try {
    const user = await verifyId('User', req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getUserSchedules(req, res){
  try {
    const user = await verifyId('User', req.params.id);
    if (user.error) {
      return res.status(user.status).json(user);
    }
    const schedules = await User.getUserSchedules(req.params.id)
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateUser(req, res) {
  try {
    const user = await verifyId('User', req.params.id);
    if (user.error) {
      return res.status(user.status).json(user);
    }

    const updatedUser = await User.updateUser(req.params.id, req.body);
    res.status(201).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteUser(req, res) {
  try {
    const user =  await verifyId('User', req.params.id);
    if (user.error) {
      return res.status(user.status).json(user);
    }
    //hard delete
    // await User.deleteUser(req.params.id);
    //soft delete
    req.body.deleted_at = new Date(); 
    await User.updateUser(req.params.id, req.body);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// ============= //
// === SLOTS === //
// ============= //
async function getAllByStatus(req, res) {
  try {
      const user_id = req.params.user_id;
      const status = req.params.status;
      const user = await verifyId('User', user_id);
      if (user.error) {
        return res.status(user.status).json(user);
      }
      const slots = await User.getAllByStatus(user_id, status);
      res.json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllSlotsById(req, res) {
  try {
    const user = await verifyId('User', req.params.user_id);
    if (user.error) {
      return res.status(user.status).json(user);
    }
    const slots = await User.getAllSlotsById(req.params.user_id)

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getUserSchedules,
  updateUser,
  deleteUser,

  getAllByStatus,
  getAllSlotsById,
};
