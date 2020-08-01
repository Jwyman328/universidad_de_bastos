import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-in-page',
  templateUrl: './login-in-page.component.html',
  styleUrls: ['./login-in-page.component.scss'],
})
export class LoginInPageComponent implements OnInit {
  backgroundImageUrl =
    'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500';
  constructor() {}

  ngOnInit(): void {}
}
