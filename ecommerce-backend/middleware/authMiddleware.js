const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        console.error('Authorization header missing');
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        console.error('Invalid Authorization header format');
        return res.status(401).json({ message: 'Invalid token format, authorization denied' });
    }

    console.log('Extracted Token:', token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err);
        res.status(401).json({ message: 'Token is not valid', error: err.message });
    }
};

module.exports = authMiddleware;

