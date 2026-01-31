const isAuthenticated = (req, res, next) => {
    console.log('--- Auth Check ---');
    console.log('Session ID:', req.sessionID);
    console.log('Session User:', req.session.user);
    if (!req.session.user) {
        console.log('Unauthorized: No session user found');
        return res.status(401).json("You do not have access.");
    }
    console.log('Authorized: Session user exists');
    next();
};

module.exports = { isAuthenticated };