import { model, Schema, Document } from 'mongoose';
import { Sample } from '@interfaces/samples.interface';

const sampleSchema: Schema = new Schema({
  sample: {
    type: String,
    required: true,
    unique: true,
  },
});

const sampleModel = model<Sample & Document>('Sample', sampleSchema);

export default sampleModel;
