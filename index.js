const express = require('express');
const EventEmitter = require('events');

class APIClient extends EventEmitter {
    constructor(endpoint, port, password) {
        super();
        this.server = express();
        this.endpoint = endpoint;
        this.port = port;
        this.password = password;
    }

    async start() {
        this.server.use(express.json());
        this.server.post(this.endpoint, (req, res) => {
            if(!req.get('Authorization')) return res.sendStatus(401);
            if(!req.get('Authorization') == this.password) return res.sendStatus(401);

            if(req.body.event == 'vote') this.emit(req.body.event, req.body.new_votes, req.body.user);
            else this.emit(req.body.event, req.body.user);
        })

        this.server.listen(this.port);
    }
}

module.exports.APIClient = APIClient;