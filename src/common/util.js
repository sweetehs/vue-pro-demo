import Rx from 'rxjs/Rx';
export default {
	getCss(o, key) {
		o = o;
		var p = o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
		return Number(p.split("px")[0]);
	},
	getObjSelf(o){
		var propertys = Object.getOwnPropertyNames(o),
		disArr = ["__ob__"],
		obj = {};
		propertys.forEach((_d)=>{
			if(disArr.indexOf(_d) == -1){
				obj[_d] = o[_d];
			}			
		});		
		return obj;
	}
}