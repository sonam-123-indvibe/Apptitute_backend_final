const auth = require("./authMiddleware");

const adminAuth = (req, res, next) => {
  // First verify authentication using existing authMiddleware
  auth(req, res, (err) => {
    if (err) {
      // authMiddleware already sent the error response
      return;
    }

    // Check if user has admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }

    next();
  });
};

module.exports = adminAuth;
