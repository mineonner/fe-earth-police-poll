import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { authGuard, roleGuard } from '../shares/services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgUnitMasterComponent } from './org-unit-master/org-unit-master.component';
import { ImportEvoluationComponent } from './import-evoluation/import-evoluation.component';
import { CompareScoreYearsComponent } from './compare-score-years/compare-score-years.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [authGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        canActivateChild: [authGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent},
          { path: 'org-unit-master', component: OrgUnitMasterComponent, canActivate: [roleGuard],},
          { path: 'import-evoluation', component: ImportEvoluationComponent, canActivate: [roleGuard],},
          { path: 'user', component: UserComponent, canActivate: [roleGuard],},
          { path: 'compare', component: CompareScoreYearsComponent},
          { path: '',   redirectTo: '/admin/dashboard', pathMatch: 'full' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
