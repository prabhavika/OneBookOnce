const verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer", "");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied, admin only!" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyAdmin;
