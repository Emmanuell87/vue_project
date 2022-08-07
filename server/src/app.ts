import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

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
