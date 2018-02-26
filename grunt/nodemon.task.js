/* eslint no-console: 0 */

module.exports = (grunt, path) => {
  grunt.loadNpmTasks('grunt-nodemon');
  return {
    dev: {
      script: `${path}/app/index.js`,
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
        cwd: path,
        ignore: [
          `${path}/node_modules/**`,
          `${path}/source/**`,
          `${path}/app/public/**`
        ],
        ext: 'js',
        delay: 200
      }
    }
  };
};
