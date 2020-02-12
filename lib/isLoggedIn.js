
const is_logged_handler = (req, res, next) => {
    if (!req.session.user) {
        return res.status(405).redirect('/login');
    }
    next();
};

module.exports.is_logged_handler = is_logged_handler;