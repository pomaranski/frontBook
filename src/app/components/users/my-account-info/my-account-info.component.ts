import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user-service.service';
import {TokenService} from '../../../services/token.service';
import {User} from '../../../classes/user';
import {UserView} from '../../../classes/userView';

@Component({
  selector: 'app-my-account-info',
  templateUrl: './my-account-info.component.html',
  styleUrls: ['./my-account-info.component.css']
})
export class MyAccountInfoComponent implements OnInit {

  user: UserView;
  constructor(private userService: UserService, private tokenService: TokenService) { }
  ngOnInit() {
    this.userService.get(this.tokenService.decodeToken().userID)
      .toPromise()
      .then( (user) => {
        this.user = user;
      });
  }

}
