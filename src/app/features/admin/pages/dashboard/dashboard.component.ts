import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../core/models/project.model';
import { coverImageUrl } from '../../../../core/utils/cover-image-url';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly projectService = inject(ProjectService);

  readonly projects = toSignal(this.projectService.getAllProjects(), { initialValue: null });
  readonly busyId = signal<string | null>(null);
  readonly seeding = signal(false);
  readonly message = signal<string | null>(null);

  readonly coverImageUrl = coverImageUrl;

  async toggleVisible(project: Project): Promise<void> {
    if (!project.id) return;
    this.busyId.set(project.id);
    try {
      await this.projectService.setVisible(project.id, !project.visible);
    } finally {
      this.busyId.set(null);
    }
  }

  async remove(project: Project): Promise<void> {
    if (!project.id) return;
    const confirmed = confirm(`Supprimer définitivement le projet "${project.title}" ?`);
    if (!confirmed) return;

    this.busyId.set(project.id);
    try {
      await this.projectService.deleteProject(project.id);
    } finally {
      this.busyId.set(null);
    }
  }

  async moveUp(project: Project): Promise<void> {
    await this.swapOrder(project, -1);
  }

  async moveDown(project: Project): Promise<void> {
    await this.swapOrder(project, 1);
  }

  private async swapOrder(project: Project, direction: -1 | 1): Promise<void> {
    const list = this.projects();
    if (!list || !project.id) return;

    const index = list.findIndex((p) => p.id === project.id);
    const neighborIndex = index + direction;
    if (index === -1 || neighborIndex < 0 || neighborIndex >= list.length) return;

    const neighbor = list[neighborIndex];
    if (!neighbor.id) return;

    this.busyId.set(project.id);
    try {
      await Promise.all([
        this.projectService.setOrder(project.id, neighbor.order),
        this.projectService.setOrder(neighbor.id, project.order),
      ]);
    } finally {
      this.busyId.set(null);
    }
  }

  async importSeed(): Promise<void> {
    this.seeding.set(true);
    this.message.set(null);
    try {
      const count = await this.projectService.seedIfEmpty();
      this.message.set(
        count > 0
          ? `${count} projets de démarrage importés.`
          : 'La collection contient déjà des projets, import ignoré.'
      );
    } finally {
      this.seeding.set(false);
    }
  }
}
