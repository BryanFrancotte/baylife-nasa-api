import {Document, model, Schema} from "mongoose";

// this interface needs to always be in sync with the schema!!!
// TODO: Use InferSchemaType to generate this interface automatically
export interface ICar extends Document {
    order: number;
    vehicleType: string;
    plate: string;
    mileage: number;
    seating: number;
    storage: number;
    location: string;
}

// Define the schema (What is really used in the database)
const schema = new Schema<ICar>({
    order: { type: Number },
    vehicleType: { type: String },
    plate: { type: String },
    mileage: { type: Number, default: 0 },
    seating: { type: Number },
    storage: { type: Number },
    location: { type: String },
});

export default model<ICar>('car', schema)