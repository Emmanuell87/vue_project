"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//routes
const index_routes_1 = __importDefault(require("./routes/index.routes"));
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
    }
    settings() {
        this.app.set("port", process.env.PORT || this.port || 3000);
    }
    routes() {
        this.app.use(index_routes_1.default);
    }
    listen() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Listening on port ${this.app.get("port")}`);
        });
    }
}
exports.App = App;
