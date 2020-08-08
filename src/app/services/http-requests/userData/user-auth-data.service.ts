import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthDataService {

  username:string;
  token:string;
  isLoggedIn=false;
  constructor(private route:Router) { }

  getToken(){
    return localStorage.getItem('token')
  }

  getUserName(){
    return localStorage.getItem('username')
  }

  setUsername = (username:string) => {
    this.username = username;
    localStorage.setItem('username',username)

  }

  setToken = (token:string) => {
    this.token = token;
    localStorage.setItem('token',token)
  }

  loginUser(){
    this.isLoggedIn = true;
  }

  logOutUser(){
    this.isLoggedIn = false;
    localStorage.clear();
    this.username='';
    this.token='';
    this.route.navigate(['login'])
    
  }
}
