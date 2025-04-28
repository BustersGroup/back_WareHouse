import {Schema, model} from 'mongoose';

const clientSchema = new Schema({
    nameClient: {
        type: String,
        required: [true, "Name client is required"]
    },
    emailClient: {
        type: String,
        required: [true, "Email client is required"],
        unique: true,
    },
    contactClient: {
        type: String,
        required: [true, "Contact client is required"],
        unique: true
    },
    addressClient:{
        type:String,
        required:[true, "Address client is required"]
    },

},{
    timestamps:true,
    versionKey:false
});

export default model('Client', clientSchema);