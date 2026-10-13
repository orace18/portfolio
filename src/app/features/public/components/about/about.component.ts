import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

interface AboutPhoto {
  src: string;
  alt: string;
  /** Emplacement dans la mosaïque (voir about.component.scss). */
  tile: 'wide' | 'tall-left' | 'tall-right' | 'small-a' | 'small-b';
}

@Component({
  selector: 'app-about',
  imports: [ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly photos: AboutPhoto[] = [
    { src: 'photos/about-style.jpg', alt: 'Portrait en tenue traditionnelle', tile: 'tall-left' },
    { src: 'photos/about-laptop.jpg', alt: 'Orace EDJO concentré devant son ordinateur', tile: 'wide' },
    { src: 'photos/about-event.jpg', alt: "Orace EDJO lors d'un événement Betogether", tile: 'tall-right' },
    { src: 'photos/about-portrait.jpg', alt: "Portrait d'Orace EDJO en chemise à carreaux", tile: 'small-a' },
    { src: 'photos/contact.jpg', alt: 'Orace EDJO, le téléphone à la main', tile: 'small-b' },
  ];
}
