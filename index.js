/**
 * Example component for A-Frame.
 */
module.exports.component = {
	schema: {
		width: {
			default: 256
		},
		height: {
			default: 256
		}
	},

	/**
	 * Called once when component is attached. Generally for initial setup.
	 */
	init: function () {
		this.registers = []; //order of eventing after render
	},

	register: function(render) {
		this.registers.push(render);
	},

	/**
	 * Called when component is attached and when component data changes.
	 * Generally modifies the entity based on the data.
	 */
	update: function (oldData) {
		if (!oldData) this.createCanvas(this.data.width, this.data.height);
	},

	createCanvas: function (w, h) {
		var _ = this;
		var canvas = document.createElement("canvas");
		canvas.id = this.generateId();
		canvas.width = w;
		canvas.height = h;
		canvas.style = "display: none";
		_.canvas = canvas;
		_.ctx = canvas.getContext("2d");
		if(!this.el.hasLoaded) this.el.addEventListener("loaded", function() {
			_.render();
		});
		else _.render();
	},

	render: function() {
		if(this.registers.length > 0) { //backwards compatibility
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.registers.forEach(function(item) {
				item();
			});
		}
		this.el.setAttribute("material", "src", "url(" + this.canvas.toDataURL() + ")");
	},

	generateId: function () {
		var next = Math.floor(Math.random() * Math.pow(10, 20));
		while (document.getElementById("C" + next)) {
			next = Math.floor(Math.random() * Math.pow(10, 20));
		}
		return "C" + next;
	},

	/**
	 * Called when a component is removed (e.g., via removeAttribute).
	 * Generally undoes all modifications to the entity.
	 */
	remove: function () {}
};
