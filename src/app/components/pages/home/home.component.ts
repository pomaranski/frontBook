import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    console.log(this.tokenService.decodeToken());
  }

}
