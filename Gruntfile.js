require('dotenv').load();

module.exports = (grunt) => {
  grunt.initConfig({
    eslint: {
      target: [
        './app/**/*.js',
        './source/**/*.js',
        './test/**/*.js'
      ],
      options: { quiet: false }
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
    },
    nodemon: {
      dev: {
        script: 'app/index.js',
        options: {
          callback: (nodemon) => {
            console.log();
            nodemon.on('log', (event) => {
              if (event.type === 'status') {
                console.log(`✔︎ ${event.colour}`);
              }
            });
          },
          env: {
            NODE_ENV: grunt.option('env') || 'local',
            PORT: process.env.PORT
          },
          cwd: __dirname,
          ignore: ['node_modules/**', 'source/**', 'app/public/**'],
          ext: 'js',
          delay: 200
        }
      }
    },
    watch: {
      scripts: {
        files: ['source/**/*', 'Gruntfile.js'],
        tasks: ['mini'],
        options: {
          spawn: false,
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('build', ['cssmin', 'uglify']);
};
