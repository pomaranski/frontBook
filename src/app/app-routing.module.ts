import { NgModule } from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {StartComponent} from './components/pages/start/start.component';
import {RegisterComponent} from './components/register/register.component';
import {LayoutComponent} from './components/layout/layout.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'home', component: HomeComponent}
    ],
    canActivate: [AuthGuard]
  },
  {path: '', component: StartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
