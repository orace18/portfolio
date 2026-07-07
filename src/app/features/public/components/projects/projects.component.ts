import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/project.model';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-projects',
  imports: [ProjectDetailComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);

  readonly projects = toSignal(this.projectService.getVisibleProjects(), { initialValue: null });
  readonly selectedProject = signal<Project | null>(null);

  openProject(project: Project): void {
    this.selectedProject.set(project);
  }

  closeProject(): void {
    this.selectedProject.set(null);
  }
}
