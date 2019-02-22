import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/pages/home/home.component';
import {JwtModule} from '@auth0/angular-jwt';
import {StartComponent} from './components/pages/start/start.component';
import {RegisterComponent} from './components/register/register.component';
import {LayoutComponent} from './components/layout/layout.component';
import {FooterComponent} from './components/html-objects/footer/footer.component';
import {NavbarComponent} from './components/html-objects/navbar/navbar.component';
import {AppErrorHandler} from './handlers/appErrorHandler';
import {OfferCardComponent} from './components/offer-card/offer-card.component';
import {OfferCardImageComponent} from './components/offer-card/offer-card-image/offer-card-image.component';
import {TokenInterceptor} from './interceptors/tokenInterceptor';
import { RequiredTextFieldComponent } from './components/form/required-text-field/required-text-field.component';
import { RequiredPasswordFieldComponent } from './components/form/required-password-field/required-password-field.component';
import { OfferSearchComponent } from './components/offer-search/offer-search.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { DescriptionBoxFieldComponent } from './components/form/description-box-field/description-box-field.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import {Ng2PopupModule} from 'ng2-popup';
import {Ng2OverlayModule} from 'ng2-overlay';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule,
  MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatDialogModule
} from '@angular/material';
import { MaterialDesignNavbarComponent } from './components/material-design-navbar/material-design-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DeleteOfferDialogComponent } from './components/my-offers/delete-offer-dialog/delete-offer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StartComponent,
    RegisterComponent,
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    OfferCardComponent,
    OfferCardImageComponent,
    RequiredTextFieldComponent,
    RequiredPasswordFieldComponent,
    OfferSearchComponent,
    CreateOfferComponent,
    DescriptionBoxFieldComponent,
    MyOffersComponent,
    EditOfferComponent,
    MaterialDesignNavbarComponent,
    DeleteOfferDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      }
    }),
    Ng2OverlayModule,
    Ng2PopupModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  exports: [
    MatInputModule,
    MatDialogModule
  ],
  entryComponents: [
    DeleteOfferDialogComponent
  ]
})
export class AppModule {
}
