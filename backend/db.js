import mongoose from 'mongoose';

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(`mongodb+srv://mandrinlandford:vaPmgnwDBKTx5JQA@bookassigiment.y7s1o.mongodb.net/?retryWrites=true&w=majority&appName=bookassigiment`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongodb atlas connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDb;
