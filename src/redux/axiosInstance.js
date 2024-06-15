import axios from "axios";
import { toast } from "react-toastify";
import dotenv from "dotenv";
dotenv.config();

let token = null;
const root = JSON.parse(window.localStorage.getItem("persist:root"));

if (root) {
	const { auth } = root;
	const { user } = JSON.parse(auth);
	if (user) token = user.token;
}

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-Type": "application/json",
		"x-auth-token": token ? token : "",
	},
});

axiosInstance.interceptors.response.use(
	(req) => {
		return Promise.resolve(req);
	},
	(error) => {
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		) {
			toast.error(error.response.data);
		} else {
			console.log(error);
			toast.error("Algo salió mal!");
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
