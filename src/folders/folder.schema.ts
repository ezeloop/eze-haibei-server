import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Folder extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: String, ref: 'Task' }] })
  tasks: string[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
