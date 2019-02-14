import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addData(details){
  	return this.http.post("http://localhost:8080/users", details)
  	console.log("service response.............", details);
	}

  authorize(detail){
  	return this.http.post("http://localhost:8080/users/login", detail)
  	console.log("service response.............", detail);

  }

  searchUser(details){
    var query = '?key='+details;

      return this.http.get("http://localhost:8080/users/search/"+query);

  }

  getUserInfo(myId){
  return this.http.get("http://localhost:8080/users/my-profile"+myId);
  console.log("service response.............");
  }

  updateProfile(data:FormData){
   return this.http.post("http://localhost:8080/users/updateProfile", data);
   console.log("service response............."); 
  }

  addFriend(_id){
    console.log("friend id from service",_id);
    var body = { requestedUser: JSON.parse(localStorage.getItem('users'))._id,
    otherUser: _id};
    console.log(body)
    return this.http.post("http://localhost:8080/users/add-friend",body);
    console.log("response from service.................");
  }
  
}
