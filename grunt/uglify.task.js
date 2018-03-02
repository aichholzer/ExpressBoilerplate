module.exports = (grunt, path) => {
  const files = {};
  const output = grunt.option('out') || 'boilerplate';
  files[`${path}/app/public/js/${output}.min.js`] = [
    '*.js',
    '!*.min.js'
  ].map(file => `${path}/source/js/${file}`);

  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  return {
    min: {
      options: {
        mangle: true,
        compress: true
      },
      files
    }
  };
};
