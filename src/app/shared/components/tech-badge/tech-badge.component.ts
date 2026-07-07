import { Component, Input } from '@angular/core';
import { techIconFor } from '../../../core/data/tech-icons.data';

@Component({
  selector: 'app-tech-badge',
  imports: [],
  templateUrl: './tech-badge.component.html',
  styleUrl: './tech-badge.component.scss',
})
export class TechBadgeComponent {
  @Input({ required: true }) name!: string;

  get iconUrl(): string | null {
    return techIconFor(this.name);
  }
}
