"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const passport_middleware_1 = __importDefault(require("./middlewares/passport.middleware"));
const path_1 = __importDefault(require("path"));
//routes
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const cryptos_routes_1 = __importDefault(require("./routes/cryptos.routes"));
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
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "dist")));
        this.app.use(passport_1.default.initialize());
        passport_1.default.use(passport_middleware_1.default);
    }
    settings() {
        this.app.set("port", process.env.PORT || this.port || 3000);
    }
    routes() {
        this.app.use(users_routes_1.default);
        this.app.use(cryptos_routes_1.default);
    }
    listen() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Listening on port ${this.app.get("port")}`);
        });
    }
}
exports.App = App;
