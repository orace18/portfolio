import { Component } from '@angular/core';
import { SKILLS } from '../../../../core/data/skills.data';
import { TechBadgeComponent } from '../../../../shared/components/tech-badge/tech-badge.component';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [TechBadgeComponent, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly skillGroups = SKILLS;
}
