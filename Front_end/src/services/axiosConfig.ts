import axios from "axios";

const url = "https://emmanuel-cryptos-backend.herokuapp.com";

const API = axios.create({
	baseURL: url,
});

export default API;
