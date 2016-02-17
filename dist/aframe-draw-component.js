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


/***/ }
/******/ ]);