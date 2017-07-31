import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})

export class ToolbarComponent implements OnInit {

  // ViewChild decorator.
  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  // Inject Angular2TokenService into ToolbarComponent
  // Now we can use it on our toolbar template to hide/show actions conditionally
  // We get the userSignedIn() method automatically now
  constructor( public tokenAuthService:Angular2TokenService) { }

  ngOnInit() {
  }

  // Takes optional mode parameter
  presentAuthDialog(mode?: 'login' | 'register'){
    // openDialog is a method from AuthDialogComponent. Default mode is Login.
    this.authDialog.openDialog(mode);
  }

}
