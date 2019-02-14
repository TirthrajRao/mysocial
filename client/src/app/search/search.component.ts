import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {AppComponent} from '../app.component';
import  * as _  from 'lodash';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	key;
	users: any;
	_id:string;
   msg: string = null;
   friends=[];
  constructor(public _userservice:UserService, private router: Router) { }

  ngOnInit() {
  }

  searchUser(){
  	this._userservice.searchUser(this.key).subscribe(res=>{
  		this.users=res;
  		console.log("response from ts file",this.users);
      this.friends = JSON.parse(localStorage.getItem('users')).friends;
      this.users.forEach((i)=>{
        var flag = _.includes(this.friends,i._id);
        i['isFriend'] = flag;
        console.log(flag);
      })
  	})
  }

  addFriend(_id){
    console.log("id from ts file",_id);
    this._userservice.addFriend(_id).subscribe(res=>{
      console.log("response data",res);
      localStorage.setItem("users",JSON.stringify(res));
    })
  }
}