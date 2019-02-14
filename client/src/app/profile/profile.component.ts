import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {UserService} from '../service/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
	myProfile: [];
	data = {firstname:"",lastname:"",email:"",dob:"", profileImage:"", coverImage:""};
  msg: string = null;
  files:FileList;

  constructor(public _userservice:UserService, public router: Router, public change: ChangeDetectorRef) { }

  ngOnInit() {
  	this.getUserInfo();
  }

  	getUserInfo(){
		var myId = JSON.parse(localStorage.getItem('users'))._id;
		console.log(myId);
		this._userservice.getUserInfo(myId).subscribe((res:any)=>{
			console.log(res);
			this.data = res;
		})
	}

   update(data){
      if(this.files && this.files.length){
    console.log(data);
    var formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("dob", data.dob);
    formData.append("profileImage", this.files[0]);
    formData.append("coverImage", this.files[0]);
    formData.append('myId', JSON.parse(localStorage.getItem('users'))._id);
    this._userservice.updateProfile(formData).subscribe((res:any) => {
      this.msg = 'Profile updated successfully! ';
      this.change.detectChanges();
      },  
      error => {  
        alert(error);  
      }); 
    }else{
      console.log('Update fire'); 
      var myId = JSON.parse(localStorage.getItem('users'))._id;
      data['myId']=myId; 
      this._userservice.updateProfile(data).subscribe((res:any) => {
        this.msg = 'Profile updated successfully! ';
        
      },  
      error => {  
        alert(error);  
      });        
    }
  }

  fileChange(event){
    this.files =  event.target.files;
    }

}

