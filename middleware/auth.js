const { getUser } = require('../service/auth');

async function restricttologin(req, res, next) {
    const userToken = req.cookies?.uid;

    if (!userToken) return res.redirect("/login");

    const user = getUser(userToken);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userToken = req.cookies?.uid;

    if (!userToken) {
        req.user = null;
    } else {
        const user = getUser(userToken);
        req.user = user;
    }
    next();
}

module.exports = { restricttologin, checkAuth };
