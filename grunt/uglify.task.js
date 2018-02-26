module.exports = (grunt, path) => {
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  return {
    my_target: {
      files: [{
        expand: true,
        cwd: `${path}/source/js`,
        src: ['*.js', '!*.min.js'],
        dest: `${path}/app/public/js`,
        ext: '.min.js'
      }]
    }
  };
};
