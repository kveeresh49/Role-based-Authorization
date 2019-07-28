import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BikeserviceService } from 'src/app/services/bikeservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import 'rxjs';
import { Subject } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  booleanFlag: boolean = true;
  private modals: any[] = [];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public productJson: any;
  public quantity = 3;
  @Output() valueChange = new EventEmitter();
  @Input() preventFlag: boolean = false;
  public date = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
  public order: any = {
    'orderquantity': undefined,
    'index': undefined
  }
  imageUrls: any[];
  totalSumValue: number;
  orderJSON: any = [];
  deleteOrderModel: any = {
    'orderID': null,
    'index': null
  }

  constructor(private bikeService: BikeserviceService, private toastr: ToastrService, private _formBuilder: FormBuilder) {


  }

  ngOnInit() {

    //Load Response from server

    this.getLoadResponse();
  }


  // Response Getting From server

  getLoadResponse() {
    this.bikeService.getOrders1().subscribe((data) => {
      console.log(data, 'data');
      console.log(JSON.stringify(data), 'data');
      this.orderJSON = data;

      this.orderJSON.forEach((data) => {
        if (data.orderDate != null || data.deliveryDate !== null) {
          data.orderDate = new Date(data.orderDate);
          data.deliveryDate = new Date(data.deliveryDate);
        }
      })
      this.totalSum();
    });
  }



  totalSum() {
    //this.totalSumValue = 0;
    this.orderJSON.forEach((item, index) => {
      let sum = 0;
      item.orderDetailsList.forEach((data, i) => {
        if (data.price != null) {
          sum = sum + +(data.price)
          // this.totalSumValue = this.totalSumValue + +(data.price);
        }
      });
      this.orderJSON[index].price = sum;
      if (this.orderJSON[index].quantity != null || this.orderJSON[index].quantity != 0 || this.orderJSON[index].Quantity != undefined) {
        this.orderJSON[index].price = +(this.orderJSON[index].quantity) * this.orderJSON[index].price
        console.log(this.orderJSON[index].price);
      }
    });

    this.calculateSum();
    this.checkFlag();

  }

  calculateSum() {
    this.totalSumValue = 0;
    this.orderJSON.forEach((item, index) => {
      if (item.price !== null || item.price !== "" || item.price !== undefined) {
        this.totalSumValue = this.totalSumValue + item.price;
      }
    });

  }


  removeItems(items) {
    //console.log(items.orderId);

    let orderId = items.orderId;
    let index = items.i;
    this.bikeService.removeOrder(items.orderId).subscribe((data) => {
      console.log(data, 'deleted Order');
    });
   // this.orderJSON.splice(index, 1);
    this.getLoadResponse();
    console.log(this.orderJSON);
  }


  // checking boolean Flag

  checkFlag() {
    this.preventFlag = false;
    this.orderJSON.forEach((data, item) => {
      if (data.quantity == null || data.quantity == "" || data.quantity == 0) {
        this.preventFlag = true;
      }
      return this.preventFlag;
    });
    this.valueChange.emit(this.preventFlag);
  }


  restrictKeys(e) {
    if (e.keyCode >= 48 && e.keyCode <= 58) {
      return true;
    } else {
      return false;
    }

  }


  modelChangeEvent(e, orderquantity, i, getval) {
    if (orderquantity.length <= 3 && orderquantity != 0) {
      this.orderJSON[i].quantity = orderquantity;
      this.totalSum();
    }
    if (orderquantity == 0) {
      this.toastr.success('Zero Not Allowed');
      this.orderJSON[i].quantity = 1;
      console.log('orderquantity', orderquantity);
      this.totalSum();


    }
  }



  openModal(id: string, productJson, i) {

   // console.log(this.bikeService.modals);
    if(this.bikeService.modals.length >1) {
      this.bikeService.modals.splice(0,1);
    }
   // debugger;
     const modal: any = this.bikeService.modals.filter(x => x.id === id)[0];
      this.deleteOrderModel['orderId'] = productJson.orderId;
     this.deleteOrderModel['index'] = i;
    modal.open();

  }

  closeModal(id: string) {
   // this.bikeService.addModelSubject.next(true);
    let modal: any = this.bikeService.modals.filter(x => x.id === id)[0];
    modal.close();
  }

  deleteOrder() {
    console.log(this.deleteOrderModel);
     this.removeItems(this.deleteOrderModel);
     this.closeModal('custom-modal-1');

  }



}

