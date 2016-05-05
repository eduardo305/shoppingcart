module.exports = function(grunt) {
  grunt.initConfig({
    jasmine : {
      src : '*.js',

      options : {
        specs : 'specs/**/*spec.js'
      },

      helpers : 'specs/helpers/*.js'
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', 'jasmine');
};
