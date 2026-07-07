import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Orace EDJO — Développeur Full Stack Flutter & Backend | Bénin',
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
