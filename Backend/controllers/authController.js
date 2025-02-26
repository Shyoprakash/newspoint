// import User from '../model/User.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         message: 'User is not registered , Please register and try again',
//       });
//     }
//     //check if password match
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         message: 'Password do not match',
//       });
//     }
   
//     //last token generation
//     const token = jwt.sign(
//       { id: user._id, name: user.name },
//       'hello_this_string',
//       { expiresIn: '1d' }
//     );
//     console.log(user)
//     res.cookie('token', token, {
//       httpOnly: true,
//     });
    
//     res.status(200).json({
//       // token,
//       preferences : user.preferences,
//       message: 'login successfull',
//     });
//   } catch (error) {}
// };

// export const verify = async (req, res) => {
//   console.log('verify wali', req.user);
//   if (!req.user) {
//   } else {
//     return res.status(200).json({
//       authenticated: true,
//       id: req.user.id,
//       name: req.user.name,
//     });
//   }
// };

// export const register = async (req, res) => {
//   try {
//     const { name, password, email } = req.body;
//     //check if user is already registered
//     const user = await User.findOne({ email });
//     console.log(user);
//     if (user) {
//       return res.status(404).json({
//         message: 'User is already registred ,Please Login',
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = await User.create({
//       name,
//       password: hashedPassword,
//       email,
//     });

//     res.status(201).json({
//       data: newUser,
//       message: 'Successfully registered',
//     });
//   } catch (error) {}
// };







import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User is not registered' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password does not match' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET not found!');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      jwtSecret,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      preferences: user.preferences,
      message: 'Login successful',
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


export const verify = async (req, res) => {
  try {
    const token = req.cookies.token; // 🍪 Token cookie se uthaya

    if (!token) {
      return res.status(401).json({ authenticated: false, message: 'No token provided' });
    }

    // ✅ JWT token verify karo with proper secret (no fallback)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Successfully verified
    res.status(200).json({
      authenticated: true,
      id: decoded.id,
      name: decoded.name,
    });

  } catch (error) {
    console.error('Verify error:', error);

    // 🔴 Agar token galat ya expired hai toh 403 return karo
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ authenticated: false, message: 'Invalid token' });
    }

    res.status(500).json({ message: 'Server error during verification' });
  }
};


export const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User is already registered, please login' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ name, password: hashedPassword, email });

    res.status(201).json({
      data: newUser,
      message: 'Successfully registered',
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};
