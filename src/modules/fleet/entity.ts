import {Document, model, Schema} from "mongoose";

export interface ICar extends Document {
    order: number;
    vehicleType: string;
    plate: string;
    mileage: number;
    seating: number;
    storage: number;
    location: string;
}

const schema = new Schema<ICar>(); // Define the schema

export default model<ICar>('car', schema)