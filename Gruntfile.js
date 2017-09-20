module.exports = function(grunt){
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        "babel": {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/app.js': 'js/app.js',
                    'public/form-submission.js': 'js/form-submission.js'
                }
            }
        },
        "sass": {
            dist: {
                files: {
                    'public/layout.css': 'scss/layout.scss',
                    'public/brand_styles.css': 'scss/brand_styles.scss',
                    'public/cv_styles.css': 'scss/cv_styles.scss',
                    'public/projects_styles.css': 'scss/projects_styles.scss',
                    'public/contact_styles.css': 'scss/contact_styles.scss'
                }
            }
        },
        "watch": {
            options: { livereload: true },
            css: {
                files: [ 'scss/*.scss'],
                tasks: ['sass','postcss']
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
            },
            images: {
                files: ['images/*'],
                tasks: ['responsive_images']
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: ["> 5%"]})
                ]
            },
            dist: {
                src: 'public/*.css'
            }
        },
        responsive_images: {
            jpeg_images: {
                options: {
                    engine: 'im',
                    sizes: [
                        {
                            name: '2x',
                            width: 1600,
                            quality: 30
                        },
                        {
                            name: '1x',
                            width: 800,
                            quality: 30
                        }
                    ]
                },

                files: [{
                    expand: true,
                    src: ['*.{gif,jpg}'],
                    cwd: 'images/',
                    dest: 'public/images/'
                }]
            }
        },

        /* Clear out the source directory if it exists */
        clean: {
            dev: {
                src: ['public'],
            },
        },

        /* Generate the photos_dev directory if it is missing */
        mkdir: {
            dev: {
                options: {
                    create: ['public/images']
                },
            },
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['*.svg', '*.png'],
                    dest: 'public/images/'
                }]
            }
        }
    });

    grunt.registerTask("sass-task", ["sass"]);
    grunt.registerTask("clean-public", ["clean", "mkdir"]);
    grunt.registerTask("responsive_images-task", ["responsive_images", "copy"]);
    grunt.registerTask("default", ["clean-public", "responsive_images-task", "sass-task", "babel-task" ,"watch"]);
    grunt.registerTask("babel-task", ["babel"]);
    grunt.registerTask("postcss-task", ["postcss"]);
    grunt.registerTask("copy-task", ["copy"]);
};

