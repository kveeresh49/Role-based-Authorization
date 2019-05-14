import { Component, OnInit, createPlatform } from '@angular/core';
import { BOMHeader, BomDetails } from 'src/app/model/user';
import { BikeserviceService } from 'src/app/services/bikeservice.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
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
  cycleForm: FormGroup;
  cycleRadioButtonList: FormArray;
  mySecondForm:FormGroup;
  radioButtons:FormArray
  items: FormArray;

  constructor(private fb: FormBuilder,private bikeService: BikeserviceService){}

  ngOnInit() {
    this.loadAllHeaders();
   // this.createForm();
   this.createSecondForm()
  }


  createForm() {
    this.cycleForm = this.fb.group({
      Handle: new FormControl(),
      Forks: new FormControl(),
      Tyre: new FormControl(),
      Seat:new FormControl(),
      Chain:new FormControl(),
      Pedals:new FormControl(),
      Frames:new FormControl(),
      Wheels :'',
      Freewheels:'',
      cycleRadioButtonList: this.fb.array([]),

    });
  }


  createSecondForm() {
    this.mySecondForm =  this.fb.group({
      detailId:'',
      bomId:'',
      radioButtons : this.fb.array([])
    });
  }

  public itemRows(val){
    const control = <FormArray>this.mySecondForm.get('radioButtons');
     val.map(el => {
      let x =  this.fb.group({
        hasInnerBOM: el.hasInnerBOM,
        bomId :el.bomId,
        detailId:el.detailId,
        materialId:el.materialId,
        materialDesc:el.materialDesc,
        quantity:el.quantity
        });
        control.push(x);
     })

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
      while(this.mySecondForm.controls.radioButtons.controls.length !==0) {
        this.mySecondForm.controls.radioButtons.removeAt(0);
      }

      this.itemRows(this.bomDetails);
    });

  }


  myClick(){
    console.log
  }
  /*

  return this.fb.group ({
    'bom.id': '',
    'bom.ty':formControl',
    checkBox :FormArray

  })

  */


}


