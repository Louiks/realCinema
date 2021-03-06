import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { NewHallOverviewComponent } from './admin/newHall/new-hall-overview/new-hall-overview.component';
import { LoginOverviewComponent } from './authentication/login/login-overview/login-overview.component';
import { RegistrationOverviewComponent } from './authentication/registration/registration-overview/registration-overview.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { UserDataFormComponent } from './movie/reservation-details-dialog/user-data-form/user-data-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardOverviewComponent },
  { path: 'login', component: LoginOverviewComponent },
  { path: 'register', component: RegistrationOverviewComponent },
  { path: 'reservation-form', component: UserDataFormComponent },
  {
    path: 'admin',
    children: [
      {
        path: 'newhall',
        component: NewHallOverviewComponent,
      },
    ],
    component: AdminPanelComponent,
  },
  {
    path: 'newhall',
    component: NewHallOverviewComponent,
  },
  {
    path: 'movie',
    component: MovieDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
