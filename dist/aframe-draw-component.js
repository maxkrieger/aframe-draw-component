/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Browser distribution of the A-Frame component.
	(function () {
	  if (typeof AFRAME === 'undefined') {
	    console.error('Component attempted to register before AFRAME was available.');
	    return;
	  }

	  // Register all components here.
	  var components = {
	    draw: __webpack_require__(1).component
	  };

	  Object.keys(components).forEach(function (name) {
	    if (AFRAME.aframeCore) {
	      AFRAME.aframeCore.registerComponent(name, components[name]);
	    } else {
	      AFRAME.registerComponent(name, components[name]);
	    }
	  });
	})();


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports.component = {
		schema: {
			width: {
				default: 256
			},
			height: {
				default: 256
			},
			background: {
				default: "#FFFFFF"
			}
		},

		init: function () {
			this.registers = []; //order of eventing after render
			this.update();
		},

		register: function(render) {
			this.registers.push(render);
		},

		update: function (oldData) {
			if (!oldData) this.createCanvas(this.data.width, this.data.height);
		},

		createCanvas: function (w, h) {
			var _ = this;
			var canvas = document.createElement("canvas");
			canvas.width = w;
			canvas.height = h;
			canvas.style = "display: none";
			_.canvas = canvas;
			_.ctx = canvas.getContext("2d");

			this.texture = new THREE.Texture(_.canvas); //renders straight from a canvas
			if(this.el.object3D.children.length > 0) { //backwards compatibility
				this.el.object3D.children[0].material = new THREE.MeshBasicMaterial();
				this.el.object3D.children[0].material.map = this.texture;
			}
			else { //backwards compatibility
				this.el.object3D.material = new THREE.MeshBasicMaterial();
				this.el.object3D.material.map = this.texture;
			}
			if(!this.el.hasLoaded) this.el.addEventListener("loaded", function() {
				_.render();
			});
			else _.render();
		},

		render: function() {
			if(this.registers.length > 0) { //backwards compatibility
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.ctx.fillStyle = this.data.background;
				this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
				this.registers.forEach(function(item) {
					item();
				});
			}
			this.texture.needsUpdate = true;
		},

		//not the most removable component out there, so will leave blank for now
		remove: function () {}
	};


/***/ }
/******/ ]);