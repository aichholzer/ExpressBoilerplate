module.exports = (mongoose) => {
  const schema = new mongoose.Schema({
    username: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      default: null
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
  return mongoose.model('User', schema, 'users');
};
