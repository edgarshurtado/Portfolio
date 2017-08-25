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
              'css/layout.css': 'scss/layout.scss',
              'css/brand_styles.css': 'scss/brand_styles.scss',
              'css/cv_styles.css': 'scss/cv_styles.scss',
              'css/projects_styles.css': 'scss/projects_styles.scss',
              'css/contact_styles.css': 'scss/contact_styles.scss'
          }
        }
    },
    "watch": {
        options: { livereload: true },
        css: {
            files: [ 'scss/*.scss'],
            tasks: ['sass']
        },
        autoprefix: {
            files: ['css/*.css'],
            tasks: ['postcss']
        },
        js: {
            files: [ 'js/*.js'],
            tasks: ['babel']
        },
        html: {
            files: ["index.html"]
        }
    },
    postcss: {
      options: {
        map: true,
        processors: [
            require('autoprefixer')({browsers: ["> 5%",'last 2 version']})
        ]
      },
      dist: {
          src: 'public/*.css'
      }
    }
  });

  grunt.registerTask("sass-task", ["sass"]);
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("babel-task", ["babel"]);
  grunt.registerTask("postcss-task", ["postcss"]);
};

