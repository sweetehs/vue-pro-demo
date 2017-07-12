import Rx from 'rxjs/Rx';
import util from "../common/util.js";

function drag($el, binding, vnode) {
	let down$ = Rx.Observable.fromEvent($el, "mousedown"),
		move$ = Rx.Observable.fromEvent(document, "mousemove"),
		up$ = Rx.Observable.fromEvent(document, "mouseup");
	down$.do(() => {

	}).switchMap((dEvent) => {
		let left = util.getCss($el, "left"),
			top = util.getCss($el, "top"),
			$parent = $el.parentElement,
			parentWidth = $parent.offsetWidth,
			parentScrollWidth = $parent.scrollWidth;
		return move$.map((event) => {
			let edge = binding.value.dragEdge ? binding.value.dragEdge() : {},
				speed = binding.value.speed ? binding.value.speed() : 1;
			let x = left + (event.clientX - dEvent.clientX) * speed,
				y = top + (event.clientY - dEvent.clientY) * speed,
				size = {
					x: x,
					y: y
				};
			// 处理disabled
			if (binding.value.disabledX) {
				size.x = left;
			} else {

			}
			if (size.x > edge.xMax) {
				size.x = edge.xMax;
			} else if (size.x < edge.xMin) {
				size.x = edge.xMin;
			}
			if (binding.value.disabledY) {
				size.y = top;
			} else {

			}
			if (size.x > edge.yMax) {
				size.y = edge.yMax;
			}
			binding.value.dragMove && binding.value.dragMove(size);
			console.log(size);
			// 处理滚动条
			return size;
		}).takeUntil(up$.do(() => {

		}))
	}).subscribe((d) => {
		$el.style.left = d.x + "px";
		$el.style.top = d.y + "px";
	});
}
export default {
	name: 'drag',
	inserted($el, binding, vnode) {
		/*
			{
				disabledY
				disabledX
				dragEdge: {xMin,xMax,yMin,yMax}
				dragMove
				speed
			}
		*/
		drag($el, binding, vnode);
	}
}