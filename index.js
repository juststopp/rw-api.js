const express = require('express');

class APIClient {
    constructor(enpoint, port, password) {
        this.server = express();
        this.enpoint = enpoint;
        this.port = port;
        this.password = password;
    }

    async start() {
        this.server.use(express.json());
        this.server.post(this.endpoint, (req, res) => {
            if(!req.get('Authorization')) return res.status(401);
            if(!req.get('Authorization') == this.password) return res.status(401);

            if(req.body.event == 'vote') this.emit(req.body.event, req.body.new_votes, req.body.user);
            else this.emit(req.body.event, req.body.user);
        })

        this.server.listen(this.port);
    }
}

module.exports.APIClient = APIClient;