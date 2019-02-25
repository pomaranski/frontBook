import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user-service.service';
import {TokenService} from '../../../services/token.service';
import {User} from '../../../classes/user';
import {UserView} from '../../../classes/userView';
import {DeleteOfferDialogComponent} from '../../my-offers/delete-offer-dialog/delete-offer-dialog.component';
import {PasswordChangeDialogComponent} from './password-change-dialog/password-change-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-my-account-info',
  templateUrl: './my-account-info.component.html',
  styleUrls: ['./my-account-info.component.css']
})
export class MyAccountInfoComponent implements OnInit {

  user: UserView;
  constructor(private userService: UserService, private tokenService: TokenService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userService.get(this.tokenService.decodeToken().userID)
      .toPromise()
      .then( (user) => {
        this.user = user;
      });
  }
  passwordChange() {
    const dialogRef = this.dialog.open(PasswordChangeDialogComponent, {
      width: '250px',
      data: {offerName: name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.changePassword(this.tokenService.decodeToken().userID, result).subscribe(
          () => {
            console.log('password changed');
          },
          () => {
            /*
            this.cannotDelete = true;
            setTimeout(() => {
              this.cannotDelete = false;
            }, 5000);
            */
          }
        );
      }
    });
  }
}
