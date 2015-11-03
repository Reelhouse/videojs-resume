(function (window, videojs, $) {
  'use strict';

  if (!$) return console.error('jQuery not available');

  var storage = {
    get: function(id){
      var data = JSON.parse(window.localStorage.getItem('videojs-resume:' + id));
      return data || false;
    },
    set: function(id, seconds){
      return window.localStorage.setItem('videojs-resume:' + id, JSON.stringify(seconds));
    },
    remove: function(id){
      localStorage.removeItem('videojs-resume:' + id);
    },
    isAvailable: function(){
      var result;
      try {
        window.localStorage.setItem('foo', 'bar');
        result = window.localStorage.getItem('foo') === 'bar';
        window.localStorage.removeItem('foo');
        return result;
      } catch(e) {}
      return false;
    }
  };

  var Resume = function(options) {

    var player = this;
    var videoId = options.uuid;
    var playbackOffset = options.playbackOffset || 0;

    if (!storage.isAvailable) {
      console.error('localStorage is not available. No access to VideoJS.Resume');
      return;
    }

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
      storage.set(videoId, player.currentTime());
    });

    player.on('ended', function() {
      storage.remove(videoId);
    });


    player.ready(function() {
      var resumeFromTime = storage.get(videoId);

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
          storage.remove(videoId);
        }
      });
    });
  };

  videojs.plugin('Resume', Resume);

})(window, window.videojs, window.jQuery);
