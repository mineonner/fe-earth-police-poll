import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ControlsModule } from '../../../core/controls/controls.module';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminMenuSidebarComponent } from './admin-menu-sidebar/admin-menu-sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonsModule } from '../shares/commons/commons.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { OverviewComponent } from './dashboard/tab-contents/overview/overview.component';
import { MetropolitanPoliceBureauComponent } from './dashboard/tab-contents/metropolitan-police-bureau/metropolitan-police-bureau.component';
import { ImmigrationBureauComponent } from './dashboard/tab-contents/immigration-bureau/immigration-bureau.component';
import { TouristPoliceHeadquartersComponent } from './dashboard/tab-contents/tourist-police-headquarters/tourist-police-headquarters.component';
import { CentralInvestigationBureauComponent } from './dashboard/tab-contents/central-investigation-bureau/central-investigation-bureau.component';
import { PoliceSpecialBranchHeadquartersComponent } from './dashboard/tab-contents/police-special-branch-headquarters/police-special-branch-headquarters.component';
import { OfficeOfProveEvidenceComponent } from './dashboard/tab-contents/office-of-prove-evidence/office-of-prove-evidence.component';
import { PoliceGeneralHospitalComponent } from './dashboard/tab-contents/police-general-hospital/police-general-hospital.component';
import { OrgUnitMasterComponent } from './org-unit-master/org-unit-master.component';
import { OrgUnitMasterDialogComponent } from './org-unit-master/org-unit-master-dialog/org-unit-master-dialog.component';
import { ImportEvoluationComponent } from './import-evoluation/import-evoluation.component';
import { ImportEvoluationDialogComponent } from './import-evoluation/import-evoluation-dialog/import-evoluation-dialog.component';
import { CompareScoreYearsComponent } from './compare-score-years/compare-score-years.component';
import { UserComponent } from './user/user.component';
import { UserDialogComponent } from './user/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    AdminComponent
    , LoginComponent
    , AdminMenuSidebarComponent
    , DashboardComponent
    , OverviewComponent
    , MetropolitanPoliceBureauComponent
    , ImmigrationBureauComponent
    , TouristPoliceHeadquartersComponent
    , CentralInvestigationBureauComponent
    , PoliceSpecialBranchHeadquartersComponent
    , OfficeOfProveEvidenceComponent
    , PoliceGeneralHospitalComponent
    , OrgUnitMasterComponent
    , OrgUnitMasterDialogComponent
    , ImportEvoluationComponent
    , ImportEvoluationDialogComponent
    , CompareScoreYearsComponent
    , UserComponent
    , UserDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ControlsModule,
    FontAwesomeModule,
    MatTabsModule,
    CommonsModule,
    NgApexchartsModule
  ]
})
export class AdminModule { }
