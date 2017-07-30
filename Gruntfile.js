module.exports = function(grunt){
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    "babel": {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/app.js': 'js/app.js'
        }
      }
    },
    "sass": {
        dist: {
          files: {
              'public/styles.css': 'scss/styles.scss'
          }
        }
    },
    "watch": {
      css: {
        files: 'scss/*.scss',
        tasks: ['sass']
      },
      js: {
        files: 'js/*.js',
        tasks: ['babel']
      }
    }
  });

  grunt.registerTask("default", ["babel"]);
  grunt.registerTask("watch", ["watch"]);
}

