'use strict';

var EventEmitter = require('events').EventEmitter,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt-nodejs'),
    request = require('request'),
    config = require('./config'),
    User = require('./models/user');

mongoose.connect(config.database);

const MALFORMED_CREDS = {code: "MALFORMED_CREDS", msg: "The necessary credentials were either missing or malformed."},
      INVALID_CREDS = {code: "INVALID_CREDS", msg: "The provided credentials were invalid."},
      DB_GET_USER_FAILURE = {code: "DB_GET_USER_FAILURE", msg: "The database failed while attempting to retreive the requested user."},
      DB_SAVE_USER_FAILURE = {code: "DB_SAVE_USER_FAILURE", msg: "The database failed while attempting to save the given user."},
      USER_DOES_NOT_EXIST = {code: "USER_DOES_NOT_EXIST", msg: "The requested user does not exist."},
      USER_ALREADY_EXISTS = {code: "USER_ALREADY_EXISTS", msg: "The provided user already exists."},
      UPSTREAM_FAILED = {code: "UPSTREAM_FAILED", msg: "The upstream request failed."},
      TOKEN_REQUIRED = {code: "TOKEN_REQUIRED", msg: "The necessary token is missing."},
      TOKEN_INVALID = {code: "TOKEN_INVALID", msg: "The provided token is invalid."},
      ADDRESS_REQUIRED = {code: "ADDRESS_REQUIRED", msg: "An address query parameter is required to look up an address history."},
      NODE_ADDRESS_HISTORY_FAILURE = {code: "NODE_ADDRESS_HISTORY_FAILURE", msg: "The node was unable to retreive the provided addresses history."},


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
        var self = this;

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        function renderErr(res, status, err) {
            res.status(status).json({status: status, code: err.code, msg: err.msg});
        }

        app.use('/api/auth/login', function(req, res, next) {
            if (!req.body.email || !req.body.password) return renderErr(res, 400, MALFORMED_CREDS);
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (err) return renderErr(res, 500, DB_GET_USER_FAILURE);
                if (!user) return renderErr(res, 401, USER_DOES_NOT_EXIST);
                if (!bcrypt.compareSync(req.body.password, user.password)) return renderErr(res, 401, INVALID_CREDS);
                var token = jwt.sign(user, config.secret, {
                    expiresIn: "1d"
                });
                res.json({
                    email: user.email,
                    address: user.address,
                    token: token
                });
            });
        });

        app.use('/api/auth/register', function(req, res, next) {
            if (!req.body.email || !req.body.password) return renderErr(res, 400, MALFORMED_CREDS);
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (err) return renderErr(res, 500, DB_GET_USER_FAILURE);
                if (user) return renderErr(res, 400, USER_ALREADY_EXISTS);
                var u = new User({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password)
                });
                u.save(function(err) {
                    if (err) return renderErr(res, 500, DB_SAVE_USER_FAILURE);
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
            if (!token) return renderErr(res, 401, TOKEN_REQUIRED);
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) return renderErr(res, 401, TOKEN_INVALID);
                req.decoded = decoded._doc;
                next();
            });
        });

        app.use('/api/account', function(req, res, next) {
            User.findById(req.decoded._id, function(err, user) {
                if (err) return renderErr(res, 500, DB_GET_USER_FAILURE);
                if (!user) return renderErr(res, 400, USER_DOES_NOT_EXIST);
                user.address = req.body.address || user.address;
                user.email = req.body.email || user.email;
                user.password = req.body.password ? bcrypt.hashSync(req.body.password) : user.password;
                user.save(function(err) {
                    if (err) return renderErr(res, 500, DB_SAVE_USER_FAILURE);
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: "1d"
                    });
                    res.json({
                        email: user.email,
                        address: user.address,
                        token: token
                    });
                });
            });
        });

        app.use('/api/rate', function(req, res, next) {
            request('http://tbtc.blockr.io/api/v1/exchangerate/current', function (err, upstream, body) {
                if (err || upstream.statusCode !== 200) return renderErr(res, 500, UPSTREAM_FAILED);
                res.json({rate: JSON.parse(body).data[0].rates.BTC})
            });
        });

        app.use('/api/address/:addressId/history', function(req, res, next) {
            if (!req.params.addressId) return renderErr(res, 400, ADDRESS_REQUIRED);
            var options = {
              queryMempool: true
            };
            self.node.services.bitcoind.getAddressHistory([req.params.addressId], options, function(err, history) {
                if (err) return renderErr(res, 400, NODE_ADDRESS_HISTORY_FAILURE);
                res.json(history);
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

    getPublishEvents() {
      return [];
    }
}

GetPayed.dependencies = ['bitcoind'];

module.exports = GetPayed;
