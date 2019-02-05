import { NgModule } from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {StartComponent} from './components/pages/start/start.component';
import {RegisterComponent} from './components/register/register.component';
import {LayoutComponent} from './components/layout/layout.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {CreateOfferComponent} from './components/create-offer/create-offer.component';
import {OfferSearchComponent} from './components/offer-search/offer-search.component';

const routes: Routes = [
  {path: '', component: StartComponent},
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        children: [
          {
            path: 'search',
            component: OfferSearchComponent
          }
        ]
      }
    ]
    /*canActivate: [AuthGuard]*/
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'new_offer', component: CreateOfferComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
