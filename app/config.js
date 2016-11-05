'use strict';


module.exports = {
    env: process.env.NODE_ENV,
    mongo: {
        url: process.env.MONGO_URL,
        options: {
            db: {
                native_parser: true
            },
            server: {
                poolSize: parseInt(process.env.MONGO_POOL_SIZE, 10) || 10,
                socketOptions: {
                    keepAlive: parseInt(process.env.MONGO_KEEP_ALIVE, 10) || 1
                }
            }
        }
    }
};
