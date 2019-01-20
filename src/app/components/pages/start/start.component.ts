import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    if (!this.tokenService.isTokenExpired()) {
      this.router.navigate(['/home']).then();
    }
  }

}
