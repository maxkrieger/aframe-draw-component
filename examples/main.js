var AFRAME = require("aframe-core");
var drawComponent = require("../index.js").component;
AFRAME.registerComponent("draw", drawComponent);
AFRAME.registerComponent("square", {
	dependencies: ["draw"],

	init: function() {
		var draw = this.el.components.draw;
		var ctx = draw.ctx;
		var canvas = draw.canvas;
		ctx.fillStyle = "#AFC5FF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "blue";
		ctx.fillRect(68, 68, 120, 120);
		ctx.fillStyle = "white";
		ctx.font = "36px Georgia";
		ctx.fillText(this.data.text, 80, 140);
		draw.render();
	}
});
