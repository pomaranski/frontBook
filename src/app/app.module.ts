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
    })
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
