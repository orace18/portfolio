import { Component, signal } from '@angular/core';

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

  readonly navLinks: NavLink[] = [
    { label: 'Accueil', fragment: 'accueil' },
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
