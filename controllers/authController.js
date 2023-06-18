const bcrypt = require('bcrypt');
const User = require('../models/User');

// Signup form
exports.signupForm = (req, res) => {
  res.render('signup');
};

// Signup
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('signup', { error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.redirect('/auth/login');
  } catch (error) {
    res.render('signup', { error: 'Signup failed. Please try again.' });
  }
};

// Login form
exports.loginForm = (req, res) => {
  res.render('login');
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    // Validate the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    // Store the user ID in the session
    req.session.userId = user._id;
    
    res.redirect('/contacts');
  } catch (error) {
    res.render('login', { error: 'Login failed. Please try again.' });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};
