import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User'

export interface ISong extends Document {
    title: string;
    singer: string;
    key?: string;
    lyrics: string
    user: IUser['_id'];
    createdAt: string;
    updatedAt: string;
}

const SongSchema: Schema = new Schema({
    title: { type: String, required: true },
    singer: { type: String, required: true },
    key: { type: String },
    lyrics: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true }
}, {
    timestamps: {
        createdAt: 'createdAt', 
        updatedAt: 'updatedAt'
    }
});
  
export default mongoose.model<ISong>('Song', SongSchema);