import { Component, OnInit, createPlatform } from '@angular/core';
import { BikeserviceService } from 'src/app/services/bikeservice.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private fb: FormBuilder, private bikeService: BikeserviceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadAllHeaders();



  }

  // loading All Headers Left side of Cycle
  loadAllHeaders() {
    this.bikeService.loadAllHeaders().subscribe((data) => {
      this.bomHeaderDetails = data;
      this.selectedTab = this.bomHeaderDetails.headerMasterlist[0].bomType;
     this.myvalue = this.bomHeaderDetails.headerMasterlist[0].bomId;
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


  getOrderVal(item,detail,imageUrl,detailId,index) {
    item.listDetails.forEach((itm,idx) => {
      if(itm.materialDesc === detail.materialDesc) {
        detail.order = true;
        this.orderFlag = true;
        //this.imageUrls.push({'imageUrl':imageUrl,'materialDesc':itm.materialDesc,'index':index,'detailId':detailId})
      } else {
       // this.imageUrls.slice(idx,1)
        itm.order = false;
        item.listDetails[idx].order = false;
      }
    });
      this.getimages(this.imageUrls,this.bomHeaderDetails)
  }

  getimages(imageUrl,bomheaders){

  //  console.log(imageUrl);
   // console.log(bomheaders);
    this.imageUrls = [];
    bomheaders.headerMasterlist.forEach((data,index) => {
        if(data.listDetails.length !== undefined && data.listDetails.length !==0) {
          data.listDetails.forEach(element => {
            if(element.order == true){
              this.imageUrls.push({'imageUrl':element.imageUrl});
            }
          });

        }
    })

    console.log(this.imageUrls);
  }

  submitBomHeaders() {
    this.bomHeaderDetails.user.username = JSON.parse(sessionStorage.currentUser).username;
    console.log(this.orderFlag);
    console.log(this.bomHeaderDetails);
    //this.bikeService.getOrderScreen(this.bomHeaderDetails);
    this.bikeService.saveOrderDetails(this.bomHeaderDetails).subscribe((data)=> {
      console.log(data)
    });
    this.imageUrls = [];
    this.ngOnInit();
    this.toastr.success('Product is Ordered');
    this.openModal('custom-modal-1')

  }

  reset() {
    this.ngOnInit();
    this.imageUrls = [];
  }


  openModal(id: string) {

    // console.log(this.bikeService.modals);
     if(this.bikeService.modals.length >1) {
       this.bikeService.modals.splice(0,1);
     }
    // debugger;
      const modal: any = this.bikeService.modals.filter(x => x.id === id)[0];
     modal.open();

   }

   closeModal(id: string) {
    // this.bikeService.addModelSubject.next(true);
     let modal: any = this.bikeService.modals.filter(x => x.id === id)[0];
     modal.close();
   }
}


