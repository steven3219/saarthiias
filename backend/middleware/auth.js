//2. Authorization Middleware (backend/middleware/auth.js)Enforces multi-tier Role-Based Access Control (RBAC) across both standard and verification layers.  JavaScriptconst 
// 

jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized access' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Forbidden: Access restricted to ${roles.join(' or ')}` 
      });
    }
    next();
  };
};

module.exports = { protect, authorize };