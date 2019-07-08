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
    // this.bikeService.orderImg[0].headerMasterlist.forEach((data,index) => {
    //     if(data.listDetails.length !== undefined && data.listDetails.length !==0) {
    //       data.listDetails.forEach(element => {
    //         if(element.order == true){
    //           this.imageUrls.push({'imageUrl':element.imageUrl});
    //         }
    //       });

    //     }
    // })
   console.log(this.productJson);
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
