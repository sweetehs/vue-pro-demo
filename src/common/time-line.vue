<style lang="less">
	.time-line-wrapper{
		user-select:none;
		.time-line-inner{
			width: 600px;
			height: 100px;		
			overflow-x: hidden;
			position: relative;			
			border: 1px solid red;
		}
		.time-line{
			@width:10px;
			width: @width;
			left: -@width/2;
			position: absolute;
			bottom: 0;
			height: ~'calc(100% - 20px)';
			background: rgba(013,025,026,0.7);
			border-radius: 5px;
			z-index: 1;
			&:hover{
				cursor: pointer;
			}
		}
		.time-line-list{
			height: ~'calc(100% - 20px)';
			background: #abcdef;
			position: absolute;
			white-space: nowrap;
		    // box-sizing: border-box;
		    bottom: 0;
			&:hover{
				cursor: move;
			}
		}
		.time-line-item{
			position: absolute;
			width: 1px;
			height: 10px;
			background-color: #000;
			margin-right: 2px;
			display: inline-block;
			vertical-align: top;
			font-size: 8px;
			&.m{
				height: 15px;
			}
			&.l{
				height: 20px;
			}
			span{
				position: absolute;
				top: -18px;
				transform: translateX(-50%);
			}
		}
	}
</style>
<template>
	<div class="time-line-wrapper" ref="linewrapper">
		<div>
			<p class="fn-iblock">{{currentTime}}</p>
			<p class="fn-iblock">
				速度：<select ref="timespeed">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="2">3</option>
				</select>
			</p>
		</div>
		<div class="time-line-inner">
			<div ref="line" v-drag="{disabledY:true,dragEdge:lineDragEdge,dragMove:lineDragMove}" class="time-line"></div>
			<ul v-drag="{disabledY:true,dragEdge:timeDragEdge,dragMove:timeDragMove,speed:timeDragSpeed}" class="time-line-list" :style="{width:lineData.totalWidth+'px'}">
				<li class="time-line-item" v-for="(d,i) in lineData.list" :class="{l:d.index%10==0,m:d.index%5==0}" :style="{left:(d.left)+'px'}">
					<span>{{d.time}}</span>
				</li>
			</ul>
		</div>		
	</div>
</template>
<script>
 	import util from "./util.js";
 	var listAction = {
 		init: function() {
 			this.totalTime = 200;
 			this.totalWidth = 600;
 			this.width = 8;
 			this.initList();
 			return {
 				width: this.width,
 				totalTime: this.totalTime,
 				totalWidth: this.width * this.totalTime,
 				wrapperWidth: this.totalWidth,
 				list: this.filter(0)
 			}
 		},
 		reZero(s) {
 			return s.toString().length == 1 ? ("0" + s) : s;
 		},
 		toTime(s){
 			var h = Math.floor(s / 3600),
 					m = Math.floor(s % 3600 / 60),
 					s = Math.floor(s % 3600 % 60)
 			return [this.reZero(h), this.reZero(m), this.reZero(s)].join(":");
 		},
 		initList() {
 			var list = [];
 			for (var i = 0; i < this.totalTime; i++) {
 				var time = this.toTime(i);
 				list.push({
 					index: i,
 					time: ((i % 10 == 0) ? time : ""),
 					left: i * this.width
 				})
 			}
 			this.list = list;
 			return this;
 		},
 		filter(cx) {
 			var startIndex = Math.ceil(cx / this.width),
 				endIndex = Math.ceil(this.totalWidth / this.width);
 			return this.list.slice(startIndex, startIndex + endIndex);
 		},
 		getCurrentTime(type,x){		
			this[type + "X"] = x;			
			return this.toTime(Math.ceil((Math.abs(this.lineX || 0) + Math.abs(this.timeX || 0))/this.width));
 		}
 	};
 	export default {
 		name: "",
 		data() {
 			var lineData = listAction.init();
 			return {
 				lineData: lineData,
 				currentTime: 0
 			}
 		},
 		methods: {
 			timeDragEdge() {
 				return {
 					xMax: 0,
 					xMin: -(this.lineData.totalWidth - this.lineData.wrapperWidth)
 				}
 			},
 			timeDragMove(_position) {
 				this.$set(this.lineData, "list", listAction.filter(-_position.x));
 				this.currentTime = listAction.getCurrentTime("time", _position.x);
 			},
 			timeDragSpeed(){
 				return this.$refs.timespeed.value;
 			},
 			lineDragEdge() {
 				var width = util.getCss(this.$refs.line, "width");
 				return {
 					xMin: -(width / 2),
 					xMax: (this.lineData.wrapperWidth - (width / 2))
 				}
 			},
 			lineDragMove(_position) {
				var x =  _position.x + util.getCss(this.$refs.line, "width") / 2;
				this.currentTime = listAction.getCurrentTime("line", x)
 			}
 		},
 		components: {

 		}
 	}
</script>