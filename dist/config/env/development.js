'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// if this project were going to production it would be gitignored for security

exports.default = {
    env: 'development',
    db: 'mongodb://localhost:27017/node-es6-api-dev',
    port: 3000,
    jwtSecret: 'my-api-secret',
    jwtDuration: '2 hours'
};
module.exports = exports['default'];