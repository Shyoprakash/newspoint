// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//   //   console.log(req.headers.cookie);
//   const token = req.cookies.token;
//   console.log(token);
//   if (!token) {
//     return res.status(401).json({
//       authenticated: false,
//       message: 'No token found',
//     });
//   }

//   const decoded = jwt.verify(token, 'hello_this_string');
//   req.user = decoded;
//   next();
// };

// export default verifyToken;

// //parse cookie-parser





import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({
      authenticated: false,
      message: 'No token found',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret'); // ✅ Updated secret
    req.user = decoded; // Attach decoded user info
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({
      authenticated: false,
      message: 'Invalid or expired token',
    });
  }
};

export default verifyToken;
