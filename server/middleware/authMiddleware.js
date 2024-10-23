const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const verifiedToken = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

module.exports = authMiddleware;
