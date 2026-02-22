import { Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)},
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];
