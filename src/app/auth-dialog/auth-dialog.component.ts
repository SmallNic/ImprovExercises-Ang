import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.sass']
})

export class AuthDialogComponent implements OnInit {

  // Input Decorator called auth-mode. It can take login or register. Login is default.
  @Input('auth-mode') authMode: 'login' | 'register' = 'login';
  // Required by Materialize Dialog Directive. We'll emit events on it to open/close dialog
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  //event handlers for onFormResult events emitted by login and register form components, if the the login/register was successful, close the dialog, otherwise display the error returned by our RoR server in an alert window:

  onLoginFormResult( e ){
    if ( e.signedIn ){
      this.closeDialog();
    }
    else {
      alert(e.err.json().errors[0]);
    }
  }

  onRegisterFormResult( e ){
    if ( e.signedUp ){
      this.closeDialog();
    }
    else {
      alert(e.err.json().errors.full_messages[0]);
    }
  }

  //Will set the current auth mode and display the dialog. If no parameter, then login will be default.
  openDialog(mode: 'login' | 'register' = 'login'){
    this.authMode = mode;
    this.modalActions.emit({ action:"modal", params:['open'] });
  }

  closeDialog(){
    this.modalActions.emit({ action:"modal", params:['close'] });
  }

  ngOnInit() {
  }

  //Helps us display the login/register forms conditionally
  isLoginMode(){ return this.authMode == 'login' }
  isRegisterMode(){ return this.authMode == 'register' }
}
