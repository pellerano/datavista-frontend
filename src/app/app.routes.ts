import { Routes } from '@angular/router';
import { PagesPage } from './pages/pages.page';
import { PagesRoutes } from './pages/pages-routes';
import { AuthPage } from './auth/auth.page';
import { AuthRoutes } from './auth/auth-routes';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // {
  //   path: 'auth',
  //   component: AuthPage,
  //   children: AuthRoutes,
  // },
  {
    path: '',
    component: PagesPage,
    children: PagesRoutes,
  },
];
