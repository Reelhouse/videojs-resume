'use strict';

var $ = require('jquery');
var videojs = require('video.js');
var store = require('store');

var Resume = function(options) {

  if (!$) return console.error('jQuery not available');
  if (!store) return console.error('store.js is not available');
  if (!store.enabled) return console.error('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');

  var player = this;
  var videoId = options.uuid;
  var playbackOffset = options.playbackOffset || 0;
  var key = 'videojs-resume:' + videoId;

  var confirmResume = '<div class="vjs-resume-overlay-dialog">' +
    '<p>Resume from where you left off?</p>' +
    '<div class="buttons">' +
    '<button class="resume">Resume</button>' +
    '<button class="no-resume">No Thanks</button>' +
    '</div></div>';

  var el = $('<div/>');
  el.addClass('vjs-resume-overlay');
  el.html(confirmResume);
  player.el().appendChild(el[0]);

  var $resumeOverlay = $('#' + player.id_ + ' .vjs-resume-overlay');

  player.on('timeupdate', function() {
    store.set(key, player.currentTime());
  });

  player.on('ended', function() {
    store.remove(key);
  });


  player.ready(function() {
    var resumeFromTime = store.get(key);

    if (resumeFromTime) {
      $resumeOverlay.show();
    }

    if (resumeFromTime >= 5) resumeFromTime = resumeFromTime - playbackOffset;

    $resumeOverlay.find('.resume').on('click', function(e) {
      e.stopPropagation();
      $resumeOverlay.remove();
      player.currentTime(resumeFromTime);
      player.play();
    });

    $('#' + player.id_).on('click', function() {
      if ($resumeOverlay.length) {
        $resumeOverlay.remove();
        store.remove(key);
      }
    });
  });
};

videojs.plugin('Resume', Resume);
