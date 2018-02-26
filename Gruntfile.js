/* eslint no-console: 0 */

require('dotenv').load();
const fs = require('fs');

module.exports = (grunt) => {
  try {
    const tasks = {};
    fs.readdirSync('./grunt').forEach((file) => {
      if (file.endsWith('.task.js')) {
        const fileName = file.replace('.task.js', '');
        const module = require.call(null, `${__dirname}/grunt/${file}`);
        tasks[fileName] = module(grunt, __dirname);
      }
    });

    grunt.initConfig(tasks);
    grunt.registerTask('build', ['cssmin', 'uglify']);
  } catch (error) {
    console.error(`I can't load Grunt; ${error.message}`);
  }
};
