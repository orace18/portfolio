import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { StorageService } from '../../../../core/services/storage.service';
import { ProjectFormValue } from '../../../../core/models/project.model';
import { slugify } from '../../../../core/utils/slugify';
import { coverImageUrl } from '../../../../core/utils/cover-image-url';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  private readonly storageService = inject(StorageService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly isEditMode = signal(false);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly stack = signal<string[]>([]);
  readonly stackInputValue = signal('');

  readonly existingCoverImage = signal<string>('');
  readonly selectedFile = signal<File | null>(null);
  readonly previewUrl = signal<string | null>(null);
  readonly fileError = signal<string | null>(null);

  readonly coverImageUrl = coverImageUrl;

  private projectId: string | null = null;
  private slugTouchedByUser = false;

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    shortDescription: ['', [Validators.required, Validators.maxLength(200)]],
    longDescription: ['', Validators.required],
    playStore: [''],
    github: [''],
    live: [''],
    visible: [true],
  });

  constructor() {
    this.form.controls.slug.valueChanges.subscribe(() => {
      this.slugTouchedByUser = true;
    });

    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.isEditMode.set(true);
      this.loadProject(this.projectId);
    } else {
      this.loading.set(false);
    }
  }

  private async loadProject(id: string): Promise<void> {
    const project = await this.projectService.fetchAllOnce().then((all) => all.find((p) => p.id === id));

    if (!project) {
      this.errorMessage.set('Projet introuvable.');
      this.loading.set(false);
      return;
    }

    this.form.setValue({
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      longDescription: project.longDescription,
      playStore: project.links.playStore ?? '',
      github: project.links.github ?? '',
      live: project.links.live ?? '',
      visible: project.visible,
    });
    this.stack.set([...project.stack]);
    this.existingCoverImage.set(project.coverImage);
    this.slugTouchedByUser = true;
    this.loading.set(false);
  }

  onTitleInput(value: string): void {
    if (!this.isEditMode() && !this.slugTouchedByUser) {
      this.form.controls.slug.setValue(slugify(value), { emitEvent: false });
    }
  }

  addStackTag(): void {
    const raw = this.stackInputValue().trim();
    if (!raw) return;

    const newTags = raw
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0 && !this.stack().includes(tag));

    if (newTags.length) {
      this.stack.update((tags) => [...tags, ...newTags]);
    }
    this.stackInputValue.set('');
  }

  removeStackTag(tag: string): void {
    this.stack.update((tags) => tags.filter((t) => t !== tag));
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.fileError.set(null);

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      this.fileError.set("Format d'image non supporté (JPEG, PNG ou WebP uniquement).");
      input.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.fileError.set("L'image dépasse la taille maximale autorisée (2 Mo).");
      input.value = '';
      return;
    }

    this.selectedFile.set(file);
    this.previewUrl.set(URL.createObjectURL(file));
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);

    try {
      const raw = this.form.getRawValue();
      let coverImage = this.existingCoverImage();

      const file = this.selectedFile();
      if (file) {
        coverImage = await this.storageService.uploadCoverImage(file);
      }

      const value: ProjectFormValue = {
        title: raw.title,
        slug: raw.slug,
        shortDescription: raw.shortDescription,
        longDescription: raw.longDescription,
        stack: this.stack(),
        links: {
          ...(raw.playStore ? { playStore: raw.playStore } : {}),
          ...(raw.github ? { github: raw.github } : {}),
          ...(raw.live ? { live: raw.live } : {}),
        },
        coverImage,
        visible: raw.visible,
        order: 0,
      };

      if (this.isEditMode() && this.projectId) {
        await this.projectService.updateProject(this.projectId, value);
      } else {
        const all = await this.projectService.fetchAllOnce();
        const maxOrder = all.reduce((max, p) => Math.max(max, p.order), 0);
        await this.projectService.createProject({ ...value, order: maxOrder + 1 });
      }

      await this.router.navigate(['/admin']);
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : "Une erreur est survenue lors de l'enregistrement."
      );
    } finally {
      this.saving.set(false);
    }
  }
}
