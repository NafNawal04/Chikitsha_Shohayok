const ensureAuthenticated = (req, res, next) => {
    const publicPaths = ['/', '/login', '/signup'];
    if (publicPaths.includes(req.path) || req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
}

module.exports = { ensureAuthenticated};
