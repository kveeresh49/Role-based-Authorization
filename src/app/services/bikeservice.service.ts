import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BikeserviceService {

  private staticURL:String = "http://bom-configuration-service.us-east-2.elasticbeanstalk.com";
  public orderImg = [];
  public modals: any[] = [];
  public addModelSubject = new BehaviorSubject(true)
  constructor(private http: HttpClient) { }
  domainData = JSON.parse(sessionStorage.getItem('currentUser'));
  loadAllHeaders():Observable<any> {
    return this.http.get(this.staticURL+'/bomHeader/getAll')
  }

  getSubHeaders(itemId){
    return this.http.get(this.staticURL+ '/bomDetails/' + itemId + '/details')
  }
  saveOrderDetails(item) {
    return this.http.post(this.staticURL+ '/bomOrders', item)
  }

  getAllOrderDetais():Observable<Object>{
    return this.http.get(this.staticURL+ '/bomOrders');
    //
  }

  getOrders1() {
    return this.http.get(this.staticURL+ '/bomOrders/userSpecificOrders/'+this.domainData.username);
  }

  getOrderScreen(bomOrders) {
    this.orderImg.push(bomOrders);
    console.log(this.orderImg);
  }

  removeOrder(orderId) {
    return this.http.delete(this.staticURL+ '/bomOrders/'+orderId);
  }


  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
}
}
