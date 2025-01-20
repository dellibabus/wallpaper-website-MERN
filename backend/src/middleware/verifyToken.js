const jwt = require("jsonwebtoken");

const verifyadmin = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      status: "401", 
      data: "You are not authenticated!" 
    });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET || "defaultSecretKey", (err, user) => {
    if (err) {
      console.error('Token verification error:', err); 
      return res.status(403).json({ 
        status: "403", 
        data: "Token is not valid" 
      });
    }

    // Check if the user is an admin
    if (user.onAdmin) {
      req.user = user; 
      next();
    } else {
      return res.status(403).json({ 
        status: "403", 
        data: "You are not an admin" 
      });
    }
  });
};

module.exports = {
  verifyadmin,
};
