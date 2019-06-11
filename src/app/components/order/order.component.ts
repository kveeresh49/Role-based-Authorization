import { Component, OnInit } from '@angular/core';
import { BikeserviceService } from 'src/app/services/bikeservice.service';
import { getOrder } from './a';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public productJson :any;
  public quantity = 3;
  public x = new Date();
  public date = new Date().getDate() + '/' + new Date().getMonth() +'/'+ new Date().getFullYear();
  constructor(private bikeService: BikeserviceService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllOderDetails();
  }

  getAllOderDetails() {
    this.bikeService.getAllOrderDetais().subscribe((data) => {
      this.productJson = data;
    })
  }

  removeItems(items,i) {
    this.productJson.splice(i,1);
    console.log(this.productJson)
    this.toastr.success('Order canceled');
  }



}
