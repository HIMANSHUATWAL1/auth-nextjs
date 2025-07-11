import mongoose from "mongoose";

export async function connectToDatabase() {

  try {

    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;
 
    connection.on("connected", ()=>{
        console.log("MongoDB connected successfully");
    })

    connection.on("error", (err) => {
        console.log("MongoDB connection error: " + err);
        process.exit();
        
    });

  } catch (err) {
    console.log("something goes wrong " + err);
  }
}
