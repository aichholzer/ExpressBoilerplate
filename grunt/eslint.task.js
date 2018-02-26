module.exports = (grunt, path) => {
  grunt.loadNpmTasks('grunt-eslint');
  grunt.registerTask('lint', ['eslint']);
  return {
    target: [
      `${path}//app/**/*.js`,
      `${path}//source/**/*.js`,
      `${path}//test/**/*.js`
    ],
    options: { quiet: false }
  };
};
