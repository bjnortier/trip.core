'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ee = require('event-emitter');

/**
 * A Scene is a container for views.
 */

var Scene = function Scene(container) {
  _classCallCheck(this, Scene);

  ee(this);
  this.container = container;
};

module.exports = Scene;