import mongoose, { Document, Schema } from 'mongoose';

interface TimelineItem {
  year: string;
  event: string;
}

interface ProductItem {
  name: string;
  description: string;
}

interface Composition {
  beans: string;
  roasting: string;
  acidity: string;
  aroma: string;
  taste: string;
}

export interface IAbout extends Document {
  title: string;
  subtitle: string;
  story: string;
  origin: string;
  vision: string;
  mission: string;
  products: ProductItem[];
  composition: Composition;
  timeline: TimelineItem[];
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    story: { type: String, required: true },
    origin: { type: String, required: true },
    vision: { type: String, required: true },
    mission: { type: String, required: true },
    products: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    composition: {
      beans: { type: String, default: '' },
      roasting: { type: String, default: '' },
      acidity: { type: String, default: '' },
      aroma: { type: String, default: '' },
      taste: { type: String, default: '' },
    },
    timeline: [
      {
        year: { type: String, required: true },
        event: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
