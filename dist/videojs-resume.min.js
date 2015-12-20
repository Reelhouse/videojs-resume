(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _store = (typeof window !== "undefined" ? window['store'] : typeof global !== "undefined" ? global['store'] : null);

var _store2 = _interopRequireDefault(_store);

var Button = _videoJs2['default'].getComponent('Button');
var Component = _videoJs2['default'].getComponent('Component');
var ModalDialog = _videoJs2['default'].getComponent('ModalDialog');

var ResumeButton = (function (_Button) {
  _inherits(ResumeButton, _Button);

  function ResumeButton(player, options) {
    _classCallCheck(this, ResumeButton);

    _get(Object.getPrototypeOf(ResumeButton.prototype), 'constructor', this).call(this, player, options);
    this.resumeFromTime = options.resumeFromTime;
    this.player = player;
  }

  _createClass(ResumeButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-resume';
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(ResumeButton.prototype), 'createEl', this).call(this, 'button', {
        innerHTML: '' + this.options_.buttonText
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.player_.resumeModal.close();
      this.player_.currentTime(this.resumeFromTime);
      this.player_.play();
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event) {
      // Check for space bar (32) or enter (13) keys
      if (event.which === 32 || event.which === 13) {
        if (this.player.paused()) {
          this.player.play();
        } else {
          this.player.pause();
        }
        event.preventDefault();
      }
    }
  }]);

  return ResumeButton;
})(Button);

ResumeButton.prototype.controlText_ = 'Resume';

var ResumeCancelButton = (function (_Button2) {
  _inherits(ResumeCancelButton, _Button2);

  function ResumeCancelButton() {
    _classCallCheck(this, ResumeCancelButton);

    _get(Object.getPrototypeOf(ResumeCancelButton.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ResumeCancelButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-no-resume';
    }
  }, {
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(ResumeCancelButton.prototype), 'createEl', this).call(this, 'button', {
        innerHTML: '' + this.options_.buttonText
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.player_.resumeModal.close();
      _store2['default'].remove(this.options_.key);
    }
  }]);

  return ResumeCancelButton;
})(Button);

ResumeButton.prototype.controlText_ = 'No Thanks';

var ModalButtons = (function (_Component) {
  _inherits(ModalButtons, _Component);

  function ModalButtons(player, options) {
    _classCallCheck(this, ModalButtons);

    _get(Object.getPrototypeOf(ModalButtons.prototype), 'constructor', this).call(this, player, options);
    this.addChild('ResumeButton', {
      buttonText: options.resumeButtonText,
      resumeFromTime: options.resumeFromTime
    });
    this.addChild('ResumeCancelButton', {
      buttonText: options.cancelButtonText,
      key: options.key
    });
  }

  _createClass(ModalButtons, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(ModalButtons.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-resume-modal-buttons',
        innerHTML: '\n        <p>' + this.options_.title + '</p>\n      '
      });
    }
  }]);

  return ModalButtons;
})(Component);

var ResumeModal = (function (_ModalDialog) {
  _inherits(ResumeModal, _ModalDialog);

  function ResumeModal(player, options) {
    _classCallCheck(this, ResumeModal);

    _get(Object.getPrototypeOf(ResumeModal.prototype), 'constructor', this).call(this, player, options);
    this.player_.resumeModal = this;
    this.open();
    this.addChild('ModalButtons', {
      title: options.title,
      resumeButtonText: options.resumeButtonText,
      cancelButtonText: options.cancelButtonText,
      resumeFromTime: options.resumeFromTime,
      key: options.key
    });
  }

  _createClass(ResumeModal, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-resume-modal ' + _get(Object.getPrototypeOf(ResumeModal.prototype), 'buildCSSClass', this).call(this);
    }
  }]);

  return ResumeModal;
})(ModalDialog);

_videoJs2['default'].registerComponent('ResumeButton', ResumeButton);
_videoJs2['default'].registerComponent('ResumeCancelButton', ResumeCancelButton);
_videoJs2['default'].registerComponent('ModalButtons', ModalButtons);
_videoJs2['default'].registerComponent('ResumeModal', ResumeModal);

var Resume = function Resume(options) {
  var msg = undefined;

  if (!_store2['default']) {
    return _videoJs2['default'].log('store.js is not available');
  }
  if (!_store2['default'].enabled) {
    msg = 'Local storage is not supported by your browser.';
    msg += ' Please disable "Private Mode", or upgrade to a modern browser.';
    return _videoJs2['default'].log(msg);
  }

  var videoId = options.uuid;
  var title = options.title || 'Resume from where you left off?';
  var resumeButtonText = options.resumeButtonText || 'Resume';
  var cancelButtonText = options.cancelButtonText || 'No Thanks';
  var playbackOffset = options.playbackOffset || 0;
  var key = 'videojs-resume:' + videoId;

  this.on('timeupdate', function () {
    _store2['default'].set(key, this.currentTime());
  });

  this.on('ended', function () {
    _store2['default'].remove(key);
  });

  this.ready(function () {
    var resumeFromTime = _store2['default'].get(key);

    if (resumeFromTime) {
      if (resumeFromTime >= 5) {
        resumeFromTime -= playbackOffset;
      }
      if (resumeFromTime <= 0) {
        resumeFromTime = 0;
      }
      this.addChild('ResumeModal', {
        title: title,
        resumeButtonText: resumeButtonText,
        cancelButtonText: cancelButtonText,
        resumeFromTime: resumeFromTime,
        key: key
      });
    }
  });
};

_videoJs2['default'].plugin('Resume', Resume);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
