import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    tokens: {
        access_token : {
            type : String,
        },
        refresh_token : {
            type : String,
        },
        scope : {
            type : String,
        },
        token_type : {
            type : String,
        },
        id_token : {
            type :String,
        },
        expiry_date : {
            type: Number
        }
    }
});

const User = mongoose.model('User', user);

export default User;