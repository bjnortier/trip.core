'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cloneDeep = require('lodash.clonedeep');
var joi = require('joi');

var Model = require('../Model');

// A generic model that also incorporates validation
// functions that prevent modification if values are
// illegal

var JoiModel = function (_Model) {
  _inherits(JoiModel, _Model);

  function JoiModel(schema, struct) {
    _classCallCheck(this, JoiModel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JoiModel).call(this));

    if (schema._type !== 'object') {
      throw new Error('schema must have object type at root');
    }
    var error;
    if (error = joi.validate(struct, schema).error) {
      throw new Error(error);
    }

    struct = cloneDeep(struct);

    // Only checks on level deep due to current lack of Proxy
    // implementations in JS environments
    schema._inner.children.forEach(function (child) {
      var key = child.key;
      Object.defineProperty(this, key, {

        set: function set(value) {
          var potentialNewStruct = cloneDeep(struct);
          potentialNewStruct[key] = value;
          if (error = joi.validate(potentialNewStruct, schema).error) {
            throw new Error(error);
          }

          struct = potentialNewStruct;
          this.emitChange(key, value);
        },

        get: function get() {
          return struct[key];
        }

      });
    }, _this);
    return _this;
  }

  return JoiModel;
}(Model);

module.exports = JoiModel;