import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './services/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'timerApp';

  isSignedIn=false;
  constructor(public firebaseservice:FirebaseService){

  }
  ngOnInit(){
    if(localStorage.getItem('user')!==null){
      this.isSignedIn=true;

    }
    else
    {
      this.isSignedIn=false;
    }
  }
  onSignup(email:string,password:string,name:string,phone:string){
  
   const user = {
     email:email,
     password:password,
     name:name,
     phone:phone
   }
   this.firebaseservice.signup(user).subscribe(res=>{
     console.log(res);
   })
    if(this.firebaseservice.isLoggedIn){
      this.isSignedIn=true;
    }
  }
  onSignin(email:string,password:string){
    this.firebaseservice.signin(email,password);
    if(this.firebaseservice.isLoggedIn){
      this.isSignedIn=true;
    }
  }

  handleLogout(){
    this.isSignedIn=false;
  }
}

