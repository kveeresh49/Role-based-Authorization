import { Component, OnInit, createPlatform } from '@angular/core';
import { BikeserviceService } from 'src/app/services/bikeservice.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-bicycle',
  templateUrl: './bicycle.component.html',
  styleUrls: ['./bicycle.component.scss']
})
export class BicycleComponent implements OnInit {

  bomHeaders = [];
  bomDetails: any;
  itemselectedTab: any;
  selectedTab: any;
  orderFlag:boolean;
  cycleForm: FormGroup;
  cycleRadioButtonList: FormArray;
  mySecondForm: FormGroup;
  radioButtons: FormArray
  items: FormArray;
  bomHeaderDetails: any;
  options:any;
  myvalue:any;
  subHeader: any;
 imageUrls = [];

  constructor(private fb: FormBuilder, private bikeService: BikeserviceService) { }

  ngOnInit() {
    this.loadAllHeaders();

  }

  // loading All Headers Left side of Cycle
  loadAllHeaders() {
    this.bikeService.loadAllHeaders().subscribe((data) => {
      this.bomHeaderDetails = data;
      this.selectedTab = this.bomHeaderDetails.headerMasterlist[0].bomType;
     // this.myvalue = this.bomHeaderDetails.headerMasterlist[0].bomId;
      console.log(data);
    });
  }

  getClickHeaders(bomId,bomType,imageUrl) {
    this.myvalue = bomId;
   // this.getSubLIstDEtails(this.myvalue,this.bomHeaderDetails)
    this.selectedTab = bomType;
    console.log('bomId',bomId);
    console.log('bomType',bomType);
  }


getSubLIstDEtails(myvalue,bomHeaderDetails,imageUrl) {

  bomHeaderDetails.headerMasterlist.forEach((data) => {
    if(data.bomId == myvalue) {
    console.log(data.listDetails)

    this.subHeader = data.listDetails;
  }
});
}


  getOrderVal(item,detail,imageUrl) {
    item.listDetails.forEach((itm,idx) => {

      if(itm.materialDesc === detail.materialDesc) {
        detail.order = true;
        this.orderFlag = true;
        this.imageUrls.push(imageUrl)
      } else {
        this.imageUrls.splice(imageUrl,idx)
        itm.order = false;
        item.listDetails[idx].order = false;
      }

    });

  }

  submitBomHeaders() {
    this.bomHeaderDetails.user.username = JSON.parse(sessionStorage.currentUser).username;
    console.log(this.orderFlag);
    this.bikeService.saveOrderDetails(this.bomHeaderDetails).subscribe((data)=> {
      console.log(data)
    })
  }
}


