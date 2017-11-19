import { Component } from '@angular/core';

// Initialize the Token Service
import { Angular2TokenService } from 'angular2-token';

//Import the environment configuration
import { environment } from '../environments/environment';

import { ExerciseService } from './exercises/exercise.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ExerciseService, UserService]
})
export class AppComponent {
  title = 'app works!';
  pageTitle:string;

  constructor(private authToken: Angular2TokenService){
    this.authToken.init(environment.token_auth_config);

    // The following uses the signIn method to test our ability to log into the RoR Backend
    // this.authToken.signIn({ email: "nas231@nyu.edu", password: "nicholas" }).subscribe (
    //
    //   res => {
    //     console.log("auth response:", res);
    //     // Log the response header to show the auth token
    //     console.log("auth response headers:", res.headers.toJSON());
    //     // Log the response body to show the user
    //     console.log('auth response body:', res.json());
    //   },
    //
    //   err =>{
    //     console.log("auth error:", err);
    //   }
    //
    // )

  }

}
