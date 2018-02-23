/* eslint no-console: 0 */

module.exports = {
  info: (...args) => console.log(`[Boilerplate, ${new Date()}] ${args.join(' ')}`),

  error: (...args) => console.error(`[Boilerplate, ${new Date()}] ${args.join(' ')}`)
};
