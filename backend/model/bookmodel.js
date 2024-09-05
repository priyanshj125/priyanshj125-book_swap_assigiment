import mongoose from "mongoose";
// import User from "backend/model/user.js";
// const bookschema = mongoose.Schema(
//     {     
        
        
        
//         user: {
//          type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User', required: true
//      },



//         title:{
//             type: String,
//             required: true
//         },
//         author:{
//             type: String,
//             required: true
//         },
//         publishyear: {type: String,
//             required: true
//         },
//     },
//     {
//         timestamps:true
//     }
// );
// export const Book=mongoose.model('Book',bookschema);

const bookSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    publishyear: {
      type: String,
      required: true
    },
    message:{
      type: String,
      required: true
    },
     yemail:{
      type: String,
      required: true
    },
  }, { timestamps: true });
  
  export const Book=mongoose.model('Book',bookSchema);
  