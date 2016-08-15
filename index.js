'use strict';

var EventEmitter = require('events').EventEmitter,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('./config'),
    User = require('./models/user');

mongoose.connect(config.database);

class GetPayed extends EventEmitter {

    constructor(options) {
        super();
        this.node = options.node;
    }

    start(callback) {
        setImmediate(callback);
    }

    stop(callback) {
        setImmediate(callback);
    }

    setupRoutes(app, express) {
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        function renderErr(res, status, code) {
            res.status(status).json({status: status, code: code});
        }

        app.use('/api/auth/login', function(req, res, next) {
            if (!req.body.email || !req.body.password) return renderErr(res, 400, "MALFORMED_CREDS");
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (err) throw err;
                if (!user) return renderErr(res, 401, "USER_NOT_FOUND");
                if (!bcrypt.compareSync(req.body.password, user.password)) return renderErr(res, 401, "INVALID_CREDS");
                var token = jwt.sign(user, config.secret, {
                    expiresIn: "1d"
                });
                res.json({
                    email: user.email,
                    token: token
                });
            });
        });

        app.use('/api/auth/register', function(req, res, next) {
            if (!req.body.email || !req.body.password) return renderErr(res, 400, "MALFORMED_CREDS");
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (err) throw err;
                if (user) return renderErr(res, 400, "USER_ALREADY_EXISTS");
                var u = new User({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password)
                });
                u.save(function(err) {
                    if (err) throw err;
                    var token = jwt.sign(u, config.secret, {
                        expiresIn: "1d"
                    });
                    res.json({
                        email: u.email,
                        token: token
                    });

                });
            });
        });

        app.use('/api', function(req, res, next) {
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            if (!token) return renderErr(res, 401, "TOKEN_REQUIRED");
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) return renderErr(res, 401, "TOKEN_INVALID");
                req.decoded = decoded;
                next();
            });
        });

        app.use('/api/users', function(rew, res, next) {
            User.find({}, function(err, users) {
                if (err) throw err;
                res.json(users)
            });
        });

        app.use('/', function(req, res, next) {
            express.static(__dirname + '/build')(req, res, next);
        });
    }

    getRoutePrefix() {
        return 'get-payed';
    }

    getAPIMethods() {
        return [];
    }

    getPublishEventsfunction() {
      return [];
    }
}

GetPayed.dependencies = ['bitcoind'];

module.exports = GetPayed;
