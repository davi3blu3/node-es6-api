import jwt from 'jsonwebtoken';
import config from '../../config/env';
import User from '../models/user';

// check if username and password are correct
function authenticate(req, res, next) {
    User.findOne({
        username: req.body.username
    })
    .exec()
    .then((user) => {
        if (!user) return next();
        user.comparePassword(req.body.password, (e, isMatch) => {
            if (e) return next(e);
            if (isMatch) {
                req.user = user;
                next();
            } else {
                return next();
            }
        });
    }, (e) => next(e));
}

// generate JWT
function generateToken(req, res, next) {
    if (!req.user) return next();

    const jwtPayload = {
        id: req.user._id
    };
    const jwtData = {
        expiresIn: config.jwtDuration
    };
    const secret = {config.jwtSecret;
    req.token = jwt.sign(jwtPayload, secret, jwtData)};

    next();
}

// send JWT back to client if authorized
function respondJWT(req, res) {
    if (!req.user) {
        res.status(401).json({
            error: 'Unauthorized'
        });
    } else {
        res.status(200).json({
            jwt: req.token
        });
    }
}

export default { authenticate, generateToken, respondJWT };