'use strict';

var EventEmitter = require('events').EventEmitter;

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
