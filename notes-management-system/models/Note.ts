import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  tags: string[];
  userId: mongoose.Types.ObjectId;
  isDeleted: boolean;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);
