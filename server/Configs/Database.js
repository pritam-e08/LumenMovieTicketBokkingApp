import mongoose from "mongoose";
const DatabaseConnection = async (req, res) => {
  try {
    const Database = await mongoose.connect(process.env.Mongo_Uri);
    console.log("Database connceted successfully", Database);
   
  } catch (error) {
    console.log("Failed connecting Database", error);
  
    process.exit(1);
  }
};

export default DatabaseConnection
