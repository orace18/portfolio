import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

export type ScrollRevealDirection = 'up' | 'left' | 'right';

@Directive({
  selector: '[appScrollReveal]',
  host: {
    class: 'scroll-reveal',
    '[class.scroll-reveal--left]': "revealFrom === 'left'",
    '[class.scroll-reveal--right]': "revealFrom === 'right'",
  },
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  @Input() revealDelay = 0;
  @Input() revealFrom: ScrollRevealDirection = 'up';

  ngOnInit(): void {
    if (this.revealDelay) {
      this.el.nativeElement.style.transitionDelay = `${this.revealDelay}ms`;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.classList.add('scroll-reveal--visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('scroll-reveal--visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
