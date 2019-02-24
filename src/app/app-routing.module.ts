import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {StartComponent} from './components/pages/start/start.component';
import {RegisterComponent} from './components/register/register.component';
import {LayoutComponent} from './components/layout/layout.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {CreateOfferComponent} from './components/create-offer/create-offer.component';
import {OfferSearchComponent} from './components/offer-search/offer-search.component';
import {MyOffersComponent} from './components/my-offers/my-offers.component';
import {EditOfferComponent} from './components/edit-offer/edit-offer.component';
import {OfferAddedComponent} from './components/create-offer/offer-added/offer-added.component';
import {OfferDetailsComponent} from './components/offer-details/offer-details.component';
import {ConfirmMailComponent} from './components/confirm-mail/confirm-mail.component';
import {ManageOffersComponent} from './components/manage-offers/manage-offers.component';
import {MyAccountInfoComponent} from './components/users/my-account-info/my-account-info.component';

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
      },
      {
        path: 'manage_offers',
        component: ManageOffersComponent,
        children: [
          {
            path: 'my_offers',
            component: MyOffersComponent
          }
        ]
      },
      {path: 'new_offer', component: CreateOfferComponent},
      {path: 'edit_offer/:id', component: EditOfferComponent},
      {path: 'offer_details/:id', component: OfferDetailsComponent},
      {path: 'offer_added/:id', component: OfferAddedComponent},
      {path: 'my_account', component: MyAccountInfoComponent}
    ],
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'confirm_mail', component: ConfirmMailComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
