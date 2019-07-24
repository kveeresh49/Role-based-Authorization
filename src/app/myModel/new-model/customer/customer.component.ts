import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnChanges, OnDestroy{

  ajay:string = 'this is ajay'

  constructor() {

    setTimeout(()=> {
      this.ajay = 'this is Ajay'
    },1000)


   }


  //Angular life cycle
  ngOnInit() {
  }

  ngOnChanges() {

  }
  ngOnDestroy() {

  }


}
