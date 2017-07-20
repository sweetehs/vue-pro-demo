import axios from "axios";

// axios config
// axios.interceptors.request.use((config) => {
	
// }, (error) => {
	
// });
axios.interceptors.response.use((response) => {	
	return response.data.data;
}, (error) => {
	return Promise.reject(error);
});