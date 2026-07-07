import { Component } from '@angular/core';
import { TIMELINE } from '../../../../core/data/timeline.data';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  readonly items = TIMELINE;
}
