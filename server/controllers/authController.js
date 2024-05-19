const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const user = await User.checkExistingUser(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const userId = user.user_id
  const fullName = user.full_name
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken, userId, fullName });
}

async function registerUser(req, res) {
  const { username, email, password, full_name } = req.body;
  if (!username || !email || !password || !full_name) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const existingUser = await User.checkExistingUser(username);
  if (existingUser) {
    return res.status(409).json({ error: 'Username is already taken' });
  }
  const existingEmail = await User.checkExistingUser(email);
  if (existingEmail) {
    return res.status(409).json({ error: 'Email is already registered' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    username,
    email,
    password: hashedPassword,
    full_name,
  };
  await User.createUser(newUser);
  const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
  res.status(201).json({ accessToken });
}

module.exports = {
  loginUser,
  registerUser,
};
