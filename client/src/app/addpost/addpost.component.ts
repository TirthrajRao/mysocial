import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post.service' ;
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
	post = {
		content:"",
		datetime:new Date,
    postImage:"",
    publish:false,
  }
  files:FileList;
  msg: string = null;
  constructor(public _postservice:PostService, private router: Router) { }

  ngOnInit() {
  }

  addPost(post) {
    if(this.files && this.files.length){
    console.log(post);
    var formData = new FormData();
    formData.append("content", post.content);
    formData.append("publish", post.publish);
    formData.append('userId', JSON.parse(localStorage.getItem('users'))._id);
    formData.append("postImage", this.files[0]);
    this._postservice.addPost(formData).subscribe(res=>{
      console.log("respon..........",res)
      this.msg = 'Post successfully created! ';
      setTimeout(() => {
        this.router.navigate(['timeline']);
      }, 2000);  //2s
    },
    err=>{
      console.log("error",err);
    })

    console.log("post in its file", post);
  }else{
      post['userId'] = JSON.parse(localStorage.getItem('users'))._id;  
      this._postservice.addPost(post).subscribe(res=>{
      console.log("respon ffff..........",res)
      this.msg = 'Post successfully created! ';
      setTimeout(() => {
        this.router.navigate(['timeline']);
      }, 2000);  //2s
    },
    err=>{
      console.log("error",err);
    })
  }
  }

  fileChange(event){
    this.files =  event.target.files;
      }
}