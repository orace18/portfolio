import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Project } from '../../../../core/models/project.model';
import { TechBadgeComponent } from '../../../../shared/components/tech-badge/tech-badge.component';
import { coverImageUrl } from '../../../../core/utils/cover-image-url';
import { codeLinkLabel } from '../../../../core/utils/code-link';

interface DescriptionBlock {
  /** Libellé en gras ("Contexte", "Stack", "Mon rôle"…), absent pour un paragraphe libre. */
  label?: string;
  text: string;
}

// "Contexte : …" → libellé court (une à trois mots) suivi de deux-points.
const LABELLED = /^([A-ZÀ-Ý][\wÀ-ÿ' -]{1,24}) : ([\s\S]+)$/;

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
  readonly codeLinkLabel = codeLinkLabel;

  /** Découpe la description longue en paragraphes, en repérant les libellés. */
  get blocks(): DescriptionBlock[] {
    return this.project.longDescription
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => {
        const match = LABELLED.exec(paragraph);
        return match ? { label: match[1], text: match[2] } : { text: paragraph };
      });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  close(): void {
    this.closed.emit();
  }
}
