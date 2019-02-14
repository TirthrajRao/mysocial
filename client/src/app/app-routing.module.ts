import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {TimelineComponent} from './timeline/timeline.component';
import {AddpostComponent} from './addpost/addpost.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
{
	path: 'login',
	component: LoginComponent,
},
{
	path:'signup',
	component: SignupComponent,
},
{
	path:'timeline',
	component: TimelineComponent,
},
{
	path:'addpost',
	component: AddpostComponent,
},
{
	path:'profile',
	component: ProfileComponent,
},
{
	path:'search',
	component: SearchComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
