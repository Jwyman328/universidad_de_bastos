import { Component, OnInit } from '@angular/core';
import { UserAuthDataService } from 'src/app/services/http-requests/userData/user-auth-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShowOptions = false
  constructor(    private userAuthDataService: UserAuthDataService, private route: Router) { }
  user:string
  ngOnInit(): void {
    this.user = this.userAuthDataService.getUserName()
  }

  showOptions(){
    this.isShowOptions = true
  }

  hideOptions(){
    this.isShowOptions = false

  }
  logOut(){
    this.userAuthDataService.logOutUser()
  }

  goToHomePage(){
    this.route.navigate(['/'])
  }

}
