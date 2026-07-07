import { Component } from '@angular/core';
import { SKILLS } from '../../../../core/data/skills.data';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly skillGroups = SKILLS;
}
