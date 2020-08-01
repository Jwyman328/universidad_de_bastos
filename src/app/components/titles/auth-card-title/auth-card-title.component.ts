import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auth-card-title',
  templateUrl: './auth-card-title.component.html',
  styleUrls: ['./auth-card-title.component.scss']
})
export class AuthCardTitleComponent implements OnInit {
  @Input('titleText') titleText: 'Login' | 'Sign Up';
  constructor() { }

  ngOnInit(): void {
  }

}
