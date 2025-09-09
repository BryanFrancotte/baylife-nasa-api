import { Document, model, Schema } from "mongoose";

// this interface needs to always be in sync with the schema!!!
// TODO: Use InferSchemaType to generate this interface automatically
export interface IRole extends Document{
    order: number;
    name: string;
    permission: string;
    percentage: number;
}

// Define the schema (What is really used in the database)
const schema = new Schema<IRole>({
    order: { type: Number },
    name: { type: String },
    permission: { type: String },
    percentage: { type: Number },
});

export default model<IRole>('role', schema)