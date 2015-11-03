module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      build: {
        files: {
          'dist/videojs-resume.min.js': 'lib/videojs-resume.js'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['*.css'],
          dest: 'dist/',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['cssmin', 'uglify']);
};
