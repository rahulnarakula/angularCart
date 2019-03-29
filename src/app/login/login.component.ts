import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule }             from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@NgModule({
  imports: [ FormsModule ]
})

export class LoginComponent implements OnInit {
  username : string;
  showWrong: boolean = false;
  password : string;
  usersList : string = '[{ "user": "root", "password": "root", "role": "user" }, { "user": "admin", "password": "admin", "role": "admin" }]';
  constructor(private _router: Router) { }

  ngOnInit() {
    
  }
  onSubmit(){
    interface MyObj {
      user: string;
      password: string;
      role: string
  }
  
  let obj: MyObj[] = JSON.parse(this.usersList);
  let isLogin: boolean = false;
  let user: string = this.username;
  let password:string = this.password;
  obj.forEach(function (value) {
    if(value.user == user && value.password == password) {
      isLogin = true;
    }
  }); 

  if(isLogin){
    this.showWrong = true;
    this._router.navigate(['/products']);
  } else{
    this.showWrong = true;
    this.username = "";
    this.password = "";
  }
  

  }
}
