/*
 * Server.js
 ******************************/

const bodyParser = require("body-parser");
const router = require("./routes/index");

class Server {
  constructor(app, port) {
    this.app = app;
    this.port = port;
  }

  run() {
    // Body Parser
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );

    // Routes
    this.app.use(router);

    // Run app
    return this.app.listen(this.port, () => {
      try {
        console.log(`server is running on ${this.port} ...🚀`);
      } catch (error) {
        throw error;
      }
    });
  }
}

module.exports = Server;
