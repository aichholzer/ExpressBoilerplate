module.exports = (grunt, path) => {
  grunt.registerTask('watch', ['watch']);
  return {
    scripts: {
      files: [
        `${path}/source/**/*`,
        `${path}/Gruntfile.js`
      ],
      tasks: ['build'],
      options: {
        spawn: false,
        interrupt: true
      }
    }
  };
};
