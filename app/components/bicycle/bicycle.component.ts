import { Component, OnInit, createPlatform } from '@angular/core';
import { BOMHeader, BomDetails } from 'src/app/model/user';
import { BikeserviceService } from 'src/app/services/bikeservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-bicycle',
  templateUrl: './bicycle.component.html',
  styleUrls: ['./bicycle.component.scss']
})
export class BicycleComponent implements OnInit {

  bomHeaders: BOMHeader[] = [];
  bomDetails: any;
  itemselectedTab: any;
  selectedTab: any;
 // cycleForm: FormGroup;

  constructor(private bikeService: BikeserviceService){}

  ngOnInit() {
    this.loadAllHeaders();
   // this.createForm();
  }

  // loading All Headers Left side of Cycle
  loadAllHeaders() {
    this.bikeService.loadAllHeaders().subscribe((data) => {
      this.bomHeaders = data;
    });
  }

  // Based on Id Load cyble details
  getClickHeaders(itemId, itemType) {
    this.selectedTab = itemType;
    this.bikeService.getSubHeaders(itemId).subscribe((data) => {
      this.bomDetails = data;
    });

  }



}


