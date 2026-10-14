import { Component, ElementRef, HostListener, afterNextRender, inject, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

interface AboutPhoto {
  src: string;
  alt: string;
  /** Emplacement dans la mosaïque (voir about.component.scss). */
  tile: 'tall-left' | 'small-left' | 'wide' | 'duo' | 'tall-right';
}

@Component({
  selector: 'app-about',
  imports: [ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly photos: AboutPhoto[] = [
    { src: 'photos/about-style.jpg', alt: 'Portrait en tenue traditionnelle', tile: 'tall-left' },
    { src: 'photos/about-work.jpg', alt: 'Orace EDJO au travail', tile: 'small-left' },
    { src: 'photos/about-laptop.jpg', alt: 'Orace EDJO concentré devant son ordinateur', tile: 'wide' },
    { src: 'photos/about-phone.jpg', alt: 'Orace EDJO, le téléphone à la main', tile: 'duo' },
    { src: 'photos/about-event.jpg', alt: "Orace EDJO lors d'un événement Betogether", tile: 'tall-right' },
  ];

  /** Progression 0 → 1 de la section dans la fenêtre : la mosaïque se redresse en défilant. */
  readonly progress = signal(0);
  private readonly reduceMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    afterNextRender(() => this.onScroll());
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onScroll(): void {
    if (this.reduceMotion) {
      return;
    }
    const rect = this.host.nativeElement.getBoundingClientRect();
    const viewport = window.innerHeight;
    const raw = (viewport - rect.top) / (viewport + rect.height * 0.5);
    this.progress.set(Math.min(1, Math.max(0, raw)));
  }

  /** Mots-clés affichés en pastilles sous le texte. */
  readonly facts = ["3 ans d'expérience", 'Bénin', 'Paiement mobile', 'Flutter', 'Spring Boot', 'NestJS', 'FastAPI'];

  /** Inclinaison 3D : forte à l'arrivée, presque à plat au centre de l'écran. */
  get mosaicTransform(): string {
    const t = this.progress();
    const rotateX = 34 - 22 * t;
    const rotateY = -22 + 12 * t;
    const rotateZ = 7 - 4 * t;
    return `rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) rotateZ(${rotateZ.toFixed(1)}deg)`;
  }
}
