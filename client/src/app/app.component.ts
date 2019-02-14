import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {UserService} from './service/user.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', ]
})
export class AppComponent {
  title = 'My Social Media';
  loggedIn: boolean = false;
  loggedInUser: any;

  constructor(public cdRef: ChangeDetectorRef, public router:Router){
  	this.loggedInUser = localStorage.getItem('users');
  }

  ngOnInit(){
  	if(this.loggedInUser){
  		this.loggedIn = true;

  	}else{
  		this.loggedIn = false;
  	}

  }

  ngViewAfterChecked(){
  	this.cdRef.detectChanges();

  }

  Logout(){
  	  localStorage.removeItem("users");
  		this.loggedIn = false;
  		this.router.navigate(['/login']);
  	}
}



