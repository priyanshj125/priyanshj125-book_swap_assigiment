import mongoose from 'mongoose';
const {Schema} = mongoose;
// mongoose.connect(`mongodb+srv://priyanshjain8491:aPvoRd73cDd5WgGw@inotebook.3gzpd1q.mongodb.net/?retryWrites=true&w=majority&appName=inotebook`)
const Userschema = new Schema({
    name:{
        type:String,
        requird :true
    },
    email:{
        type:String,
        requird :true,
        unique:true
    },
    password:{
        type:String,
        requird :true
    },  
    pic: {
        type: "String",
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
     },
    plan: {
        type: String,
        enum: ['free', 'basic', 'advanced'], 
        default: 'free' 
    }
});
const User = mongoose.model('user',Userschema);
// User.createIndexes();
export default User;
