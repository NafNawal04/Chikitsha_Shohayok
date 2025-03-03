const ensureAuthenticated = (req, res, next) =>{
    const publicPaths = ['/', '/login', '/signup', '/auth/google', '/auth/google/callback','/auth/github', '/auth/github/callback'];
    if (publicPaths.includes(req.path) || req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
}

const ensureAdmin = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        return res.redirect('/login'); 
    }

    if (req.session.role !== 'admin') {
        return res.status(403).send('Access denied. Admins only.');
    }
    next();
};


module.exports = {ensureAuthenticated, ensureAdmin};