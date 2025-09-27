let http = require("http");
let url = require("url");

let dt = require("./modules/utils.js");
let messages = require("./lang/en/en.js");

const PLACEHOLDER = "%1";
const NAME = "name";
const OPEN_SPAN = '<span style="color:blue">';
const CLOSE_SPAN = '</span>';

class Server {
    static startLocalServer() {
        http.createServer(function (req, res) {
            Server.handleRequest(req, res);
        }).listen(8888);
    }

    static handleRequest(req, res) {
        let q = url.parse(req.url, true);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(OPEN_SPAN + messages.GREETING.replace(PLACEHOLDER, q.query[NAME]) + dt.Utils.getDate() + CLOSE_SPAN);
        res.end();
    }

    static startVercelServer(req, res) {
        Server.handleRequest(req, res);
    }
}

module.exports = Server.startVercelServer;


if (require.main === module) {
    Server.startLocalServer();
} 

