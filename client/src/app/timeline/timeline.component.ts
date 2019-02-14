import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
	myPosts: any;
	firstname: any;
	lastname: any;

  constructor(public _postservice:PostService) { 
  }
  ngOnInit() {
  	this.getPosts();
	}

	getPosts(){
		var id = JSON.parse(localStorage.getItem('users'))._id;
		this.firstname = JSON.parse(localStorage.getItem('users')).firstname;
		this.lastname = JSON.parse(localStorage.getItem('users')).lastname;
		this._postservice.getPosts(id).subscribe((res:any)=>{
			console.log(res);
			this.myPosts = res.posts;
		})
	}

	// deletePost(id) {
 //    this._postservice.deletePost(id).subscribe(res => {
 //      console.log('Deleted');
 //    });
 //  }
}
