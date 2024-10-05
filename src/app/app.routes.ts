import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page.component'),
  },
  {
    path: 'contact',
    title: 'Contact Us',
    loadComponent: () => import('./pages/contact-page/contact-page.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page.component'),
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
