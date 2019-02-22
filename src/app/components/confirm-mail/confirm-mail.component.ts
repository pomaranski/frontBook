import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.css']
})
export class ConfirmMailComponent implements OnInit {
  email: string;

  constructor() { }

  ngOnInit() {
    if (!this.email) {
      this.email = localStorage.getItem('email');
      localStorage.removeItem('email');
    }
  }

}
