'use strict';


module.exports = mongoose => {

    const Schema = mongoose.Schema;
    const schema = new Schema(
        {
            username: {
                type: String,
                trim: true,
                required: true,
                unique: true
            },
            password: {
                type: String,
                trim: true,
                required: true,
                unique: true
            },
            name: {
                first: {
                    type: String,
                    trim: true,
                    default: null
                },
                last: {
                    type: String,
                    trim: true,
                    default: null
                }
            },
            meta: {
                createdOn: {
                    type: Date,
                    default: Date.now
                }
            }
        },
        {
            strict: true,
            versionKey: false
        }
    );

    return mongoose.model('User', schema, 'users');
};
