# AFrame Draw Component

HTML5 canvas as a material for an [A-Frame](https://aframe.io) VR entity.

![demo](demo.png)

Fully extendable with components which utilize the canvas api.

## Installation

`npm i aframe-draw-component --save`

##Usage

Register the component with AFrame:

```js
var AFRAME = require("aframe-core");
var draw = require("aframe-draw-component").component;
AFRAME.registerComponent("draw", draw);
```

Then, you can implement it with third party components which utilize the draw component. Just put it after the `draw` prop, like this example using a `square` component:

```html
<a-entity position="0 1 0" geometry="primitive: box" draw="width: 256; height: 256" square="text: Hello">
</a-entity>
```

Or, if you want direct access to the Canvas API, write a quick component yourself:

```js
AFRAME.registerComponent("square", {
	dependencies: ["draw"],

	update: function() {
		var draw = this.el.components.draw; //get access to the draw component
		var ctx = draw.ctx;
		var canvas = draw.canvas;
		ctx.fillStyle = "#AFC5FF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "blue";
		ctx.fillRect(68, 68, 120, 120);
		ctx.fillStyle = "white";
		ctx.font = "36px Georgia";
		ctx.fillText(this.data.text, 80, 140);
		draw.render(); //tell it to update the texture
	}
});
```

**Note**: the example above is not ideal for third-party components, or when you're using multiple components in your project which use `draw`. See below:

##Advanced Usage & Render Binding

When writing a generic third party component, you will more than likely want to re-render the canvas. This may also require a clearing of the canvas itself. Because of this, it's imperative that every third party component encapsulate their use of the canvas into their own local render functions, and then register these functions into `draw`.

`draw` can then put every component into a call stack, and then re-render each component in the exact order that they were placed in. This also potentially allows for layering, although a-frame can handle this on its own using component updates pretty well.

An example of this uses `Object.bind`:

```js
AFRAME.registerComponent("square", {
	dependencies: ["draw"],
	init: function() {
		this.draw = this.el.components.draw;
		this.draw.register(this.render.bind(this));
	},
	update: function () {
		this.draw.render();
	},
	render: function () {
		var ctx = this.draw.ctx;
		var canvas = this.draw.canvas;
		ctx.fillStyle = "#AFC5FF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = this.data.color;
		ctx.fillRect(68, 68, 120, 120);
	}
});

AFRAME.registerComponent("greeting", {
	dependencies: ["draw"],
	init: function() {
		this.draw = this.el.components.draw;
		this.draw.register(this.render.bind(this));
	},
	update: function () {
		this.draw.render();
	},
	render: function () {
		var ctx = this.draw.ctx;
		ctx.fillStyle = "white";
		ctx.font = "36px Georgia";
		ctx.fillText(this.data.text, 80, 140);
	}
});
```

After each component is initialized, it registers its own `render` function with `draw`. If its own data is changed (within the `update` function), it will tell `draw` to re-render the entire canvas, and call both the `square` and `greeting`'s `render` functions in order.

##Methods & Component Properties

* These are only needed for writing your own components which utilize `draw`.

|Property|Description|
|------|-------|
|`.canvas`|hidden canvas to perform methods on|
|`.ctx`|hidden ctx to perform methods on|
|`.register([func] render)`|add your component's own `render` function to the registry so that it will re-render on any render call.|
|`.render()`|update the material with the new canvas|

##Properties

|Property|Description|
|------|-------|
|`width`|width of canvas (should match ratio of a face of the entity)|
|`height`|height of canvas (should match ratio of a face of the entity)|
|`background`|background color of canvas|

##Featured Components
* [Text Wrap](https://www.npmjs.com/package/aframe-textwrap-component) - full text wrapping
* [HTML Texture](https://github.com/scenevr/htmltexture-component) - render html as a texture (!!!)

##Additional Info

* Thanks to [ngokevin](https://github.com/ngokevin) and [RangerMauve](https://github.com/RangerMauve) for their help.
* As this is meant to be an extendable component, PR's to the readme are welcome.
