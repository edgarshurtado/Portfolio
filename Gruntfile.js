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
              'public/layout.css': 'scss/layout.scss',
              'public/brand_styles.css': 'scss/brand_styles.scss'
          }
        }
    },
    "watch": {
        options: { livereload: true },
        css: {
            files: [ 'scss/*.scss'],
            tasks: ['sass']
        },
        js: {
            files: [ 'js/*.js'],
            tasks: ['babel']
        },
        html: {
            files: ["index.html"]
        }
    }
  });

  grunt.registerTask("sass-task", ["sass"]);
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("babel-task", ["babel"]);
};

