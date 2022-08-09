import axios from "axios";

const url = "http://34.125.32.240";

const API = axios.create({
	baseURL: url,
});

export default API;
