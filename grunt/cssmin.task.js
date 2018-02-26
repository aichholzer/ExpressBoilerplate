module.exports = (grunt, path) => {
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  return {
    options: {
      keepSpecialComments: 0
    },
    target: {
      files: [{
        expand: true,
        cwd: `${path}/source/css`,
        src: ['*.css', '!*.min.css'],
        dest: `${path}/app/public/css`,
        ext: '.min.css'
      }]
    }
  };
};
