import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  addPost(post:FormData){
  
  return this.http.post("http://localhost:8080/post", post);
  console.log("service response.............", post);
	}

  getPosts(userId){
  return this.http.get("http://localhost:8080/post/"+userId);
  console.log("service response.............");
	}

 deletePost(id) {
   id = JSON.parse(localStorage.getItem('users'))._id;
   return this.http.post("http://localhost:8080/post/", id);
   console.log("service response.............", id);
 }

 uploadImage(formData){
   return this.http.post("http://localhost:8080/post/upload-image", formData);
 }
}
