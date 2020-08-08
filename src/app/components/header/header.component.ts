import { Component, OnInit } from '@angular/core';
import { UserAuthDataService } from 'src/app/services/http-requests/userData/user-auth-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShowOptions = false
  constructor(    private userAuthDataService: UserAuthDataService,) { }

  ngOnInit(): void {
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

}
