import { Timestamp } from '@angular/fire/firestore';

export interface ProjectLinks {
  playStore?: string;
  github?: string;
  live?: string;
}

export interface Project {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  stack: string[];
  links: ProjectLinks;
  coverImage: string;
  visible: boolean;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export type ProjectFormValue = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
