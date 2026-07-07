import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

interface ContactLink {
  label: string;
  value: string;
  href: string;
}

@Component({
  selector: 'app-contact',
  imports: [ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly links: ContactLink[] = [
    { label: 'WhatsApp', value: '+229 01 68 89 49 47', href: 'https://wa.me/2290168894947' },
    { label: 'Email', value: 'oracejuscard@gmail.com', href: 'mailto:oracejuscard@gmail.com' },
    { label: 'GitHub', value: 'github.com/orace18', href: 'https://github.com/orace18' },
    { label: 'LinkedIn', value: 'linkedin.com/in/oraceedjo', href: 'https://linkedin.com/in/oraceedjo' },
  ];
}
