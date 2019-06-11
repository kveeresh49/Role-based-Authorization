import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BikeserviceService {

  private staticURL:String = "http://bom-configuration-service.us-east-2.elasticbeanstalk.com";
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
}
