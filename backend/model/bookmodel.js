import mongoose from "mongoose";
const bookschema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        publishyear: {type: String,
            required: true
        },
    },
    {
        timestamps:true
    }
);
export const Book=mongoose.model('Book',bookschema);