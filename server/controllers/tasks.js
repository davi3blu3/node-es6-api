import Task from '../models/task';

// load task from the database by id
function load(req, res, next, id) {
    Task.findById(id)
        .exec()
        .then((task) => {
            req.dbTask = task;
            return next();
        }, (e) => next(e));
}

// return data about a specific task
function get(req, res) {
    return res.json(req.dbTask);
}

// create a new request from request data
function create(req, res, next) {
    Task.create({
        user: req.body.user,
        description: req.body.description
    })
    .then((savedTask) => {
        return res.json(savedTask);
    }, (e) => next(e));
}

// update a specific task
function update(req, res, next) {
    const task = req.dbTask;
    Object.assign(task, req.body);

    task.save()
        .then(() => res.sendStatus(204),
        (e) => next(e));
}

// retrieve all tasks from db, limiting results
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Task.find()
        .skip(skip)
        .limit(limit)
        .exec()
        .then((tasks) => res.json(tasks),
            (e) => next(e));
}

// delete a specific task from db
function remove(req, res, next) {
    const task = req.dbTask;
    task.remove()
        .then(() => res.sendStatus(204),
            (e) => next(e));
}

export default { load, get, create, update, list, remove };