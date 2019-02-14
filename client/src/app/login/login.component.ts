import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private formSubmitAttempt: boolean;


  constructor(public _userservice:UserService, private router: Router) { }

  detail = {
  	email: "",
  	password: ""
  }

   msg: string = null;

  ngOnInit() {
  }

  login(detail){
  	console.log(detail);
  	this._userservice.authorize(detail).subscribe(res=>{
  		console.log("respon..........",res)
      localStorage.setItem("users",JSON.stringify(res));
  		this.router.navigateByUrl('/addpost');
  	},
  	err=>{
  		console.log("error",err);
       this.msg = 'Incorrect info! ';
  	})
  }

}
