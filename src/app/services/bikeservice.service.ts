import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BikeserviceService {

  private staticURL:String = "http://bom-configuration-service.us-east-2.elasticbeanstalk.com";
  public orderImg = [];
  constructor(private http: HttpClient) { }

  loadAllHeaders():Observable<any> {
    return this.http.get(this.staticURL+'/bomHeader/getAll')
  }

  getSubHeaders(itemId){
    return this.http.get(this.staticURL+ '/bomDetails/' + itemId + '/details')
  }
  saveOrderDetails(item) {
    return this.http.post(this.staticURL+ '/bomOrders', item)
  }

  getAllOrderDetais(){
    return this.http.get(this.staticURL+ '/bomOrders');
    //
  }

<<<<<<< HEAD
  getOrders1() {
    return this.http.get(this.staticURL+ '/bomOrders/userSpecificOrders/sumitg');
  }

=======
>>>>>>> 04bd3c609e5ba6c3bd3b6f93d5fa9b6e6218e671
  getOrderScreen(bomOrders) {
    this.orderImg.push(bomOrders);
    console.log(this.orderImg);
  }
}
