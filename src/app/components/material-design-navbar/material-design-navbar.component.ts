import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-material-design-navbar',
  templateUrl: './material-design-navbar.component.html',
  styleUrls: ['./material-design-navbar.component.css']
})
export class MaterialDesignNavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
