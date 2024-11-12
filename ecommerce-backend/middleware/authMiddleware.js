const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };  // Attach user data to request
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        }
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
