import { Component } from '@angular/core';
import { AuthenticationserviceService } from './services/authenticationservice.service';
import { Router } from '@angular/router';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bike-config';
  currentUser: User;

  constructor(private authenticationService: AuthenticationserviceService,private router:Router){
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser;
}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
