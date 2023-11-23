import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },
  // A 404 page here would be nice, for now redirecting to the root
  {
    path: '**',
    redirectTo: '',
  },
];
