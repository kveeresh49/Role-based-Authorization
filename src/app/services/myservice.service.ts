import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  private staticURL:String = "http://bom-configuration-service.us-east-2.elasticbeanstalk.com";
  constructor(private http:HttpClient) { }
  getAllData() {
    return this.http.get(this.staticURL+ '/bomOrders');
  }




}
