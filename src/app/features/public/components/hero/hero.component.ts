import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';

interface TypedSegment {
  text: string;
  /** Mot-clé mis en valeur (couleur d'accent). */
  highlight?: boolean;
}

const TAGLINE: TypedSegment[] = [
  { text: "3 ans d'expérience en développement " },
  { text: 'web, mobile et backend', highlight: true },
  { text: ', spécialiste du ' },
  { text: 'paiement mobile', highlight: true },
  { text: " en Afrique de l'Ouest. Je conçois des applications et des " },
  { text: 'APIs robustes', highlight: true },
  { text: ", de l'idée à la mise en production." },
];

const START_DELAY_MS = 700;
const TYPE_SPEED_MS = 28;
const ERASE_SPEED_MS = 12;
const HOLD_MS = 3600;
const RESTART_PAUSE_MS = 500;

type Phase = 'typing' | 'holding' | 'erasing';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly reduceMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  readonly photoLoaded = signal(false);
  readonly whatsappLink = 'https://wa.me/2290168894947';

  readonly tagline = TAGLINE;
  readonly taglineText = TAGLINE.map((segment) => segment.text).join('');

  private readonly typedCount = signal(this.reduceMotion ? this.taglineText.length : 0);
  private readonly phase = signal<Phase>('typing');
  /** Curseur calme quand le texte complet est affiché. */
  readonly typingDone = computed(() => this.phase() === 'holding' || this.reduceMotion);

  /** Segments tronqués au nombre de caractères déjà "tapés". */
  readonly visibleSegments = computed(() => {
    let remaining = this.typedCount();
    const result: TypedSegment[] = [];
    for (const segment of TAGLINE) {
      if (remaining <= 0) {
        break;
      }
      result.push({ ...segment, text: segment.text.slice(0, remaining) });
      remaining -= segment.text.length;
    }
    return result;
  });

  private timer: ReturnType<typeof setTimeout> | undefined;
  private onScreen = false;

  constructor() {
    afterNextRender(() => {
      if (this.reduceMotion || typeof IntersectionObserver === 'undefined') {
        this.typedCount.set(this.taglineText.length);
        return;
      }
      // La frappe tourne en boucle tant que le hero est visible, et se met en pause quand on le quitte.
      const observer = new IntersectionObserver(([entry]) => {
        this.onScreen = entry.isIntersecting;
        if (this.onScreen) {
          this.schedule(this.typedCount() === 0 ? START_DELAY_MS : 0);
        } else {
          this.stop();
        }
      });
      observer.observe(this.host.nativeElement);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        this.stop();
      });
    });
  }

  private schedule(delay: number): void {
    this.stop();
    this.timer = setTimeout(() => this.step(), delay);
  }

  private stop(): void {
    clearTimeout(this.timer);
    this.timer = undefined;
  }

  private step(): void {
    if (!this.onScreen) {
      return;
    }
    const total = this.taglineText.length;
    switch (this.phase()) {
      case 'typing':
        if (this.typedCount() < total) {
          this.typedCount.update((count) => count + 1);
          this.schedule(TYPE_SPEED_MS);
        } else {
          this.phase.set('holding');
          this.schedule(HOLD_MS);
        }
        break;
      case 'holding':
        this.phase.set('erasing');
        this.schedule(0);
        break;
      case 'erasing':
        if (this.typedCount() > 0) {
          this.typedCount.update((count) => count - 1);
          this.schedule(ERASE_SPEED_MS);
        } else {
          this.phase.set('typing');
          this.schedule(RESTART_PAUSE_MS);
        }
        break;
    }
  }
}
