import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginOverviewComponent } from './authentication/login/login-overview/login-overview.component';
import { RegistrationOverviewComponent } from './authentication/registration/registration-overview/registration-overview.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardOverviewComponent},
  {path: 'login', component: LoginOverviewComponent},
  {path: 'register', component: RegistrationOverviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
