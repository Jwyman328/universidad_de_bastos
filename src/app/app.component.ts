import { Component } from '@angular/core';
import { UserAuthDataService } from './services/http-requests/userData/user-auth-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bastosFrontend';
  constructor(
    private userAuthDataService: UserAuthDataService,
  ) {}
  
  logOut(){
    this.userAuthDataService.logOutUser()
  }
}

