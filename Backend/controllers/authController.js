import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User is not registered , Please register and try again',
      });
    }
    //check if password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Password do not match',
      });
    }
   
    //last token generation
    const token = jwt.sign(
      { id: user._id, name: user.name },
      'hello_this_string',
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
    });
    
    res.status(200).json({
      token,
      message: 'login successfull',
    });
  } catch (error) {}
};

export const verify = async (req, res) => {
  console.log('verify wali', req.user);
  if (!req.user) {
  } else {
    return res.status(200).json({
      authenticated: true,
      id: req.user.id,
      name: req.user.name,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    //check if user is already registered
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(404).json({
        message: 'User is already registred ,Please Login',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    res.status(201).json({
      data: newUser,
      message: 'Successfully registered',
    });
  } catch (error) {}
};