import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import passportMiddleware from "./middlewares/passport.middleware";

//routes

export class App {
	private app: Application;

	constructor(private port?: number | string) {
		this.app = express();
		this.settings();
		this.middlewares();
		this.routes();
	}

	middlewares(): void {
		this.app.use(cors());
		this.app.use(morgan("dev"));
		this.app.use(passport.initialize());
		passport.use(passportMiddleware);
	}

	settings(): void {
		this.app.set("port", process.env.PORT || this.port || 3000);
	}

	routes(): void {}

	listen(): void {
		this.app.listen(this.app.get("port"), () => {
			console.log(`Listening on port ${this.app.get("port")}`);
		});
	}
}
