import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './dashboard/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { CinemaSelectorComponent } from './dashboard/cinema-selector/cinema-selector.component';
import { CinemaRepertoireComponent } from './dashboard/cinema-repertoire/cinema-repertoire.component';
import { CinemaRepertoireCardComponent } from './dashboard/cinema-repertoire/cinema-repertoire-card/cinema-repertoire-card.component';
import { FooterComponent } from './footer/footer.component';
import { LoginOverviewComponent } from './authentication/login/login-overview/login-overview.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './shared/Authentication/authentication.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { RegistrationOverviewComponent } from './authentication/registration/registration-overview/registration-overview.component';
import { NewHallOverviewComponent } from './admin/newHall/new-hall-overview/new-hall-overview.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  const isLocal = true;
  if (isLocal) {
    return new PublicClientApplication ({
      auth: {
        clientId: '5a8355ce-3706-4c67-9fa0-b3082c9f4f94',
        redirectUri: 'http://localhost:4200'
      }
    })
  }else {
    return new PublicClientApplication ({
      auth: {
        clientId: '35bb73dc-110b-4ddc-84dd-86b3ce673090',
        redirectUri: 'https://realcinema-2137.web.app'
      }
    })
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardOverviewComponent,
    NavbarComponent,
    CarouselComponent,
    CinemaSelectorComponent,
    CinemaRepertoireComponent,
    CinemaRepertoireCardComponent,
    FooterComponent,
<<<<<<< HEAD:Frontend/src/app/app.module.ts
    LoginOverviewComponent,
    RegistrationOverviewComponent,
    NewHallOverviewComponent,
    AdminPanelComponent,
=======
    LoginOverviewComponent
>>>>>>> 5bdcd0f62d72e6a90a876fd304798d820b0889c5:RealCinema/src/app/app.module.ts
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgImageSliderModule,
    MsalModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }