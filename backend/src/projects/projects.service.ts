import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SEED_PROJECTS } from './seed-projects.data';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) {}

  findVisible(): Promise<Project[]> {
    return this.projectModel.find({ visible: true }).sort({ order: 1 }).exec();
  }

  findAll(): Promise<Project[]> {
    return this.projectModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Projet introuvable.');
    }
    return project;
  }

  create(dto: CreateProjectDto): Promise<Project> {
    return this.projectModel.create(dto);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!project) {
      throw new NotFoundException('Projet introuvable.');
    }
    return project;
  }

  async remove(id: string): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Projet introuvable.');
    }
  }

  async seedIfEmpty(): Promise<number> {
    const count = await this.projectModel.countDocuments().exec();
    if (count > 0) {
      return 0;
    }
    await this.projectModel.insertMany(SEED_PROJECTS);
    return SEED_PROJECTS.length;
  }
}
