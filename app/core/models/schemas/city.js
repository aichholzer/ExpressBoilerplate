module.exports = (mongoose) => {
  const schema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    meta: {
      createdOn: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        default: 'active'
      }
    }
  }, {
    strict: true,
    versionKey: false
  });

  schema.statics = {};
  return mongoose.model('City', schema, 'cities');
};
