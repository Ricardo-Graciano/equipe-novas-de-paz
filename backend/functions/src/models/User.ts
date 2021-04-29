import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    password: string;
    createdAt: string
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
}, {
    timestamps: {
        createdAt: 'createdAt', 
    }
});
  
export default mongoose.model<IUser>('User', UserSchema);