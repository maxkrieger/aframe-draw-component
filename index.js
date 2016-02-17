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
