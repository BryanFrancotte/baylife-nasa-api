import mongoose from "mongoose";

const mongoDBURI = process.env.MONGODB_URI ?? "mongodb+srv://app_db_user:v5xecoTMydKqwAtD@nasa.jqlmxih.mongodb.net/nasaAppDb?retryWrites=true&w=majority&appName=Nasa";

await mongoose.connect(mongoDBURI);

export default mongoose;