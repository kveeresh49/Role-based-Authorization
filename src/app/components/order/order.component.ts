import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BikeserviceService } from 'src/app/services/bikeservice.service';
import { getOrder } from './a';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public productJson: any;
  public quantity = 3;
<<<<<<< HEAD
  @Output() valueChange = new EventEmitter();
  @Input() preventFlag: boolean = false;
  public date = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
  modelChanged: Subject<string> = new Subject<string>();
  public order :any  = {
    'orderquantity': undefined,
    'index' :undefined
  }
  public orderJSON:any = [];


  imageUrls: any[];
  totalSumValue: number;

  constructor(private bikeService: BikeserviceService, private toastr: ToastrService,private _formBuilder: FormBuilder) {


  }

  ngOnInit() {

    //

    this.bikeService.getOrders1().subscribe((data) => {
      console.log(data,'data');
      console.log(JSON.stringify(data),'data');
      this.orderJSON = data;

      this.orderJSON.forEach((data) => {
        if(data.orderDate != null || data.deliveryDate !== null) {
        data.orderDate = new Date(data.orderDate);
        data.deliveryDate = new Date(data.deliveryDate);
        }
      })

      this.totalSum();
      console.log(this.orderJSON);
    });


    this.modelChanged.subscribe((order:any) => {
      // console.log(this.orderJSON[0].Quantity)
      if(this.orderJSON[order.index].quantity == "0" || this.orderJSON[order.index].quantity == "" ||
      this.orderJSON[order.index].quantity == undefined ){
        alert('delete the order');
      }else {
        this.totalSum();
      }

    });


    //
    // this.bikeService.getOrders1().subscribe((data) => {
    //   //console.log(data,'data');
    //   console.log(JSON.stringify(data),'data');
    // })
    //this.productJson = this.bikeService.orderImg;
    //   this.orderJSON.forEach((element,index) => {
    //     this.imageUrls = [];
    //     element.orderDetailsList.forEach((data,index1) => {
    //       if(data.imageUrl != null) {
    //         this.productJsonindex.push(data.imageUrl);
    //       }
    //   });
    // });
=======
  public x = new Date();
  public date = new Date().getDate() + '/' + new Date().getMonth() +'/'+ new Date().getFullYear();
  imageUrls: any[];
  constructor(private bikeService: BikeserviceService,private toastr: ToastrService) { }

  ngOnInit() {
  //  console.log(this.bikeService.orderImg);
    this.productJson = this.bikeService.orderImg;



    this.productJson.forEach((element,index) => {
      this.imageUrls = [];
      element.headerMasterlist.forEach((data,index1) => {
        if(data.listDetails.length !== undefined && data.listDetails.length !==0) {

                data.listDetails.forEach(element => {
                  if(element.order == true){
                    this.imageUrls.push({'imageUrl':element.imageUrl});
                  }
                });
        }
      })
      this.productJson[index].img = this.imageUrls;
    });
>>>>>>> 04bd3c609e5ba6c3bd3b6f93d5fa9b6e6218e671
    // this.bikeService.orderImg[0].headerMasterlist.forEach((data,index) => {
    //     if(data.listDetails.length !== undefined && data.listDetails.length !==0) {
    //       data.listDetails.forEach(element => {
    //         if(element.order == true){
    //           this.imageUrls.push({'imageUrl':element.imageUrl});
    //         }
    //       });

    //     }
    // })
<<<<<<< HEAD





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
      if (this.orderJSON[index].quantity != null || this.orderJSON[index].quantity != 0 || this.orderJSON[index].Quantity != undefined ) {
        this.orderJSON[index].price = +(this.orderJSON[index].quantity) * this.orderJSON[index].price
        console.log(this.orderJSON[index].price);
      }
      if(this.orderJSON[index].quantity == 0) {
        alert(this.orderJSON[index].quantity);
      }
    });

    this.calculateSum();
    this.checkFlag();

  }

  calculateSum() {
    this.totalSumValue = 0;
    this.orderJSON.forEach((item, index) => {
      if(item.price !== null || item.price !== "" || item.price !== undefined) {
        this.totalSumValue = this.totalSumValue+item.price;
      }
    });

=======
   console.log(this.productJson);
>>>>>>> 04bd3c609e5ba6c3bd3b6f93d5fa9b6e6218e671
  }

  getAllOderDetails() {
    this.bikeService.getAllOrderDetais().subscribe((data) => {
      this.productJson = data;
    })
  }

  removeItems(items, i) {
    this.productJson.splice(i, 1);
    console.log(this.productJson)
    this.toastr.success('Order canceled');
  }

  changeOrder(orderquantity:any, index,event) {

    console.log(event);
if(orderquantity !== 0 && orderquantity > 0) {
  if(orderquantity != "" || orderquantity != 0) {
    this.order.orderquantity = orderquantity;
    this.order.index = index;
    this.modelChanged.next(this.order);
  } else {
    this.orderJSON[index].quantity = null;
    this.orderJSON[index].price = null;
    this.totalSum();
  }
  }else {
    console.log(orderquantity);
    this.orderJSON[index].quantity = 1;
    orderquantity = 1;
  }
}



  // checking boolean Flag

  checkFlag() {
    this.preventFlag = false;
    this.orderJSON.forEach((data,item) => {
      if(data.quantity == null || data.quantity == "" || data.quantity == 0) {
         this.preventFlag = true;
      }
      return this.preventFlag;
    })
    this.valueChange.emit(this.preventFlag);
  }




}
