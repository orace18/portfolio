import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ _id: false })
export class ProjectLinks {
  @Prop()
  playStore?: string;

  @Prop()
  github?: string;

  @Prop()
  live?: string;
}

@Schema({
  timestamps: true,
  collection: 'projects',
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Project {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true, unique: true, index: true })
  slug!: string;

  @Prop({ required: true })
  shortDescription!: string;

  @Prop({ required: true })
  longDescription!: string;

  @Prop({ type: [String], default: [] })
  stack!: string[];

  @Prop({ type: ProjectLinks, default: {} })
  links!: ProjectLinks;

  @Prop({ default: '' })
  coverImage!: string;

  @Prop({ default: true })
  visible!: boolean;

  @Prop({ default: 0 })
  order!: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
