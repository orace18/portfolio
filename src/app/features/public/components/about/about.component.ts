import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

interface AboutPhoto {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-about',
  imports: [ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly photos: AboutPhoto[] = [
    { src: 'photos/about-laptop.jpg', alt: 'Orace EDJO concentré devant son ordinateur' },
    { src: 'photos/about-style.jpg', alt: 'Portrait en tenue traditionnelle' },
    { src: 'photos/about-portrait.jpg', alt: 'Portrait d\'Orace EDJO en chemise à carreaux' },
    { src: 'photos/about-event.jpg', alt: 'Orace EDJO lors d\'un événement Betogether' },
  ];
}
