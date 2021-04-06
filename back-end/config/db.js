import  pkg  from "mongoose";

const mongoose = pkg;

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology : true,
            useNewUrlParser : true,
            useCreateIndex : true
        })
        console.log(`mongodb conected : ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.error(`errorr: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB;