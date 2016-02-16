'use strict';

const ee = require('event-emitter');

class View {

  constructor(model, scene) {
    this.model = model;
    this.scene = scene;
    ee(this);

    // Respond to model 'change' events by triggering an 'update'
    // event
    const _this = this;
    this.changeFn = () => {
      _this.emit('pre_update');
      _this.update.apply(_this, arguments);
      _this.emit('post_update');
    };

    model.on('change', this.changeFn);

    // Render on next tick to ensure view
    // construction is complete
    setTimeout(() => {
      _this.emit('pre_render');
      _this.render();
      _this.emit('post_render');
    }, 0);
  }

  remove() {
    this.model.off('change', this.changeFn);
  }

}

module.exports = View;
