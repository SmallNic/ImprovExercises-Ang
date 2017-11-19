import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})

export class LoginFormComponent implements OnInit {

  signInUser = {
    email:'',
    password: ''
  }

  // Event fired when login request completes.
  // Parent components can listen and act on it
  @Output() onFormResult = new EventEmitter<any>();

  // Inject Angular2TokenService into Login Component
  // Now we can use it on our log in form template
  // Use the signIn method when the form is submitted
  constructor(
    private _tokenAuthService:Angular2TokenService,
    private _userService:UserService) { }

  ngOnInit() {  }

  onSignInSubmit(){

    this._tokenAuthService.signIn(this.signInUser).subscribe(

      res => {
        if( res.status == 200 ){
          // Emit event on onFormResult output with payload containing result and notify parent components
          this._userService.uid = res.json().data.id
          this.onFormResult.emit({ signedIn:true, res });
        }
      },

      err =>{
        console.log("err:", err);
        this.onFormResult.emit({ signedIn:false, err });
      }

    )
  }

}
