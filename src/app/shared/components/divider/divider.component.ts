import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  imports: [],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
})
export class DividerComponent {
  @Input() fill = 'var(--color-bg)';
  @Input() variant: 'wave' | 'angle' = 'wave';
  @Input() flip = false;

  get path(): string {
    return this.variant === 'wave'
      ? 'M0,32 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,100 L0,100 Z'
      : 'M0,100 L1440,10 L1440,100 Z';
  }
}
