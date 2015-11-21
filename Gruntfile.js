'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              'node_modules/video.js/dist/video-js.min.css',
              'node_modules/videojs-resume/dist/videojs-resume.min.css',
            ],
            dest: 'css/'
          },

          {
            expand: true,
            flatten: true,
            src: [
              'node_modules/jquery/dist/jquery.min.js',
              'node_modules/video.js/dist/video.min.js',
              'node_modules/video.js/dist/video.js.map',
              'node_modules/store/store.min.js',
              'node_modules/videojs-resume/dist/videojs-resume.min.js'
            ],
            dest: 'js/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);
};
