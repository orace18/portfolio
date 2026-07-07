import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Project } from '../../../../core/models/project.model';
import { TechBadgeComponent } from '../../../../shared/components/tech-badge/tech-badge.component';
import { coverImageUrl } from '../../../../core/utils/cover-image-url';

@Component({
  selector: 'app-project-detail',
  imports: [TechBadgeComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  @Input({ required: true }) project!: Project;
  @Output() closed = new EventEmitter<void>();

  readonly coverImageUrl = coverImageUrl;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  close(): void {
    this.closed.emit();
  }
}
