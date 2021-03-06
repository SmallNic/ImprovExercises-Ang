import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { PageTitleService } from '../services/page-title.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {

  pageTitle:string;
  subscription:Subscription;

  // ViewChild decorator.
  @ViewChild('authDialog') authDialog: AuthDialogComponent;

  // Inject Angular2TokenService into ToolbarComponent
  // Now we can use it on our toolbar template to hide/show actions conditionally
  // We get the userSignedIn() method automatically now
  constructor(
    public tokenAuthService:Angular2TokenService,
    private _pageTitleService:PageTitleService,
    private _router:Router) {
      this.subscription = this._pageTitleService.getPageTitle().subscribe(pageTitle => { this.pageTitle = pageTitle; });
     }

  ngOnInit() {
    console.log('callGetPageTitle')
    // this.pageTitle = this._pageTitleService.getPageTitle();
  }

  // Takes optional mode parameter
  presentAuthDialog(mode?: 'login' | 'register'){
    // openDialog is a method from AuthDialogComponent. Default mode is Login.
    this.authDialog.openDialog(mode);
  }

  logout(): void{
    this.tokenAuthService.signOut().subscribe(
      res =>    {
        if (!this.tokenAuthService.userSignedIn()){
          this._router.navigate(['/exercises']);
        }
      },
      error =>  console.log(error)
    );
  }

}
