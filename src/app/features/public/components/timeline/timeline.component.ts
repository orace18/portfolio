import { Component } from '@angular/core';
import { TIMELINE } from '../../../../core/data/timeline.data';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-timeline',
  imports: [ScrollRevealDirective],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  readonly items = TIMELINE;
}
