const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).send('Access denied. Insufficient permissions.');
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send('Invalid token');
    }
  };
};

module.exports = authMiddleware;
