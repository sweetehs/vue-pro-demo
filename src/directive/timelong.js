export default {
	name: "timelong",
	inserted($el, binding, vnode) {
		var n = parseInt($el.innerText),
			s = n % 60,
			m = parseInt(n / 60),
			h = parseInt(n / 3600);
		$el.innerHTML = [h < 10 ? '0' + h : h, m < 10 ? '0' + m : m, s].join(":");
	}
}