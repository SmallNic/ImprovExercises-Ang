import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router:Router,
    public tokenAuthService:Angular2TokenService) {
      if (!this.tokenAuthService.userSignedIn()){
        this._router.navigate(['/exercises']);
      }
    }

  ngOnInit() {
  }

}
