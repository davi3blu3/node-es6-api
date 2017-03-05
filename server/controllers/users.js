import User from '../models/user';

// load the user from the database by id
function load(req, res, next, id) {
    User.findById(id)
        .exec()
        .then((user) => {
            req.dbUser = user;
            return next();
        }, (e) => next(e));
}

// return a specific user's data
function get(req, res) {
    return res.json(req.dbUser);
}

// create a new user in database from client data
function create(req, res, next) {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then((savedUser) => {
        return res.json(savedUser);
    }, (e) => next(e));
}

// combines new client data with specific user id to update db
function update(req, res, next) {
    const user = req.dbUser;
    Object.assign(user, req.body);

    user.save()
        .then((savedUser) => res.sendStatus(204),
        (e) => next(e));
}

// queries db for all users, but limits results
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.find()
    .skip(skip)
    .limit(limit)
    .exec()
    .then((users) => res.json(users),
        (e) => next(e));
}

// delete a specific user from the database
function remove(req, res, next) {
    const user = req.dbUser;
    user.remove()
        .then(() => res.sendStatus(204),
        (e) => next(e));
}

export default { load, get, create, update, list, remove };