import { Component } from '@angular/core';

// Initialize the Token Service
import { Angular2TokenService } from 'angular2-token';

//Import the environment configuration
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app works!';

  constructor(private authToken: Angular2TokenService){
    this.authToken.init(environment.token_auth_config);

    this.authToken.signIn({ email: "nas231@nyu.edu", password: "nicholas" }).subscribe (

      res => {
        console.log("auth response:", res);
        // Log the response header to show the auth token
        console.log("auth response headers:", res.headers.toJSON());
        // Log the response body to show the user
        console.log('auth response body:', res.json());
      },

      err =>{
        console.log("auth error:", err);
      }

    )

  }

}
