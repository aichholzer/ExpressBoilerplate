'use strict';


require('dotenv').load();
module.exports = grunt => {

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            boilerplate: [
                '.'
            ]
        },
        jscs: {
            src: '.',
            options: {
                config: '.jscs',
                fix: true
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'source/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'app/public/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            unique: {
                files: [{
                    expand: true,
                    cwd: 'source/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'app/public/js',
                    ext: '.min.js'
                }]
            }
        },
        nodemon: {
            dev: {
                script: 'app/index.js',
                options: {
                    args: ['--trace-sync-io'],
                    callback: nodemon => {
                        nodemon.on('log', event => {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        NODE_ENV: grunt.option('env') || 'local',
                        PORT: process.env.PORT
                    },
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    ext: 'js',
                    delay: 250
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('hint', 'Hinting.', ['jshint:boilerplate', 'jscs']);
    grunt.registerTask('mini', 'Minifying.', ['cssmin', 'uglify']);
    grunt.registerTask('default', 'Running all tasks.', ['jshint:boilerplate', 'jscs', 'cssmin', 'uglify']);
};
