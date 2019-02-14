import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   msg: string = null;

  constructor(public _userservice:UserService, private router: Router) { }

  details={
  	firstname : "",
  	lastname:"",
  	email:"",
  	password:"",
  	dob:"",
  };
  ngOnInit() {
  }

  signup(details){
  	console.log(details);

  	this._userservice.addData(details).subscribe(res=>{
  		console.log("respon..........",res);
      this.msg = 'You are successfully registered! Now you can Login... ';
      setTimeout(() => {
        this.router.navigate(['login']);
    }, 2000);  //2s
  	},
  	err=>{
  		console.log("error",err);
  	})

  	console.log("details in its file", details);
  }
}
