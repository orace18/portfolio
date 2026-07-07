import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/project.model';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { TechBadgeComponent } from '../../../../shared/components/tech-badge/tech-badge.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [ProjectDetailComponent, TechBadgeComponent, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly projectService = inject(ProjectService);

  readonly projects = toSignal(
    this.projectService.getVisibleProjects().pipe(catchError(() => of([]))),
    { initialValue: null }
  );
  readonly selectedProject = signal<Project | null>(null);

  openProject(project: Project): void {
    this.selectedProject.set(project);
  }

  closeProject(): void {
    this.selectedProject.set(null);
  }
}
