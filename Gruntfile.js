require('dotenv').load();

const setupNodemon = (grunt, callback) => ({
  dev: {
    script: 'app/index.js',
    options: {
      callback,
      env: {
        NODE_ENV: grunt.option('env') || 'local',
        PORT: process.env.PORT
      },
      cwd: __dirname,
      ignore: ['node_modules/**'],
      ext: 'js',
      delay: 500
    }
  }
});

module.exports = (grunt) => {
  grunt.initConfig({
    nodemon: setupNodemon(grunt, (nodemon) => {
      process.stdout.write('\n\r');
      nodemon.on('log', (event) => {
        if (event.type === 'status') {
          process.stdout.write(`✔︎ ${event.colour}\n\r`);
        }
      });
    }),
    eslint: {
      target: ['./app/**/*.js']
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
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
      my_target: {
        files: [{
          expand: true,
          cwd: 'source/js',
          src: ['*.js', '!*.min.js'],
          dest: 'app/public/js',
          ext: '.min.js'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('mini', ['cssmin', 'uglify']);
  grunt.registerTask('default', ['eslint', 'cssmin', 'uglify']);
};
