import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {UserView} from '../../classes/userView';
import {UserService} from '../../services/user-service.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-material-design-navbar',
  templateUrl: './material-design-navbar.component.html',
  styleUrls: ['./material-design-navbar.component.css']
})
export class MaterialDesignNavbarComponent implements OnInit {

  currentUser: UserView;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private userService: UserService,
              private tokenService: TokenService) {}

  ngOnInit(): void {
    this.userService
      .get(this.tokenService.decodeToken().userID)
      .toPromise()
      .then( (userView) => {
        this.currentUser = userView;
      });
  }

  logout() {
    this.authService.logout();
  }
}
