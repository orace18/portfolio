import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    title: 'Connexion admin',
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        title: 'Dashboard admin',
      },
      {
        path: 'projects/new',
        loadComponent: () =>
          import('./pages/project-form/project-form.component').then((m) => m.ProjectFormComponent),
        title: 'Nouveau projet',
      },
      {
        path: 'projects/:id/edit',
        loadComponent: () =>
          import('./pages/project-form/project-form.component').then((m) => m.ProjectFormComponent),
        title: 'Modifier le projet',
      },
    ],
  },
];
