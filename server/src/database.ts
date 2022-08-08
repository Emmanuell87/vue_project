import { createConnection, Connection } from "mysql2/promise";
import { config } from "./config/database.config";

export const connect = async (): Promise<Connection> => {
	return await createConnection(config);
};
