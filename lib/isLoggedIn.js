const is_logged_handler = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json( { 'error': 'Not authorized' } );
        // return res.status(401).redirect('/login');
    }
    next();
};

module.exports.is_logged_handler = is_logged_handler;