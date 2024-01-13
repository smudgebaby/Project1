import models from '../models/models.js';
const {User} = models;
import generateToken from '../middleware/generateToken.js';

const signUp = async (req, res) => {
  
  try {
    const { email, password, role } = req.body
    
    if(await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' })
    }
    
    const user = new User({ email, password, role});

    await user.save();
    res.status(201).json({ message: 'User created'});

  } catch(err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error'});
  }
}


const signIn = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ message: 'Invalid email'})
    }

    if(user.password !== password) {
      return res.status(400).json({ message: 'Password not match'})
    }

    const token = generateToken(user)
    res.status(200).json({ message: 'Sign in successful', token})

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error'});
  }
}


const resetPassword = async (req, res) => {

  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(404).json({ error: 'Email not found'})
    }

    res.status(200).json({ message: 'Password reset email sent successful' });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error'});
  }
}


export default {
  signUp,
  signIn,
  resetPassword
}