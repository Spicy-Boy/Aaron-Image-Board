// TLDR: checks if session exists and session contains user's unique ID... if so CONTINUE, else redirect to login page
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    requireAuth
}