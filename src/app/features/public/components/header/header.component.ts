import { Component, HostListener, signal } from '@angular/core';

interface NavLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly menuOpen = signal(false);
  /** Header transparent sur le hero, plein dès qu'on défile. */
  readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  readonly navLinks: NavLink[] = [
    { label: 'Accueil', fragment: 'accueil' },
    { label: 'À propos', fragment: 'a-propos' },
    { label: 'Projets', fragment: 'projets' },
    { label: 'Compétences', fragment: 'competences' },
    { label: 'Parcours', fragment: 'parcours' },
    { label: 'Contact', fragment: 'contact' },
  ];

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
