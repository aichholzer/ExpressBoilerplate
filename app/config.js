module.exports = {
  env: process.env.NODE_ENV,
  mongo: {
    url: process.env.MONGO_URI,
    options: {
      poolSize: parseInt(process.env.MONGO_POOL_SIZE, 10) || 10,
      keepAlive: parseInt(process.env.MONGO_KEEP_ALIVE, 10) || 1
    }
  }
};
