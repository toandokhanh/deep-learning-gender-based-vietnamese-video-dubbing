const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const bearer = req.header('Authorization');
  const cookie = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith('session_token='));
  const token = bearer?.startsWith('Bearer ') ? bearer.slice(7) : cookie?.slice('session_token='.length);
  if (!token) return res.status(401).json({ success: false, message: 'Authentication required' });
  try {
    if (!bearer && !['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      const allowed = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
      if (req.get('Origin') !== allowed) return res.status(403).json({ success: false, message: 'Invalid request origin' });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithms: ['HS256'] });
    if (!Number.isFinite(decoded.exp) || typeof decoded.userId !== 'string') throw new Error('Invalid session');
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });
  }
};
module.exports = verifyToken;
