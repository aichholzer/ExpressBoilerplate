'use strict';


const [
    fs,
    events,
    salvus,
    mongoose,
    util,
    config] = attract('fs', 'events', 'salvus/lib/io', 'mongoose', 'util', 'config');

const Models = function () {
    this.schemas = {};
    events.EventEmitter.call(this);
};

/**
 * Load all existing models.
 * Should be called only at boot time.
 */
Models.prototype.load = function () {

    return new Promise(yes => {

        const schemaPath = `${__dirname}/schemas/`;
        const schemas = fs.readdirSync(schemaPath).filter(schema => schema.match(/(.+)\.js$/));
        if (!salvus.lego(config, 'mongo.url') || !schemas.length) {
            return yes();
        }

        mongoose.Promise = global.Promise;
        mongoose.connect(config.mongo.url, config.mongo.options);
        mongoose.connection.on('error', () => {
            this.emit('error', 'Can\'t connect to the DB.');
        });

        schemas.forEach(file => {
            try {
                this.schemas[file.replace('.js', '')] = attract(schemaPath + file)(mongoose);
            } catch (error) {
                this.emit('error', `Can\'t load model: ${file}`);
            }
        });

        yes();
    });
};

/**
 * Get any model, available after boot.
 * @see Models.prototype.load()
 */
Models.prototype.get = function (schema) {

    const loadedSchema = this.schemas[schema];
    if (!loadedSchema) {
        return this.emit('error', `No such model: ${schema}`);
    }

    return loadedSchema;
};

util.inherits(Models, events.EventEmitter);
module.exports = new Models();
