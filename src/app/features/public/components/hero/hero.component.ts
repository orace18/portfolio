import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';

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

const TYPING_DELAY_MS = 700;
const TYPING_SPEED_MS = 28;

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly reduceMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  readonly photoLoaded = signal(false);
  readonly whatsappLink = 'https://wa.me/2290168894947';

  readonly tagline = TAGLINE;
  readonly taglineText = TAGLINE.map((segment) => segment.text).join('');

  private readonly typedCount = signal(this.reduceMotion ? this.taglineText.length : 0);
  readonly typingDone = computed(() => this.typedCount() >= this.taglineText.length);

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

  constructor() {
    afterNextRender(() => {
      if (this.reduceMotion) {
        return;
      }
      let interval: ReturnType<typeof setInterval> | undefined;
      const start = setTimeout(() => {
        interval = setInterval(() => {
          this.typedCount.update((count) => count + 1);
          if (this.typedCount() >= this.taglineText.length) {
            clearInterval(interval);
          }
        }, TYPING_SPEED_MS);
      }, TYPING_DELAY_MS);
      this.destroyRef.onDestroy(() => {
        clearTimeout(start);
        clearInterval(interval);
      });
    });
  }
}
