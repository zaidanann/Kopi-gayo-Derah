import mongoose, { Document, Schema } from 'mongoose';

export interface IMenu extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  available: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Espresso', 'Milk Coffee', 'Cold Coffee', 'Traditional', 'Manual Brew', 'Beans', 'Other'],
    },
    image: { type: String, default: '' },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Menu || mongoose.model<IMenu>('Menu', MenuSchema);
