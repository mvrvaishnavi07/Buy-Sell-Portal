


const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing or invalid" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to the request object
    // req.user = decoded;
    req.user = { ...decoded, _id: decoded.id };

    // Proceed to the next middleware or route
    next();
  } catch (err) {
    console.error("Authorization error:", err.message);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
