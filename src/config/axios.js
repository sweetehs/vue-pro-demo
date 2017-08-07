import axios from "axios";
// axios config
// axios.interceptors.request.use((config) => {

// }, (error) => {

// });
axios.interceptors.response.use((response) => {	
	var ajaxData = response.data,
		resultData = ajaxData.data;	
	if(ajaxData.code == "-666"){
		console.error("没有登录");		
		if(location.href.indexOf("elect.netease.com") !== -1){
			location.href = "http://elect.netease.com/api/auth/login";		
		}		
	}else{
		return resultData;
	}	
}, (error) => {
	return Promise.reject(error);
});