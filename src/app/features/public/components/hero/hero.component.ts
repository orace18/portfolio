import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly photoLoaded = signal(false);
  readonly whatsappLink = 'https://wa.me/2290168894947';
}
