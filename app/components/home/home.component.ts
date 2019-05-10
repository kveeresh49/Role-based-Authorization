import { Component, OnInit } from '@angular/core';
import { AuthenticationserviceService } from 'src/app/services/authenticationservice.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  public selectedTab: any;
  constructor(private authenticationService: AuthenticationserviceService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.selectedTab = 'AllProducts';
  }


  navigationClick(navigationText){
    this.selectedTab = navigationText;

  }
}
